package com.example.myhardwarestore.repository;


import com.example.myhardwarestore.domain.Product;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProductRepository extends PagingAndSortingRepository<Product, String> {
}
