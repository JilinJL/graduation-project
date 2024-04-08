import { createContext, useContext } from 'react';
import request from '../../utils/request';
import { makeObservable, observable, action, autorun } from "mobx";

class HomeModel {
  contentList = [];

  constructor() {
    makeObservable(this, {
      contentList: observable,
      getContent: action,
    });
  }

  async getContent(id) {
    try {
      // 获取用户的分析记录
      const {data} = await request({
        url: `content/getContentByUserId?userId=${id}`,
        method: 'get',
      });
      
      this.contentList = data;
     return data;
      
    } catch(e) {
      console.log(e);
    }
  }

  async getUserInfo(userId) {
    try {
      // 获取用户信息
      const {data} = await request({
        url: `user/getUserInfo?userId=${userId}`,
        method: 'get',
      });
      
      if(data){
        localStorage.setItem('userData',JSON.stringify({
          userId: data.id,
          userName: data.username,
          userEmail: data.email,
        }))
      }
      
    } catch(e) {
      console.log(e);
    }
  }

  async addContent(params){
    try{
      // 新增分析记录
      const {data} = await request({
        url: `content/addContent`,
        method: 'post',
        params,
      });
      
      console.log(data,"--add")
      
    } catch(e) {
      console.log(e);
    }

  }
  

}

export default HomeModel;
