package com.example.authservice.repository;

import org.springframework.stereotype.Repository;
import com.example.authservice.model.User; // imports user from model
import org.springframework.data.jpa.repository.JpaRepository; // imports Jparepo which allows us to save findBtId and Delete without writing SQL
import java.util.Optional; // imports optional which is a container used to handle null values
/**
 * Repository interface for User entity.
 * Provides database operations such as finding a user by email.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
