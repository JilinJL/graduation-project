import { createContext, useContext } from 'react';
import request from '../../utils/request';
import { makeObservable, observable, action, autorun } from "mobx";
import { message } from 'antd';
class LoginModel {
  user = {};

  constructor() {
    makeObservable(this, {
        user: observable,
      useRegister: action,
      checkUserName: action,
      useLogin: action,
    });
  }

  async useLogin(params){
    try {
      const {data} = await request({
        url: 'user/login',
        method: 'post',
        params,
      });

      if(data.code=="200"){
        localStorage.setItem('token', data.data?.token);
        localStorage.setItem('userId', data.data?.id);
        return true;
      }else{
        message.error(data.message);
      }
      return false;

    }catch (e) {
      console.log(e);
      message.error(e.message);
    }
  }

  async useRegister(params) {
    try {
      const {data} = await request({
        url: 'user/register',
        method: 'post',
        params,
      });

      if(data.code=="200"){
        return true;
      }else if(data.code=="306"){
        message.error(data.message);
        return false;
      }
      return false
    } catch(e) {
      console.log(e);
      message.error(e.message);
    }

   
  }

  async checkUserName(param) {

      const {data} = await request({
        url: `user/checkUsername?username=${param}`,
        method: 'get',
      });

      return data.code=="200" ? false : true;

  }


}

export default LoginModel;
