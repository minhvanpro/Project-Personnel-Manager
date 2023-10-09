package com.minhvan.personnel.controller.v2;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minhvan.personnel.common.model.request.PagingRequest;
import com.minhvan.personnel.common.pageable.Sorter;
import com.minhvan.personnel.dtos.DepartmentDto;
import com.minhvan.personnel.dtos.ProjectDto;
import com.minhvan.personnel.entities.Department;
import com.minhvan.personnel.entities.Project;
import com.minhvan.personnel.filters.project.ProjectFilter;
import com.minhvan.personnel.repositories.IProjectRepository;
import com.minhvan.personnel.services.IAddressService;
import com.minhvan.personnel.services.IProjectService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController("ProjectController/v2")
@RequestMapping("/api/v2/projects")
public class ProjectController {
  @Autowired
  private IProjectRepository iProjectRepository;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private IProjectService iProjectService;

  @GetMapping
  public List<ProjectDto> getAll(
    @RequestParam(name = "sort") String sort,
    @RequestParam(name = "range") String range,
    @RequestParam(name = "filter") String filter,
    HttpServletRequest request, HttpServletResponse response
  ) {
    try {
      List<String> _sort = objectMapper.readValue(sort, ArrayList.class);
      List<Integer> _range = objectMapper.readValue(range, ArrayList.class);
      ProjectFilter _filter = objectMapper.readValue(filter, ProjectFilter.class);
      StringBuilder contentRange = new StringBuilder("projects ");
      contentRange.append(_range.get(0)).append("-").append(_range.get(1)).append("/").append(iProjectService.count(_filter));
      response.setHeader("Content-Range", contentRange.toString());
      PagingRequest pagingRequest = new PagingRequest();
      pagingRequest.setLimit(_range.get(1) - _range.get(0) + 1);
      pagingRequest.setPage((int) Math.ceil(_range.get(0) / pagingRequest.getLimit() + 1));
      Sorter sorter = new Sorter();
      sorter.setName(_sort.get(0));
      sorter.setBy(_sort.get(1));
      pagingRequest.setSorter(sorter);
      System.out.println("success");
      List<ProjectDto> listDto = iProjectService.getAll(pagingRequest, _filter);
      return listDto;
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

  @GetMapping("/{id}")
  public ProjectDto getById(@PathVariable Long id) {
    ProjectDto projectDto = iProjectService.getById(id);
    if (projectDto != null) {
      return projectDto;
    }
    return null;
  }

  @PutMapping("/{id}")
  public ProjectDto update(@RequestBody Project project) {
    try {
      iProjectService.update(project);
      ProjectDto projectDto = iProjectService.update(project);
      return projectDto;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @PostMapping
  public ProjectDto create(@RequestBody Project project) {
    try {
      return iProjectService.create(project);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Long> deleteProject(@PathVariable Long id) {
    boolean isRemoved = iProjectService.removeById(id);
    if (!isRemoved) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(id, HttpStatus.OK);
  }
}
