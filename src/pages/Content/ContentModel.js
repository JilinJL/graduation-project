import { createContext, useContext } from 'react';
import request from '../../utils/request';
import { makeObservable, observable, action, autorun } from "mobx";

class ContentModel {
  analysisData = [];

  constructor() {
    makeObservable(this, {
      analysisData: observable,
      getAnalysis: action,
    });
  }

  async getAnalysis(id) {
    try {
      const {data} = await request({
        url: `analysis/getAnalysisById?id=${id}`,
        method: 'get',
      });
      // 将获取的数据赋值给观察属性 analysisList
      this.analysisData = data.data;
      
    } catch(e) {
      console.log(e);
    }
  }
}

export default ContentModel;
