package kr.or.kibo.ttp.consent;

import jakarta.validation.constraints.NotBlank;

public record ConsentRequest(
    @NotBlank String consentedBy,
    boolean requiredConsentAccepted,
    boolean optionalConsentAccepted
) {
}
