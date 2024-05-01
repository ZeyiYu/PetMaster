import axios, {AxiosResponse} from 'axios'
import {getToken, removeToken} from "@/utils/setToken";
import Toast from "@/components/Toast";
import {ResponseData} from "@/interface";
import router from "@/router";


axios.defaults.withCredentials = true
const service = axios.create({
    baseURL: '',
    timeout: 20000,
    withCredentials: true,
    headers: {'Content-Type': 'application/json'}
})

// 请求拦截器
service.interceptors.request.use((config) => {
    // 统一设置用户身份 token
    const token = getToken('token');
    if (token) {
        //config.headers!['token'] = token
        config.headers!.Authorization = `Bearer ${token}`;
        /*
                config.headers!.Authorization = `Bearer ${token}`;
        */
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

// 相应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
    // 统一设置接口相应错误, 比如 token 过期失效, 服务端异常
    const res: ResponseData = response.data;
    const {code, message, data, status, error_code} = res;
    if (code == 200 || status == 0 || error_code == 0) {
        if (data) {
            return Promise.resolve(data)
        } else {
            return Promise.resolve(res)
        }
    } else if (code == 401 && getToken('token')) {
        Toast.warning('Login expired, please log in again.');
        removeToken('token')
        router.push('/login').catch(e => {
            console.log(e)
        });
        return Promise.reject(res)
    } else if (code == 400 && getToken('token')) {
        Toast.warning(message);
        return Promise.reject(res)
    } else {
        return Promise.reject(res)
    }
}, (error) => {
    const {data} = error.response;
    if (data.code == 401 && getToken('token')) {
        Toast.warning('Login expired, please log in again.');
        removeToken('token')
        router.push('/login').catch(e => {
            console.log(e)
        });
        return Promise.reject(error);
    }
    //Toast.warning('服务器错误')
    return Promise.reject(error);
})

/**
 * get
 * @param url
 * @param params
 * @returns {*}
 */
export function get<T = any>(url = '', params = {}) {
    return service.get<any, T>(url, {params})
}

/**
 * post
 * @param url
 * @param params
 * @returns {*}
 */
export function post(url = '', data = {}) {
    return service.post(url, {...data})
}

export function putBasic(url = '', data: any) {
    return service.put(url, data)
}

export function put(url = '', data = {}) {
    return service.put(url, {...data})
}

export function postString(url = '', data: string) {
    return service.post(url, data)
}

