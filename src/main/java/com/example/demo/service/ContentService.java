package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Analysis;
import com.example.demo.entity.Content;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ContentService extends IService<Content> {
    Content getById(Long id);
    boolean save(Content content);
    boolean updateById(Content content);
    boolean removeById(Long id);

    List<Content> getAllContents();
}
