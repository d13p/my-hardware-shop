package com.example.myhardwarestore.api.cart;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class AddCartItemRequest {

    @NotNull
    private String productId;

    @Min(value = 1, message = "quantity must be at least 1")
    @Max(value = 100, message = "quantity must be at max 100")
    private int quantity;

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
