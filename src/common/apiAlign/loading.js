/**
 * Created By   : lilinxiang
 * Created Date : 2018/12/24
 * Description  :
 */
import okam from 'okam-core/src/base/base'

export default {
    showLoading(content, config = {}) {
        switch (process.env.APP_TYPE) {
            case 'ant': {
                okam.$api.showLoading({
                    content: content || '',
                    delay: config.delay || 0
                })
                break
            }
            case 'wx':
            case 'swan':
            case 'tt': {
                okam.$api.showLoading({
                    title: content || ''
                })
                break
            }
            default: break
        }
    },
    hideLoading(page) {
        switch (process.env.APP_TYPE) {
            case 'ant': {
                okam.$api.hideLoading({
                    page: page  // 防止执行时已经切换到其它页面，page指向不准确
                })
                break
            }
            case 'wx':
            case 'swan':
            case 'tt': {
                okam.$api.hideLoading()
                break
            }
            default: break
        }
    },
    showNavigationBarLoading() {
        switch (process.env.APP_TYPE) {
            case 'ant':
            case 'swan':
            case 'wx': {
                okam.$api.showNavigationBarLoading()
                break
            }
            case 'tt': break // 头条不支持标题栏加载中
            default: break
        }
    },
    hideNavigationBarLoading() {
        switch (process.env.APP_TYPE) {
            case 'ant':
            case 'swan':
            case 'wx': {
                okam.$api.hideNavigationBarLoading()
                break
            }
            case 'tt': break // 头条不支持标题栏加载中
            default: break
        }
    }
}
