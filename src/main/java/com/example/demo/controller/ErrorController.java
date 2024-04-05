package com.example.demo.controller;

import com.example.demo.common.R;
import com.example.demo.common.ResponseEnum;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/error")
public class ErrorController {

    @PostMapping("/token")
    public R<?> token() {
        return R.error(ResponseEnum.NO_TOKEN);
    }

    @PostMapping("/tokenError")
    public R<?> tokenError() {
        return R.error(ResponseEnum.TOKEN_VERIFY_ERROR);
    }
}