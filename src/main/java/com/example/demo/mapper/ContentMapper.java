package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Analysis;
import com.example.demo.entity.Content;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;


public interface ContentMapper extends BaseMapper<Content> {
    @Delete("DELETE FROM content WHERE id = #{contentId} AND user_id = #{userId}")
    boolean removeById(@Param("contentId") Long contentId,@Param("userId") Long userId);
}
