package com.example.myhardwarestore.api.cart;

import com.example.myhardwarestore.api.product.ProductResponse;

public class CartItemResponse {
    private final String id;
    private final ProductResponse product;
    private final int quantity;

    public CartItemResponse(String id, ProductResponse product, int quantity) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
    }

    public String getId() {
        return id;
    }

    public ProductResponse getProduct() {
        return product;
    }

    public int getQuantity() {
        return quantity;
    }
}
