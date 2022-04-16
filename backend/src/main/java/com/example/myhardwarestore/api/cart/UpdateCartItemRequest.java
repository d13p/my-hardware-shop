package com.example.myhardwarestore.api.cart;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

public class UpdateCartItemRequest {

    @Min(value = 1, message = "quantity must be at least 1")
    @Max(value = 100, message = "quantity must be at max 100")
    private int quantity;

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
