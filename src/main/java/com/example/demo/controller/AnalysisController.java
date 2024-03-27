package com.example.demo.controller;


import com.example.demo.entity.Analysis;
import com.example.demo.entity.Student;
import com.example.demo.service.AnalysisService;
import com.example.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/analysis")
//@Controller
public class AnalysisController {

    @Autowired
    private AnalysisService analysisService;

    @ResponseBody
    @GetMapping("/getAll")
    public List<Analysis> getAllStudents() {
        return analysisService.getAllAnalysis();
    }

    @ResponseBody
    @GetMapping("/Home")
    public Student Home(){
        return new Student(1,"小红","男");
    }

    @ResponseBody
    @GetMapping("/Index")
    public Student Index(){
        return new Student(1,"小明","男");
    }

}
