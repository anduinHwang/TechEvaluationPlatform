package kr.or.kibo.ttp.audit;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    public AuditService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional
    public void record(String actorUsername, String action, String targetType, Object targetId) {
        auditLogRepository.save(new AuditLog(
            actorUsername,
            action,
            targetType,
            String.valueOf(targetId)
        ));
    }
}
