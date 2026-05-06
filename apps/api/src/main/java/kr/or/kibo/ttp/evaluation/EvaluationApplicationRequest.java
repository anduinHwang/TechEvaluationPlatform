package kr.or.kibo.ttp.evaluation;

import jakarta.validation.constraints.NotBlank;

public record EvaluationApplicationRequest(
    @NotBlank String applicantOrganizationName,
    @NotBlank String businessRegistrationNumber,
    @NotBlank String technologyName
) {
}
