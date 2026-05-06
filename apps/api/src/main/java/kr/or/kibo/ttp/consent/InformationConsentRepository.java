package kr.or.kibo.ttp.consent;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InformationConsentRepository extends JpaRepository<InformationConsent, Long> {

    Optional<InformationConsent> findFirstByApplicationIdOrderByConsentedAtDesc(Long applicationId);
}
