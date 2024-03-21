import { createContext, useContext } from 'react';
import { observable, action } from 'mobx';

class HomeModel {
  todos = [];
  pendingRequests = 0;

  constructor() {
    makeObservable(this, {
      Number: observable,
      getNum: action,
    });
    autorun(() => console.log(this.report));
  }

  get Number() {
    return this.Number;
  }


  getNum() {
    this.Number=Math.random().toFixed(2) * 100;
  }
}

export default HomeModel;