package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Analysis;
import com.example.demo.entity.DetailVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AnalysisService extends IService<Analysis> {

    boolean save(Analysis analysis);
    boolean updateById(Analysis analysis);
    boolean removeById(Long id);

    List<Analysis> getAllAnalysis();

    List<Analysis> selectByUserId(Long id);

    DetailVO getAnalysisById(Long id);
}
