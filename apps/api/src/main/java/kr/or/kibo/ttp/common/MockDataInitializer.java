package kr.or.kibo.ttp.common;

import kr.or.kibo.ttp.evaluation.ApplicationStatus;
import kr.or.kibo.ttp.evaluation.EvaluationApplication;
import kr.or.kibo.ttp.evaluation.EvaluationApplicationRepository;
import kr.or.kibo.ttp.evaluation.EvaluationServiceType;
import kr.or.kibo.ttp.member.MockRole;
import kr.or.kibo.ttp.member.MockUser;
import kr.or.kibo.ttp.member.MockUserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("local")
public class MockDataInitializer {

    @Bean
    ApplicationRunner seedMockDomainData(
        MockUserRepository mockUserRepository,
        EvaluationApplicationRepository evaluationApplicationRepository
    ) {
        return args -> {
            if (mockUserRepository.count() == 0) {
                mockUserRepository.save(new MockUser(
                    "company-user",
                    "Mock Company Manager",
                    MockRole.COMPANY_MEMBER,
                    "Mock Technology Co."
                ));
                mockUserRepository.save(new MockUser(
                    "institution-user",
                    "Mock Institution Manager",
                    MockRole.INSTITUTION_MEMBER,
                    "Mock Bank / Institution"
                ));
            }

            if (evaluationApplicationRepository.count() == 0) {
                evaluationApplicationRepository.save(new EvaluationApplication(
                    EvaluationServiceType.KTRS_FM,
                    "Mock Technology Co.",
                    "123-45-67890",
                    "Mock AI Manufacturing Quality Control",
                    ApplicationStatus.CONSENT_REQUIRED,
                    null
                ));
                evaluationApplicationRepository.save(new EvaluationApplication(
                    EvaluationServiceType.KTRS_FM,
                    "Transmitted Sample Co.",
                    "987-65-43210",
                    "Mock Battery Inspection Platform",
                    ApplicationStatus.TRANSMITTED,
                    "B"
                ));
            }
        };
    }
}
