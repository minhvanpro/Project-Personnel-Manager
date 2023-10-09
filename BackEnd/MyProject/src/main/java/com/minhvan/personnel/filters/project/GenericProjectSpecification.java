package com.minhvan.personnel.filters.project;

import com.minhvan.personnel.entities.Project;
import com.minhvan.personnel.specification.ISpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GenericProjectSpecification {
  @Autowired
  private ISpecification<Project> iSpecification;

  public Specification<Project> generic(ProjectFilter projectFilter) {
    Specification<Project> specification = null;

    List<Specification<Project>> specifications = new ArrayList<>();
    if (projectFilter.getName() != null) {
      specifications.add(iSpecification.like(ProjectFilter.FIELD_NAME, "%" + projectFilter.getName() + "%"));
    }

    List<Specification<Project>> result = new ArrayList<>();

    for (int i = 0; i < specifications.size(); i++) {
      if (specifications.get(i) != null) {
        result.add(specifications.get(i));
      }
    }

    for (int i = 0; i < result.size(); i++) {
      if (specification == null) {
        specification = Specification.where(result.get(i));
      } else {
        specification = specification.and(result.get(i));
      }
    }

    return specification;
  }
}
