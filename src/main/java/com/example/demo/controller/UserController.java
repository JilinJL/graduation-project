package com.example.demo.controller;


import com.example.demo.entity.Student;
import com.example.demo.entity.User;
import com.example.demo.service.StudentService;
import com.example.demo.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@Api(tags = "用户信息")
//@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @ResponseBody
    @PostMapping("/register")
    @ApiOperation("用户注册")
    public ResponseEntity<User> registerUser(User user) {
        // 调用Service层完成注册逻辑
        System.out.println(123123123);
        userService.registerUser(user);
        return ResponseEntity.ok(user);
    }

    @ResponseBody
    @GetMapping("/checkUsername")
    @ApiOperation("名称检测")
    public ResponseEntity<Boolean> checkUsername(@RequestParam String username) {
        boolean exists = userService.existsByUsername(username);
        return ResponseEntity.ok(exists);
    }


    @ResponseBody
    @PostMapping("/login")
    @ApiOperation("用户登陆")
    public ResponseEntity<User> loginUser(User user) {
        // 调用Service层完成登录逻辑
        user = userService.loginUser(user.getUsername(), user.getPassword());

        // 登录成功后返回用户信息
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }



    @ResponseBody
    @GetMapping("/Home")
    public Student Home(){
        return new Student(1,"小红","男");
    }

    @ResponseBody
    @GetMapping("/Index")
    public Student Index(){
        return new Student(1,"小明","男");
    }

}
