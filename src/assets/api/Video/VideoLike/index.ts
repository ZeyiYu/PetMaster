import {get, post} from "@/utils/request";

/**
 * 视频相关-视频点赞
 */

//获取视频点赞总数
export const getVideoLikeCount = (videoId:any) => {
    return get("/shortVideo/videoThumbs/getThumbsUpCount",{videoId})
}

//获取视频列表
export const isUserLikeVideo = (params:any) => {
    return get("/shortVideo/videoThumbs/list",params)
}

//点赞视频
export const likeVideo = (params:any) => {
    return post("/shortVideo/videoThumbs/save",params)
}

//取消点赞视频
export const unlikeVideo = (params:any) => {
    return get("/shortVideo/videoThumbs/delete",params)
}
