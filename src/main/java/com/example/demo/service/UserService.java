package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService extends IService<User> {
    User getById(Long id);
    boolean save(User user);
    boolean updateById(User user);
    boolean removeById(Long id);

    User registerUser(User user);

    User loginUser(String username, String password);

    //检测用户名是否存在
    boolean existsByUsername(String userName);
    List<User> getAllUsers();

    User findUserByName(String userName);
}
