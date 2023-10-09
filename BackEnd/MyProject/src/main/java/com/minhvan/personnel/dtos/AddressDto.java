package com.minhvan.personnel.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddressDto {
  private Long id;

  private String commune;

  private String district;

  private String city;
}
