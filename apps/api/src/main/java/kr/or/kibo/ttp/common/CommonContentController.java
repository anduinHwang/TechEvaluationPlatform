package kr.or.kibo.ttp.common;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/common")
public class CommonContentController {

    @GetMapping("/notices")
    public List<Map<String, String>> notices() {
        return List.of(
            Map.of("id", "1", "title", "Mock KTRS-FM service pilot notice", "category", "Service"),
            Map.of("id", "2", "title", "Information-use consent placeholder guide", "category", "Consent")
        );
    }

    @GetMapping("/faqs")
    public List<Map<String, String>> faqs() {
        return List.of(
            Map.of("id", "1", "question", "Is real OAuth enabled?", "answer", "No. Login is mock-only in this slice."),
            Map.of("id", "2", "question", "Are grades real?", "answer", "No. Evaluation results are static placeholders.")
        );
    }
}
