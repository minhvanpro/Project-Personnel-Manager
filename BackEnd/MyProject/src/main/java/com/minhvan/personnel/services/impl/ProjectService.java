package com.minhvan.personnel.services.impl;

import com.minhvan.personnel.common.model.request.PagingRequest;
import com.minhvan.personnel.common.pageable.Pagination;
import com.minhvan.personnel.converter.ProjectConverter;
import com.minhvan.personnel.dtos.ProjectDto;
import com.minhvan.personnel.entities.Employee;
import com.minhvan.personnel.entities.Project;
import com.minhvan.personnel.filters.project.GenericProjectSpecification;
import com.minhvan.personnel.filters.project.ProjectFilter;
import com.minhvan.personnel.repositories.IEmployeeRepository;
import com.minhvan.personnel.repositories.IProjectRepository;
import com.minhvan.personnel.services.IProjectService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProjectService implements IProjectService {
  @Autowired
  private IProjectRepository iProjectRepository;

  @Autowired
  private ProjectConverter projectConverter;

  @Autowired
  private IEmployeeRepository iEmployeeRepository;

  @Autowired
  private GenericProjectSpecification genericProjectSpecification;

  @Override
  public ProjectDto create(Project entity) {
    if (entity.getEmployees() != null) {
      for (int i = 0; i < entity.getEmployees().size(); i++) {
        Employee employee = entity.getEmployees().get(i);
        //System.out.println(employee.getId());
        Employee employeeId = iEmployeeRepository.findById(employee.getId()).get();
        if (employeeId != null) {
          entity.getEmployees().set(i, employeeId);
        }
      }
    }
    entity = iProjectRepository.save(entity);
    ProjectDto result = projectConverter.toDto(entity);
    return result;
  }

  @Override
  public Boolean removeById(Long id) {
    try {
      iProjectRepository.deleteById(id);
      return true;
    } catch (Exception exception) {
      return false;
    }
  }
  @Override
  public ProjectDto update(Project entity) {
    Optional<Project> optionalProject = iProjectRepository.findById(entity.getId());
    if (optionalProject.isPresent()) {
      Project project = optionalProject.get();
      project.setName(entity.getName());
      project = iProjectRepository.save(project);
      ProjectDto result = projectConverter.toDto(project);
      return result;
    }
    return null;
  }

  @Override
  public List<ProjectDto> getAll() {
    List<Project> listProjectEntity = iProjectRepository.findAll();
    List<ProjectDto> listProjectDto = new ArrayList<>();
    if (!listProjectEntity.isEmpty()) {
      for (int i = 0; i < listProjectEntity.size(); i++) {
        listProjectDto.add(projectConverter.toDto(listProjectEntity.get(i)));
      }
      return listProjectDto;
    }
    return null;
  }

  @Override
  public List<ProjectDto> getAll(ProjectFilter projectFilter) {
    List<Project> listProjectEntity = iProjectRepository.findAll(genericProjectSpecification.generic(projectFilter));
    List<ProjectDto> listProjectDto = new ArrayList<>();
    if (!listProjectEntity.isEmpty()) {
      for (int i = 0; i < listProjectEntity.size(); i++) {
        listProjectDto.add(projectConverter.toDto(listProjectEntity.get(i)));
      }
      return listProjectDto;
    }
    return null;
  }

  @Override
  public List<ProjectDto> getAll(PagingRequest pagingRequest, ProjectFilter projectFilter) {
    List<Project> listProjectEntity = iProjectRepository.findAll(genericProjectSpecification.generic(projectFilter), Pagination.initPageable(pagingRequest)).getContent();
    List<ProjectDto> listProjectDto = new ArrayList<>();
    if (!listProjectEntity.isEmpty()) {
      for (int i = 0; i < listProjectEntity.size(); i++) {
        listProjectDto.add(projectConverter.toDto(listProjectEntity.get(i)));
      }
      return listProjectDto;
    }
    return null;
  }

  @Override
  public ProjectDto getById(Long id) {
    Optional<Project> project = iProjectRepository.findById(id);
    if (project!=null){
      ProjectDto result = projectConverter.toDto(project.get());
      return result;
    }
    return null;
  }

  @Override
  public Long count(ProjectFilter filter) {
    return iProjectRepository.count(genericProjectSpecification.generic(filter));
  }
}
