import {get, post} from '@/utils/request'

/**
 * 视频相关-视频评论
 */

//获取视频评论总数
export const getVideoCommentCount = (videoId:any) => {
    return get("/shortVideo/videoComment/getCommentCount",{videoId})
}

//获取视频列表
export const getVideoComments = (videoId:any) => {
    return get("/shortVideo/videoComment/list",{videoId})
}

//评论视频
export const commentVideo = (params:any) => {
    return post("/shortVideo/videoComment/save",params)
}
