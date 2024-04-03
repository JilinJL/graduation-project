package com.example.demo.controller;


import com.example.demo.entity.Content;
import com.example.demo.entity.Student;
import com.example.demo.service.ContentService;
import com.example.demo.service.StudentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content")
@Api(tags = "内容信息管理")
//@Controller
public class ContentController {

    @Autowired
    private ContentService contentService;

    @ResponseBody
    @GetMapping("/getContentByUserId")
    @ApiOperation("根据UserId拿到对应的内容记录")
    public List<Content> getContents(Long userId) {
        List<Content> contentList = contentService.selectByUserId(userId);
        return contentList;
    }

    @ResponseBody
    @PostMapping("/addContent")
    public Student Home(){
        return new Student(1,"小红","男");
    }

    @ResponseBody
    @GetMapping("/Index")
    public Student Index(){
        return new Student(1,"小明","男");
    }

}
