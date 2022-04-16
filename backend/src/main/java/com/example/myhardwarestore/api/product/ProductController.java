package com.example.myhardwarestore.api.product;

import com.example.myhardwarestore.service.ProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/products")
public class ProductController {

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    private final ProductService productService;

    @Tag(name = "get product list")
    @GetMapping
    public Page<ProductResponse> getProducts() {
        return productService.getProducts().map(e -> new ProductResponse(
                e.getId(),
                e.getName(),
                e.getDescription(),
                e.getPrice()
        ));
    }

}
