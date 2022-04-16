package com.example.myhardwarestore.service;

import com.example.myhardwarestore.domain.CartItem;
import com.example.myhardwarestore.domain.Product;
import com.example.myhardwarestore.repository.CartRepository;
import com.example.myhardwarestore.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Implements shopping cart related operations, such as retrieve/add/delete/update cart items.
 */
@Service
public class CartService {

    public CartService(CartRepository cartRepository, ProductRepository productRepository, UserService userService, IdService idService) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userService = userService;
        this.idService = idService;
    }

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserService userService;
    private final IdService idService;

    @Transactional(readOnly = true)
    public List<CartItem> getCart() {
        return cartRepository.findByCartId(getCartId());
    }

    @Transactional
    public CartItem addItem(String productId, int quantity) {
        Optional<Product> productOpt = productRepository.findById(productId);
        Product product = productOpt.orElseThrow(() ->
                new IllegalArgumentException(String.format("Product id '%s' not found", productId)));
        CartItem newItem = new CartItem();
        newItem.setId(idService.next());
        newItem.setProduct(product);
        newItem.setQuantity(quantity);
        newItem.setCartId(getCartId());
        return cartRepository.save(newItem);
    }

    @Transactional
    public void deleteItem(String itemId) {
        int delCount = cartRepository.deleteByIdAndCartId(itemId, getCartId());
        if (delCount == 0) {
            throw itemNotFoundException(itemId);
        }
    }

    @Transactional
    public CartItem updateItem(String itemId, int quantity) {
        Optional<CartItem> itemOpt = cartRepository.findByIdAndCartId(itemId, getCartId());
        CartItem item = itemOpt.orElseThrow(() -> itemNotFoundException(itemId));
        item.setQuantity(quantity);
        return cartRepository.save(item);
    }

    /**
     * @return the cart id associated with the current user.
     */
    private String getCartId() {
        return userService.getCurrentUser().getName();
    }

    private static IllegalArgumentException itemNotFoundException(String itemId) {
        return new IllegalArgumentException(String.format("Cart item '%s' not found", itemId));
    }

}
