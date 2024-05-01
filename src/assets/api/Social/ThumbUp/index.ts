/**
 * 社交相关-帖子点赞表
 */


import {get, post} from '@/utils/request'

//点赞帖子
export const likePost = (articleId: any, userId: any) => {
    return post("/api/thumbsUp/save", {articleId, userId})
}

export const unlikePost = (articleId: any, userId: any) => {
    return get("/api/thumbsUp/cancel", {articleId, userId})
}

export const likeAndCollect = (id: any) => {
    return get("/api/article/getThumbsUpAndCollect", {id})
}
