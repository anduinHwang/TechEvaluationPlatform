package kr.or.kibo.ttp.consent;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
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
        boolean optionalConsentAccepted
    ) {
        this.applicationId = applicationId;
        this.consentedBy = consentedBy;
        this.requiredConsentAccepted = requiredConsentAccepted;
        this.optionalConsentAccepted = optionalConsentAccepted;
        this.electronicSignatureStatus = requiredConsentAccepted
            ? ElectronicSignatureStatus.MOCK_SIGNED
            : ElectronicSignatureStatus.NOT_SIGNED;
        this.consentedAt = LocalDateTime.now();
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
