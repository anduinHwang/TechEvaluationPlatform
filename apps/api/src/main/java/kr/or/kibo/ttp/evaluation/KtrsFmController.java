package kr.or.kibo.ttp.evaluation;

import jakarta.validation.Valid;
import java.util.List;
import kr.or.kibo.ttp.consent.ConsentRequest;
import kr.or.kibo.ttp.consent.ConsentResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/evaluations/ktrs-fm")
public class KtrsFmController {

    private final KtrsFmService ktrsFmService;

    public KtrsFmController(KtrsFmService ktrsFmService) {
        this.ktrsFmService = ktrsFmService;
    }

    @GetMapping("/company/applications")
    public List<EvaluationApplicationResponse> listCompanyApplications() {
        return ktrsFmService.listCompanyApplications();
    }

    @PostMapping("/company/applications")
    public ResponseEntity<EvaluationApplicationResponse> create(@Valid @RequestBody EvaluationApplicationRequest request) {
        return ResponseEntity.ok(ktrsFmService.create(request));
    }

    @PostMapping("/company/applications/{id}/consent")
    public ResponseEntity<ConsentResponse> consent(
        @PathVariable Long id,
        @Valid @RequestBody ConsentRequest request
    ) {
        return ResponseEntity.ok(ConsentResponse.from(ktrsFmService.consent(id, request)));
    }

    @PostMapping("/company/applications/{id}/submit")
    public ResponseEntity<EvaluationApplicationResponse> submit(@PathVariable Long id) {
        return ResponseEntity.ok(ktrsFmService.submit(id));
    }

    @GetMapping("/institution/applications")
    public List<EvaluationApplicationResponse> listInstitutionApplications() {
        return ktrsFmService.listInstitutionApplications();
    }
}
