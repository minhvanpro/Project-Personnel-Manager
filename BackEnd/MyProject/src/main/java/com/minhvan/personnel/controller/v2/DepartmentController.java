package com.minhvan.personnel.controller.v2;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minhvan.personnel.common.model.request.PagingRequest;
import com.minhvan.personnel.common.pageable.Sorter;
import com.minhvan.personnel.converter.DepartmentConverter;
import com.minhvan.personnel.dtos.DepartmentDto;
import com.minhvan.personnel.entities.Department;
import com.minhvan.personnel.filters.department.DepartmentFilter;
import com.minhvan.personnel.services.IDepartmentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController("DepartmentController/v2")
@RequestMapping("/api/v2/departments")
public class DepartmentController {

  @Autowired
  private IDepartmentService iDepartmentService;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private DepartmentConverter departmentConverter;

  @GetMapping
  public List<DepartmentDto> getAll(
    @RequestParam(name = "sort") String sort,
    @RequestParam(name = "range") String range,
    @RequestParam(name = "filter") String filter,
    HttpServletRequest request, HttpServletResponse response
  ) {
    try {
      List<String> _sort = objectMapper.readValue(sort, ArrayList.class);
      List<Integer> _range = objectMapper.readValue(range, ArrayList.class);
      DepartmentFilter _filter = objectMapper.readValue(filter, DepartmentFilter.class);
      StringBuilder contentRange = new StringBuilder("departments ");
      contentRange.append(_range.get(0)).append("-").append(_range.get(1)).append("/").append(iDepartmentService.count(_filter));
      response.setHeader("Content-Range", contentRange.toString());
      PagingRequest pagingRequest = new PagingRequest();
      pagingRequest.setLimit(_range.get(1) - _range.get(0) + 1);
      pagingRequest.setPage((int) Math.ceil(_range.get(0) / pagingRequest.getLimit() + 1));
      Sorter sorter = new Sorter();
      sorter.setName(_sort.get(0));
      sorter.setBy(_sort.get(1));
      pagingRequest.setSorter(sorter);
      System.out.println("success");
      List<DepartmentDto> listDto = iDepartmentService.getAll(pagingRequest, _filter);
      return listDto;
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

  @GetMapping("/{id}")
  public DepartmentDto getById(@PathVariable Long id) {
    DepartmentDto departmentDto = iDepartmentService.getById(id);
    if (departmentDto != null) {
      return departmentDto;
    }
    return null;
  }

  @PutMapping("/{id}")
  public DepartmentDto update(@RequestBody Department department) {
    try {
      iDepartmentService.update(department);
      DepartmentDto departmentDto = iDepartmentService.update(department);
      return departmentDto;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @PostMapping
  public DepartmentDto create(@RequestBody Department department) {
    try {
      return iDepartmentService.create(department);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Long> deleteDepartment(@PathVariable Long id) {
    boolean isRemoved = iDepartmentService.removeById(id);
    if (!isRemoved) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(id, HttpStatus.OK);
  }
}
