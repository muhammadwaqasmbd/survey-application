package com.mahendra.survey.dto;

public record AuthResponse(String accessToken, String email, String firstName, String lastName,
                           Long id, Short isPrimaryAdmin ) {
}

