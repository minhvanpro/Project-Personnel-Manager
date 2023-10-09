package com.minhvan.personnel.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddressForm {
  private Long id;

  private String commune;

  private String district;

  private String city;
}
