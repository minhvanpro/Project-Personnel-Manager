package com.minhvan.personnel.services;

import com.minhvan.personnel.common.model.request.PagingRequest;
import com.minhvan.personnel.dtos.DepartmentDto;
import com.minhvan.personnel.entities.Department;
import com.minhvan.personnel.filters.department.DepartmentFilter;

import java.util.List;

public interface IDepartmentService {
  DepartmentDto create(Department entity);

  List<DepartmentDto> getAll();

  List<DepartmentDto> getAll(DepartmentFilter filter);

  List<DepartmentDto> getAll(PagingRequest pagingRequest, DepartmentFilter filter);

  DepartmentDto getById(Long id);

  Boolean removeById(Long id);

  DepartmentDto update(Department entity);

  Long count(DepartmentFilter filter);
}
