

import axios from 'axios'
import qs from 'qs'

let requestApi = (proxy, store) => {

  // === 生成 axios 实例 ===
  const instance = axios.create({
    timeout: 1000 * 12
  })

  // === axios 请求拦截 ===
  instance.interceptors.request.use(
    config => {
      store.SHOW_LOADING()
      if (proxy.$storage.get('hostIp')) { // 因为 url 是动态的就写在这里处理 `baseURL`
        config.baseURL = proxy.$storage.get('hostIp')
      }
      if (proxy.$storage.get('Authorization')) {
        config.headers['Authorization'] = proxy.$storage.get('Authorization')
      }

      if (proxy.$storage.get('registerId')) {
        config.headers['registerId'] = proxy.$storage.get('registerId')
      }
      // console.log(config)
      return config
    },

    error => {

      store.HIDDEN_LOADING()

      return Promise.reject(error)
    }
  )

  // === axios response 拦截 ===
  instance.interceptors.response.use(
    res => {
      console.log('res', res)
      store.HIDDEN_LOADING()
      if (res.status === 200) {
        return Promise.resolve(res)
      } else {

        ElMessage.hasOwnProperty('closeAll') ? ElMessage.closeAll() : ElMessage.clear()
        return Promise.reject(res)
      }
    },

    error => {
      console.log(error)
      store.HIDDEN_LOADING()
      const { response } = error

      ElMessage.hasOwnProperty('closeAll') ? ElMessage.closeAll() : ElMessage.clear()
      if (response) {
        errorHandler(error)
        return Promise.resolve(response)
      } else {
        // 断网
        let errorMSg = ''
        if (error.code === 'ECONNABORTED') {
          // ElMessage.error('请求超时')
          errorMSg = '请求超时'
        } else {
          errorMSg = '网络异常'
          // ElMessage.error('网络异常,')
        }

        return Promise.resolve(
          {
            data: {
              data: null,
              code: 100000,
              msg: errorMSg
            }
          })
      }
    }
  )

  //=== post和get方法===

  const get = (url, needLoading = true, config = {}) => {
    Object.assign(config, {
      method: 'get',
      url,
      needLoading
    })
    return instance(config).then(res => {
      return res
    })
  }


  const post = (url, data, needLoading = true, config = {}) => {
    Object.assign(config, {
      method: 'post',
      url,
      data,
      needLoading
    })
    return instance(config).then(res => {
      return res
    })
  }

  /*
   * des:
   *   获取 token
   * */
  const fetchToken = () => {
    return axios({
      method: 'post',
      url: proxy.$storage.get('hostIp') + '/token',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        'grant_type': 'password',
        'username': 'guest',
        'password': 'kWS/rVmF3u4='
      })
    })
  }


  // === 重新获取 token ===
  const refreshToken = () => {
    const refreshCall = fetchToken().then((response) => {
      const token = 'bearer ' + response.data.access_token
      proxy.$storage.set('Authorization', token)
      // setToken(token) h5+ 不支持
      return Promise.resolve(true)
    })

    return refreshCall
  }

  // === 错误信息处理 ===
  const errorHandler = (error) => {
    const status = error.response.status

    switch (status) {
      case 401:
        refreshToken().then(() => {
          error.config.headers['Authorization'] = proxy.$storage.get('Authorization')
          ElMessage({
            type: 'warning',
            message: '数据已丢失, 请重新操作',
            duration: 0
          })
        })

        break;
      case 404:
        ElMessage({
          type: 'error',
          message: '请求资源未找到'
        })
        break;
      case 500:
        ElMessage({
          type: 'error',
          message: '服务器错误'
        })
        break;
      default:
        ElMessage({
          type: 'error',
          message: '服务已断开, 请联系管理员',
          duration: 0
        })
    }
    setTimeout(() => {
      ElMessage.hasOwnProperty('closeAll') ? ElMessage.closeAll() : ElMessage.clear()
    }, 3000)
  }
  return {
    get,
    post,
    defaults: instance
  }
}
export default requestApi