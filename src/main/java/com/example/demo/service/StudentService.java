package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Student;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StudentService extends IService<Student> {
    Student getById(Long id);
    boolean save(Student student);
    boolean updateById(Student student);
    boolean removeById(Long id);

    List<Student> getAllStudents();
}
