package com.mahendra.survey.controller;

import com.mahendra.survey.dto.AuthResponse;
import com.mahendra.survey.entity.Admin;
import com.mahendra.survey.security.TokenProvider;
import com.mahendra.survey.service.AdminService;
import com.mahendra.survey.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired AuthService authService;
    @Autowired AdminService adminService;
    // validates admin login
    @PostMapping("/login")
    public AuthResponse verifyAdminLogin(@RequestBody Admin admin) {
        try {
            String token = authService.authenticateAndGetToken(admin.getEmail(), admin.getPassword());
            Admin adminUser = adminService.getUserByEmail(admin.getEmail()).get();
            return new AuthResponse(token, adminUser.getEmail(), adminUser.getFirstName(), adminUser.getLastName(),
                    adminUser.getId(), adminUser.getIsPrimaryAdmin());
        }catch (Exception ex){
            return new AuthResponse("Error", null, null, null, null, null);
        }
    }


}
