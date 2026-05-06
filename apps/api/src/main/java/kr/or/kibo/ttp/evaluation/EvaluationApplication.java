package kr.or.kibo.ttp.evaluation;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class EvaluationApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceType serviceType;

    @Column(nullable = false)
    private String applicantOrganizationName;

    @Column(nullable = false)
    private String businessRegistrationNumber;

    @Column(nullable = false)
    private String technologyName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    private String resultGrade;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    protected EvaluationApplication() {
    }

    public EvaluationApplication(
        String applicantOrganizationName,
        String businessRegistrationNumber,
        String technologyName
    ) {
        this.serviceType = ServiceType.KTRS_FM;
        this.applicantOrganizationName = applicantOrganizationName;
        this.businessRegistrationNumber = businessRegistrationNumber;
        this.technologyName = technologyName;
        this.status = ApplicationStatus.CONSENT_REQUIRED;
        this.resultGrade = "PLACEHOLDER";
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    public static EvaluationApplication transmittedSeed(
        String applicantOrganizationName,
        String businessRegistrationNumber,
        String technologyName,
        String resultGrade
    ) {
        EvaluationApplication application = new EvaluationApplication(
            applicantOrganizationName,
            businessRegistrationNumber,
            technologyName
        );
        application.status = ApplicationStatus.TRANSMITTED;
        application.resultGrade = resultGrade;
        application.updatedAt = LocalDateTime.now();
        return application;
    }

    public void submit() {
        this.status = ApplicationStatus.SUBMITTED;
        this.resultGrade = "MOCK-B";
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public ServiceType getServiceType() {
        return serviceType;
    }

    public String getApplicantOrganizationName() {
        return applicantOrganizationName;
    }

    public String getBusinessRegistrationNumber() {
        return businessRegistrationNumber;
    }

    public String getTechnologyName() {
        return technologyName;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public String getResultGrade() {
        return resultGrade;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
