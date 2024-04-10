package com.example.demo.common;

import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class LoginInterceptor implements HandlerInterceptor {

    private void sendError(HttpServletResponse response, int status, String error) throws IOException, IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print("{\"status\": \"" + status + "\", \"error\": \"" + error + "\"}");
        out.flush();
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            if (handlerMethod.getBean() instanceof BasicErrorController) {
                return true;
            }
            Auth auth = handlerMethod.getMethod().getAnnotation(Auth.class);
            if (auth != null && auth.require()) {
                String token = request.getHeader("token");
                if (StringUtils.isNotBlank(token)) {
                    if (TokenUtil.verifyToken(token)) { // 校验 token 是否正确
//                        System.out.println("校验token");
                        return true;
                    } else {
                        sendError(response, 405, "token校验失败,请重新登录");
                        return false;
                    }
                } else {
                    sendError(response, 405, "无token,请重新登录");
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
}