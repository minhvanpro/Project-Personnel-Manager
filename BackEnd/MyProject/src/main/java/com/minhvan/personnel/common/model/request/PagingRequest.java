package com.minhvan.personnel.common.model.request;

import com.minhvan.personnel.common.pageable.Sorter;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PagingRequest {
  private Integer page;

  private Integer limit;

  private Sorter sorter;
}
