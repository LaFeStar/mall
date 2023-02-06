// 防抖函数
export function debounce(func, wait) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// js如何将时间戳转换为标准时间
export function formatDate(date, fmt) {
  // 正则表达式
  // y+ ：一个或者多个y 
  // y* ：0个或者多个y
  // y? ：0个或者1个y
  if (/(y+)/.test(fmt)) {   //获取年份
    // RegExp.$1 表示正则表达式匹配到的格式 如：'yyyy'    substr(n)截取位数
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,                    //月份
    'd+': date.getDate(),                        //日
    'h+': date.getHours(),                       //小时
    'm+': date.getMinutes(),                     //分
    's+': date.getSeconds(),                     //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds()                 //毫秒
  };

  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
// 不足两位补足两位 04:05:09 
function padLeftZero(str) {
  // 如：str=4，则 004.substr(1) 截取1位  = 04
  return ('00' + str).substr(str.length);
}
