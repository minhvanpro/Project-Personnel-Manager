package com.minhvan.personnel.repositories;

import com.minhvan.personnel.entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAddressRepository extends JpaRepository<Address, Long> {
}
