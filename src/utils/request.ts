import axios, { AxiosRequestConfig, ThroughApiConfig } from '@bt/web-api-request'
import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

const service = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 30000,
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const data = response.data || {}
    if (!data.code) {
      return Promise.resolve(data)
    }
    if (data.code === 401) {
      // 鉴权未通过
      console.log(data.code, data.msg)
      return Promise.reject(data)
    } else if (data.code !== 200) {
      console.error(data.code, data.msg)
      if (process.env.NODE_ENV === 'development') {
        Message({
          message: data.msg || '服务端错误！',
          type: 'error',
        })
      }
      return Promise.reject(data)
    }
    return Promise.resolve(data.res)
  },
  err => {
    console.error('err:', err)
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 401:
          err.message = '未授权，请登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break
        case 408:
          err.message = '请求超时'
          break
        case 409:
          err.message = '键值冲突'
          break
        case 417:
          err.message = '参数缺失'
          break
        case 500:
          err.message = '服务器内部错误'
          break
        case 501:
          err.message = '服务未实现'
          break
        case 502:
          err.message = '网关错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网关超时'
          break
        case 505:
          err.message = 'HTTP版本不受支持'
          break
        default:
      }
    }
    if (err.message !== 'Network Error') {
      Message({
        message: err.message || '网络异常！',
        type: 'error',
        duration: 3 * 1000,
      })
    }
    return Promise.reject(err)
  }
)

export interface request {
  <T=any>(config: AxiosRequestConfig): T;
  <T=any>(url: string, config?: AxiosRequestConfig): T;
  request: <T=any>(config: AxiosRequestConfig) => T,
  get: <T=any>(url: string, config?: AxiosRequestConfig) => T,
  post: <T=any>(url: string, data?: any, config?: AxiosRequestConfig) => T,
  put: <T=any>(url: string, data?: any, config?: AxiosRequestConfig) => T,
  delete: <T=any>(url: string, config?: AxiosRequestConfig) => T,
  patch: <T=any>(url: string, data?: any, config?: AxiosRequestConfig) => T,
  throughApi: <T=any>(serviceName: string, params?: any, config?: ThroughApiConfig) => T,
}

export const request = service as request;

export default request;

// export default service
