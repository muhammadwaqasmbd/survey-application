package com.mahendra.survey.dao;

import com.mahendra.survey.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin
public interface AdminRepository extends JpaRepository<Admin, Long> {
  public Admin findByEmail(String email);
  Optional<Admin> getUserByEmail(String username);
}
