import { AxiosRequestConfig } from 'axios';

export type ThroughApiConfig = {
  isAuth?: boolean, // 是否带上鉴权信息，默认为true，如果未登陆但isAuth为true，会返回401
  authKey?: string, // 默认为userId，会将session里的userId以该key作为参数传递
  url?: string, // 默认为through-api，对应的服务透传接口地址
}

export interface Request {
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

export interface InstallationOptions {
  preview?: boolean
  editor?: boolean
  BTCLASS_URL?: string
  request?: Request
}

export type BtOptions = {
  BTCLASS_URL?: string
}

declare module 'vue/types/vue' {
  interface Vue {
    $request: Request
    $BT: BtOptions
  }
}

export type Design = {
  title?: string
  componentName?: string
  options?: any
}

export type DragMovedEvent = {
  element: Design
  newIndex: number
  oldIndex: number
}

export type PageResponse<T = any> = {
  count: number;
  rows: T[];
}

export type CropperOptions = {
  img?: string
  fixed?: boolean
  fixedNumber?: [number, number]
}

export type Page = {
  id?: number
  title?: string
  type?: string
  categoryId?: number|string,
}
