package com.minhvan.personnel.filters.employee;

import com.minhvan.personnel.entities.Department;
import com.minhvan.personnel.entities.Employee;
import com.minhvan.personnel.specification.ISpecification;
import com.minhvan.personnel.specification.ISpecificationRelation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GenericEmployeeSpecification {
  @Autowired
  private ISpecification<Employee> iSpecification;

  @Autowired
  private ISpecificationRelation<Employee, Department> iSpecificationRelation;

  public Specification<Employee> generic(EmployeeFilter employeeFilter){
    Specification<Employee> specification = null;

    List<Specification<Employee>> specifications = new ArrayList<>();
    if (employeeFilter.getFullName()!=null) {
      specifications.add(iSpecification.like(employeeFilter.FIELD_NAME, "%" + employeeFilter.getFullName() + "%"));
    }

    if (employeeFilter.getIdDepartment()!=null){
      specifications.add(iSpecificationRelation.joinEqual("idDepartment","id",employeeFilter.getIdDepartment()));
    }
    //specifications.add(iSpecificationRelation.joinEqual("idDepartment","id",employeeFilter.getIdDepartment()));

    List<Specification<Employee>> result = new ArrayList<>();

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
