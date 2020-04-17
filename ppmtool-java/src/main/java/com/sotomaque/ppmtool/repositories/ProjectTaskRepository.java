package com.sotomaque.ppmtool.repositories;

import com.sotomaque.ppmtool.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTaskRepository  extends CrudRepository<ProjectTask, Long> {
}
