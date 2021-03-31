const NOT_EXPECTED_FUNC = '这不是一个预期的函数'

/**
 * 将一个字符串转化成number
 * @param value 数值字符串
 * @returns {*|number|string|Object|number}
 */
export function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * 防抖函数
 * @param func 事件函数
 * @param wait 等待时间（毫秒）
 * @param immediate 是否立即执行 true/false
 * @returns {function(...[*]=): void} 返回一个函数
 */
export function debounce(func, wait=100, immediate=false){
  let timeout;

  if (typeof func != 'function') {
    throw new TypeError(NOT_EXPECTED_FUNC);
  }

  wait = toNumber(wait) || 0;

  return function(...args){
    //保存this指向
    let context = this;

    //timeout不为null,清空
    if(timeout) clearTimeout(timeout);

    //判断是否立即执行
    if(immediate){
      //第一次会立即执行，后面根据事件判断是否执行
      let callNow = !timeout;
      //将timeout置为null
      timeout = setTimeout(()=>{
        timeout = null;
      },wait)
      //如果timeout不为null,则callNow为true,执行事件函数
      if(callNow){
        func.apply(context, args)
      }
    }else{
      //异步执行函数，并返回timeout
      timeout =setTimeout(()=>{
        func.apply(context, args)
      },wait)
    }
  }
}

//
/**
 * 节流函数：时间戳写法的特性与定时器写法的特性相结合
 * @param func 事件函数
 * @param wait 等待时间
 * @returns {function(...[*]=): void}
 */
export function throttled(func, wait){

  let timeout;

  let startTime = Date.now();

  if (typeof func != 'function') {
    throw new TypeError(NOT_EXPECTED_FUNC);
  }
  wait = toNumber(wait) || 0;
  return function (...args){
    let curTime = Date.now() //当前时间

    //从上一次到现在，还剩下多少时间
    let remaining = wait - (curTime -startTime);

    //保存this指向
    let context = this;

    //清空
    if(timeout) clearTimeout(timeout)

    //判断剩余时间是否小于等于0
    if(remaining <= 0){
      func.apply(context, args)

      startTime = Date.now();
    }else{
      timeout = setTimeout(func, remaining);
    }
  }
}
