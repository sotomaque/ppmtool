package com.sotomaque.ppmtool.services;

import com.sotomaque.ppmtool.domain.Backlog;
import com.sotomaque.ppmtool.domain.Project;
import com.sotomaque.ppmtool.domain.ProjectTask;
import com.sotomaque.ppmtool.exceptions.ProjectNotFoundException;
import com.sotomaque.ppmtool.repositories.BacklogRepository;
import com.sotomaque.ppmtool.repositories.ProjectRepository;
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

    @Autowired
    private ProjectRepository projectRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {

        try {
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

        } catch (Exception e) {
            throw new ProjectNotFoundException("Project with ID: " + projectIdentifier + " does not exist");
        }

    }

    public Iterable<ProjectTask> findBacklogById(String id) {

        Project project = projectRepository.findByProjectIdentifier(id);

        if (project == null) {
            throw new ProjectNotFoundException("Project with ID: " + id + " does not exist");
        }

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }
}
