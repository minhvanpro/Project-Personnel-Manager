package com.minhvan.personnel.services;

import com.minhvan.personnel.dtos.AddressDto;
import com.minhvan.personnel.entities.Address;

public interface IAddressService {
  AddressDto create(Address entity);
}
