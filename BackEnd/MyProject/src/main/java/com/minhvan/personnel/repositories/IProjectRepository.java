package com.minhvan.personnel.repositories;

import com.minhvan.personnel.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IProjectRepository extends JpaRepository<Project, Long>, JpaSpecificationExecutor<Project> {
}
