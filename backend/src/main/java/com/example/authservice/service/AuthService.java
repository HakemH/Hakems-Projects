package com.example.authservice.service;

import com.example.authservice.model.User;
import com.example.authservice.repository.UserRepository;
import com.example.authservice.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service layer for authentication-related operations.
 * Handles user registration and login logic.
 */
@Service
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder; // Injected from SecurityConfig
        this.jwtUtil = jwtUtil;
    }
    

    /**
     * Registers a new user with an encrypted password.
     */
    public String registerUser(String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            return "User already exists!";
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // Encrypt password
        user.setRole("USER"); // Default role to prevent role manipulation

        userRepository.save(user);
        return "User registered successfully!";
        /* System.out.println("Stored password: " + userOptional.get().getPassword());*/

    }

    /**
     * Authenticates a user and generates a JWT token if valid.
     */
    public String loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent() && passwordEncoder.matches(password, userOptional.get().getPassword())) {
            return jwtUtil.generateToken(email);
        }
        return "Invalid credentials!";
    }
}
