import {AxiosRequestConfig, AxiosInstance} from "axios";

declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    const component: DefineComponent
    export default component
}
declare module "axios" {
    interface AxiosResponse<T = any> {
        token: string
        // 追加参数
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}
declare module '*.router'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module 'ali-oss'
