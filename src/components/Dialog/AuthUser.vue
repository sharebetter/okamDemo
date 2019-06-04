<template>
    <view class="user-auth-body" :class="dialogShow?'dialog-show':'dialog-close'" v-if="dialogShow">
        <view class="dialog-body">
            <view class="head-layout">
                <image class="head" src="../../common/img/bg_user_auth.png" />
                <view>欢迎使用易参保</view>
            </view>
            <view class="auth-msg">为了方便您更好的体验易参保，需要您先授权一下</view>
            <ant-env>
                <button class="btn-accredit" @click="onAntAuth">授权</button>
            </ant-env>
            <wx-env>
                <button class="btn-accredit" open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onWxAuth">授权</button>
            </wx-env>
            <tt-env>
                <button class="btn-accredit" @click="onTTAuth">授权</button>
            </tt-env>
            <swan-env>
                <button class="btn-accredit" @click="onSwanAuth">授权</button>
            </swan-env>
        </view>
    </view>
</template>
<script>

    import {$post} from '../../common/request/baseApi'

    export default {
        config: {},

        props: {
        },

        data: {
            dialogShow: false // 是否显示弹窗
        },

        created() {
            if (process.env.NODE_ENV !== "development") {
                $post('https://ycb.jjshebao.com/baseData/getArraignment', {}, {
                    success: data => {
                        // todo 提审时间
                        if (data === '2019-05-07') {
                            this.$config.serviceUrl = {
                                ycbUrl: 'https://tst-ycb.jjshebao.com',
                                apiUrl: 'https://tst-apishebao.jjshebao.com/v20'
                            }
                        }
                        this.startAuth()
                    },
                    fail: msg => {
                        this.$apiAlign.showToast(msg)
                        this.startAuth()
                    }
                })
            } else {
                this.startAuth()
            }
        },

        methods: {
            // this.$emit('userAuthCallBack', {success: true, data: res})
            // this.$emit('userAuthCallBack', {success: false, msg: res.error})
            onWxAuth(res) {
                if (res.detail.errMsg.indexOf('ok') > -1) {
                    this.startAuth()
                }
            },
            onAntAuth() {
                this.$api.getAuthCode({
                    scopes: 'auth_user',
                    success: res => {
                        this.startAuth()
                    }
                })
            },
            onTTAuth() {
                this.$api.authorize({
                    scope: 'scope.userInfo',
                    success: (res)=> {
                        this.startAuth()
                    }
                })
            },
            onSwanAuth() {
                this.$api.authorize({
                    scope: 'scope.userInfo',
                    success: (res)=> {
                        this.startAuth()
                    }
                })
            },
            startAuth() {
                if (this.$config.testToken) {
                    this.$apiAlign.setStorageSync('token', this.$config.testToken)
                }
                if (this.$apiAlign.getStorageSync('token')) {
                    this.$request.getCustom({
                    	success: data => {
                            this.dialogShow = false
                            data.jjsb_access_token = this.$apiAlign.getStorageSync('token')
                            this.$emit('userAuthCallBack', {success: true, needBindPhone: false, data: {jjsb_access_token: this.$apiAlign.getStorageSync('token'), userInfo: data}})
                    	},
                    	fail: (msg, code) => {
                            if (code === 116) {
                                this.$apiAlign.setStorageSync('token', '')
                                this.startAuth()
                            } else {
                                this.$apiAlign.showToast(msg)
                            }
                        }
                    });
                } else {
                    switch (this.platform) {
                        case 'wx':
                            this.$api.getUserInfo({
                                success: res => {
                                    this.$app.globalData.userInfo = res.userInfo
                                    this.$api.login({
                                        success: resCode => {
                                            this.$request.wxLogin({
                                                code: resCode.code,
                                                encryptedData: res.encryptedData,
                                                iv: res.iv
                                            }, {
                                                success: data => {
                                                    this.dialogShow = false
                                                    // 判断用户是否绑定手机号
                                                    if (!data.jjsb_code) {
                                                        this.$emit('userAuthCallBack', {success: true, needBindPhone: false, data: data})
                                                    } else {
                                                        this.$emit('userAuthCallBack', {success: false, needBindPhone: true, data: data})
                                                    }
                                                },
                                                fail: (msg, code) => {
                                                    if (code === '105') {
                                                        // 偶尔会出现第一次解密失败
                                                        this.startAuth()
                                                    } else {
                                                        this.$apiAlign.showToast(msg)
                                                    }
                                                }
                                            })
                                        }
                                    })
                                },
                                fail: e => {
                                    this.dialogShow = true
                                }
                            });
                            break;
                        case 'ant':
                            this.$api.getAuthCode({
                                scopes: 'auth_base', // 静默授权：auth_base、主动授权(弹窗)：auth_user
                                success: res => {
                                    this.$request.antLogin({
                                        authCode: res.authCode
                                    }, {
                                        success: data => {
                                            this.dialogShow = false
                                            // 判断用户是否绑定手机号
                                            if (!data.jjsb_code) {
                                                this.$emit('userAuthCallBack', {success: true, needBindPhone: false, data: data})
                                            } else {
                                                this.$emit('userAuthCallBack', {success: false, needBindPhone: true, data: data})
                                            }
                                        }
                                    })
                                },
                                fail: e => {
                                    this.dialogShow = true
                                }
                            });
                            break;
                        case 'tt':
                            this.$api.login({
                                success: res => {
                                    this.$request.ttLogin({
                                        code: res.code
                                    }, {
                                        success: data => {
                                            this.dialogShow = false
                                            // 判断用户是否绑定手机号
                                            if (!data.jjsb_code) {
                                                this.$emit('userAuthCallBack', {success: true, needBindPhone: false, data: data})
                                            } else {
                                                this.$emit('userAuthCallBack', {success: false, needBindPhone: true, data: data})
                                            }
                                        }
                                    })
                                },
                                fail: err => {
                                    this.$emit('userAuthCallBack', {success: false, needBindPhone: true, data: {}})
                                    console.log('',err)
                                }
                            });
                            break;
                        case 'swan':
                            this.$api.login({
                                success: (res)=> {
                                    this.$request.swanLogin({
                                        code: res.code
                                    }, {
                                        success: data => {
                                            this.dialogShow = false
                                            // 判断用户是否绑定手机号
                                            if (!data.jjsb_code) {
                                                this.$emit('userAuthCallBack', {success: true, needBindPhone: false, data: data})
                                            } else {
                                                this.$emit('userAuthCallBack', {success: false, needBindPhone: true, data: data})
                                            }
                                        }
                                    })
                                }
                            });
                            break;
                    }
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .user-auth-body {
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
            width: 590px;
            border-radius: 8px;
            padding-top: 40px;

            .head-layout {
                width: 398px;
                height: 325px;
                margin: 0 auto;
                position: relative;

                image {
                    width: 100%;
                    height: 100%;
                }
                view {
                    position: absolute;
                    top: 255px;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    color: white;
                    font-size: 34px;
                }
            }
            .auth-msg {
                color: #333333;
                width: 380px;
                margin: 10px auto;
                text-align: center;
            }

            .btn-accredit {
                height: 70px;
                line-height: 70px;
                width: 380px;
                color: white;
                font-size: 34px;
                text-align: center;
                margin: 20px auto 40px auto;
                background: #00aaff;
                border-radius: 40px;
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
</style>
