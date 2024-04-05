package com.example.demo.common;

import lombok.Data;

import java.io.Serializable;

@Data
public class R<T> implements Serializable {

    private static final long serialVersionUID = 56665257244236049L;

    private Integer code;

    private String message;

    private T data;

    private R() {
    }

    public static <T> R<T> ok(T data) {
        R<T> response = new R<>();
        response.setCode(ResponseEnum.SUCCESS.getCode());
        response.setMessage(ResponseEnum.SUCCESS.getMsg());
        response.setData(data);
        return response;
    }

    public static <T> R<T> error(Integer errCode, String errMessage) {
        R<T> response = new R<>();
        response.setCode(errCode);
        response.setMessage(errMessage);
        return response;
    }

    public static <T> R<T> error(ResponseEnum responseEnum) {
        R<T> response = new R<>();
        response.setCode(responseEnum.getCode());
        response.setMessage(responseEnum.getMsg());
        return response;
    }
}