// 工具类 Util.js
const Utils = {
  // 节流
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
  },

  // 按时间分组数组
  splitArrayByTime(array) {
    const now = new Date(); // 获取当前时间
  
    // 计算今天的时间范围
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0); // 设置为当天的零点
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999); // 设置为当天的最后一毫秒
  
    // 计算七天前的时间
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // 获取七天前的日期
  
    // 将数组分成三个部分：今天、七天内和更久
    const todayArray = [];
    const lastSevenDaysArray = [];
    const otherArray = [];
  
    array.forEach(item => {
      const itemTime = new Date(item.contentTime);
  
      if (itemTime >= todayStart && itemTime <= todayEnd) {
        todayArray.push(item);
      } else if (itemTime >= sevenDaysAgo) {
        lastSevenDaysArray.push(item);
      } else {
        otherArray.push(item);
      }
    });
  
    return {
      today: todayArray,
      lastSevenDays: lastSevenDaysArray,
      other: otherArray
    };
  },
  
  // 生成随机颜色
  getRandomColor () {
  const colors = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
  };
  
  export default Utils;
  