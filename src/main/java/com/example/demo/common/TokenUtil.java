package com.example.demo.common;

import cn.hutool.json.JSONObject;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import cn.hutool.core.date.DateUtil;
import java.util.Date;

public class TokenUtil {

    private final static String ENCRYPT_KEY = "abc123"; // 加密的密钥

    private final static int EXPIRE_TIME = 600; // token 过期时间，单位分钟

    private static final String ISSUER = "linhanping";

    /**
     * 生成 token
     *
     * @param json 要封装到 token 的内容，如果要传递多个参数内容，可以定义为 JSON 或者 Map
     * @return 返回 token
     */
    public static String createToken(JSONObject json) {
        return JWT.create()
                .withSubject(json.toString()) // 不要把密码封装进去，不安全
                .withIssuer(ISSUER) // 设置发布者
                .withExpiresAt(DateUtil.offsetMinute(new Date(), EXPIRE_TIME)) // 设置过期时间
                .withClaim("jilin", "lhp") // 这里是随便设置的内容，类似 Map
                .sign(Algorithm.HMAC256(ENCRYPT_KEY)); // 加密
    }

    /**
     * 验证 token
     *
     * @param token
     * @return
     */
    public static boolean verifyToken(String token) {
        try {
            JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(ENCRYPT_KEY))
                    .withIssuer(ISSUER)
                    .build();
            jwtVerifier.verify(token);
            return true;
        } catch (Exception e) { // 如果 token 过期会报错 TokenExpiredException
            e.printStackTrace();
            return false;
        }
    }
}