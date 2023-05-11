
//一次性定时器
export function sleep(time) {
  return new Promise((resolve) => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, time)
  })
}

export function arrTrans(num, arr) { // 一维数组转换为二维数组
  const iconsArr = []; // 声明数组
  arr.forEach((item, index) => {
    const page = Math.floor(index / num); // 计算该元素为第几个素组内
    if (!iconsArr[page]) { // 判断是否存在
      iconsArr[page] = [];
    }
    iconsArr[page].push(item);
  });
  return iconsArr;
}

// 获取格式时间
export const getTime = () => {
  let date = new Date()
  //获取当前时间的年份转为字符串
  let year = date.getFullYear().toString()
  let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()
  let da = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString()
  let h = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString()
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString()
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds().toString()
  let end = year + '-' + month + '-' + da + ' ' + h + ':' + m + ':' + s  //当天
  return end
}

export function judgeObj(str) {//判断是否json字符串
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }

    } catch (error) {
      return false;
    }
  }
}