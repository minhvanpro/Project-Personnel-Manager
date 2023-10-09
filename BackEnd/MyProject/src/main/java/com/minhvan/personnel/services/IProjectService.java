package com.minhvan.personnel.services;

import com.minhvan.personnel.common.model.request.PagingRequest;
import com.minhvan.personnel.dtos.ProjectDto;
import com.minhvan.personnel.entities.Project;
import com.minhvan.personnel.filters.project.ProjectFilter;

import java.util.List;

public interface IProjectService {
  ProjectDto create(Project entity);

  Boolean removeById(Long id);

  ProjectDto update(Project entity);

  List<ProjectDto> getAll();

  List<ProjectDto> getAll(ProjectFilter projectFilter);

  List<ProjectDto> getAll(PagingRequest pagingRequest, ProjectFilter projectFilter);

  ProjectDto getById(Long id);

  Long count(ProjectFilter filter);
}
