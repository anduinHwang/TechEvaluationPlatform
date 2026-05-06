package kr.or.kibo.ttp.dashboard;

import java.util.Map;
import kr.or.kibo.ttp.evaluation.ApplicationStatus;
import kr.or.kibo.ttp.evaluation.EvaluationApplicationRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    private final EvaluationApplicationRepository applicationRepository;

    public DashboardController(EvaluationApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @GetMapping("/company")
    public Map<String, Object> companyDashboard() {
        long total = applicationRepository.count();
        long submitted = applicationRepository.findAllByStatusInOrderByUpdatedAtDesc(
            java.util.List.of(ApplicationStatus.SUBMITTED, ApplicationStatus.TRANSMITTED)
        ).size();

        return Map.of(
            "title", "Company member dashboard",
            "recentEvaluationCount", total,
            "submittedEvaluationCount", submitted,
            "quickMenus", java.util.List.of("KTRS-FM self-diagnosis", "My Page", "Notices")
        );
    }

    @GetMapping("/institution")
    public Map<String, Object> institutionDashboard() {
        long reviewable = applicationRepository.findAllByStatusInOrderByUpdatedAtDesc(
            java.util.List.of(ApplicationStatus.SUBMITTED, ApplicationStatus.TRANSMITTED)
        ).size();

        return Map.of(
            "title", "Institution member dashboard",
            "reviewableEvaluationCount", reviewable,
            "subAccountSummary", "Placeholder: sub-account policy is not confirmed.",
            "quickMenus", java.util.List.of("KTRS-FM evaluation list", "My Page", "Q&A")
        );
    }
}
