package com.example.demo.common;

import com.auth0.jwt.exceptions.TokenExpiredException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TokenExpiredException.class)
    public R<String> handleTokenExpiredException(TokenExpiredException ex) {
        // 返回 HTTP 状态码 401（Unauthorized）和错误信息给前端
        return R.error(ResponseEnum.TOKEN_EX);
    }
}
