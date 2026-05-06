package kr.or.kibo.ttp.member;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class MockUserRepositoryTest {

    @Autowired
    private MockUserRepository mockUserRepository;

    @Test
    void savesAndFindsCompanyUserByUsername() {
        MockUser companyUser = new MockUser(
            "company-user",
            "Mock Company Manager",
            MockRole.COMPANY_MEMBER,
            "Mock Technology Co."
        );

        mockUserRepository.save(companyUser);

        assertThat(mockUserRepository.findByUsername("company-user"))
            .isPresent()
            .get()
            .extracting(MockUser::getDisplayName, MockUser::getRole, MockUser::getOrganizationName)
            .containsExactly("Mock Company Manager", MockRole.COMPANY_MEMBER, "Mock Technology Co.");
    }

    @Test
    void savesAndFindsInstitutionUserByRole() {
        MockUser institutionUser = new MockUser(
            "institution-user",
            "Mock Institution Manager",
            MockRole.INSTITUTION_MEMBER,
            "Mock Bank / Institution"
        );

        mockUserRepository.save(institutionUser);

        List<MockUser> users = mockUserRepository.findByRole(MockRole.INSTITUTION_MEMBER);

        assertThat(users)
            .extracting(MockUser::getUsername)
            .contains("institution-user");
    }
}
