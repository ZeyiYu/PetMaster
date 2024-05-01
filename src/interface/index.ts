//登录方式 0:微信 1QQ 2手机
export type LoginType = 0 | 1 | 2

/**
 *
 * 最终返回类型
 * @export
 * @interface ResponseData
 * @template T
 */

export interface ResponseData<T = any> {
    /**
     * 数据
     * @type { T }
     */
    data?: T

    status?: T

    error_code?: T

    /**
     * 错误描述
     * @type { string }
     */
    message: string

    /**
     * 错误码
     * @type { number }
     */
    code: number

}

// 操作方式类型.reload 为前端新加
type operateWay = 'redirect_outer' | 'redirect_inner' | 'close' | 'reload' | 'callBack' | 'back'

export interface ButtonData {
    // 按钮文案
    text: string
    // 按钮操作方式 'redirect_outer' 新开窗口打开 'redirect_inner' 当前页面打开链接  'close' 关闭弹窗
    operateWay: operateWay
    // 按钮跳转地址，或则执行函数
    operateContent: any
    // 如果是函数，那么函数执行完毕之后是否关闭弹窗
    keepOpen: boolean
}

export interface Announcement {
    noticeId: number
    msg: string
    //更新的时间
    updateTime: number
    top: boolean
}
