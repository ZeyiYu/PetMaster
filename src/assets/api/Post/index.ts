/**
 * 帖子相关
 */


import {get, post} from '@/utils/request'

//Get All Posts
export const getAllPosts = () => {
    return get("/api/posts")
}

