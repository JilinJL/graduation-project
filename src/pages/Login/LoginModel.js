import { createContext, useContext } from 'react';
import request from '../../utils/request';
import { makeObservable, observable, action, autorun } from "mobx";

class LoginModel {
  user = {};

  constructor() {
    makeObservable(this, {
        user: observable,
      useRegister: action,
    });
  }

  async useRegister(params) {
    try {
      const user = await request({
        url: 'user/register',
        method: 'post',
        params,
      });
     
      if(user){
        localStorage.setItem('user', user);
      }
      
    } catch(e) {
      console.log(e);
    }
  }
}

export default LoginModel;
