package com.example.demo.controller;


import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.example.demo.common.R;
import com.example.demo.common.ResponseEnum;
import com.example.demo.common.TokenUtil;
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
    @ApiOperation("用户登陆")
    @PostMapping("/login")
    public R<User> login(String userName, String password) {
        System.out.println(userName+"----"+password);
        if (StringUtils.isNotBlank(userName) && StringUtils.isNotBlank(password)) {
            if ("张三".equals(userName) && "123456".equals(password)) {
                User user = new User();
                JSONObject json = JSONUtil.createObj()
                        .put("name", "zhangsan");
                String token = TokenUtil.createToken(json);
                user.setToken(token);
                return R.ok(user);
            }
        }
        return R.error(ResponseEnum.USERNAME_PASSWORD_ERROR);
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
