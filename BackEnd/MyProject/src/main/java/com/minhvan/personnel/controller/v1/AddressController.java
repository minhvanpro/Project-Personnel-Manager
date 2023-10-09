package com.minhvan.personnel.controller.v1;

import com.minhvan.personnel.common.FunctionCommon;
import com.minhvan.personnel.entities.Address;
import com.minhvan.personnel.services.IAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/address")
public class AddressController {
  @Autowired
  private IAddressService iAddressService;

  @PostMapping
  public ResponseEntity<?> create(@RequestBody Address address) {
    try {
      return ResponseEntity.ok(
        FunctionCommon.getResponseEntity(
          HttpStatus.OK.value(),
          iAddressService.create(address),
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
}
