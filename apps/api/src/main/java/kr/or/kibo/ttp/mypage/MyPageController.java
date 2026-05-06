package kr.or.kibo.ttp.mypage;

import java.util.List;
import kr.or.kibo.ttp.evaluation.EvaluationApplicationRepository;
import kr.or.kibo.ttp.evaluation.EvaluationApplicationResponse;
import kr.or.kibo.ttp.evaluation.ServiceType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/mypage")
public class MyPageController {

    private final EvaluationApplicationRepository applicationRepository;

    public MyPageController(EvaluationApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @GetMapping("/applications")
    public List<EvaluationApplicationResponse> applications() {
        return applicationRepository.findAllByServiceTypeOrderByCreatedAtDesc(ServiceType.KTRS_FM)
            .stream()
            .map(EvaluationApplicationResponse::from)
            .toList();
    }
}
