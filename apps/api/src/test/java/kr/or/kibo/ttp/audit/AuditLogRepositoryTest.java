package kr.or.kibo.ttp.audit;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class AuditLogRepositoryTest {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Test
    void savesAndFindsAuditLogByActorUsername() {
        AuditLog auditLog = new AuditLog("company-user", "APPLICATION_DRAFT_CREATED", "EvaluationApplication", 1L);

        auditLogRepository.save(auditLog);

        assertThat(auditLogRepository.findByActorUsername("company-user"))
            .extracting(AuditLog::getAction)
            .contains("APPLICATION_DRAFT_CREATED");
    }

    @Test
    void savesAndFindsAuditLogByAction() {
        AuditLog auditLog = new AuditLog("institution-user", "INSTITUTION_EVALUATION_LIST_VIEWED", "EvaluationApplication", null);

        auditLogRepository.save(auditLog);

        assertThat(auditLogRepository.findByAction("INSTITUTION_EVALUATION_LIST_VIEWED"))
            .extracting(AuditLog::getActorUsername)
            .contains("institution-user");
    }
}
