

const config = {
  type: 'localStorage', // 本地存储类型 localStorage或sessionStorage // 默认localStorage，配置了该项后，下面所有方法的type值非必传，默认为该配置
  prefix: 'YINING_TV', // 名称前缀 建议：项目名 + 项目版本
  expire: 0, //过期时间 单位：秒 // 默认0（不过期），配置了该项后，下面所有方法的type值非必传，默认为该配置
};

// 判断是否支持 Storage
export const isSupStorage = () => {
  if (!window) {
    throw new Error('当前环境非浏览器，无法消费全局window实例。');
  }
  if (!window.localStorage) {
    throw new Error('当前环境无法使用localStorage');
  }
  if (!window.sessionStorage) {
    throw new Error('当前环境无法使用sessionStorage');
  }
  return typeof Storage !== 'undefined' ? true : false;
};

// 设置 setStorage 参数key, value, [expire, type]
export const setStorage = (key, value, expire = 0, type) => {
  if (value === '' || value === null || value === undefined) {
    value = null;
  }
  if (isNaN(expire) || expire < 0) throw new Error('Expire must be a number');
  expire = (expire ? expire : config.expire) * 1000;
  let data = {
    value: value, // 存储值
    time: Date.now(), //存值时间戳
    expire: expire // 过期时间
  };
  if (type && type != 'localStorage' && type != 'sessionStorage') throw new Error('请传入正确的存储类型');
  type = type ? type : config.type
  window[type].setItem(autoAddPrefix(key), JSON.stringify(data));
};

// 获取 getStorage 参数key, [type]
export const getStorage = (key, type) => {
  if (type && type != 'localStorage' && type != 'sessionStorage') throw new Error('请传入正确的存储类型');
  type = type ? type : config.type
  let value = null;
  key = autoAddPrefix(key);
  // key 不存在判断
  if (
    !window[type].getItem(key) ||
    JSON.stringify(window[type].getItem(key)) === 'null'
  ) {
    return null;
  }

  // 优化 持续使用中续期
  const storage = JSON.parse(window[type].getItem(key));
  const nowTime = Date.now();
  // 过期删除
  if (storage.expire && storage.expire < nowTime - storage.time) {
    console.log(storage.expire, nowTime - storage.time)
    key = autoRemovePrefix(key)
    removeStorage(key, type);
    return null;
  } else {
    // // 未过期期间被调用 则自动续期 进行保活
    // setStorage(autoRemovePrefix(key), storage.value);
    if (isJson(storage.value)) {
      value = JSON.parse(storage.value);
    } else {
      value = storage.value;
    }
    return value;
  }
};

// 删除 removeStorage 参数key, [type]
export const removeStorage = (key, type) => {
  if (type && type != 'localStorage' && type != 'sessionStorage') throw new Error('请传入正确的存储类型');
  type = type ? type : config.type
  window[type].removeItem(autoAddPrefix(key));
};

// 清空 clearStorage 参数[type]
export const clearStorage = (type) => {
  if (type && type != 'localStorage' && type != 'sessionStorage') throw new Error('请传入正确的存储类型');
	type = type ? type : config.type
	window[type].clear();
};

// 是否存在 hasStorage 参数key, [type]
export const hasStorage = (key, type) => {
  type = type ? type : config.type
  key = autoAddPrefix(key);
  let arr = getStorageAll(type).filter(item => {
    return item.key === key;
  });
  return arr.length ? true : false;
};

// 获取localStorage长度 参数[type]
export const getStorageLength = (type) => {
  type = type ? type : config.type
  return window[type].length;
};

// 获取全部 getAllStorage 参数[type]
export const getStorageAll = (type) => {
  type = type ? type : config.type
  const len = getStorageLength(); // 获取长度
  let arr = []; // 定义数据集
  for (let i = 0; i < len; i++) {
    const key = window[type].key(i);
    // 获取key 索引从0开始
    const getKey = autoRemovePrefix(key);
    // 获取key对应的值
    const storage = JSON.parse(window[type].getItem(key));

    const nowTime = Date.now();
    if (storage.expire && nowTime - storage.time > storage.expire) {
      removeStorage(getKey);
    } else {
      let getVal = storage.value;
      // console.log(Object.prototype.toString.call(value));
      if (isJson(getVal)) {
        getVal = JSON.parse(getVal);
      }
      // 放进数组
      arr.push({ key: getKey, val: getVal });
    }
  }
  return arr;
};

// 判断是否可用 JSON.parse 参数value
export const isJson = value => {
  if (Object.prototype.toString.call(value) === '[object String]') {
    try {
      const obj = JSON.parse(value);
      const objType = Object.prototype.toString.call(obj);
      return objType === '[object Object]' || objType === '[object Array]';
    } catch (e) {
      // console.log('error：' + value + '!!!' + e);
      return false;
    }
  }
  return false;
};

// 名称前自动添加前缀 参数key
const autoAddPrefix = key => {
  const prefix = config.prefix ? config.prefix + '_' : '';
  return prefix + key;
};

// 移除已添加的前缀 参数key
const autoRemovePrefix = key => {
  const len = config.prefix ? config.prefix.length + 1 : '';
  return key.substr(len);
};

export default {
  set: setStorage,
  get: getStorage,
  remove: removeStorage,
  clear: clearStorage,
  has: hasStorage
}
