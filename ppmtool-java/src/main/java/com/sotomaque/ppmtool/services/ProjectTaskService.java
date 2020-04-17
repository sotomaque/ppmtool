package com.sotomaque.ppmtool.services;

import com.sotomaque.ppmtool.domain.Backlog;
import com.sotomaque.ppmtool.domain.ProjectTask;
import com.sotomaque.ppmtool.repositories.BacklogRepository;
import com.sotomaque.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {

        // handle exception: project not found

        // want all project tasks to be added to a specific project (not null project)
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        // set backlog to project task
        projectTask.setBacklog(backlog);
        // project sequence logic
        Integer BacklogSequence = backlog.getPTSequence();
        // update backlog sequence
        BacklogSequence++;
        backlog.setPTSequence(BacklogSequence);

        // add updated sequence to project task
        projectTask.setProjectSequence(projectIdentifier + "-" + BacklogSequence);
        // set Project Task identifier
        projectTask.setProjectIdentifier(projectIdentifier);
        // set initial priority when priority is null
        if (projectTask.getPriority() == null) {
            // 3 is low priority;
            projectTask.setPriority(3);
        }
        // set initial status when status is null
        if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);

    }

    public Iterable<ProjectTask> findBacklogById(String backlog_id) {
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlog_id);
    }
}
