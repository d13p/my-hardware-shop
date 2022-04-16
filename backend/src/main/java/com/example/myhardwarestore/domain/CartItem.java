package com.example.myhardwarestore.domain;

import javax.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    private String id;

    private String cartId;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;

    @Override
    public String toString() {
        return "CartItem{" +
                "id=" + id +
                ", userId=" + cartId +
                ", product=" + product +
                ", productId=" + product.getId() +
                ", quantity=" + quantity +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCartId() {
        return cartId;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
