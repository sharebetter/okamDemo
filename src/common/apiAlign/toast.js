/**
 * Created By   : lilinxiang
 * Created Date : 2019/1/3
 * Description  :
 */

import okam from 'okam-core/src/base/base'

export default {
    showToast(content, config = {}) {
        switch (process.env.APP_TYPE) {
            case 'ant': {
                okam.$api.showToast({
                    type: config.type || 'none', // success / fail / exception / none
                    content: content || '',
                    duration: config.duration || 3000
                })
                break
            }
            case 'wx':
            case 'swan':
            case 'tt': {
                let icon = config.type || 'none'
                if (icon === 'exception') icon = 'none'
                okam.$api.showToast({
                    title: content || '',
                    icon: icon, // success / loading / none
                    duration: config.duration || 3000
                })
                break
            }
            default: break
        }
    },
    hideToast() {
        switch (process.env.APP_TYPE) {
            case 'ant': {
                okam.$api.hideToast()
                break
            }
            case 'wx':
            case 'swan':
            case 'tt': {
                okam.$api.hideToast()
                break
            }
            default: break
        }
    }
}
