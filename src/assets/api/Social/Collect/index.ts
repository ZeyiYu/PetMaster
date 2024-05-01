/**
 * 社交相关-帖子收藏表
 */


import {get, post} from '@/utils/request'

//收藏帖子
export const collectPost = (articleId: any, userId: any) => {
    return post("/api/collection/save", {articleId, userId})
}

export const uncollectPost = (articleId: any, userId: any) => {
    return get("/api/collection/cancel", {articleId, userId})
}
