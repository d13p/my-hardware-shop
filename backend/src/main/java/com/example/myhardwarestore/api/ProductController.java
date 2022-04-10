package com.example.myhardwarestore.api;

import com.example.myhardwarestore.service.ProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/products")
public class ProductController {

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    private final ProductService productService;

    @Tag(name = "products", description = "gets the list of products")
    @GetMapping
    public Page<ProductResponse> getProducts() {
        return productService.getProducts().map(ProductResponse::fromDomain);
    }

}
