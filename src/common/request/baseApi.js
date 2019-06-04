/**
 * Created By   : lilinxiang
 * Created Date : 2018/12/19
 * Description  :
 */


import Okam from 'okam-core/src/base/base'
import MD5 from '../utils/md5Utils'

const APP_KEY = 'JJSB09$%D89@!@=='
const isDebug = true // 控制是否显示日志


export const $post = (url, params, {startOrEnd = () => {}, success = () => {}, fail = () => {}}) => {
    if (isDebug) {
        console.groupCollapsed(`%c Request %c ${url.replace('//', '')} `, 'font-size:12px;background:#27B3EB ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'font-size:12px;background:#66D9FC ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff')
        console.log('╔════════════════════════════════════════════════')
        console.log(params)
        console.log('╚════════════════════════════════════════════════')
        console.groupEnd()
    }
    startOrEnd(true)

    if (startOrEnd.name !== 'startOrEnd') Okam.$apiAlign.showLoading('加载中...')
    const Timestamp = new Date().getTime()
    let token = Okam.$apiAlign.getStorageSync('token') || ''
    let headers = {'Content-Type': 'application/json'}
    headers['platform'] = process.env.APP_TYPE
    headers['channel'] = Okam.$globalVariable.channel
    headers['Timestamp'] = Timestamp.toString()
    headers['jjsb-access-token'] = token
    headers['sign'] = MD5.hex_md5(`${Timestamp.toString()}${token}${APP_KEY}`)
    Okam.$http.post(url, {
        method: 'POST',
        data: params,
        header: headers,
        headers: headers // 兼容支付宝小程序
    }).then(response => {
        if (response.status === 200 || response.statusCode === 200) {
            let {resultCode, resultMessage, resultMsg, resultBody, statusCode} = response.data
            if (isDebug) {
                if (resultCode === 1 || resultCode === '1' || resultCode === '304' || statusCode === '100') {
                    console.groupCollapsed(`%c Respond %c ${url.replace('//', '')} `, 'font-size:12px;background:#41b883 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'font-size:12px;background:#4AE6A8 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff')
                    console.log('╔═══════════════════════════════════════════════')
                    console.log(`║   成功提示：${resultMessage || resultMsg}`)
                    console.log(resultBody)
                    console.log('╚════════════════════════════════════════════════')
                    console.groupEnd()
                } else {
                    console.group(`%c Respond %c ${url.replace('//', '')} `, 'font-size:12px;background:#CFC169 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'font-size:12px;background:#E3D67E ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff')
                    console.warn('╔═══════════════════════════════════════════════')
                    console.warn(`║   错误码：${resultCode || statusCode}`)
                    console.warn(`║   错误提示：${resultMessage || resultMsg}`)
                    console.warn('╚════════════════════════════════════════════════')
                    console.groupEnd()
                }
            }
            switch (String(resultCode || statusCode)) {
                case '1':
                case '100':
                case '304':
                    if (startOrEnd.name !== 'startOrEnd') Okam.$apiAlign.hideLoading()
                    success(resultBody, resultMessage || resultMsg)
                    startOrEnd(false)
                    break
                default:
                    if (startOrEnd.name !== 'startOrEnd') Okam.$apiAlign.hideLoading()
                    if (fail.name !== 'fail' && (resultMessage || resultMsg)) {
                        Okam.$apiAlign.showToast(resultMessage || resultMsg, {type: 'exception'})
                    }
                    fail(resultMessage || resultMsg, resultCode || statusCode)
                    startOrEnd(false)
                    break
            }
        } else {
            if (isDebug) {
                console.group(`%c Respond %c ${url.replace('//', '')} `, 'font-size:12px;background:#FA531B ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'font-size:12px;background:#FA8954 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff')
                console.error('╔════════════════════════════════════════════════')
                console.error('║   无法连接服务器！')
                console.error(`║   错误码：${response.status}`)
                console.error('╚════════════════════════════════════════════════')
                console.groupEnd()
            }
            if (startOrEnd.name !== 'startOrEnd') Okam.$apiAlign.hideLoading()
            if (fail.name !== 'fail') {
                Okam.$apiAlign.showToast('无法连接服务器', {type: 'exception'})
            }
            fail('无法连接服务器！', -1)
            startOrEnd(false)
        }
    }, err => {
        if (isDebug) {
            console.group(`%c Respond %c ${url.replace('//', '')} `, 'font-size:12px;background:#FA531B ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'font-size:12px;background:#FA8954 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff')
            console.error('╔════════════════════════════════════════════════')
            console.error('║   无法连接服务器！')
            console.error('║   错误原因：', err)
            console.error('╚════════════════════════════════════════════════')
            console.groupEnd()
        }
        if (startOrEnd.name !== 'startOrEnd') Okam.$apiAlign.hideLoading()
        if (fail.name !== 'fail') {
            Okam.$apiAlign.showToast('无法连接服务器', {type: 'exception'})
        }
        fail('无法连接服务器！', -1)
        startOrEnd(false)
    })
}

export const $uploadFile = (url, fileKey, filePath, params, {startOrEnd = () => {}, success = () => {}, fail = () => {}}) => {
    if (isDebug) {
        console.groupCollapsed(`%c Request %c ${url.replace('//', '')} `, 'font-size:12px;background:#27B3EB ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'font-size:12px;background:#66D9FC ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff')
        console.log('╔════════════════════════════════════════════════')
        console.log(params)
        console.log('╚════════════════════════════════════════════════')
        console.groupEnd()
    }
    startOrEnd(true)

    if (startOrEnd.name !== 'startOrEnd') Okam.$apiAlign.showLoading('加载中...')
    const Timestamp = new Date().getTime()
    let token = Okam.$apiAlign.getStorageSync('token') || ''
    let headers = {'Accept': 'application/json', 'Content-Type': 'multipart/form-data'}
    headers['platform'] = process.env.APP_TYPE
    headers['Timestamp'] = Timestamp.toString()
    headers['jjsb-access-token'] = token
    headers['sign'] = MD5.hex_md5(`${Timestamp.toString()}${token}${APP_KEY}`)
    Okam.$api.uploadFile({
        url: url,
	    name: fileKey,
        filePath: filePath,
        fromData: params,
        header: headers,
        headers: headers, // 兼容支付宝小程序
        success: (response) => {
	        response.data = JSON.parse(response.data)
            if (response.status === 200 || response.statusCode === 200) {
                let {resultCode, resultMessage, resultMsg, resultBody, statusCode} = response.data
                if (isDebug) {
                    if (resultCode === 1 || resultCode === '1' || resultCode === '304' || statusCode === '100') {
                        console.groupCollapsed(`%c Respond %c ${url.replace('//', '')} `, 'font-size:12px;background:#41b883 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'font-size:12px;background:#4AE6A8 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff')
                        console.log('╔═══════════════════════════════════════════════')
                        console.log(`║   成功提示：${resultMessage || resultMsg}`)
                        console.log(resultBody)
                        console.log('╚════════════════════════════════════════════════')
                        console.groupEnd()
                    } else {
                        console.group(`%c Respond %c ${url.replace('//', '')} `, 'font-size:12px;background:#CFC169 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'font-size:12px;background:#E3D67E ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff')
                        console.warn('╔═══════════════════════════════════════════════')
                        console.warn(`║   错误码：${resultCode || statusCode}`)
                        console.warn(`║   错误提示：${resultMessage || resultMsg}`)
                        console.warn('╚════════════════════════════════════════════════')
                        console.groupEnd()
                    }
                }
                switch (String(resultCode || statusCode)) {
                    case '1':
                    case '100':
                    case '304':
                        if (startOrEnd.name !== 'startOrEnd') Okam.$apiAlign.hideLoading()
                        success(resultBody, resultMessage || resultMsg)
                        startOrEnd(false)
                        break
                    default:
                        if (startOrEnd.name !== 'startOrEnd') Okam.$apiAlign.hideLoading()
                        if (fail.name !== 'fail' && (resultMessage || resultMsg)) {
                            Okam.$apiAlign.showToast(resultMessage || resultMsg, {type: 'exception'})
                        }
                        fail(resultMessage || resultMsg, resultCode || statusCode)
                        startOrEnd(false)
                        break
                }
            } else {
                if (isDebug) {
                    console.group(`%c Respond %c ${url.replace('//', '')} `, 'font-size:12px;background:#FA531B ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'font-size:12px;background:#FA8954 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff')
                    console.error('╔════════════════════════════════════════════════')
                    console.error('║   无法连接服务器！')
                    console.error(`║   错误码：${response.status}`)
                    console.error('╚════════════════════════════════════════════════')
                    console.groupEnd()
                }
                if (startOrEnd.name !== 'startOrEnd') Okam.$apiAlign.hideLoading()
                if (fail.name !== 'fail') {
                    Okam.$apiAlign.showToast('无法连接服务器', {type: 'exception'})
                }
                fail('无法连接服务器！', -1)
                startOrEnd(false)
            }
        },
        fail: (err) => {
            if (isDebug) {
                console.group(`%c Respond %c ${url.replace('//', '')} `, 'font-size:12px;background:#FA531B ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'font-size:12px;background:#FA8954 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff')
                console.error('╔════════════════════════════════════════════════')
                console.error('║   无法连接服务器！')
                console.error('║   错误原因：', err)
                console.error('╚════════════════════════════════════════════════')
                console.groupEnd()
            }
            if (startOrEnd.name !== 'startOrEnd') Okam.$apiAlign.hideLoading()
            if (fail.name !== 'fail') {
                Okam.$apiAlign.showToast('无法连接服务器', {type: 'exception'})
            }
            fail('无法连接服务器！', -1)
            startOrEnd(false)
        }
    })
}
