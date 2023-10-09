package com.minhvan.personnel.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EmployeeDto {
  private Long id;

  private String fullName;

  private AddressDto idAddress;

  private DepartmentDto idDepartment;
}
