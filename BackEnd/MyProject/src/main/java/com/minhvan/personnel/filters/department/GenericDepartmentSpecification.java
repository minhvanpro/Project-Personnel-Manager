package com.minhvan.personnel.filters.department;

import com.minhvan.personnel.entities.Department;
import com.minhvan.personnel.specification.ISpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Component
public class GenericDepartmentSpecification {
  @Autowired
  private ISpecification<Department> iSpecification;

  public Specification<Department> generic(DepartmentFilter departmentFilter){
    Specification<Department> specification = null;

    List<Specification<Department>> specifications = new ArrayList<>();
    if (departmentFilter.getName()!=null) {
      specifications.add(iSpecification.like(DepartmentFilter.FIELD_NAME, "%" + departmentFilter.getName() + "%"));
    }

    List<Specification<Department>> result = new ArrayList<>();

    for (int i = 0; i < specifications.size(); i++){
        if (specifications.get(i)!= null){
          result.add(specifications.get(i));
        }
    }

    for (int i = 0; i < result.size(); i++){
      if (specification == null){
        specification = Specification.where(result.get(i));
      }else {
        specification = specification.and(result.get(i));
      }
    }

    return specification;

  }
}
