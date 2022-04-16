package com.example.myhardwarestore.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Implements unique id generation.
 */
@Service
public class IdService {

    public String next() {
        return UUID.randomUUID().toString();
    }

}
