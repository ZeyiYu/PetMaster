/**
 * 预约相关-预约记录
 */


import {get, post} from '@/utils/request'

//查询预约记录
export const getAppointHistory = (params: any) => {
    return get("/core/appointmentRecord/list", params)
}

//保存预约记录
export const saveAppoint = (params: any) => {
    return post("/core/appointmentRecord/save", params)
}

//用户签到
export const checkIn = (params: any) => {
    return post("/core/appointmentRecord/startChatting", params)
}

//专家提醒用户及时签到
export const noticeCheckIn = (params: any) => {
    return post("/core/appointmentRecord/remind", params)
}

//提交评价
export const saveAppointReview = (params: any) => {
    return post("/core/appointmentRecord/submitEvaluation", params)
}

//服务结束
export const endAppoint = (params: any) => {
    return post("/core/appointmentRecord/EndOfService", params)
}
