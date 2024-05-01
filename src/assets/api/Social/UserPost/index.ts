/**
 * 社交相关-用户帖子表
 */


import {get, post} from '@/utils/request'

//获取帖子列表
export const getUserPost = (params: any) => {
    return get("/api/article/getArticleList", params)
}

//发帖
export const sendPost = (params: any) => {
    return post("/api/article/saveArticle", params)
}

//根据用户id获取用户发帖数
export const getUserPostCount = (userId: any) => {
    return get("/api/article/count", {userId})
}

//帖子类别
export const getPostCategory = (params: any) => {
    return get("/api/article/countByType", params)
}

//获取被艾特的帖子
export const getAtMe = (id: any) => {
    return get("/api/article/getMentionedRecords", {id})
}

//获取用户相册
export const getAlbum = (userId: any) => {
    return get("/api/article/getPhotos", {userId})
}

//显示当前登陆用户的被点赞列表
export const getLikedList = (id: any) => {
    return get("/api/article/getThumbsUpRecords", {id})
}

//显示评论我的
export const getComments = (id: any) => {
    return get("/api/article/getCommentRecords", {id})
}

//获取关注的人的帖子
export const getFollowingPosts = (id: any) => {
    return get("/api/article/getAttentionPeopleArticles", {id})
}

//删除帖子
export const deletePost = (id: any) => {
    return get("/api/article/delete", {id})
}
