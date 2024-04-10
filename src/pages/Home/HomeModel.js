import { createContext, useContext } from 'react';
import request from '../../utils/request';
import { makeObservable, observable, action, autorun } from "mobx";
import {message} from 'antd'
class HomeModel {
  contentList = [];
  loading = false;
  constructor() {
    makeObservable(this, {
      contentList: observable,
      getContent: action,
      loading: observable,
      touchLoading: action,
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
      message.error(e.message);
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
      message.error(e.message);
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
      
      if(data.code == "504"){
        message.error("抱歉,生成失败!")
      }else if(data.code == "200"){
        this.touchLoading();
      }
    } catch(e) {
      message.error(e.message);
    }

  }

  touchLoading(){
    console.log(this.loading)
    this.loading =!this.loading;
  }
  

}

export default HomeModel;
