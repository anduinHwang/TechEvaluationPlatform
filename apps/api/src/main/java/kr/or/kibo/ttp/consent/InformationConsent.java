package kr.or.kibo.ttp.consent;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "information_consents")
public class InformationConsent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long applicationId;

    @Column(nullable = false)
    private String consentedBy;

    @Column(nullable = false)
    private boolean requiredConsentAccepted;

    @Column(nullable = false)
    private boolean optionalConsentAccepted;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ElectronicSignatureStatus electronicSignatureStatus;

    @Column(nullable = false)
    private LocalDateTime consentedAt;

    protected InformationConsent() {
    }

    public InformationConsent(
        Long applicationId,
        String consentedBy,
        boolean requiredConsentAccepted,
        boolean optionalConsentAccepted,
        ElectronicSignatureStatus electronicSignatureStatus,
        LocalDateTime consentedAt
    ) {
        this.applicationId = applicationId;
        this.consentedBy = consentedBy;
        this.requiredConsentAccepted = requiredConsentAccepted;
        this.optionalConsentAccepted = optionalConsentAccepted;
        this.electronicSignatureStatus = electronicSignatureStatus;
        this.consentedAt = consentedAt;
    }

    public Long getId() {
        return id;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public String getConsentedBy() {
        return consentedBy;
    }

    public boolean isRequiredConsentAccepted() {
        return requiredConsentAccepted;
    }

    public boolean isOptionalConsentAccepted() {
        return optionalConsentAccepted;
    }

    public ElectronicSignatureStatus getElectronicSignatureStatus() {
        return electronicSignatureStatus;
    }

    public LocalDateTime getConsentedAt() {
        return consentedAt;
    }
}
