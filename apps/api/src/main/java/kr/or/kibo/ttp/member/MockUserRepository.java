package kr.or.kibo.ttp.member;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MockUserRepository extends JpaRepository<MockUser, Long> {

    Optional<MockUser> findByUsername(String username);

    List<MockUser> findByRole(MockRole role);
}
