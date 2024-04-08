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
    public R registerUser(User user) throws Exception {
        // 调用Service层完成注册逻辑
        // 对密码进行加密处理
//        String encodedPassword = SecurityUtils.encodePassword(user.getPassword());
        String password = DigestUtils.md5DigestAsHex(user.getPassword().getBytes());
        // 创建用户对象并保存到数据库中
        user.setPassword(password);
       try {
           userService.registerUser(user);
       }catch (Exception e){
           System.out.println(e);
           return R.error(ResponseEnum.USER_HAS);
       }

        return R.ok(user);
    }

    @ResponseBody
    @GetMapping("/checkUsername")
    @ApiOperation("名称检测")
    public R checkUsername(@RequestParam String username) {
        boolean exists = userService.existsByUsername(username);
        if(exists){
        return R.error(ResponseEnum.USER_HAS);
        }else{
            return R.ok("无重复");
        }

    }


    @ResponseBody
    @ApiOperation("用户登陆")
    @PostMapping("/login")
    public R<UserVO> login(String username, String password) {

        if (StringUtils.isNotBlank(username) && StringUtils.isNotBlank(password)) {

            User u =userService.findUserByName(username);
            String u_p = DigestUtils.md5DigestAsHex(password.getBytes());
            if (u!=null&& StringUtils.equals(u_p,u.getPassword())) {
                JSONObject json = JSONUtil.createObj()
                        .put("name", username);
                String token = TokenUtil.createToken(json);
                UserVO userVO = new UserVO();
                userVO.setToken(token);
                userVO.setId(u.getId());
                userVO.setEmail(u.getEmail());
                userVO.setUsername(u.getUsername());
                return R.ok(userVO);
            }
        }
        return R.error(ResponseEnum.USERNAME_PASSWORD_ERROR);
    }


    @ResponseBody
    @GetMapping("/getUserInfo")
    @ApiOperation("获取用户信息")
    public R<User> getUserInfo(long userId){
        User user = userService.getById(userId);
        if(user!=null){
            return R.ok(user);
        }
        return R.error(ResponseEnum.USER_EX);

    }

}
