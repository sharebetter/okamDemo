<template xmlns="element.dtd">
    <view class="sms-body">
        <image class="img-head" src="../../common/imgCloud/bg_login_head.png"/>
        <view class="card-box">
            <input class="input-phone" :class="inputPhoneFocus?'input-phone-focus':''" placeholder="输入手机号" maxlength="11" type="number" id="phone" :focus="setInputPhoneFocus" @focus="onPhoneFocus" @input="bindPhoneInput"/>
            <view class="code-layout" :class="inputCodeFocus?'code-layout-focus':''">
                <input class="input-code" placeholder="手机验证码" maxlength="6" type="number" id="code" :focus="setInputCodeFocus" @focus="onCodeFocus" @input="bindCodeInput"/>
                <view class="btn-code" :class="codeTime===0?'':'btn-code-time'" @click="onGetCodeClick">{{codeMsg}}</view>
            </view>
            <text class="auth-protocol" @click="onProtocolClick">登录默认您同意《易参保用户协议》</text>
            <button class="btn-login" @click="onLoginClick">登录</button>
        </view>
    </view>
</template>
<script>
    import md5 from '../../common/utils/md5Utils'
    import { checkMobile } from '../../common/utils/checkUtils'

    export default {
        config: {
            title: '登录',
            _antEnv: {
                defaultTitle: '登录'
            }
        },

        components: {},

        data: {
            inputPhoneFocus: false,
            inputCodeFocus: false,
            setInputPhoneFocus: false,
            setInputCodeFocus: false,
            phone: '',
            code: '',
            codeTime: 0,
            codeMsg: '获取验证码'
        },
        created() {
        },
        mounted() {
            this.setInputPhoneFocus = true
        },

        methods: {
            onPhoneFocus() {
                this.inputPhoneFocus = true
                this.inputCodeFocus = false
            },
            onCodeFocus() {
                this.inputCodeFocus = true
                this.inputPhoneFocus = false
            },
            bindPhoneInput(e) {
                this.phone = e.detail.value
            },
            bindCodeInput(e) {
                this.code = e.detail.value
            },
            onGetCodeClick() {
                if (this.codeTime !== 0) {
                    return
                }
                if (!checkMobile(this.phone)) {
                    this.$apiAlign.showToast('请输入正确的手机号')
                    return
                }
                let timestamp = new Date().getTime().toString()
                this.$request.sendSms({
                    mobile: this.phone,
                    temp: 'login',
                    timestamp: timestamp,
                    sign: md5.hex_md5(`JJSB09$%D89@!@==${timestamp}${this.phone}`)
                }, {
                    success: res => {
                        this.setInputCodeFocus = true
                        this.$apiAlign.showToast('验证码已发送,请查看手机短信')
                        this.codeTime = 60
                        this.setCodeMsg()
                    }
                })
            },
            onProtocolClick() {
                this.$api.navigateTo({
                    url: `/pages/AppModule/webPage?title=易参保用户协议&url=https://rd.jjshebao.com/ycb/register_protocol.html`
                })
            },
            onLoginClick() {
                if (!checkMobile(this.phone)) {
                    this.$apiAlign.showToast('请输入正确的手机号')
                    return
                }
                if (!this.code) {
                    this.$apiAlign.showToast('请输入验证码')
                    return
                }
                this.$request.loginBySms({
                    mobile: this.phone,
                    code: this.code,
                    jjsb_code: this.$app.globalData.jjsb_code,
                    temp: 'login'
                }, {
                    success: data => {
                        this.loginSuccess(data)
                    }
                })
            }
        },
        setCodeMsg() {
            setTimeout(() => {
                if (this.codeTime === 0) {
                    this.codeMsg = '重新获取'
                } else {
                    this.codeMsg = `重新获取(${this.codeTime--})`
                    this.setCodeMsg()
                }
            }, 1000)
        },
        // 判断是否支付宝模拟器
        isAntEmulator() {
            let isEmulator = false
            this.$api.onWifiConnected({
                fail: (res) => {
                    if (res.errorMessage.indexOf('IDE') > -1) {
                        isEmulator = true
                    }
                }
            })
            return isEmulator
        },
        loginSuccess(data) {
            this.$app.globalData.isLogin = true
            this.$app.globalData.userInfoApp = data.userInfo
            this.$apiAlign.setStorageSync('token', data.jjsb_access_token)
            this.getBaseData()
        },
        getBaseData() {
            this.$request.getBaseData({
                success: data => {
                    //初始化下单页面需要数据
                    data.city.forEach(function(value1, index1, array1) {
                        value1.package.forEach(function(value, index, array) {
                            data.city[index1].package[index].packegeName2 = data.city[index1].package[index].packegeName
                            if (Number(value.discount) !== 1) {
                                data.city[index1].package[index].packegeName3 = ` (${(parseFloat(data.city[index1].package[index].discount) * 10).toFixed(1).replace('.0', '')}折 ${data.city[index1].package[index].prize}元/月)`
                                data.city[index1].package[index].packegeName += ` (${(parseFloat(data.city[index1].package[index].discount) * 10).toFixed(1).replace('.0', '')}折 ${data.city[index1].package[index].prize}元/月)`
                            } else {
                                data.city[index1].package[index].packegeName3 = ` (${data.city[index1].package[index].prize}元/月)`
                                data.city[index1].package[index].packegeName += ` (${data.city[index1].package[index].prize}元/月)`
                            }
                        })
                    })

                    data.topCity.forEach(function(value1, index1, array1) {
                        value1.package.forEach(function(value, index, array) {
                            data.topCity[index1].package[index].packegeName2 = data.topCity[index1].package[index].packegeName
                            if (Number(value.discount) !== 1) {
                                data.topCity[index1].package[index].packegeName3 = ` (${(parseFloat(data.topCity[index1].package[index].discount) * 10).toFixed(1).replace('.0', '')}折 ${data.topCity[index1].package[index].prize}元/月)`
                                data.topCity[index1].package[index].packegeName += ` (${(parseFloat(data.topCity[index1].package[index].discount) * 10).toFixed(1).replace('.0', '')}折 ${data.topCity[index1].package[index].prize}元/月)`
                            } else {
                                data.topCity[index1].package[index].packegeName3 = ` (${data.topCity[index1].package[index].prize}元/月)`
                                data.topCity[index1].package[index].packegeName += ` (${data.topCity[index1].package[index].prize}元/月)`
                            }
                        })
                    })
                    this.$app.globalData.baseData = data
                    // 解决百度小程序不支持启动页的问题，发送通知告诉主页更新数据
                    this.$eventHub.emit(this.$eventFlag.refreshHome, {msg: ''})
                    // 跳转到主页，支付宝模拟器比较奇葩，需要通过以下方式解决开发时的问题
                    if (this.platform === 'ant' && this.isAntEmulator()) {
                        this.$api.redirectTo({
                            url: '/pages/MainTabModule/mainHome'
                        })
                    } else {
                        this.$api.switchTab({
                            url: '/pages/MainTabModule/mainHome'
                        })
                    }
                }
            })
        }
    }
</script>
<style lang="less">
    .sms-body {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;

        .img-head {
            width: 100%;
            height: 350px;
        }

        .card-box {
            width: 90%;
            margin: 20px auto;
            padding-top: 40px;
            padding-bottom: 20px;
            box-shadow: 0 0 20px #bfbfbf;
            border-radius: 8px;

            .input-phone {
                width: 86%;
                height: 90px;
                display: block;
                padding: 0 2%;
                margin: 0 auto;
                border-bottom: 2px solid #cdcdcd;
            }
            .input-phone-focus {
                border-bottom: 2px solid #00aaff;
            }
            .code-layout {
                width: 90%;
                height: 90px;
                margin: 0 auto;
                display: flex;
                border-bottom: 2px solid #cdcdcd;

                .input-code {
                    width: 96%;
                    height: 90px;
                    padding: 0 2%;
                    display: block;
                    flex: 1;
                }

                .btn-code {
                    color: #00aaff;
                    height: 90px;
                    line-height: 90px;
                    top: 0;
                    right: 2%;
                }
                .btn-code-time {
                    color: #999999;
                }
            }
            .code-layout-focus {
                border-bottom: 2px solid #00aaff;
            }
            .auth-protocol {
                color: #00aaff;
                margin-top: 30px;
                text-align: center;
                display: block;
                font-size: 28px;
            }
            .btn-login {
                width: 90%;
                height: 90px;
                color: white;
                margin: 40px auto;
                background: #00aaff;
                border-radius: 10px;
            }

        }
    }

</style>
