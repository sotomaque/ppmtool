package com.sotomaque.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class ProjectTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(updatable = false)
    private String projectSequence;

    @Column(updatable = false)
    private String projectIdentifier;

    @NotBlank(message = "Please include a project summary")
    private String summary;

    private String acceptanceCriteria;
    private String status;
    private Integer priority;
    private Date dueDate;


    // created at / updated at logic
    private Date created_at;
    private Date updated_at;
    @PrePersist
    protected void onCreate() {
        this.created_at = new Date();
    }
    @PreUpdate
    protected void onUpdate() {
        this.updated_at = new Date();
    }

    // ManyToOne with backlog
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "backlog_id", updatable = false, nullable = false)
    @JsonIgnore
    private Backlog backlog;

    // no arg constructor
    public ProjectTask() {
    }

    // toString()
    @Override
    public String toString() {
        return "ProjectTask{" +
                "id=" + id +
                ", projectSequence='" + projectSequence + '\'' +
                ", projectIdentifier='" + projectIdentifier + '\'' +
                ", summary='" + summary + '\'' +
                ", acceptanceCriteria='" + acceptanceCriteria + '\'' +
                ", status='" + status + '\'' +
                ", priority=" + priority +
                ", dueDate=" + dueDate +
                ", created_at=" + created_at +
                ", updated_at=" + updated_at +
                '}';
    }

    // getters and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectSequence() {
        return projectSequence;
    }
    public void setProjectSequence(String projectSequence) {
        this.projectSequence = projectSequence;
    }

    public String getProjectIdentifier() {
        return projectIdentifier;
    }
    public void setProjectIdentifier(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }

    public String getSummary() {
        return summary;
    }
    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getAcceptanceCriteria() {
        return acceptanceCriteria;
    }
    public void setAcceptanceCriteria(String acceptanceCriteria) {
        this.acceptanceCriteria = acceptanceCriteria;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getPriority() {
        return priority;
    }
    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Date getDueDate() {
        return dueDate;
    }
    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getCreated_at() {
        return created_at;
    }
    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Date getUpdated_at() {
        return updated_at;
    }
    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }

    public Backlog getBacklog() {
        return backlog;
    }
    public void setBacklog(Backlog backlog) {
        this.backlog = backlog;
    }
}
