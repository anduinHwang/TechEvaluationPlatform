package kr.or.kibo.ttp;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kibo.ttp.audit.AuditLogRepository;
import kr.or.kibo.ttp.consent.InformationConsentRepository;
import kr.or.kibo.ttp.evaluation.ApplicationStatus;
import kr.or.kibo.ttp.evaluation.EvaluationApplicationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class MockVerticalSliceApiTests {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    EvaluationApplicationRepository applicationRepository;

    @Autowired
    InformationConsentRepository consentRepository;

    @Autowired
    AuditLogRepository auditLogRepository;

    @Test
    void mockLoginReturnsCompanyUser() throws Exception {
        mockMvc.perform(post("/api/v1/auth/mock-login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"role\":\"COMPANY_MEMBER\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value("mock-company"))
            .andExpect(jsonPath("$.role").value("COMPANY_MEMBER"))
            .andExpect(jsonPath("$.authMode").value("MOCK_ONLY"));
    }

    @Test
    void mockLoginReturnsInstitutionUser() throws Exception {
        mockMvc.perform(post("/api/v1/auth/mock-login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"role\":\"INSTITUTION_MEMBER\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value("mock-institution"))
            .andExpect(jsonPath("$.role").value("INSTITUTION_MEMBER"));
    }

    @Test
    void companyCanCreateKtrsFmApplication() throws Exception {
        MvcResult result = createApplication("Mock Quantum Sensor");

        JsonNode body = objectMapper.readTree(result.getResponse().getContentAsString());
        assertThat(body.get("serviceType").asText()).isEqualTo("KTRS_FM");
        assertThat(body.get("status").asText()).isEqualTo("CONSENT_REQUIRED");
        assertThat(body.get("technologyName").asText()).isEqualTo("Mock Quantum Sensor");
    }

    @Test
    void consentSubmissionRecordsMockSignedConsent() throws Exception {
        Long applicationId = createdApplicationId("Mock Consent Engine");

        mockMvc.perform(post("/api/v1/evaluations/ktrs-fm/company/applications/{id}/consent", applicationId)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "consentedBy": "mock-company",
                      "requiredConsentAccepted": true,
                      "optionalConsentAccepted": true
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.applicationId").value(applicationId))
            .andExpect(jsonPath("$.electronicSignatureStatus").value("MOCK_SIGNED"));

        assertThat(consentRepository.findFirstByApplicationIdOrderByConsentedAtDesc(applicationId)).isPresent();
    }

    @Test
    void applicationSubmitChangesStatusToSubmitted() throws Exception {
        Long applicationId = createdApplicationId("Mock Submission Model");

        mockMvc.perform(post("/api/v1/evaluations/ktrs-fm/company/applications/{id}/submit", applicationId))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("SUBMITTED"))
            .andExpect(jsonPath("$.resultGrade").value("MOCK-B"));

        assertThat(applicationRepository.findById(applicationId).orElseThrow().getStatus())
            .isEqualTo(ApplicationStatus.SUBMITTED);
    }

    @Test
    void institutionCanListSubmittedAndTransmittedApplications() throws Exception {
        Long applicationId = createdApplicationId("Mock Institution View");
        mockMvc.perform(post("/api/v1/evaluations/ktrs-fm/company/applications/{id}/submit", applicationId))
            .andExpect(status().isOk());

        mockMvc.perform(get("/api/v1/evaluations/ktrs-fm/institution/applications"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].status").exists())
            .andExpect(jsonPath("$[0].applicantOrganizationName").exists());
    }

    @Test
    void auditLogIsWrittenForImportantActions() throws Exception {
        long before = auditLogRepository.count();

        mockMvc.perform(post("/api/v1/auth/mock-login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"role\":\"COMPANY_MEMBER\"}"))
            .andExpect(status().isOk());

        Long applicationId = createdApplicationId("Mock Audit Trail");
        mockMvc.perform(post("/api/v1/evaluations/ktrs-fm/company/applications/{id}/consent", applicationId)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "consentedBy": "mock-company",
                      "requiredConsentAccepted": true,
                      "optionalConsentAccepted": false
                    }
                    """))
            .andExpect(status().isOk());
        mockMvc.perform(post("/api/v1/evaluations/ktrs-fm/company/applications/{id}/submit", applicationId))
            .andExpect(status().isOk());
        mockMvc.perform(get("/api/v1/evaluations/ktrs-fm/institution/applications"))
            .andExpect(status().isOk());

        assertThat(auditLogRepository.count()).isGreaterThanOrEqualTo(before + 5);
        assertThat(auditLogRepository.countByAction("APPLICATION_SUBMITTED")).isGreaterThan(0);
    }

    private Long createdApplicationId(String technologyName) throws Exception {
        JsonNode body = objectMapper.readTree(createApplication(technologyName).getResponse().getContentAsString());
        return body.get("id").asLong();
    }

    private MvcResult createApplication(String technologyName) throws Exception {
        return mockMvc.perform(post("/api/v1/evaluations/ktrs-fm/company/applications")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "applicantOrganizationName": "Mirae Robotics Co., Ltd.",
                      "businessRegistrationNumber": "220-81-62517",
                      "technologyName": "%s"
                    }
                    """.formatted(technologyName)))
            .andExpect(status().isOk())
            .andReturn();
    }
}
