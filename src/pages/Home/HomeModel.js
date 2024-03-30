import { createContext, useContext } from 'react';
import request from '../../utils/request';
import { makeObservable, observable, action, autorun } from "mobx";

class HomeModel {
  analysisList = [];

  constructor() {
    makeObservable(this, {
      analysisList: observable,
      getAnalysis: action,
    });
  }

  async getAnalysis() {
    try {
      const analysisList = await request({
        url: 'analysis/getAnalysis',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // 将获取的数据赋值给观察属性 analysisList
      this.analysisList = analysisList;
      
    } catch(e) {
      console.log(e);
    }
  }
}

export default HomeModel;
