package com.example.demo.entity;

import lombok.Data;

@Data
public class Student {
    int id;
    String name;
    String sex;

    public Student(int id, String name, String sex) {
        this.id = id;
        this.name = name;
        this.sex = sex;
    }
}
