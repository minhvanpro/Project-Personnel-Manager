package com.minhvan.personnel.specification.impl;

import com.minhvan.personnel.specification.ISpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class GenericSpecification<T> implements ISpecification<T> {
  @Override
  public Specification<T> like(String key, String value) {
    if (!StringUtils.hasText(value)) return null;
    return ((root, query, criteriaBuilder) -> criteriaBuilder
                                              .like(
                                                criteriaBuilder.lower(root.get(key)),
                                                value.toLowerCase()
                                              ));
  }

  @Override
  public Specification<T> equal(String key, Object value) {
    if (value==null) return null;
    return (((root, query, criteriaBuilder) -> criteriaBuilder
                                                .equal(
                                                  root.get(key),
                                                  value
                                                )));
  }

  @Override
  public Specification<T> equalIgnoreCase(String key, String value) {
    if (!StringUtils.hasText(value)) return null;
    return ((root, query, criteriaBuilder) -> criteriaBuilder
                                                .equal(
                                                  criteriaBuilder.lower(root.get(key)),
                                                  value.toLowerCase()
                                                ));
  }
}
