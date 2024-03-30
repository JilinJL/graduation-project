package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().ignoringAntMatchers("/v3/api-docs", "/swagger-ui/**")
                .and()
                .authorizeRequests()
                .antMatchers("/api/**","/v3/api-docs", "/swagger-ui/**").permitAll() // 允许所有的 API 请求
                .anyRequest().authenticated()
                .and()
                .formLogin().disable() // 禁用表单登录
                .httpBasic().disable(); // 禁用 HTTP 基本认证
    }
}
