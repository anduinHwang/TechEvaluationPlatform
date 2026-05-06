package kr.or.kibo.ttp.audit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {

    List<AuditLog> findByActorUsername(String actorUsername);

    List<AuditLog> findByAction(String action);
}
