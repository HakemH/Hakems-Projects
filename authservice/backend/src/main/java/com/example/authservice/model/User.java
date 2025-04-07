package com.example.authservice.model;

import jakarta.persistence.*; // includes the JPA used for definging how class maps to a db
import lombok.*;


/**
 * User entity representing a registered user in the authentication system.
 * This class defines user attributes like email, password, and role.
 */

@Entity // marks this class as a JPA entity  meaning it will be mapped to a db table
@Getter // generates getter methods for all fields compile time 
@Setter // generates setter methods for all fields at complile time
@NoArgsConstructor // generates a no argument constructor 
@AllArgsConstructor // generates a constructor with all fields as parameters
@Table(name = "users") // specifies a db table name as "users"
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role = "USER"; // Default role

    private String mfaSecret; // Optional for Multi-Factor Authentication
}