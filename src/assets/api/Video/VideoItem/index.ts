import {get, post} from '@/utils/request'

/**
 * 视频相关-视频项目
 */

//获取视频列表
export const getVideoList = () => {
    return get("/shortVideo/video/list")
}
