package kr.or.kibo.ttp.member;

import java.util.Optional;
import kr.or.kibo.ttp.common.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MockUserRepository extends JpaRepository<MockUser, Long> {

    Optional<MockUser> findFirstByRole(Role role);
}
