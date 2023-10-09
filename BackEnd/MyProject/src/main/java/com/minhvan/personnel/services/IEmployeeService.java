package com.minhvan.personnel.services;

import com.minhvan.personnel.common.model.request.PagingRequest;
import com.minhvan.personnel.dtos.EmployeeDto;
import com.minhvan.personnel.entities.Employee;
import com.minhvan.personnel.filters.employee.EmployeeFilter;

import java.util.List;

public interface IEmployeeService {
  EmployeeDto create(Employee entity);

  Boolean removeById(Long id);

  List<EmployeeDto> getAll();


  List<EmployeeDto> getAll(PagingRequest pagingRequest,EmployeeFilter employeeFilter);
  List<EmployeeDto> getAll(EmployeeFilter employeeFilter);

  EmployeeDto getById(Long id);

  EmployeeDto update(Employee entity);

  Long count(EmployeeFilter filter);

}
