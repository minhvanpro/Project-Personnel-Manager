package com.minhvan.personnel.converter;

import com.minhvan.personnel.dtos.AddressDto;
import com.minhvan.personnel.entities.Address;
import com.minhvan.personnel.form.AddressForm;
import org.springframework.stereotype.Component;

@Component
public class AddressConverter {
  public Address toEntity(AddressDto dto) {
    Address entity = new Address();
    entity.setId(dto.getId());
    entity.setCommune(dto.getCommune());
    entity.setDistrict(dto.getDistrict());
    entity.setCity(dto.getCity());
    return entity;
  }

  public Address toEntity(AddressForm addressForm){
    Address entity = new Address();
    entity.setId(addressForm.getId());
    entity.setCommune(addressForm.getCommune());
    entity.setDistrict(addressForm.getDistrict());
    entity.setCity(addressForm.getCity());
    return entity;
  }

  public AddressDto toDto(Address entity) {
    AddressDto dto = new AddressDto();
    dto.setId(entity.getId());
    dto.setCommune(entity.getCommune());
    dto.setDistrict(entity.getDistrict());
    dto.setCity(entity.getCity());
    return dto;
  }
}
