package com.example.myhardwarestore.api.product;

public class ProductResponse {

    private final String id;
    private final String name;
    private final String description;
    private final Double price;

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Double getPrice() {
        return price;
    }

    public ProductResponse(String id, String name, String description, Double price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }
}
