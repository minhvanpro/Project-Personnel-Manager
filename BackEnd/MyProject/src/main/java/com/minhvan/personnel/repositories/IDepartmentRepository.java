package com.minhvan.personnel.repositories;

import com.minhvan.personnel.entities.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IDepartmentRepository extends JpaRepository<Department, Long>, JpaSpecificationExecutor<Department> {
}
