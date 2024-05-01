/**
 * 社交相关-浏览记录表
 */


import {get, post} from '@/utils/request'

export const getViewHistory = (userId: number) => {
    return get("/api/browsingRecord/list", {userId})
}

export const newViewHistory = (params: any) => {
    return post("/api/browsingRecord/save", params)
}
