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
  splitArrayByTime(array=[]) {
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
        todayArray.unshift(item);
      } else if (itemTime >= sevenDaysAgo) {
        lastSevenDaysArray.unshift(item);
      } else {
        otherArray.unshift(item);
      }
    });
  
    return {
      today: todayArray,
      lastSevenDays: lastSevenDaysArray,
      other: otherArray
    };
  },
  
  // 生成随机颜色
  getRandomColor(value=1) {
    const baseHue = Math.floor(value * 150);
    const hueVariation = Math.random() * 40 - 20; // 随机生成动
    const finalHue = baseHue + hueVariation; // 加上浮动
    const hue = Math.max(0, Math.min(150, finalHue)); // 确保在 0-240 范围内
    const hueColor = `hsl(${hue}, 100%, 50%)`; // 将hue转换为HSL颜色
    return hueColor;
  },
  

// 使用正则表达式检查字符串是否只包含 \n
 onlyContainsNewLines(str) {
  return /^[\n]*$/.test(str);
},


// 分析结果内容
  formatResult(str){

    if(str.includes("Recommend")){
      return {
        analysisLabel: null,
        analysisScore: null,
        analysisResult: str.replace(/\\n/g, '\n'),
      }
    }
    if(str.includes("Transform")){
      return {
        analysisLabel: null,
        analysisScore: null,
        analysisResult: str.replace(/\\n/g, '\n'),
      }
    }
    

    // 去除字符串中的转义字符和多余空格
    str = str.replace(/\\/g, '').replace(/\n/g, '').trim();

    // 使用正则表达式匹配并提取所需的字段
    const labelMatch = str.match(/analysisLabel\s+(\S+)/);
    const scoreMatch = str.match(/analysisScore\s+([\d.]+)/);
    const resultMatch = str.match(/analysisResult\s+(.+)/);

    // 构建对象
    const analysisObj = {
        analysisLabel: labelMatch ? labelMatch[1] : '',
        analysisScore: scoreMatch ? parseFloat(scoreMatch[1]) : 0,
        analysisResult: resultMatch ? resultMatch[1] : ''
    };

    return analysisObj;
  }


  };
  
  export default Utils;
  