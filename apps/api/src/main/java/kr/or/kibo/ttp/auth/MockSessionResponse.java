package kr.or.kibo.ttp.auth;

import kr.or.kibo.ttp.common.Role;
import kr.or.kibo.ttp.member.MockUser;

public record MockSessionResponse(
    Long id,
    String username,
    String displayName,
    Role role,
    String organizationName,
    String authMode
) {
    public static MockSessionResponse from(MockUser user) {
        return new MockSessionResponse(
            user.getId(),
            user.getUsername(),
            user.getDisplayName(),
            user.getRole(),
            user.getOrganizationName(),
            "MOCK_ONLY"
        );
    }
}
