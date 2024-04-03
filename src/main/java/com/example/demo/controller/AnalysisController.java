package com.example.demo.controller;


import com.example.demo.entity.Analysis;
import com.example.demo.entity.Student;
import com.example.demo.service.AnalysisService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/analysis")
@Api(tags="分析记录管理")
//@Controller
public class AnalysisController {

    @Autowired
    private AnalysisService analysisService;

    @ResponseBody
    @GetMapping("/getAnalysisByUserId")
    @ApiOperation("根据userId拿到分析记录")
    public List<Analysis> getAnalysis(Long id) {
        log.info("参数:{}",id);
        List<Analysis> analysisList = analysisService.selectByUserId(id);
        return analysisList;
    }

    @ResponseBody
    @PostMapping("/addAnalysis")
    @ApiOperation("新建分析")
    public boolean addAnalysis(Analysis analysis){
        return analysisService.save(analysis);
    }

    @ResponseBody
    @GetMapping("/Index")
    public Student Index(){
        return new Student(1,"小明","男");
    }

}
