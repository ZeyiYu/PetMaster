import {get, post, put, putBasic} from '@/utils/request'

//update feeding target
export const updateFeedingTarget = (amount: number) => {
    return putBasic("/api/feeder/everyday_food_plan", amount)
}

//get feeder details
export const getFeederDetails = () => {
    return get("/api/feeder")
}

//change feeder schedules
export const changeFeederSchedules = (time: any) => {
    return post("/api/feeding_schedules", time)
}


//set feeder schedules  设置定时任务
export const setFeederSchedules = (time: any) => {
    return post("/iot/add_schedules", time)
}



//get feeder schedules
export const getFeederSchedules = () => {
    return get("/api/feeding_schedules")
}

//get feeder records
export const getFeederRecords = () => {
    return get("/api/feeding_records")
}

//open feeder
export const openFeeder = (param: any) => {
    return post("/iot/start_device", param)
}

//get feeder
export const getFeeder = () => {
    return get("/iot/getfeeder")
}

//get water level
export const getWaterLevel = () => {
    return get("/iot/getwater")
}
