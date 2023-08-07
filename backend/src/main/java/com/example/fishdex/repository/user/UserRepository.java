package com.example.fishdex.repository.user;

import com.example.fishdex.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
