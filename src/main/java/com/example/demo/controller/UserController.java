package com.example.demo.controller;


import cn.hutool.crypto.digest.MD5;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.example.demo.common.R;
import com.example.demo.common.ResponseEnum;
import com.example.demo.common.TokenUtil;
import com.example.demo.entity.Student;
import com.example.demo.entity.User;
import com.example.demo.entity.UserVO;
import com.example.demo.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;

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
    public R registerUser(User user) {
        // 调用Service层完成注册逻辑
        // 对密码进行加密处理
//        String encodedPassword = SecurityUtils.encodePassword(user.getPassword());

        String password = DigestUtils.md5DigestAsHex(user.getPassword().getBytes());
        // 创建用户对象并保存到数据库中
        user.setPassword(password);
/*        JSONObject json = JSONUtil.createObj()
                .put("name", user.getUsername());
        String token = TokenUtil.createToken(json);
        user.setToken(token);*/
        userService.registerUser(user);
        return R.ok(user);
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
    public R<UserVO> login(String userName, String password) {
        System.out.println(userName+"----"+password);
        if (StringUtils.isNotBlank(userName) && StringUtils.isNotBlank(password)) {

            User u =userService.findUserByName(userName);
            String u_p = DigestUtils.md5DigestAsHex(password.getBytes());
            if (u!=null&& StringUtils.equals(u_p,u.getPassword())) {
                JSONObject json = JSONUtil.createObj()
                        .put("name", userName);
                String token = TokenUtil.createToken(json);
                UserVO userVO = new UserVO();
                userVO.setToken(token);
                userVO.setId(u.getId());
                return R.ok(userVO);
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
