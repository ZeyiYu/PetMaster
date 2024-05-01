export {
    socket
}
// socket主要对象
let socket = {
    websock: null as any,
    /**
     * ws地址
     * */
    ws_url: "ws://127.0.0.1:10002/websocket/jim",
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

    /**
     * 初始化连接
     */
    init: () => {
        if (!("WebSocket" in window)) {
            console.log('浏览器不支持WebSocket')
            return null
        }

        // 已经创建过连接不再重复创建
        if (socket.websock) {
            return socket.websock
        }
        socket.websock = new WebSocket(socket.ws_url)

        socket.websock.onmessage = function (e:any) {
            socket.receive(e)
        }

        // 关闭连接
        socket.websock.onclose = function (e:any) {
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
                    socket.reconnect()
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
        socket.websock.onerror = function (err:any) {
            console.log('WebSocket连接发生错误')
        }
    },
    /**
     * 获取websocket对象
     * */

    getSocket:()=>{
        //创建了直接返回，反之重来
        if (socket.websock) {
            return socket.websock
        }else {
            socket.init();
        }
    },

    getStatus:()=> {
        if (socket.websock.readyState === 0) {
            return "未连接";
        } else if (socket.websock.readyState === 1) {
            return "已连接";
        } else if (socket.websock.readyState === 2) {
            return "连接正在关闭";
        } else if (socket.websock.readyState === 3) {
            return "连接已关闭";
        }
    },

    /**
     * 发送消息
     * @param {*} data 发送数据
     * @param {*} callback 发送后的自定义回调函数
     */
    send: (data:any, callback = null) => {
        // 开启状态直接发送
        if (socket.websock.readyState === socket.websock.OPEN) {
            socket.websock.send(JSON.stringify(data))
           /* if (callback) {
                callback()
            }*/
            // 正在开启状态，则等待1s后重新调用
        } else if (socket.websock.readyState === socket.websock.CONNECTING) {
            setTimeout(function () {
                socket.send(data, callback)
            }, 1000)
            // 未开启，则等待1s后重新调用
        } else {
            socket.init()
            setTimeout(function () {
                socket.send(data, callback)
            }, 1000)
        }
    },

    /**
     * 接收消息
     * @param {*} message 接收到的消息
     */
    receive: (message:any) => {
        let recData = JSON.parse(message.data)
        let messageType = recData.messageType
        let onlineName = recData.username
        let number = recData.number;
    },

    /**
     * 主动关闭连接
     */
    close: () => {
        console.log('主动断开连接')
        //clearInterval(socket.hearbeat_interval)
        socket.is_reonnect = false
        socket.websock.close()
    },

    /**
     * 重新连接
     */
    reconnect: () => {
        console.log('发起重新连接', socket.reconnect_current)

        if (socket.websock && socket.socket_open) {
            socket.websock.close()
        }

        socket.init()
    },
}
