package com.minhvan.personnel.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "manager_employee")
@Getter
@Setter
@NoArgsConstructor
public class Employee {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String fullName;

  @OneToOne(cascade = {CascadeType.ALL})
  private Address idAddress;

  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  private Department idDepartment;

  @ManyToMany(mappedBy = "employees", cascade = {CascadeType.ALL})
  private List<Project> projects = new ArrayList<>();
}
