
/**
 *
 * @desc   深拷贝
 * @param {*} value 
 * @returns {*}  
 */
 function cloneDeep(value, map = new WeakMap()) {
  // 判断是否是一个Set类型
  if (value instanceof Set) {
    return new Set([...value])
  }
  // 判断是否是一个Map类型
  if (value instanceof Map) {
    return new Map([...value])
  }
  // 判断是否是一个Date类型
  if (value instanceof Date) {
    return new Date(value)
  }
  // 判断是否是一个正则
  if (value instanceof RegExp) {
    return cloneRegExp(value)
  }
  // 判断如果是Symbol的value, 那么创建一个新的Symbol
  if (typeof value === 'symbol') {
    return Symbol(value.description)
  }
  // 判断如果是函数类型, 那么直接使用同一个函数
  if (typeof value === 'function') {
    return value
  }
  // 判断传入的value是否是一个对象类型
  if (!isObject(value)) {
    return value
  }
  if (map.has(value)) {
    return map.get(value)
  }
  // 判断传入的对象是数组, 还是对象
  const newObject = Array.isArray(value) ? [] : {}
  map.set(value, newObject)
  for (const key in value) {
    newObject[key] = cloneDeep(value[key], map)
  }
  // 对Symbol的key进行特殊的处理
  const symbolKeys = Object.getOwnPropertySymbols(value)
  for (const sKey of symbolKeys) {
    // const newSKey = Symbol(sKey.description)
    newObject[sKey] = cloneDeep(value[sKey], map)
  }
  return newObject
}

function cloneRegExp(regexp) {
  const reFlags = /\w*$/
  const result = new regexp.constructor(regexp.source, reFlags.exec(regexp))
  result.lastIndex = regexp.lastIndex
  return result
}

function isObject(obj) {
  const valueType = typeof obj
  return obj !== null && (valueType === 'object' || valueType === 'function')
}


export {
  cloneDeep
}