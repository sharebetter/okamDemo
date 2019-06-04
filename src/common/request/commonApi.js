/**
 * Created By   : lilinxiang
 * Created Date : 2018/12/20
 * Description  : 通用接口
 */
import {$post} from './baseApi'
import Okam from 'okam-core/src/base/base'
let serviceUrl = Okam.$config.serviceUrl
let appId = Okam.$config.appId

export default {
    /**
     * 获取提审时间
     */
    getArraignment: (callback) => $post('https://ycb.jjshebao.com/baseData/getArraignment', {}, callback),
    /**
     * 微信授权登录
     */
    wxLogin: (params, callback) => $post(`${serviceUrl.ycbUrl}/wechat/checkBind/${appId}`, params, callback),
    /**
     * 支付宝授权登录
     */
    antLogin: (params, callback) => $post(`${serviceUrl.ycbUrl}/alipay/checkBind/${appId}`, params, callback),
    /**
     * 头条授权登录
     */
    ttLogin: (params, callback) => $post(`${serviceUrl.ycbUrl}/toutiao/checkBind/${appId}`, params, callback),
    /**
     * 百度授权登录
     */
    swanLogin: (params, callback) => $post(`${serviceUrl.ycbUrl}/baidu/checkBind/${appId}`, params, callback),
    /**
     * 支付宝手机号绑定
     */
    antBindingPhone: (params, callback) => $post(`${serviceUrl.ycbUrl}/alipay/decriptPhoneAndLogin/${appId}`, params, callback),
    /**
     * 微信手机号绑定
     */
    wxBindingPhone: (params, callback) => $post(`${serviceUrl.ycbUrl}/wechat/decriptPhoneAndLogin/${appId}`, params, callback),
    /**
     * 微信平台短信登录
     */
    loginBySms: (params, callback) => $post(`${serviceUrl.ycbUrl}/userModel/loginBySms`, params, callback),
    /**
     * 发送短信验证码
     * temp register:注册,unbindName:实名认证解绑, bindName:实名认证,resetPassword:重置密码,register02:授权注册
     */
    sendSms: (params, callback) => $post(`${serviceUrl.ycbUrl}/other/sendSms`, params, callback),
    /**
     * 获取用户信息
     */
    getCustom: (callback) => $post(`${serviceUrl.ycbUrl}/userModel/getCustomInfo`, {}, callback),
    /**
     * 获取基础信息
     */
    getBaseData: (callback) => $post(`${serviceUrl.ycbUrl}/baseData/getBaseData`, {}, callback)
}
