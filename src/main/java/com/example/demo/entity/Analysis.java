package com.example.demo.entity;

import lombok.Data;

@Data
public class Analysis {
    long id;
    long userId;
    String analysisScore;
    String analysisLabel;
    String analysisTitle;
    String analysisResult;
}
