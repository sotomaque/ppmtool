package com.sotomaque.ppmtool.services;

import com.sotomaque.ppmtool.domain.Backlog;
import com.sotomaque.ppmtool.domain.Project;
import com.sotomaque.ppmtool.exceptions.ProjectIdException;
import com.sotomaque.ppmtool.repositories.BacklogRepository;
import com.sotomaque.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    public Project saveOrUpdateProject(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

            // only create a new project when we are creating a project, not when we are updating an existing project
            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                // set relationship
                project.setBacklog(backlog);
                backlog.setProject(project);
                // set project id
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }

            // if we update a project, we want to return the original backlog not null
            if (project.getId() != null) {
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }

            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID: " + project.getProjectIdentifier().toUpperCase() + " already exists.");
        }
    }

    public Project findProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId);
        if (project == null) {
            throw new ProjectIdException("Project ID: " + projectId.toUpperCase() + " does not exist.");
        }
        return project;
    }

    // iterable returns list in json object
    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if (project == null) {
            throw new ProjectIdException("Cannot delete project with ID: " + projectId.toUpperCase() + ". This project does not exist.");
        }

        projectRepository.delete(project);
    }

}
