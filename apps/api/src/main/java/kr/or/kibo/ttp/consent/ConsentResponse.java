package kr.or.kibo.ttp.consent;

import java.time.LocalDateTime;

public record ConsentResponse(
    Long id,
    Long applicationId,
    String consentedBy,
    boolean requiredConsentAccepted,
    boolean optionalConsentAccepted,
    ElectronicSignatureStatus electronicSignatureStatus,
    LocalDateTime consentedAt
) {
    public static ConsentResponse from(InformationConsent consent) {
        return new ConsentResponse(
            consent.getId(),
            consent.getApplicationId(),
            consent.getConsentedBy(),
            consent.isRequiredConsentAccepted(),
            consent.isOptionalConsentAccepted(),
            consent.getElectronicSignatureStatus(),
            consent.getConsentedAt()
        );
    }
}
