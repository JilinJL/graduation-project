// 工具类 Util.js
const Utils = {
  throttle(func, delay) {
    let lastExecTime = 0;
    let timer;
  
    return function(...args) {
      const currentTime = Date.now();
      const remainingTime = Math.max(0, delay - (currentTime - lastExecTime));
  
      clearTimeout(timer);
  
      if (remainingTime === 0) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        timer = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, remainingTime);
      }
    };
  }
  };
  
  export default Utils;
  