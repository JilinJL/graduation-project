/*
package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.DefaultLoginPageConfigurer;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

*/
/**
 * 自定义SpringSecurity配置类
 *//*

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // 解决跨域问题
        http.cors();
        http.removeConfigurer(DefaultLoginPageConfigurer.class); //将默认加载的登录页配置删除
        http.authorizeRequests()
                .mvcMatchers("/", "/*.html", "/favicon.ico", "/css/**", "/js/**", "/fonts/**", "/layui/**", "/img/**",
                        "/v3/api-docs/**", "/swagger-resources/**", "/webjars/**", "/pages/**", "/druid/**",
                        "/statics/**", "/login", "/register").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .and().csrf().disable();

    }


}
*/
