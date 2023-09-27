package com.mahendra.survey.security;

import com.mahendra.survey.entity.Admin;
import com.mahendra.survey.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final AdminService adminService;
    public static final String ADMIN = "ADMIN";
    public static final String USER = "USER";

    @Override
    public UserDetails loadUserByUsername(String email) {
        Admin admin = adminService.getUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username %s not found", email)));
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(admin.getIsPrimaryAdmin() == 1 ? ADMIN : USER));
        return mapUserToCustomUserDetails(admin, authorities);
    }

    private CustomUserDetails mapUserToCustomUserDetails(Admin admin, List<SimpleGrantedAuthority> authorities) {
        CustomUserDetails customUserDetails = new CustomUserDetails();
        customUserDetails.setId(admin.getId());
        customUserDetails.setUsername(admin.getEmail());
        customUserDetails.setPassword(admin.getPassword());
        customUserDetails.setFirstName(admin.getFirstName());
        customUserDetails.setLastName(admin.getLastName());
        customUserDetails.setEmail(admin.getEmail());
        customUserDetails.setAuthorities(authorities);
        return customUserDetails;
    }
}
