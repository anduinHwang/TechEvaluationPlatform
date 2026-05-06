package kr.or.kibo.ttp.evaluation;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "evaluation_applications")
public class EvaluationApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EvaluationServiceType serviceType;

    @Column(nullable = false)
    private String applicantOrganizationName;

    @Column(nullable = false)
    private String businessRegistrationNumber;

    @Column(nullable = false)
    private String technologyName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    @Column
    private String resultGrade;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    protected EvaluationApplication() {
    }

    public EvaluationApplication(
        EvaluationServiceType serviceType,
        String applicantOrganizationName,
        String businessRegistrationNumber,
        String technologyName,
        ApplicationStatus status,
        String resultGrade
    ) {
        this.serviceType = serviceType;
        this.applicantOrganizationName = applicantOrganizationName;
        this.businessRegistrationNumber = businessRegistrationNumber;
        this.technologyName = technologyName;
        this.status = status;
        this.resultGrade = resultGrade;
    }

    @PrePersist
    void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public EvaluationServiceType getServiceType() {
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
