package com.example.authservice.controller;

import com.example.authservice.model.User;
import com.example.authservice.service.AuthService;
import org.springframework.web.bind.annotation.*;
// import org.springframework.http.ResponseEntity;

/**
 * Controller for authentication endpoints.
 * Handles user registration and login requests.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Registers a new user.
     */
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        return authService.registerUser(user);
    }

    /**
     * Logs in a user and returns a JWT token if credentials are valid.
     */
    @PostMapping("/login")
    public String loginUser(@RequestParam String email, @RequestParam String password) {
        return authService.loginUser(email, password);
    }
}
