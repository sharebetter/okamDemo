<template>
    <view class="auth-body" :class="show?'dialog-show':'dialog-close'" v-if="show">
        <view class="dialog-body">
            <view class="head-layout">
                <image src="../../common/img/icon_logo_ylzqy.png" />
                <text>易参保</text>
            </view>
            <view class="h-line"></view>
            <text class="auth-msg">{{authMsg}}</text>
            <wx-env><text class="auth-protocol" @click="onProtocolClick">登录默认您同意《易参保用户协议》</text></wx-env>
            <ant-env><text class="auth-protocol" @click="onProtocolClick">登录默认您同意《易参保用户协议》</text></ant-env>
            <view class="btn-layout">
                <button class="btn-cancel" v-if="confirmText === '一键登录'" @click="onCancelClick">取消</button>
                <ant-env>
                    <button class="btn-accredit" open-type="getAuthorize"
                            onGetAuthorize="onAntAuthSuccess" onError="onAntAuthError"
                            scope='phoneNumber'>{{confirmText}}</button>
                </ant-env>
                <wx-env>
                    <button class="btn-accredit" open-type="getPhoneNumber" lang="zh_CN" bindgetphonenumber="onWxAuth">{{confirmText}}</button>
                </wx-env>
                <tt-env>
                    <button class="btn-accredit" @click="onTTAuth">{{confirmText}}</button>
                </tt-env>
                <swan-env>
                    <button class="btn-accredit" @click="onSwanAuth">{{confirmText}}</button>
                </swan-env>
            </view>

        </view>
    </view>
</template>
<script>

    export default {
        config: {},

        props: {
            // 是否显示弹窗
            show: Boolean
        },

        data: {
            authMsg: '',
            confirmText: ''
        },

        created() {
            if (this.platform === 'wx' || this.platform === 'ant') {
                this.authMsg = '易参保小程序申请使用您的个人信息以完成快速登录'
                this.confirmText = '一键登录'
            } else {
                this.authMsg = '易参保小程序需要验证您的手机号才能为您提供更好的服务'
                this.confirmText = '立即验证'
            }
        },

        methods: {
            onCancelClick() {
                // 暂不支持取消
                this.$emit('authCallBack', {success: true, needJumpSms: true, data: {}})
            },
            onProtocolClick() {
                this.$api.navigateTo({
                    url: `/pages/AppModule/webPage?title=易参保用户协议&url=https://rd.jjshebao.com/ycb/register_protocol.html`
                })
            },
            onWxAuth(res) {
                if (res.detail.errMsg.indexOf('ok') > -1) {
                    this.$api.login({
                        success: resCode => {
                            let param = {
                                jjsb_code: this.$app.globalData.jjsbCode,
                                code: resCode.code,
                                encryptedData: res.detail.encryptedData,
                                iv: res.detail.iv
                            }
                            this.$request.wxBindingPhone(param, {
                                success: data => {
                                    this.$emit('authCallBack', {success: true, needJumpSms: false, data: data})
                                },
                                fail: (msg, code) => {
                                    if (code === '105') {
                                        // 有可能第一次解密会解密不了。第二次正常
                                        this.$request.wxBindingPhone(param, {
                                            success: data => {
                                                this.$emit('authCallBack', {success: true, needJumpSms: false, data: data})
                                            }
                                        })
                                    } else {
                                        this.$apiAlign.showToast(msg)
                                    }
                                }
                            })
                        }
                    })
                } else {
                    this.$apiAlign.showToast('无法获取您的手机号')
                    this.$emit('authCallBack', {success: true, needJumpSms: true, data: {}})
                }
            },
            onAntAuthSuccess(e) {
                this.$api.getAuthCode({
                    scopes: 'auth_user',
                    success: resCode => {
                        this.$api.getPhoneNumber({
                            success: (res) => {
                                let encryptedData = Object.assign({authCode: resCode.authCode, jjsb_code: this.$app.globalData.jjsbCode}, JSON.parse(res.response))
                                this.$request.antBindingPhone(encryptedData ,{
                                    success: data => {
                                        this.$emit('authCallBack', {success: true, needJumpSms: false, data: data})
                                    }
                                })
                            },
                            fail: (res) => {
                                this.$apiAlign.showToast(res)
                            }
                        })
                    }
                })
            },
            onAntAuthError(res) {
                this.$apiAlign.showToast(res)
            },
            onTTAuth() {
                // 跳转到短信验证绑定
                this.$emit('authCallBack', {success: true, needJumpSms: true, data: {}})
            },
            onSwanAuth() {
                // 跳转到短信验证绑定
                this.$emit('authCallBack', {success: true, needJumpSms: true, data: {}})
            }
        },
        watch: {
            show(newValue, oldValue) {
                if (newValue) {
                    // 显示
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .auth-body {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background: rgba(0, 0, 0, .5);
        top: 0;
        bottom: 0;
        left: 0;

        .dialog-body {
            background: white;
            width: 560px;
            border-radius: 8px;
            padding: 30px 30px 10px 30px;

            .head-layout {
                display: flex;
                align-items: center;
                image {
                    width: 70px;
                    height: 70px;
                    margin-right: 30px;
                }
                text {
                    font-size: 34px;
                }
            }
            .h-line{
                background: #cdcdcd;
                width: 100%;
                height: 2px;
                margin-top: 20px;
                margin-bottom: 20px;
            }
            .auth-msg {
                font-size: 30px;
                color: #999;
            }
            .auth-protocol {
                color: #00aaff;
                margin-top: 30px;
                display: block;
                font-size: 28px;
            }

            .btn-layout {
                width: 100%;
                display: flex;
                margin-top: 30px;
                justify-content: flex-end;

                .btn-cancel {
                    width: 110px;
                    height: 80px;
                    line-height: 80px;
                    display: inline-block;
                    background: transparent;
                    text-align: center;
                    border: none;
                    margin: 0;
                    padding: 0;
                }
                .btn-cancel::after {
                    border: none;
                    margin: 0;
                    padding: 0;
                }
                .btn-accredit {
                    height: 80px;
                    line-height: 80px;
                    color: #00aaff;
                    text-align: center;
                    display: inline-block;
                    background: transparent;
                    margin: 0 0 0 40px;
                    border: none;
                    padding: 0;
                }
                .btn-accredit::after {
                    border: none;
                    margin: 0;
                    padding: 0;
                }
            }
        }

        .hello-btn {
            border: none;
            text-align: center;
            background: #fff;
        }
    }
</style>
