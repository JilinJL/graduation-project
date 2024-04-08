package com.example.demo.entity;

import lombok.Data;

import java.util.Date;

@Data
public class DetailVO {
    long id;
    long userId;
    String contentData;
    String contentTime;
    String contentTitle;
    String analysisScore;
    String analysisLabel;
    String analysisResult;
}
