/**
 * 社交相关-专家类型表
 */


import {get, post} from '@/utils/request'

//获取所有的专家类别
export const getExpertCategory = (parentId:number) => {
    return get("/api/expertType/getExpertByType",{parentId})
}

