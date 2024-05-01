/**
 * 社交相关-帖子评论表
 */


import {get, post} from '@/utils/request'

//获取帖子的评论
export const getPostComment = (params: any) => {
    return get("/api/comment/list", params)
}

export const getPostCommentCount = (articleId: any) => {
    return get("/api/comment/count", {articleId})
}

//发表评论
export const sendComment = (params: any) => {
    return post("/api/comment/save", params)
}
