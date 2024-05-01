/**
 * 登录相关
 */


import {get, post} from '@/utils/request'

//User Login
export const userLogin = (user:any) => {
    return post("/api/login",user)
}

export const getUserInfo = () => {
    return get("/api/user")
}


export const verifyCode = () => {
    return get("/api/sms/system/getVerifiCodeImage")
}



//短信验证码登录
export const userLoginBySms = (user:any) => {
    return post("/api/sms/system/doLogin",user)
}

//获取短信验证码
export const sendSmsCode = (phoneNumber:any) => {
    return get("/api/sms/system/sendSms", {phoneNumber})
}


