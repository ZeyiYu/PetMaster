/**
 * 社交相关-专家申请表
 */


import {get, post} from '@/utils/request'

//申请成为专家
export const applyForExpert = (params: any) => {
    return post("/api/apply/save", params)
}
