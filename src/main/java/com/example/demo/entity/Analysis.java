package com.example.demo.entity;

import lombok.Data;

@Data
public class Analysis {
    long id;
    String contentId;
    String sentimentScore;
    String sentimentLabel;

}
