package com.example.demo.entity;

import lombok.Data;

@Data
public class Analysis {
    int id;
    int contentId;
    long userId;
    String analysisScore;
    String analysisLabel;
    String analysisTitle;
    String analysisResult;
}
