import { createContext, useContext } from 'react';
import request from '../../utils/request';
import { makeObservable, observable, action, autorun } from "mobx";
import {message} from 'antd'
import Utils from '../../utils/Utils';



class HomeModel {
  contentList = [];
  loading = false;
  newContent = null;
  analysisObj={};
  constructor() {
    makeObservable(this, {
      contentList: observable,
      loading: observable,
      newContent: observable,
      analysisObj: observable,
      getContent: action,
      touchLoading: action,
      stopLoading: action,
      addAnalysis: action,
    });
  }

  async addAnalysis(params) {
    try {
      // 获取用户的分析记录
      const {data} = await request({
        url: `analysis/addAnalysis`,
        method: 'post',
        params
      });
      
     return data;
      
    } catch(e) {
      message.error(e.message);
    }
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
      
      
      if(data.code == 504){
        message.error("抱歉,生成失败!")
        this.stopLoading();
      }else if(data.code == "200"){
        this.stopLoading();
        const a = await this.getContent(localStorage.getItem('userId'));
        this.newContent = a[a.length - 1];
/*         console.log(data.data,"结果")
        this.analysisObj = Utils.formatResult(data.data) */
        this.analysisObj = {
          analysisResult: data.data,
        }
      }
    } catch(e) {
        this.stopLoading();
        message.error(e.message);
    }

  }

  touchLoading(){
    this.loading =!this.loading;
  }
  
  stopLoading(){
    this.loading = false;
  }

}

export default HomeModel;
