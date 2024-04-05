package com.example.demo.entity;

import lombok.Data;

@Data
public class User {

  private long id;
  private String username;
  private String password;
  private String email;
  private String token;

}
