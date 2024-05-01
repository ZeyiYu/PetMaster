/**
 * 社交相关-用户关注表
 */


import {get, post} from '@/utils/request'

//查询关注的人的总数
export const getAllFollowing = (attentionId: number) => {
    return get("/api/attention/getAttentionNumber", {attentionId})
}

//获取粉丝总数
export const getAllFans = (attentionedId: number) => {
    return get("/api/attention/getFansNumber", {attentionedId})
}

//查询关注列表
export const getFollowerOrFollowing = (params: any) => {
    return get("/api/attention/list", params)
}

//取消关注
export const unFollow = (params: any) => {
    return get("/api/attention/cancel", params)
}

//新增关注
export const follow = (params: any) => {
    return post("/api/attention/save", params)
}

