package kr.or.kibo.ttp.mock;

import kr.or.kibo.ttp.common.MockPlatformConstants;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/mock")
public class MockVersionController {

    @GetMapping("/version")
    public MockVersionResponse version() {
        return new MockVersionResponse(
            MockPlatformConstants.APP_NAME,
            MockPlatformConstants.MOCK_MODE,
            MockPlatformConstants.BACKEND_NAME,
            MockPlatformConstants.TEMPORARY_DATABASE
        );
    }
}
