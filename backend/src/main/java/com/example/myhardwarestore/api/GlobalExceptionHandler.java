package com.example.myhardwarestore.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(value = {IllegalArgumentException.class, MethodArgumentNotValidException.class})
    public ResponseEntity<Object> handleIllegalArgumentException(Exception ex, HttpServletRequest req) {
        log.error("Error handling request: {}, exception: {}", req.getRequestURI(), ex.getClass().getName());
        return ResponseEntity.badRequest().body(Map.of("errorMessage", ex.getMessage()));
    }

}
