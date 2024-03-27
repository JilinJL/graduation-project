import { createContext, useContext } from 'react';
import { makeObservable, observable, action, autorun, computed } from "mobx";

class HomeModel {
  myNumber;

  constructor() {
    this.myNumber = 123;
    makeObservable(this, {
      myNumber: observable,
      getNum: action,
    });
    this.getNum= this.getNum.bind(this);
    autorun(() => console.log(this.report));
  }

  get Number() {
    return this.myNumber;
  }

  getNum() {
    this.myNumber = Math.random().toFixed(2) * 100;
    console.log(this.myNumber);
  }
}

export default HomeModel;
