package kr.or.kibo.ttp.health;

import kr.or.kibo.ttp.common.MockPlatformConstants;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class HealthController {

    @GetMapping("/health")
    public HealthResponse health() {
        return new HealthResponse("UP", MockPlatformConstants.SERVICE_NAME);
    }
}
