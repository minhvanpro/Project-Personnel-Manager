package com.minhvan.personnel.controller.v1;

import com.minhvan.personnel.common.FunctionCommon;
import com.minhvan.personnel.dtos.EmployeeDto;
import com.minhvan.personnel.entities.Employee;
import com.minhvan.personnel.services.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
  @Autowired
  private IEmployeeService iEmployeeService;

  @PostMapping
  public ResponseEntity<?> create(@RequestBody Employee employee) {
    try {
      return ResponseEntity.ok(
        FunctionCommon.getResponseEntity(
          HttpStatus.OK.value(),
          iEmployeeService.create(employee),
          true
        )
      );
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(
        FunctionCommon.getResponseEntity(
          HttpStatus.INTERNAL_SERVER_ERROR.value(),
          "Add failed data",
          false
        )
      );
    }
  }

  @PutMapping
  public ResponseEntity<?> update(@RequestBody Employee employee) {
    try {
      return ResponseEntity.ok(
        FunctionCommon.getResponseEntity(
          HttpStatus.OK.value(),
          iEmployeeService.update(employee),
          true
        )
      );
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(
        FunctionCommon.getResponseEntity(
          HttpStatus.INTERNAL_SERVER_ERROR.value(),
          "Update failed data",
          false
        )
      );
    }
  }

  @GetMapping("/get/all")
  public ResponseEntity<?> getAll() {
    List<EmployeeDto> listDto = iEmployeeService.getAll();
    return ResponseEntity.ok(
      FunctionCommon.getResponseEntity(
        HttpStatus.OK.value(),
        listDto,
        true
      )
    );
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Long> deleteEmployee(@PathVariable Long id) {
    boolean isRemoved = iEmployeeService.removeById(id);
    if (!isRemoved) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(id, HttpStatus.OK);
  }
}
