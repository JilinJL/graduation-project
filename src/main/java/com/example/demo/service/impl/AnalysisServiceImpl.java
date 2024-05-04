package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Analysis;
import com.example.demo.entity.Content;
import com.example.demo.entity.DetailVO;
import com.example.demo.mapper.AnalysisMapper;
import com.example.demo.mapper.ContentMapper;
import com.example.demo.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Service
public class AnalysisServiceImpl extends ServiceImpl<AnalysisMapper, Analysis> implements AnalysisService {
    @Autowired
    private AnalysisMapper analysisMapper;
    @Autowired
    private ContentMapper contentMapper;

    @Override
    public List<Analysis> selectByUserId(Long id) {
        List<Analysis> analysisList = lambdaQuery()
                .like(Analysis::getUserId, id)
                .list();
        return analysisList;
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

    @Override
    public DetailVO getAnalysisById(Long id) {
        Analysis analysis = analysisMapper.selectById(id); // 从数据库中获取 Analysis 实体
        if (analysis == null) {
            return null; // 如果没有找到对应的分析，则返回null或者抛出异常
        }

        Content content = contentMapper.selectById(analysis.getId()); // 通过Analysis中的Id获取对应的Content实体

        DetailVO detailVO = new DetailVO();
        detailVO.setId(analysis.getId());
        detailVO.setUserId(analysis.getUserId());
        detailVO.setAnalysisScore(analysis.getAnalysisScore());
        detailVO.setAnalysisLabel(analysis.getAnalysisLabel());
        detailVO.setAnalysisResult(analysis.getAnalysisResult());
        detailVO.setContentData(content.getContentData());
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String formattedDateTime = formatter.format(content.getContentTime());
        detailVO.setContentTime(formattedDateTime);
        detailVO.setContentTitle(content.getContentTitle());
        return detailVO;
    }
}
