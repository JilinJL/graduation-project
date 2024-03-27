package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Analysis;
import com.example.demo.entity.Analysis;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AnalysisService extends IService<Analysis> {
    Analysis getById(Long id);
    boolean save(Analysis analysis);
    boolean updateById(Analysis analysis);
    boolean removeById(Long id);

    List<Analysis> getAllAnalysis();
}
