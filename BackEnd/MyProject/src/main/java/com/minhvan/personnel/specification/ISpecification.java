package com.minhvan.personnel.specification;

import org.springframework.data.jpa.domain.Specification;

public interface ISpecification<T> {
  Specification<T> like(String key, String value);
  Specification<T> equal(String key, Object value);
  Specification<T> equalIgnoreCase(String key, String value);

}
