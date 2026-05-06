package kr.or.kibo.ttp.common;

import static org.assertj.core.api.Assertions.assertThat;

import kr.or.kibo.ttp.evaluation.EvaluationApplicationRepository;
import kr.or.kibo.ttp.evaluation.EvaluationServiceType;
import kr.or.kibo.ttp.member.MockUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("local")
class MockDataInitializerTest {

    @Autowired
    private MockUserRepository mockUserRepository;

    @Autowired
    private EvaluationApplicationRepository evaluationApplicationRepository;

    @Test
    void loadsLocalMockSeedData() {
        assertThat(mockUserRepository.findByUsername("company-user")).isPresent();
        assertThat(mockUserRepository.findByUsername("institution-user")).isPresent();
        assertThat(evaluationApplicationRepository.findByServiceType(EvaluationServiceType.KTRS_FM)).hasSizeGreaterThanOrEqualTo(2);
    }
}
