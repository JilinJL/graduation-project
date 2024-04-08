package com.example.demo.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Content {

  private long id;
  private long userId;
  private String contentData;
  private  Date contentTime;
  private String contentTitle;

}
