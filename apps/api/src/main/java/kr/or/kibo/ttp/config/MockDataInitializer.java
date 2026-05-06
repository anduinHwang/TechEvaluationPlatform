package kr.or.kibo.ttp.config;

import kr.or.kibo.ttp.common.Role;
import kr.or.kibo.ttp.evaluation.EvaluationApplication;
import kr.or.kibo.ttp.evaluation.EvaluationApplicationRepository;
import kr.or.kibo.ttp.member.MockUser;
import kr.or.kibo.ttp.member.MockUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class MockDataInitializer implements CommandLineRunner {

    private final MockUserRepository mockUserRepository;
    private final EvaluationApplicationRepository applicationRepository;

    public MockDataInitializer(
        MockUserRepository mockUserRepository,
        EvaluationApplicationRepository applicationRepository
    ) {
        this.mockUserRepository = mockUserRepository;
        this.applicationRepository = applicationRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (mockUserRepository.count() == 0) {
            mockUserRepository.save(new MockUser(
                "mock-company",
                "Company Member",
                Role.COMPANY_MEMBER,
                "Mirae Robotics Co., Ltd."
            ));
            mockUserRepository.save(new MockUser(
                "mock-institution",
                "Institution Member",
                Role.INSTITUTION_MEMBER,
                "KIBO Partner Institution"
            ));
        }

        if (applicationRepository.count() == 0) {
            applicationRepository.save(EvaluationApplication.transmittedSeed(
                "Seed Bio Materials",
                "123-45-67890",
                "AI-based material analysis platform",
                "MOCK-A"
            ));
        }
    }
}
