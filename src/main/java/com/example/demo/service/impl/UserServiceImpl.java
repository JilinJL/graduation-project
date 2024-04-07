package com.example.demo.service.impl;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.User;
import com.example.demo.mapper.UserMapper;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Autowired
    private UserMapper userMapper;



    @Override
    public User getById(Long id) {
        return userMapper.selectById(id);
    }

    @Override
    public boolean save(User user) {
        return userMapper.insert(user) > 0;
    }

    @Override
    public boolean updateById(User user) {
        return userMapper.updateById(user) > 0;
    }

    @Override
    public boolean removeById(Long id) {
        return userMapper.deleteById(id) > 0;
    }

    @Override
    public User registerUser(User user) {

//        user.setUsername(user.getUsername());
//        user.setPassword(user.getPassword());
//        user.setEmail(user.getEmail());
        userMapper.insert(user);
        System.out.println("user----------注册");
        System.out.println(user);
        return user;
    }

    @Override
    public User loginUser(String username, String password) {
        // 根据用户名查询用户信息
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        queryWrapper.eq("password", password);
        return userMapper.selectOne(queryWrapper);
    }

    @Override
    public boolean existsByUsername(String userName) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", userName);
        // 使用count方法统计符合条件的记录数
        Long count = userMapper.selectCount(queryWrapper);
        // 如果记录数大于0，则表示用户名已存在
        return count > 0;
    }

    @Override
    public User findUserByName(String userName) {
        // 创建查询条件
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", userName);

        // 调用 Mapper 层的查询方法
        return userMapper.selectOne(queryWrapper);
    }

    @Override
    public List<User> getAllUsers(){
        return userMapper.selectList(null);
    }


}
