package com.example.myhardwarestore.api.cart;

import com.example.myhardwarestore.api.product.ProductResponse;
import com.example.myhardwarestore.domain.CartItem;
import com.example.myhardwarestore.domain.Product;
import com.example.myhardwarestore.service.CartService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Validated
@RequestMapping("api/v1/cart")
public class CartController {

    public CartController(CartService productService) {
        this.cartService = productService;
    }

    private final CartService cartService;

    @GetMapping
    @Tag(name = "get cart details")
    public CartResponse getCart() {
        List<CartItem> cartItems = cartService.getCart();
        return new CartResponse(cartItems.stream()
                .map(e -> {
                    Product product = e.getProduct();
                    ProductResponse productResponse = new ProductResponse(
                            product.getId(), product.getName(), product.getDescription(), product.getPrice());
                    return new CartItemResponse(e.getId(), productResponse, e.getQuantity());
                })
                .collect(Collectors.toList()));
    }

    @PostMapping("/items")
    @Tag(name = "add item to cart")
    public AddCartItemResponse addItem(@RequestBody @Valid AddCartItemRequest request) {
        CartItem cartItem = cartService.addItem(request.getProductId(), request.getQuantity());
        return new AddCartItemResponse(cartItem.getId());
    }

    @DeleteMapping("/items/{itemId}")
    @Tag(name = "delete item from cart")
    public void deleteItem(@PathVariable String itemId) {
        cartService.deleteItem(itemId);
    }

    @PutMapping("/items/{itemId}")
    @Tag(name = "update an existing cart item")
    public void updateItem(@PathVariable String itemId, @RequestBody @Valid UpdateCartItemRequest request) {
        cartService.updateItem(itemId, request.getQuantity());
    }

}
