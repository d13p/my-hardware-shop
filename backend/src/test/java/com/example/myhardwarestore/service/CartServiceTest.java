package com.example.myhardwarestore.service;

import com.example.myhardwarestore.domain.CartItem;
import com.example.myhardwarestore.domain.Product;
import com.example.myhardwarestore.repository.CartRepository;
import com.example.myhardwarestore.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.AdditionalAnswers;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

class CartServiceTest {

    private CartService cartService;

    @Mock
    private CartRepository cartRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private UserService userService;

    @Mock
    private IdService idService;

    @Mock
    private Authentication authentication;

    @BeforeEach
    public void beforeEach() {
        MockitoAnnotations.openMocks(this);
        when(userService.getCurrentUser()).thenReturn(authentication);
        when(idService.next()).thenCallRealMethod();

        cartService = new CartService(cartRepository, productRepository, userService, idService);
    }

    @Test
    void getCart_returnTheCartDetails() {
        setCurrentUser("user 1");
        when(cartRepository.findByCartId("user 1")).thenReturn(List.of(
                createCartItem("item 1", "product 1", 1, "user 1"),
                createCartItem("item 2", "product 2", 2, "user 1")));
        when(cartRepository.findByCartId("anotherUser")).thenReturn(List.of(
                createCartItem("item 3", "product 3", 3, "anotherUser")));

        List<CartItem> actual = cartService.getCart();

        assertEquals(2, actual.size());
    }

    @Test
    void getCart_returnAnEmptyCart_whenUserIdUnknown() {
        when(cartRepository.findByCartId("user 1"))
                .thenReturn(List.of(createCartItem("item 1", "product 1", 1, "user 1")));
        setCurrentUser("who is this?");

        List<CartItem> actual = cartService.getCart();

        assertEquals(0, actual.size());
    }

    @Test
    void addItem_callRepositoryToSave() {
        setCurrentUser("user 1");
        verifyNoInteractions(cartRepository);
        when(idService.next()).thenReturn("item 1");
        when(productRepository.findById("product 1")).thenReturn(Optional.of(createProduct("product 1")));
        when(cartRepository.save(argThat(arg -> "item 1".equals(arg.getId())
                && "product 1".equals(arg.getProduct().getId())
                && arg.getQuantity() == 3
                && "user 1".equals(arg.getCartId())))
        ).thenReturn(createCartItem("item 1", "product 1", 3, "user 1"));

        CartItem actual = cartService.addItem("product 1", 3);

        assertNotNull(actual);
        assertEquals("item 1", actual.getId());
        assertEquals("product 1", actual.getProduct().getId());
        assertEquals(3, actual.getQuantity());
        assertEquals("user 1", actual.getCartId());
    }

    private Product createProduct(String id) {
        Product product = new Product();
        product.setId(id);
        return product;
    }

    @Test
    void deleteItem_callRepositoryToDelete() {
        setCurrentUser("user 1");
        when(cartRepository.deleteByIdAndCartId("item 1", "user 1")).thenReturn(1);
        verifyNoInteractions(cartRepository);

        cartService.deleteItem("item 1");

        verify(cartRepository).deleteByIdAndCartId("item 1", "user 1");
    }

    @Test
    void deleteItem_throwError_whenItemDoesNotBelongToUser() {
        setCurrentUser("user 2");
        when(cartRepository.deleteByIdAndCartId("item 1", "user 1")).thenReturn(1);
        verifyNoInteractions(cartRepository);

        assertThrows(IllegalArgumentException.class, () -> cartService.deleteItem("item 1"));
    }

    @Test
    void updateItem_callRepositoryToUpdate() {
        setCurrentUser("user 1");
        verifyNoInteractions(cartRepository);
        when(cartRepository.findByIdAndCartId("item 1", "user 1"))
                .thenReturn(Optional.of(createCartItem("item 1", "product 1", 1, "user 1")));
        when(cartRepository.save(
                argThat(arg -> "item 1".equals(arg.getId())
                        && 10 == arg.getQuantity()
                        && "user 1".equals(arg.getCartId()))
        )).thenAnswer(AdditionalAnswers.returnsFirstArg());

        CartItem updatedItem = cartService.updateItem("item 1", 10);

        verify(cartRepository).findByIdAndCartId("item 1", "user 1");
        verify(cartRepository).save(any());
        assertNotNull(updatedItem);
        assertEquals(10, updatedItem.getQuantity());
    }

    @Test
    void updateItem_throwError_whenItemDoesNotBelongToUser() {
        setCurrentUser("user 2");
        verifyNoInteractions(cartRepository);
        when(cartRepository.findByIdAndCartId("item 1", "user 1"))
                .thenReturn(Optional.of(createCartItem("item 1", "product 1", 1, "user 1")));

        assertThrows(IllegalArgumentException.class, () -> cartService.updateItem("item 1", 10));
    }

    private CartItem createCartItem(String id, String productId, int quantity, String userId) {
        CartItem item = new CartItem();
        item.setId(id);
        item.setProduct(createProduct(productId));
        item.setQuantity(quantity);
        item.setCartId(userId);
        return item;
    }

    private void setCurrentUser(String userId) {
        when(authentication.getName()).thenReturn(userId);
    }
}