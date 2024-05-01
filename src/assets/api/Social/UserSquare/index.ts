/**
 * 社交相关-用户圈子表
 */


import {get, post} from '@/utils/request'

//查询用户圈子关联关系列表
export const getUserSquare = (params: any) => {
    return get("/api/categoryUser/list", params)
}

//取消加入圈子
export const unJoinSquare = (params: any) => {
    return get("/api/categoryUser/cancel", params)
}

//加入圈子
export const joinSquare = (params: any) => {
    return post("/api/categoryUser/save", params)
}

//获取用户关注的圈子详情
export const getUserAttentionSquare = () => {
    return get("/api/categoryUser/getUserAttentionCategory")
}
