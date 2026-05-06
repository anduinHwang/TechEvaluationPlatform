package kr.or.kibo.ttp.auth;

import jakarta.validation.Valid;
import kr.or.kibo.ttp.audit.AuditService;
import kr.or.kibo.ttp.common.Role;
import kr.or.kibo.ttp.member.MockUser;
import kr.or.kibo.ttp.member.MockUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class MockAuthController {

    private final MockUserRepository mockUserRepository;
    private final AuditService auditService;

    public MockAuthController(MockUserRepository mockUserRepository, AuditService auditService) {
        this.mockUserRepository = mockUserRepository;
        this.auditService = auditService;
    }

    @PostMapping("/mock-login")
    public ResponseEntity<MockSessionResponse> mockLogin(@Valid @RequestBody MockLoginRequest request) {
        if (request.role() == Role.ANONYMOUS) {
            throw new IllegalArgumentException("Anonymous users do not need mock login.");
        }

        MockUser user = mockUserRepository.findFirstByRole(request.role())
            .orElseThrow(() -> new IllegalArgumentException("No mock user found for role: " + request.role()));

        auditService.record(user.getUsername(), "MOCK_LOGIN", "MockUser", user.getId());
        return ResponseEntity.ok(MockSessionResponse.from(user));
    }
}
