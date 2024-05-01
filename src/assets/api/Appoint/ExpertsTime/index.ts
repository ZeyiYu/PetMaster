/**
 * 预约相关-专家可预约时段
 */


import {get, post} from '@/utils/request'

//获取专家列表
export const getExperts = (params: any) => {
    return get("/core/appointmentUser/listExpert", params)
}

//获取专家可预约时间段列表
export const getExpertTime = (userId: any) => {
    return get("/core/appointmentUser/listByExpertId", {userId})
}

//专家新增可预约时间段
export const addExpertTime = (params: any) => {
    return post("/core/appointmentUser/save", params)
}
