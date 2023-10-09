package com.minhvan.personnel.controller.v1;

import com.minhvan.personnel.common.FunctionCommon;
import com.minhvan.personnel.dtos.ProjectDto;
import com.minhvan.personnel.entities.Project;
import com.minhvan.personnel.services.IProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
  @Autowired
  private IProjectService iProjectService;

  @PostMapping
  public ResponseEntity<?> create(@RequestBody Project project) {
    try {
      return ResponseEntity.ok(
        FunctionCommon.getResponseEntity(
          HttpStatus.OK.value(),
          iProjectService.create(project),
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
  public ResponseEntity<?> update(@RequestBody Project project) {
    try {
      return ResponseEntity.ok(
        FunctionCommon.getResponseEntity(
          HttpStatus.OK.value(),
          iProjectService.update(project),
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
    List<ProjectDto> listDto = iProjectService.getAll();
    return ResponseEntity.ok(
      FunctionCommon.getResponseEntity(
        HttpStatus.OK.value(),
        listDto,
        true
      )
    );
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Long> deleteProject(@PathVariable Long id) {
    boolean isRemoved = iProjectService.removeById(id);
    if (!isRemoved) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(id, HttpStatus.OK);
  }

}
