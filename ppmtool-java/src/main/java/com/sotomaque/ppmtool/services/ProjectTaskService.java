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


@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {

        // the projectService method will throw exceptions if we don't own that project
        // therefore preventing us from adding tasks to others projects

        // want all project tasks to be added to a specific project (not null project)
        Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();

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
        if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
            // 3 is low priority;
            projectTask.setPriority(3);
        }
        // set initial status when status is null
        if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);

    }

    public Iterable<ProjectTask> findBacklogById(String id) {

        Project project = projectRepository.findByProjectIdentifier(id);

        if (project == null) {
            throw new ProjectNotFoundException("Project with ID: " + id + " does not exist");
        }

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findProjectTaskByProjectSequence(String backlog_id, String sequence) {

        // make sure we are searching on an existing backlog
        Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
        if (backlog == null) {
            throw new ProjectNotFoundException("Project with ID: " + backlog_id + " does not exist.");
        }

        // make sure that our task exists
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequence);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project Task: " + sequence + " does not exist.");
        }

        // make sure that the backlog / project_id in the path correspond to the right project
        if (!projectTask.getProjectIdentifier().equals(backlog_id)) {
            throw new ProjectNotFoundException("Project Task: " + sequence + " does not exist in Project: " + backlog_id);
        }

        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlog_id, String sequence) {
        ProjectTask projectTask = findProjectTaskByProjectSequence(backlog_id, sequence);
        projectTask = updatedTask;

        return projectTaskRepository.save(projectTask);
    }

    public void deleteProjectTaskByProjectSequence(String backlog_id, String sequence) {
        ProjectTask projectTask = findProjectTaskByProjectSequence(backlog_id, sequence);
        projectTaskRepository.delete(projectTask);
    }

}
