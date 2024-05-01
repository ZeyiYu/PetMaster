/**
 * 社交相关-用户表
 */


import {get, post} from '@/utils/request'

//根据id获取用户信息
export const getUserInfoById = (userId: any) => {
    return get("/api/user/getUserInfo", {userId})
}

//根据username模糊搜索用户
export const searchByUsername = (nickname: string) => {
    return get("/api/user/list", {nickname})
}

//更新用户信息
export const updateUserInfo = (params: any) => {
    return post("/api/user/updateUser", params)
}
