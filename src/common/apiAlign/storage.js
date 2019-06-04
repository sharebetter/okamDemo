/**
 * Created By   : lilinxiang
 * Created Date : 2018/12/24
 * Description  :
 */
import okam from 'okam-core/src/base/base'

export default {
    getStorage(key, {success = () => {}, fail = () => {}, complete = () => {}}) {
        switch (process.env.APP_TYPE) {
            case 'ant':
            case 'wx':
            case 'swan':
            case 'tt': {
                okam.$api.getStorage({
                    key: key,
                    success: res => {
                        success(res.data)
                    },
                    fail: res => {
                        fail(res)
                    },
                    complete: res => {
                        complete(res)
                    }
                })
                break
            }
            default: break
        }
    },
    getStorageSync(key) {
        switch (process.env.APP_TYPE) {
            case 'ant': {
                return okam.$api.getStorageSync({key: key}).data
            }
            case 'wx':
            case 'swan':
            case 'tt': {
                return okam.$api.getStorageSync(key)
            }
            default: break
        }
    },
    setStorage(key, data, {success = () => {}, fail = () => {}, complete = () => {}}) {
        switch (process.env.APP_TYPE) {
            case 'ant':
            case 'wx':
            case 'swan':
            case 'tt': {
                okam.$api.setStorage({
                    key: key,
                    data: data,
                    success: res => {
                        success(res)
                    },
                    fail: res => {
                        fail(res)
                    },
                    complete: res => {
                        complete(res)
                    }
                })
                break
            }
            default: break
        }
    },
    setStorageSync(key, data) {
        switch (process.env.APP_TYPE) {
            case 'ant': {
                return okam.$api.setStorageSync({key: key, data: data})
            }
            case 'wx':
            case 'swan':
            case 'tt': {
                return okam.$api.setStorageSync(key, data)
            }
            default: break
        }
    },
    removeStorage(key, {success = () => {}, fail = () => {}, complete = () => {}}) {
        switch (process.env.APP_TYPE) {
            case 'ant':
            case 'wx':
            case 'swan':
            case 'tt': {
                okam.$api.removeStorage({
                    key: key,
                    success: res => {
                        success(res)
                    },
                    fail: res => {
                        fail(res)
                    },
                    complete: res => {
                        complete(res)
                    }
                })
                break
            }
            default: break
        }
    },
    removeStorageSync(key) {
        switch (process.env.APP_TYPE) {
            case 'ant': {
                return okam.$api.removeStorageSync({key: key})
            }
            case 'wx':
            case 'swan':
            case 'tt': {
                return okam.$api.removeStorageSync(key)
            }
            default: break
        }
    },
    clearStorage() {
        okam.$api.clearStorage()
    },
    clearStorageSync() {
        okam.$api.clearStorageSync()
    },
    getStorageInfo({success = () => {}, fail = () => {}, complete = () => {}}) {
        return okam.$api.getStorageInfo({
            success: res => {
                success(res)
            },
            fail: res => {
                fail(res)
            },
            complete: res => {
                complete(res)
            }
        })
    },
    getStorageInfoSync() {
        return okam.$api.getStorageInfoSync()
    },
	setClipboardData(param) {
		switch (process.env.APP_TYPE) {
			case 'ant': {
				return okam.$api.setClipboard(param)
			}
			case 'wx':
			case 'swan':
			case 'tt': {
				return okam.$api.setClipboardData(param)
			}
			default: break
		}
    }
}
