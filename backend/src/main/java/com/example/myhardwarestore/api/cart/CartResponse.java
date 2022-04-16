package com.example.myhardwarestore.api.cart;

import java.util.List;

public class CartResponse {
    private final List<CartItemResponse> items;

    public CartResponse(List<CartItemResponse> items) {
        this.items = items;
    }

    public List<CartItemResponse> getItems() {
        return items;
    }

}
