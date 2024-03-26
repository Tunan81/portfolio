/**
 * 防抖
 */
export function debounce(input, timeout) {
  let timer;
  return function(event) {
    if (event.target.composing === true) {
      return;
    }
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    timer = setTimeout(() => {
      input(event);
      clearTimeout(timer);
      timer = undefined;
    }, timeout);
  };
}

/**
 * 判断是否是函数
 */
export function isFunction(param) {
  return Object.prototype.toString.call(param) === '[object Function]';
}
