package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Analysis;
import com.example.demo.mapper.AnalysisMapper;
import com.example.demo.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AnalysisServiceImpl extends ServiceImpl<AnalysisMapper, Analysis> implements AnalysisService {
    @Autowired
    private AnalysisMapper analysisMapper;

    @Override
    public Analysis getById(Long id) {
        return analysisMapper.selectById(id);
    }

    @Override
    public boolean save(Analysis analysis) {
        return analysisMapper.insert(analysis) > 0;
    }

    @Override
    public boolean updateById(Analysis analysis) {
        return analysisMapper.updateById(analysis) > 0;
    }

    @Override
    public boolean removeById(Long id) {
        return analysisMapper.deleteById(id) > 0;
    }

    @Override
    public List<Analysis> getAllAnalysis(){
        return analysisMapper.selectList(null);
    }
}
