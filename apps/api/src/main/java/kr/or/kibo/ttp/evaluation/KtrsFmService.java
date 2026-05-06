package kr.or.kibo.ttp.evaluation;

import java.util.List;
import kr.or.kibo.ttp.audit.AuditService;
import kr.or.kibo.ttp.consent.ConsentRequest;
import kr.or.kibo.ttp.consent.InformationConsent;
import kr.or.kibo.ttp.consent.InformationConsentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class KtrsFmService {

    private static final String MOCK_COMPANY_ACTOR = "mock-company";
    private static final String MOCK_INSTITUTION_ACTOR = "mock-institution";

    private final EvaluationApplicationRepository applicationRepository;
    private final InformationConsentRepository consentRepository;
    private final AuditService auditService;

    public KtrsFmService(
        EvaluationApplicationRepository applicationRepository,
        InformationConsentRepository consentRepository,
        AuditService auditService
    ) {
        this.applicationRepository = applicationRepository;
        this.consentRepository = consentRepository;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    public List<EvaluationApplicationResponse> listCompanyApplications() {
        return applicationRepository.findAllByServiceTypeOrderByCreatedAtDesc(ServiceType.KTRS_FM)
            .stream()
            .map(EvaluationApplicationResponse::from)
            .toList();
    }

    @Transactional
    public EvaluationApplicationResponse create(EvaluationApplicationRequest request) {
        EvaluationApplication application = applicationRepository.save(new EvaluationApplication(
            request.applicantOrganizationName(),
            request.businessRegistrationNumber(),
            request.technologyName()
        ));

        auditService.record(MOCK_COMPANY_ACTOR, "APPLICATION_CREATED", "EvaluationApplication", application.getId());
        return EvaluationApplicationResponse.from(application);
    }

    @Transactional
    public InformationConsent consent(Long id, ConsentRequest request) {
        EvaluationApplication application = read(id);
        if (!request.requiredConsentAccepted()) {
            throw new IllegalArgumentException("Required information-use consent must be accepted.");
        }

        InformationConsent consent = consentRepository.save(new InformationConsent(
            application.getId(),
            request.consentedBy(),
            request.requiredConsentAccepted(),
            request.optionalConsentAccepted()
        ));

        auditService.record(request.consentedBy(), "CONSENT_SUBMITTED", "EvaluationApplication", application.getId());
        return consent;
    }

    @Transactional
    public EvaluationApplicationResponse submit(Long id) {
        EvaluationApplication application = read(id);
        application.submit();
        auditService.record(MOCK_COMPANY_ACTOR, "APPLICATION_SUBMITTED", "EvaluationApplication", application.getId());
        return EvaluationApplicationResponse.from(application);
    }

    @Transactional
    public List<EvaluationApplicationResponse> listInstitutionApplications() {
        auditService.record(MOCK_INSTITUTION_ACTOR, "INSTITUTION_LIST_ACCESSED", "EvaluationApplication", "KTRS_FM");
        return applicationRepository.findAllByStatusInOrderByUpdatedAtDesc(List.of(
                ApplicationStatus.SUBMITTED,
                ApplicationStatus.TRANSMITTED,
                ApplicationStatus.IN_REVIEW,
                ApplicationStatus.COMPLETED
            ))
            .stream()
            .map(EvaluationApplicationResponse::from)
            .toList();
    }

    private EvaluationApplication read(Long id) {
        return applicationRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Evaluation application not found: " + id));
    }
}
