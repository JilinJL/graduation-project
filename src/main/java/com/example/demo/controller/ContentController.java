package com.example.demo.controller;


import com.example.demo.common.Auth;
import com.example.demo.common.R;
import com.example.demo.common.ResponseEnum;
import com.example.demo.entity.Content;
import com.example.demo.entity.ContentDTO;
import com.example.demo.entity.Student;
import com.example.demo.service.ContentService;
import com.example.demo.service.StudentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/content")
@Api(tags = "内容信息管理")
//@Controller
public class ContentController {

    @Autowired
    private ContentService contentService;

    @Auth
    @ResponseBody
    @GetMapping("/getContentByUserId")
    @ApiOperation("根据UserId拿到对应的内容记录")
    public List<Content> getContents(Long userId) {
        List<Content> contentList = contentService.selectByUserId(userId);
        return contentList;
    }

    @ResponseBody
    @PostMapping("/addContent")
    @ApiOperation("新增内容记录")
    public R<Boolean> addContent(ContentDTO contentDTO) throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_INSTANT;
        Instant instant = Instant.from(formatter.parse(contentDTO.getContentTime()));
        Timestamp timestamp = Timestamp.from(instant);

        Content content = new Content();
        content.setContentData(contentDTO.getContentData());
        content.setContentTime(timestamp);
        content.setUserId(contentDTO.getUserId());
        content.setContentTitle(contentDTO.getContentTitle());
        try{
            contentService.save(content);

            //TODO: 调用大模型分析此条记录
            return R.ok(true);
        }catch (Exception e){

            return R.error(ResponseEnum.INSERT_ERROR);
        }
    }

    @ResponseBody
    @GetMapping("/deleteContent")
    @ApiOperation("删除内容记录")
    public Boolean deleteContent(){

        return true;
    }

}
