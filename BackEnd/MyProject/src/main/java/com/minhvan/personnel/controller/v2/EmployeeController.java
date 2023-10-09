package com.minhvan.personnel.controller.v2;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minhvan.personnel.common.model.request.PagingRequest;
import com.minhvan.personnel.common.pageable.Sorter;
import com.minhvan.personnel.converter.EmployeeConverter;
import com.minhvan.personnel.dtos.EmployeeDto;
import com.minhvan.personnel.entities.Employee;
import com.minhvan.personnel.filters.employee.EmployeeFilter;
import com.minhvan.personnel.form.EmployeeForm;
import com.minhvan.personnel.services.IEmployeeService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController("EmployeeController/v2")
@RequestMapping("/api/v2/employees")
public class EmployeeController {
  @Autowired
  private IEmployeeService iEmployeeService;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private EmployeeConverter employeeConverter;

  @GetMapping
  public List<EmployeeDto> getAll(
    @RequestParam(name = "sort") String sort,
    @RequestParam(name = "range") String range,
    @RequestParam(name = "filter") String filter,
    HttpServletRequest request, HttpServletResponse response
  ) {
    try {
      List<String> _sort = objectMapper.readValue(sort, ArrayList.class);
      List<Integer> _range = objectMapper.readValue(range, ArrayList.class);
      EmployeeFilter _filter = objectMapper.readValue(filter, EmployeeFilter.class);
      StringBuilder contentRange = new StringBuilder("employees ");
      //_filter.setIdDepartment(1l);
      contentRange.append(_range.get(0)).append("-").append(_range.get(1)).append("/").append(iEmployeeService.count(_filter));
      response.setHeader("Content-Range", contentRange.toString());
      PagingRequest pagingRequest = new PagingRequest();
      pagingRequest.setLimit(_range.get(1) - _range.get(0) + 1);
      pagingRequest.setPage((int) Math.ceil(_range.get(0) / pagingRequest.getLimit() + 1));
      Sorter sorter = new Sorter();
      sorter.setName(_sort.get(0));
      sorter.setBy(_sort.get(1));
      pagingRequest.setSorter(sorter);
      System.out.println("success");
      List<EmployeeDto> listDto = iEmployeeService.getAll(pagingRequest, _filter);
      return listDto;
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

  @GetMapping("/{id}")
  public EmployeeDto getById(@PathVariable Long id) {
    EmployeeDto employeeDto = iEmployeeService.getById(id);
    if (employeeDto != null) {
      return employeeDto;
    }
    return null;
  }

  @PutMapping("/{id}")
  public EmployeeDto update(@RequestBody Employee entity) {
    try {
      //Employee entity = employeeConverter.toEntity(employeeForm);
      iEmployeeService.update(entity);
      EmployeeDto employeeDto = iEmployeeService.update(entity);
      return employeeDto;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @PostMapping
  public EmployeeDto create(@RequestBody EmployeeForm employeeForm) {
    try {
      Employee entity = employeeConverter.toEntity(employeeForm);
      return iEmployeeService.create(entity);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Long> deleteEmployee(@PathVariable Long id) {
    boolean isRemoved = iEmployeeService.removeById(id);
    if (!isRemoved) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(id, HttpStatus.OK);
  }
}
