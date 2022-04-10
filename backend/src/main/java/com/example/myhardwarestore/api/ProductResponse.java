package com.example.myhardwarestore.api;

import com.example.myhardwarestore.domain.Product;

import java.util.List;

public class ProductResponse {

    private String name;
    private String description;
    private Double price;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Double getPrice() {
        return price;
    }

    public ProductResponse(String name, String description, Double price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public static ProductResponse fromDomain(Product domain) {
        return new ProductResponse(
                domain.getName(),
                domain.getDescription(),
                domain.getPrice()
        );
    }

}
