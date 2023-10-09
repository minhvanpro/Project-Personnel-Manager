package com.minhvan.personnel.filters.department;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DepartmentFilter {

  public  static  final String FIELD_NAME = "name";

  private String name;
}
