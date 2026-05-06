package kr.or.kibo.ttp.evaluation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EvaluationApplicationRepository extends JpaRepository<EvaluationApplication, Long> {

    List<EvaluationApplication> findByServiceType(EvaluationServiceType serviceType);

    List<EvaluationApplication> findByStatus(ApplicationStatus status);

    List<EvaluationApplication> findByApplicantOrganizationNameContainingIgnoreCase(String organizationName);

    List<EvaluationApplication> findByBusinessRegistrationNumber(String businessRegistrationNumber);
}
