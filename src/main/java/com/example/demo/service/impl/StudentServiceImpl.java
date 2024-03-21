package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.mapper.StudentMapper;
import com.example.demo.service.StudentService;
import com.example.demo.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class StudentServiceImpl extends ServiceImpl<StudentMapper, Student> implements StudentService {
    @Autowired
    private StudentMapper studentMapper;

    @Override
    public Student getById(Long id) {
        return studentMapper.selectById(id);
    }

    @Override
    public boolean save(Student student) {
        return studentMapper.insert(student) > 0;
    }

    @Override
    public boolean updateById(Student student) {
        return studentMapper.updateById(student) > 0;
    }

    @Override
    public boolean removeById(Long id) {
        return studentMapper.deleteById(id) > 0;
    }

    @Override
    public List<Student> getAllStudents(){
        return studentMapper.selectList(null);
    }
}
