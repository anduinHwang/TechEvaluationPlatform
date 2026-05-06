package kr.or.kibo.ttp.evaluation;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class EvaluationApplicationRepositoryTest {

    @Autowired
    private EvaluationApplicationRepository evaluationApplicationRepository;

    @Test
    void savesAndFindsApplicationByServiceType() {
        EvaluationApplication application = new EvaluationApplication(
            EvaluationServiceType.KTRS_FM,
            "Mock Technology Co.",
            "123-45-67890",
            "Mock AI Manufacturing Quality Control",
            ApplicationStatus.CONSENT_REQUIRED,
            null
        );

        evaluationApplicationRepository.save(application);

        assertThat(evaluationApplicationRepository.findByServiceType(EvaluationServiceType.KTRS_FM))
            .extracting(EvaluationApplication::getTechnologyName)
            .contains("Mock AI Manufacturing Quality Control");
    }

    @Test
    void persistsApplicationStatus() {
        EvaluationApplication application = new EvaluationApplication(
            EvaluationServiceType.KTRS_FM,
            "Submitted Sample Co.",
            "111-22-33333",
            "Mock Process Automation",
            ApplicationStatus.SUBMITTED,
            null
        );

        evaluationApplicationRepository.save(application);

        assertThat(evaluationApplicationRepository.findByStatus(ApplicationStatus.SUBMITTED))
            .extracting(EvaluationApplication::getApplicantOrganizationName)
            .contains("Submitted Sample Co.");
    }

    @Test
    void findsApplicationByBusinessRegistrationNumber() {
        EvaluationApplication application = new EvaluationApplication(
            EvaluationServiceType.KTRS_FM,
            "Registration Sample Co.",
            "222-33-44444",
            "Mock Battery Inspection Platform",
            ApplicationStatus.TRANSMITTED,
            "B"
        );

        evaluationApplicationRepository.save(application);

        assertThat(evaluationApplicationRepository.findByBusinessRegistrationNumber("222-33-44444"))
            .extracting(EvaluationApplication::getResultGrade)
            .contains("B");
    }

    @Test
    void findsApplicationByOrganizationNameSearch() {
        EvaluationApplication application = new EvaluationApplication(
            EvaluationServiceType.KTRS_FM,
            "Searchable Technology Co.",
            "333-44-55555",
            "Mock Semiconductor Inspection",
            ApplicationStatus.DRAFT,
            null
        );

        evaluationApplicationRepository.save(application);

        assertThat(evaluationApplicationRepository.findByApplicantOrganizationNameContainingIgnoreCase("technology"))
            .extracting(EvaluationApplication::getBusinessRegistrationNumber)
            .contains("333-44-55555");
    }
}
