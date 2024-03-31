package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Analysis;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;


public interface AnalysisMapper extends BaseMapper<Analysis> {
/*    @Select("select * from analysis where user_id = #{userId}")
    List<Analysis> selectByUserId(Long userId);*/
}
