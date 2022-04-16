package com.example.myhardwarestore.service;

import com.example.myhardwarestore.domain.Product;
import com.example.myhardwarestore.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Arrays;

/**
 * Implements product-related operations.
 */
@Service
public class ProductService {

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    private final ProductRepository productRepository;

    public Page<Product> getProducts() {
        return productRepository.findAll(Pageable.unpaged());
    }

    @PostConstruct
    public void postConstruct() {
        System.out.println("creating mock data ...");
        productRepository.saveAll(Arrays.asList(
                createProduct("Product A", "Some thing about A", 10D),
                createProduct("Product B", "Some thing about B", 20D),
                createProduct("Product C", "Some thing about C", 30D)
        ));
    }

    private Product createProduct(String name, String description, Double price) {
        Product product = new Product();
        product.setId(name.replaceAll(" ", "_"));
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        return product;
    }

}
