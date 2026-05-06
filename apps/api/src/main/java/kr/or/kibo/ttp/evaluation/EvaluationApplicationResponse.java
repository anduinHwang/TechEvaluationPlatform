package kr.or.kibo.ttp.evaluation;

import java.time.LocalDateTime;

public record EvaluationApplicationResponse(
    Long id,
    ServiceType serviceType,
    String applicantOrganizationName,
    String businessRegistrationNumber,
    String technologyName,
    ApplicationStatus status,
    String resultGrade,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
    public static EvaluationApplicationResponse from(EvaluationApplication application) {
        return new EvaluationApplicationResponse(
            application.getId(),
            application.getServiceType(),
            application.getApplicantOrganizationName(),
            application.getBusinessRegistrationNumber(),
            application.getTechnologyName(),
            application.getStatus(),
            application.getResultGrade(),
            application.getCreatedAt(),
            application.getUpdatedAt()
        );
    }
}
