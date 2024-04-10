package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Content;
import com.example.demo.mapper.ContentMapper;
import com.example.demo.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ContentServiceImpl extends ServiceImpl<ContentMapper, Content> implements ContentService {
    @Autowired
    private ContentMapper contentMapper;

    @Override
    public Content getById(Long id) {
        return contentMapper.selectById(id);
    }

    @Override
    public boolean save(Content content) {
        return contentMapper.insert(content) > 0;
    }

    @Override
    public boolean updateById(Content content) {
        return contentMapper.updateById(content) > 0;
    }

    @Override
    public boolean removeById(Long contentId, Long userId) {
        return contentMapper.removeById(contentId,userId);
    }

    @Override
    public List<Content> getAllContents(){
        return contentMapper.selectList(null);
    }

    @Override
    public List<Content> selectByUserId(Long id) {
        List<Content> contentList = lambdaQuery()
                .like(Content::getUserId,id)
                .list();
        return contentList;
    }
}
