package kr.or.kibo.ttp.audit;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String actorUsername;

    @Column(nullable = false)
    private String action;

    @Column(nullable = false)
    private String targetType;

    @Column(nullable = false)
    private String targetId;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    protected AuditLog() {
    }

    public AuditLog(String actorUsername, String action, String targetType, String targetId) {
        this.actorUsername = actorUsername;
        this.action = action;
        this.targetType = targetType;
        this.targetId = targetId;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getActorUsername() {
        return actorUsername;
    }

    public String getAction() {
        return action;
    }

    public String getTargetType() {
        return targetType;
    }

    public String getTargetId() {
        return targetId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
