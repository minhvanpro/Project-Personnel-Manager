package com.minhvan.personnel.controller.v1;

import com.minhvan.personnel.common.FunctionCommon;
import com.minhvan.personnel.dtos.DepartmentDto;
import com.minhvan.personnel.entities.Department;
import com.minhvan.personnel.services.IDepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("DepartmentController/v1")
@RequestMapping("/api/department")
public class DepartmentController {
  @Autowired
  private IDepartmentService iDepartmentService;

  @PostMapping
  public ResponseEntity<?> create(@RequestBody Department department) {
    try {
      return ResponseEntity.ok(
        FunctionCommon.getResponseEntity(
          HttpStatus.OK.value(),
          iDepartmentService.create(department),
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
  public ResponseEntity<?> update(@RequestBody Department department) {
    try {
      return ResponseEntity.ok(
        FunctionCommon.getResponseEntity(
          HttpStatus.OK.value(),
          iDepartmentService.update(department),
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
    List<DepartmentDto> listDto = iDepartmentService.getAll();
    return ResponseEntity.ok(
      FunctionCommon.getResponseEntity(
        HttpStatus.OK.value(),
        listDto,
        true
      )
    );
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Long> deleteDepartment(@PathVariable Long id) {
    boolean isRemoved = iDepartmentService.removeById(id);
    if (!isRemoved) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(id, HttpStatus.OK);
  }
}
