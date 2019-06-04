/**
 * Created By   : lilinxiang
 * Created Date : 2019/1/3
 * Description  :
 */
import okam from 'okam-core/src/base/base'

export default {
    showDialog(content, callBack = {}, config = {}) {
        switch (process.env.APP_TYPE) {
            case 'ant': {
                okam.$api.alert({
                    title: config.title || '提示',
                    content: content || '',
                    buttonText: config.confirmText || '确定',
                    success: () => {
                        if (callBack.confirm) callBack.confirm()
                    }
                })
                break
            }
            case 'wx':
            case 'swan':
            case 'tt': {
                // 头条小程序暂不支持confirmColor和cancelColor参数
                okam.$api.showModal({
                    title: config.title || '提示',
                    content: content || '',
                    showCancel: false,
                    confirmText: config.confirmText || '确定',
                    confirmColor: config.confirmColor || '#00AAFF',
                    success: function(res) {
                        if (res.confirm) {
                            if (callBack.confirm) callBack.confirm()
                        }
                    }
                })
                break
            }
            default: break
        }
    },
    showConfirmDialog(content, callBack = {}, config = {}) {
        switch (process.env.APP_TYPE) {
            case 'ant': {
                okam.$api.confirm({
                    title: config.title || '提示',
                    content: content || '',
                    confirmButtonText: config.confirmText || '确定',
                    cancelButtonText: config.cancelText || '取消',
                    success: ({confirm}) => {
                        if (confirm) {
                            if (callBack.confirm) callBack.confirm()
                        } else {
                            if (callBack.cancel) callBack.cancel()
                        }
                    },
                    fail: () => {
                        if (callBack.cancel) callBack.cancel()
                    }
                })
                break
            }
            case 'wx':
            case 'swan':
            case 'tt': {
                // 头条小程序暂不支持confirmColor和cancelColor参数
                okam.$api.showModal({
                    title: config.title || '提示',
                    content: content || '',
                    showCancel: true,
                    cancelText: config.cancelText || '取消',
                    confirmText: config.confirmText || '确定',
                    confirmColor: config.confirmColor || '#00AAFF',
                    cancelColor: config.cancelColor || '#999',
                    success: function (res) {
                        if (res.confirm) {
                            if (callBack.confirm) callBack.confirm()
                        } else if (res.cancel) {
                            if (callBack.cancel) callBack.cancel()
                        }
                    }
                })
                break
            }
            default: break
        }
    }
}
