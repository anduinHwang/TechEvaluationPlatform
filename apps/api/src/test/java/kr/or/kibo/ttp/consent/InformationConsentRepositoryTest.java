package kr.or.kibo.ttp.consent;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class InformationConsentRepositoryTest {

    @Autowired
    private InformationConsentRepository informationConsentRepository;

    @Test
    void savesAndFindsConsentByApplicationId() {
        InformationConsent consent = new InformationConsent(
            100L,
            "company-user",
            true,
            false,
            ElectronicSignatureStatus.MOCK_SIGNED,
            LocalDateTime.of(2026, 5, 6, 10, 0)
        );

        informationConsentRepository.save(consent);

        assertThat(informationConsentRepository.findByApplicationId(100L))
            .extracting(InformationConsent::getConsentedBy)
            .contains("company-user");
    }

    @Test
    void persistsMockElectronicSignatureStatus() {
        InformationConsent consent = new InformationConsent(
            101L,
            "company-user",
            true,
            true,
            ElectronicSignatureStatus.MOCK_SIGNED,
            LocalDateTime.of(2026, 5, 6, 10, 30)
        );

        informationConsentRepository.save(consent);

        assertThat(informationConsentRepository.findByApplicationId(101L))
            .extracting(InformationConsent::getElectronicSignatureStatus)
            .contains(ElectronicSignatureStatus.MOCK_SIGNED);
    }
}
