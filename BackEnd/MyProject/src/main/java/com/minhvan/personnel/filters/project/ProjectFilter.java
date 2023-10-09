package com.minhvan.personnel.filters.project;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProjectFilter {
  public static final String FIELD_NAME = "name";

  private String name;
}
