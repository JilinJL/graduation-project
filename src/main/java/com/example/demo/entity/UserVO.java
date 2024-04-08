package com.example.demo.entity;

import lombok.Data;

@Data
public class UserVO {
    private String token;
    private long id;
    private String username;
    private String email;
}
