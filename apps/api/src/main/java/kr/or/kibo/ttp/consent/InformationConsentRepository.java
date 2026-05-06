package kr.or.kibo.ttp.consent;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InformationConsentRepository extends JpaRepository<InformationConsent, Long> {

    List<InformationConsent> findByApplicationId(Long applicationId);
}
