package com.minhvan.personnel.services.impl;

import com.minhvan.personnel.converter.AddressConverter;
import com.minhvan.personnel.dtos.AddressDto;
import com.minhvan.personnel.entities.Address;
import com.minhvan.personnel.repositories.IAddressRepository;
import com.minhvan.personnel.services.IAddressService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AddressService implements IAddressService {
  @Autowired
  private IAddressRepository iAddressRepository;

  @Autowired
  private AddressConverter addressConverter;

  @Override
  public AddressDto create(Address entity) {
    entity = iAddressRepository.save(entity);
    AddressDto result = addressConverter.toDto(entity);
    return result;
  }
}
