/**
 * 位置相关
 */


import {get, post} from '@/utils/request'

//Get latest location
export const getLatestLocation = () => {
    return get("/api/location")
}

//Get location
export const getBetweenLocation = (during: any) => {
    return get("/api/location", during)
}

//Get location
export const getAfterLocation = (during: any) => {
    return get("/api/location", during)
}
