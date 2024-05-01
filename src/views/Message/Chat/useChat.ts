import {Ref} from "vue";
import {getUserInfoById} from "@/assets/api/Social/User";
import {getChatHistory} from "@/assets/api/Chat";

export const useChat = () => {
    const route = useRoute()
    const userId = parseInt(route.params.userId as string)
    const otherId = parseInt(route.params.otherId as string)
    interface IMsgs {
        isDeleted: number,
        message: string,
        userId: string,
        toUserId: string,
        type: number
    }
    const msgs: Ref<IMsgs[]> = ref([])
    const self = ref()
    const other = ref()
    onMounted(async () => {
        await onChat()
        socket.ws_url = `ws://127.0.0.1:10002/websocket/${userId}`
        if (msgs.value.length) {
            let msgLength = msgs.value.length - 1
            document.getElementById(`msg${msgLength}`)!.scrollIntoView();
        }
        init()
    })
    /* onMounted(() => {
         socket.ws_url = `ws://127.0.0.1:10002/websocket/${userId}`
         console.log(msgs.value)
         init()
         //let msgLength = msgs.value.length - 1
         //console.log(msgLength)
         //document.getElementById(`msg${msgLength}`)!.scrollIntoView();
     })*/
    const onChat = async () => {
        msgs.value = await getChatHistory({fromUserId: userId, toUserId: otherId})
        self.value = await getUserInfoById(userId)
        other.value = await getUserInfoById(otherId)
    }

    let socket = {
        websock: null as any,
        userId: '',
        /**
         * ws地址
         * */
        ws_url: '',
        /**
         * 开启标识
         * */
        socket_open: false,
        /**
         * 是否开启重连
         * */
        is_reonnect: true,
        /**
         * 重新连接的次数
         * */
        reconnect_count: 3,
        /**
         * 当前重新连接的次数，默认为：1
         * */
        reconnect_current: 1,
        /**
         * 重新连接的时间类型
         * */
        reconnect_timer: null as any,
        /**
         * 重新连接的间隔
         * */
        reconnect_interval: 3000,

        testContent: [],

    }
    const init = () => {
        if (!("WebSocket" in window)) {
            console.log('浏览器不支持WebSocket')
            return null
        }

        // 已经创建过连接不再重复创建
        if (socket.websock) {
            return socket.websock
        }
        socket.websock = new WebSocket(socket.ws_url)

        socket.websock.onmessage = function (e: any) {
            receive(e)
        }

        // 关闭连接
        socket.websock.onclose = function (e: any) {
            console.log('连接已断开')
            console.log('connection closed (' + e.code + ')')
            //clearInterval(socket.hearbeat_interval)
            socket.socket_open = false

            // 需要重新连接
            if (socket.is_reonnect) {
                socket.reconnect_timer = setTimeout(() => {
                    // 超过重连次数
                    if (socket.reconnect_current > socket.reconnect_count) {
                        clearTimeout(socket.reconnect_timer)
                        return
                    }
                    // 记录重连次数
                    socket.reconnect_current++
                    reconnect()
                }, socket.reconnect_interval)
            }
        }

        // 连接成功
        socket.websock.onopen = function () {
            console.log('连接成功')
            socket.socket_open = true
            socket.is_reonnect = true
        }
        // 连接发生错误
        socket.websock.onerror = function (err: any) {
            console.log('WebSocket连接发生错误')
        }
    }
    /**
     * 获取websocket对象
     * */
    const getSocket = () => {
        //创建了直接返回，反之重来
        if (socket.websock) {
            return socket.websock
        } else {
            init();
        }
    }

    const getStatus = () => {
        if (socket.websock.readyState === 0) {
            return "未连接";
        } else if (socket.websock.readyState === 1) {
            return "已连接";
        } else if (socket.websock.readyState === 2) {
            return "连接正在关闭";
        } else if (socket.websock.readyState === 3) {
            return "连接已关闭";
        }
    }

    /**
     * 发送消息
     * @param {*} data 发送数据
     * @param {*} callback 发送后的自定义回调函数
     */

    const send = (data: any, callback = null) => {
        // 开启状态直接发送
        if (socket.websock.readyState === socket.websock.OPEN) {
            socket.websock.send(JSON.stringify(data))
            /*  if (callback) {
                  callback()
              }*/
            // 正在开启状态，则等待1s后重新调用
        } else if (socket.websock.readyState === socket.websock.CONNECTING) {
            setTimeout(function () {
                send(data, callback)
            }, 1000)
            // 未开启，则等待1s后重新调用
        } else {
            init()
            setTimeout(function () {
                send(data, callback)
            }, 1000)
        }
    }

    /**
     * 接收消息
     * @param {*} message 接收到的消息
     */
    const receive = (message: any) => {
        let recData = JSON.parse(message.data)
        const date = new Date(recData.messageDate);
        const Y = date.getFullYear();
        const M = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        const D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        const m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        const time = Y + "-" + M + "-" + D + " " + h + ":" + m;
        let messageContent = {
            createTime: time,
            isDeleted: 0,
            message: recData.textMessage,
            userId: recData.fromusername,
            toUserId: recData.tousername,
            type: 4
        }
        if (recData.messageType === 4 && recData.fromusername != userId) {
            msgs.value.push(messageContent)
            let msgLength = msgs.value.length - 1
            nextTick(() => {
                document.getElementById(`msg${msgLength}`)!.scrollIntoView();
            })
        }
        let messageType = recData.messageType
        let onlineName = recData.username
        let number = recData.number;
    }

    /**
     * 主动关闭连接
     */
    const close = () => {
        console.log('主动断开连接')
        //clearInterval(socket.hearbeat_interval)
        socket.is_reonnect = false
        socket.websock.close()
    }

    /**
     * 重新连接
     */
    const reconnect = () => {
        console.log('发起重新连接', socket.reconnect_current)
        if (socket.websock && socket.socket_open) {
            socket.websock.close()
        }
        init()
    }

    return {
        socket,
        userId,
        msgs,
        self,
        other,
        send
    }
}
