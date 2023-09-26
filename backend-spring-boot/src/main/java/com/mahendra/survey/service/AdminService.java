package com.mahendra.survey.service;

import com.mahendra.survey.dao.AdminRepository;
import com.mahendra.survey.entity.Admin;
import com.mahendra.survey.entity.SurveyHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class AdminService {
  @Autowired
  AdminRepository adminRepository;

  public Admin addAdmin(Admin admin) {
    Admin addedAdmin = adminRepository.save(admin);
    return addedAdmin;
  }

  public List<Admin> getAllAdmins(){
    List<Admin> admins = adminRepository.findAll();
    return admins;
  }
  public void deleteAdmin(Long id) {
    Optional<Admin> adminOptional = adminRepository.findById(id);
    if (adminOptional.isPresent()) {
      Admin admin = adminOptional.get();
      adminRepository.delete(admin);
    }
  }

  public Admin getAdmin(Long id) {
    Optional<Admin> admin = adminRepository.findById(id);
    return admin.get();
  }
}
