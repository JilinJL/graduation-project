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
    // 提取Label到Score之间的内容
    let labelToScoreRegex = /analysisLabel(.+?)analysisScore/g;
    let labelToScoreMatches = str.matchAll(labelToScoreRegex);
    let labelToScoreContents = [];
    for (const match of labelToScoreMatches) {
        labelToScoreContents.push(match[1].trim());
    }

    // 提取Score到Result之间的内容
    let scoreToResultRegex = /analysisScore(.+?)analysisResult/g;
    let scoreToResultMatches = str.matchAll(scoreToResultRegex);
    let scoreToResultContents = [];
    for (const match of scoreToResultMatches) {
        scoreToResultContents.push(match[1].trim());
    }

    // 提取Result之后的内容
    let resultToEndRegex = /analysisResult(.+)/g;
    let resultToEndMatches = str.matchAll(resultToEndRegex);
    let resultToEndContents = [];
    for (const match of resultToEndMatches) {
        resultToEndContents.push(match[1].trim());
    }

    return {
        analysisLabel: labelToScoreContents,
        analysisScore: scoreToResultContents,
        analysisResult: resultToEndContents
    };
},


  countValue(arr=[]){
    const wordCount = {};
    const totalWords = arr.length;

    // 计算每个 w 值的频率
    for (const item of arr) {
        const word = item.w;
        wordCount[word] = (wordCount[word] || 0) + 1;
    }

    // 根据频率计算 value 值
    const formattedArray = [];
    for (const word in wordCount) {
        const frequency = wordCount[word];
        const value = (frequency / totalWords).toFixed(2)*100;
        formattedArray.push({ name: word, value: parseFloat(value) });
    }

    return formattedArray;
  }
  };
  
  export default Utils;
  