<template xmlns="element.dtd">
    <view class="splash-body">
        <view class="flex-v width-parent height-parent align-center bg-white">
            <image class="splash-img" src="../../common/img/bg_splash.jpg"/>
        </view>
        <auth-phone :show="phoneAuthDialog" @authCallBack="authCallBack"></auth-phone>
        <auth-user @userAuthCallBack="userAuthCallBack"></auth-user>
    </view>
</template>
<script>
    import AuthPhone from '../../components/Dialog/AuthPhone'
    import AuthUser from '../../components/Dialog/AuthUser'

    export default {
        config: {
            title: '',
            _antEnv: {
                defaultTitle: ''
            },
        },
        components: {
            AuthPhone,
            AuthUser
        },
        data: {
            phoneAuthDialog: false,
        },

        created() {
        },
        onLoad(options) {
            if (options && options.channel) {
                this.globalVariable.channel = options.channel
            }
        },
        onShow() {},
        onHide() {},

        methods: {
            userAuthCallBack(res) {
                let {success, needBindPhone, data} = res.detail
                if (success) {
                    this.loginSuccess(data)
                } else {
                    if (needBindPhone) {
                        this.$app.globalData.jjsb_code = data.jjsb_code
                        this.phoneAuthDialog = true
                    }
                }
            },
            authCallBack(res) {
                let {success, needJumpSms, data} = res.detail
                if (success) {
                    if (needJumpSms) {
                        // 跳转到短信验证绑定
                        this.$api.redirectTo({
                            url: '/pages/AppModule/smsLogin'
                        })
                    } else {
                        this.loginSuccess(data)
                    }
                } else {
                    this.$apiAlign.showToast(res.detail.msg)
                }
            },
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
                    this.jumpMainPage()
            	}
            })
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
        jumpMainPage() {
            // 解决百度小程序不支持启动页的问题，发送通知告诉主页更新数据
            this.$eventHub.emit(this.$eventFlag.refreshHome, {msg: ''})
            // 跳转到主页，支付宝模拟器比较奇葩，需要通过以下方式解决开发时跳转的问题
            if (this.platform === 'ant' && this.isAntEmulator()) {
                this.$api.redirectTo({
                    url: '/pages/MainTabModule/mainHome'
                })
            } else {
                this.$api.switchTab({
                    url: '/pages/MainTabModule/mainHome'
                })
            }
        },
    }
</script>
<style lang="less" scoped>
    .splash-body {
        position: absolute;
        top: 0;
        bottom: 0;

        .splash-img {
            width: 750px;
            height: 1040px;
        }
    }
</style>
