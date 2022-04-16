package com.example.myhardwarestore.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * Implements users related operations.
 */
@Service
public class UserService {

    /**
     * @return the current logged-in user, or an anonymous account for guest user.
     */
    public Authentication getCurrentUser() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

}
