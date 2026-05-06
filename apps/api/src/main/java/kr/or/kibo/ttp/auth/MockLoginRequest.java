package kr.or.kibo.ttp.auth;

import jakarta.validation.constraints.NotNull;
import kr.or.kibo.ttp.common.Role;

public record MockLoginRequest(@NotNull Role role) {
}
