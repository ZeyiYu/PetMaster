/**
 * 登录相关
 */


import {get, post} from '@/utils/request'

//Get Pet Info
export const getPetInfo = () => {
    return get("/api/pet")
}

//Get All Weight Records
export const getAllWeight = () => {
    return get("/api/weight_records")
}

export const getLatestWeight = () => {
    return get("/api/weight_records?isLatest=true")
}
