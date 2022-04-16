package com.example.myhardwarestore.repository;

import com.example.myhardwarestore.domain.CartItem;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends CrudRepository<CartItem, String> {
    List<CartItem> findByCartId(String userId);

    @Query("delete from CartItem i where i.id = :id and i.cartId = :cartId")
    @Modifying
    int deleteByIdAndCartId(String id, String cartId);

    Optional<CartItem> findByIdAndCartId(String id, String cartId);
}
