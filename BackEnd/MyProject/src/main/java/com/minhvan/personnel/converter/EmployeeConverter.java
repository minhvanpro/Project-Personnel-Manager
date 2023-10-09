package com.minhvan.personnel.converter;

import com.minhvan.personnel.dtos.EmployeeDto;
import com.minhvan.personnel.entities.Department;
import com.minhvan.personnel.entities.Employee;
import com.minhvan.personnel.form.EmployeeForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EmployeeConverter {
  @Autowired
  private AddressConverter addressConverter;

  @Autowired
  private DepartmentConverter departmentConverter;

  public Employee toEntity(EmployeeDto dto) {
    Employee entity = new Employee();
    entity.setId(dto.getId());
    entity.setFullName(dto.getFullName());
    entity.setIdAddress(addressConverter.toEntity(dto.getIdAddress()));
    entity.setIdDepartment(departmentConverter.toEntity(dto.getIdDepartment()));
    return entity;
  }

  public EmployeeDto toDto(Employee entity) {
    EmployeeDto dto = new EmployeeDto();
    dto.setId(entity.getId());
    dto.setFullName(entity.getFullName());
    dto.setIdAddress(addressConverter.toDto(entity.getIdAddress()));
    dto.setIdDepartment(departmentConverter.toDto(entity.getIdDepartment()));
    return dto;
  }

  public Employee toEntity(EmployeeForm employeeForm){
    Employee entity = new Employee();
    entity.setId(employeeForm.getId());
    entity.setFullName(employeeForm.getFullName());
    entity.setIdAddress(addressConverter.toEntity(employeeForm.getIdAddress()));
    Department department = new Department();
    department.setId(employeeForm.getIdDepartment());
    entity.setIdDepartment(department);
    return entity;
  }

}
