package com.example.financial.service.impl;

import com.example.financial.entity.User;
import com.example.financial.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        if ("google".equalsIgnoreCase(user.getLoginType())) {
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    "",
                    new ArrayList<>()
            );
        } else if ("facebook".equalsIgnoreCase(user.getLoginType())) {
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    "",
                    new ArrayList<>()
            );
        }

        else {
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword(),
                    new ArrayList<>()
            );
        }

    }
}
