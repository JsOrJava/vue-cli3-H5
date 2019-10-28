import axios from 'axios'
import { Notify } from 'vant'

const BASE_URL = process.env.VUE_APP_BASE_API
//过滤请求
axios.interceptors.request.use(config => {
  config.timeout = 100000
  return config
}, error => {
  Notify('网络异常')
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errno == 0 || response.data.code == 0) {
      return Promise.resolve(response.data)
    } else {
      Notify(response.data.errmsg)
      return Promise.reject(response.data)
    }
  },
  error => Promise.reject(error)
)

export default function request(method, url, data, headers) {
  method = method.toLocaleLowerCase()
  if ( !headers ) {
    return axios({
      timeout: 10000,
      baseURL: BASE_URL, // 'https://mm-cosmetic.tianli.shop',
      method: method,
      url: url,
      data: data
    })
  }
  return axios({
    timeout: 10000,
    baseURL: BASE_URL,
    method: method,
    url: url,
    data: data,
    headers: headers
  })
}
