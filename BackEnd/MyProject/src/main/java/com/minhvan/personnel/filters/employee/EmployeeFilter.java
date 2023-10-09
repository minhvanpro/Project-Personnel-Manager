package com.minhvan.personnel.filters.employee;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EmployeeFilter {

  public static final String FIELD_NAME = "fullName";

  public static final String FIELD_IDDEPARTMENT = "idDepartment.id";

  private String fullName;

  private Long idDepartment;
}
