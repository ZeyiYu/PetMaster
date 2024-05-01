import {get, post} from '@/utils/request'

/**
 * Activity相关
 */

//获取Activity数据
export const getActivityList = () => {
    return get("/api/activities")
}
