package com.example.demo.entity;

import lombok.Data;

import java.util.Date;
@Data
public class ContentDTO {

    private long userId;
    private String contentTime;
    private String contentTitle;
    private String contentData;
    private String type;
}
