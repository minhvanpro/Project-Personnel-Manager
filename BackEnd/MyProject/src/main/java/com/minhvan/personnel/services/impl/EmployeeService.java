package com.minhvan.personnel.services.impl;

import com.minhvan.personnel.common.model.request.PagingRequest;
import com.minhvan.personnel.common.pageable.Pagination;
import com.minhvan.personnel.converter.EmployeeConverter;
import com.minhvan.personnel.dtos.DepartmentDto;
import com.minhvan.personnel.dtos.EmployeeDto;
import com.minhvan.personnel.entities.Address;
import com.minhvan.personnel.entities.Department;
import com.minhvan.personnel.entities.Employee;
import com.minhvan.personnel.filters.employee.EmployeeFilter;
import com.minhvan.personnel.filters.employee.GenericEmployeeSpecification;
import com.minhvan.personnel.repositories.IAddressRepository;
import com.minhvan.personnel.repositories.IDepartmentRepository;
import com.minhvan.personnel.repositories.IEmployeeRepository;
import com.minhvan.personnel.services.IEmployeeService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EmployeeService implements IEmployeeService {
  @Autowired
  private IEmployeeRepository iEmployeeRepository;

  @Autowired
  private EmployeeConverter employeeConverter;

  @Autowired
  private IAddressRepository iAddressRepository;

  @Autowired
  private IDepartmentRepository iDepartmentRepository;

  @Autowired
  private GenericEmployeeSpecification genericEmployeeSpecification;

  @Override
  public EmployeeDto create(Employee entity) {
    //Employee entity = employeeConverter.toEntity(dto);
//        entity.setIdAddress(
//                iAddressRepository.findById(dto.getIdAddress().getId()).get()
//        );

    entity.setIdDepartment(
      iDepartmentRepository.findById(entity.getIdDepartment().getId()).get()
    );
    entity = iEmployeeRepository.save(entity);
    EmployeeDto result = employeeConverter.toDto(entity);
    return result;
  }

  @Override
  public Boolean removeById(Long id) {
    try {
      iEmployeeRepository.deleteById(id);
      return true;
    } catch (Exception exception) {
      return false;
    }
  }

  @Override
  public List<EmployeeDto> getAll() {
    List<Employee> listEmployeeEntity = iEmployeeRepository.findAll();
    List<EmployeeDto> listEmployeeDto = new ArrayList<>();
    if (!listEmployeeEntity.isEmpty()) {
      for (int i = 0; i < listEmployeeEntity.size(); i++) {
        listEmployeeDto.add(employeeConverter.toDto(listEmployeeEntity.get(i)));
      }
      return listEmployeeDto;
    }
    return null;
  }

  @Override
  public List<EmployeeDto> getAll(PagingRequest pagingRequest, EmployeeFilter employeeFilter) {
    List<Employee> listEmployeeEntity = iEmployeeRepository.findAll(genericEmployeeSpecification.generic(employeeFilter), Pagination.initPageable(pagingRequest)).getContent();
    List<EmployeeDto> listEmployeeDto = new ArrayList<>();
    if (!listEmployeeEntity.isEmpty()) {
      for (int i = 0; i < listEmployeeEntity.size(); i++) {
        listEmployeeDto.add(employeeConverter.toDto(listEmployeeEntity.get(i)));
      }
      return listEmployeeDto;
    }
    return null;
  }

  @Override
  public List<EmployeeDto> getAll(EmployeeFilter employeeFilter) {
    List<Employee> listEmployeeEntity = iEmployeeRepository.findAll(genericEmployeeSpecification.generic(employeeFilter));
    List<EmployeeDto> listEmployeeDto = new ArrayList<>();
    if (!listEmployeeEntity.isEmpty()) {
      for (int i = 0; i < listEmployeeEntity.size(); i++) {
        listEmployeeDto.add(employeeConverter.toDto(listEmployeeEntity.get(i)));
      }
      return listEmployeeDto;
    }
    return null;
  }

  @Override
  public EmployeeDto getById(Long id) {
    Optional<Employee> employee = iEmployeeRepository.findById(id);
    if (employee != null) {
      EmployeeDto result = employeeConverter.toDto(employee.get());
      return result;
    }
    return null;
  }

  @Override
  public EmployeeDto update(Employee entity) {
    Optional<Employee> optionalEmployee = iEmployeeRepository.findById(entity.getId());
    if (optionalEmployee.isPresent()) {
      Employee employee = optionalEmployee.get();
      Address addressPrev = employee.getIdAddress();
      Address addressNew = entity.getIdAddress();

      addressPrev.setCommune(addressNew.getCommune());
      addressPrev.setDistrict(addressNew.getDistrict());
      addressPrev.setCity(addressNew.getCity());
      employee.setFullName(entity.getFullName());

      if (entity.getIdDepartment() != null) {

        Optional<Department> optionalDepartment = iDepartmentRepository
          .findById(entity.getIdDepartment().getId());
        if (optionalDepartment.isPresent()) {
          employee.setIdDepartment(optionalDepartment.get());
        }
      }

      employee = iEmployeeRepository.save(employee);
      EmployeeDto result = employeeConverter.toDto(employee);
      return result;
    }
    return null;
  }

  @Override
  public Long count(EmployeeFilter filter) {
    return iEmployeeRepository.count(genericEmployeeSpecification.generic(filter));
  }
}
