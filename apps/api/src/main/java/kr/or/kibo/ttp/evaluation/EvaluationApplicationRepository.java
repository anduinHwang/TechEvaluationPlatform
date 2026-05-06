package kr.or.kibo.ttp.evaluation;

import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EvaluationApplicationRepository extends JpaRepository<EvaluationApplication, Long> {

    List<EvaluationApplication> findAllByServiceTypeOrderByCreatedAtDesc(ServiceType serviceType);

    List<EvaluationApplication> findAllByStatusInOrderByUpdatedAtDesc(Collection<ApplicationStatus> statuses);
}
