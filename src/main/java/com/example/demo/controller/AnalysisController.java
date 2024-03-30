package com.example.demo.controller;


import com.example.demo.entity.Analysis;
import com.example.demo.entity.Student;
import com.example.demo.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analysis")
//@Controller
public class AnalysisController {

    @Autowired
    private AnalysisService analysisService;

    @ResponseBody
    @GetMapping("/getAnalysis")
    public List<Analysis> getAnalysis(String user_id) {
        return analysisService.getAllAnalysis();
    }

    @ResponseBody
    @PostMapping("/addAnalysis")
    public boolean addAnalysis(Analysis analysis){
        return analysisService.save(analysis);
    }

    @ResponseBody
    @GetMapping("/Index")
    public Student Index(){
        return new Student(1,"小明","男");
    }

}
