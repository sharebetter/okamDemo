/**
 * Created By   : lilinxiang
 * Created Date : 2018/12/19
 * Description  : 统一配置
 */
import Okam from 'okam-core/src/base/base'

let testUrl = {
    ycbUrl: 'https://tst-ycb.jjshebao.com',
    apiUrl: 'https://tst-apishebao.jjshebao.com/v20'
}
let releaseUrl = {
    ycbUrl: 'https://ycb.jjshebao.com',
    apiUrl: 'https://shebaoapi.jjshebao.com/v20'
}
let appId = ''
let serviceUrl = {};

(function init() {
    if (process.env.NODE_ENV === "development") {
        // 开发环境
        serviceUrl = testUrl
        switch (process.env.APP_TYPE) {
            case 'ant': {
                // 支付宝配置
                appId = '2018122562676703'
                break
            }
            case 'wx':
                // 微信配置
                appId = 'wx738097b263374ca5'
                break
            case 'swan':
                // 百度配置
                appId = '6UNwpvxsGRvaiKkWGlc3vfyzz0tizLFt' //app_key
                break
            case 'tt': {
                // 头条配置
                appId = 'tta85bdee637711ba1'
                break
            }
            default: break
        }
    } else {
        // 正式环境
        serviceUrl = releaseUrl
        switch (process.env.APP_TYPE) {
            case 'ant': {
                // 支付宝配置
                appId = '2018122562676703'
                break
            }
            case 'wx':
                // 微信配置
                appId = 'wx738097b263374ca5'
                break
            case 'swan':
                // 百度配置
                appId = '6UNwpvxsGRvaiKkWGlc3vfyzz0tizLFt' //app_key
                break
            case 'tt': {
                // 头条配置
                appId = 'tta85bdee637711ba1'
                break
            }
            default: break
        }
    }
})()

Okam.$config = {
    appId: appId,
    serviceUrl: serviceUrl
}

export default Okam.$config
