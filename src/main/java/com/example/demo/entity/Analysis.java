package com.example.demo.entity;

import lombok.Data;

@Data
public class Analysis {
    int id;
    int contentId;
    long userId;
    String sentimentScore;
    String sentimentLabel;
    String title;
}
