import {get, post} from '@/utils/request'

/**
 * 聊天相关
 */

//获取当前用户的聊天列表
export const getChatList = (params: any) => {
    return get("/network/userMessage/list", params)
}

//查询两人的聊天记录
export const getChatHistory = (params: any) => {
    return get("/network/userMessage/Detail", params)
}
