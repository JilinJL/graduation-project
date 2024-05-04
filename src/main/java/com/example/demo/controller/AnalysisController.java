package com.example.demo.controller;


import com.example.demo.common.Auth;
import com.example.demo.common.R;
import com.example.demo.common.ResponseEnum;
import com.example.demo.entity.Analysis;
import com.example.demo.entity.DetailVO;
import com.example.demo.entity.Student;
import com.example.demo.service.AnalysisService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
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

    @Auth
    @ResponseBody
    @GetMapping("/getAnalysisById")
    @ApiOperation("根据id拿到分析详情")
    public R<DetailVO> getAnalysis(Long id) throws Exception {

        DetailVO a = analysisService.getAnalysisById(id);
        if(a != null){
            return R.ok(a);
        }
        return R.error(ResponseEnum.FAIL);
    }


    @ResponseBody
    @PostMapping("/addAnalysis")
    @ApiOperation("新建分析")
    public boolean addAnalysis(Analysis analysis){
        return analysisService.save(analysis);
    }

}
