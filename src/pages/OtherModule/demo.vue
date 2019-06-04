<template xmlns="element.dtd">
    <import src="../../common/tpl/footer.tpl"/>
    <view class="home-wrap">
        <image class="page-img" src="../../common/img/okm.png"/>
        <!--多平台兼容写法-->
        <wx-env>
            <view class="app-type">我是微信小程序</view>
        </wx-env>
        <ant-env>
            <view class="app-type">我是支付宝小程序</view>
        </ant-env>
        <tt-env>
            <view class="app-type">我是头条小程序</view>
        </tt-env>
        <swan-env>
            <view class="app-type">我是百度小程序</view>
        </swan-env>
        <view class="flex-h align-around-horizontal">
            <view class="tools" @click="onToastClick">toast</view>
            <view class="tools" @click="onDialogClick">dialog</view>
        </view>
        <view class="flex-h align-around-horizontal">
            <view class="tools" @click="onLoadingClick">loading</view>
            <view class="tools" @click="onLocalStorageClick">localStorage</view>
        </view>
        <view class="flex-h align-around-horizontal">
            <navigator class="tools" url="template">页面跳转</navigator>
            <view class="tools" @click="onJumpPage">页面跳转(代码)</view>
        </view>
        <view class="flex-h align-around-horizontal">
            <input class="input-code" placeholder="手机验证码" maxlength="6" type="number" id="code" v-model="smsCode" :focus="setInputFocus" @focus="onFocus" @blur="onBlur" @input="bindInput"/>
            <switch bindchange="onSwitchChange" onChange="onSwitchChange"></switch>
        </view>
        <hello :from="from" @hello="onHandleHello"></hello>
        <view class="click-tip" v-if="clicked" @click="onNetClick">点击请求网络~</view>
        <view v-for="list" v-bind:key="item">
            {{item + index}}
        </view>
        <view v-html="content"></view>
    </view>
    <tpl is="page-footer"/>
</template>
<script>
    import Hello from '../../components/General/Hello'

    export default {
        config: {
            title: '小程序标题',
            _antEnv: {
                defaultTitle: '支付宝小程序标题'
            },
        },

        components: {
            Hello
        },

        data: {
            btnText: 'Hello',
            content: '',
            smsCode: '456789',
            clicked: false,
            setInputFocus: false,
            from: 'Demo',
            list: [
                '微信小程序',

                '支付宝小程序',
                '头条小程序',
                '百度小程序'
            ]
        },

        // 生命周期
        created() {
            console.log('page created')
            /*------------------------------广播事件用法-------------------------------*/
            // 监听广播事件
            this.$eventHub.on(this.$eventFlag.refresh, (data) => {
                console.log(data)
            })
            // 手动移除广播事件
            /*this.$eventHub.off(this.$eventFlag.refresh,  (data) => {
                console.log('remove' , data)
            })*/
            // 发送广播事件
            this.$eventHub.emit(this.$eventFlag.refresh, {msg: '123456'})
            /*------------------------------广播事件用法-------------------------------*/
        },
        onLoad() {
            console.log('page load')
            /*------------------------------富文本用法-------------------------------*/
            // 富文本填值（支付宝兼容）
            let htmlContent = '<div style="color: red; font-size: 26px">我是富文本</div>'
            if (process.env.APP_TYPE === 'ant') {
                this.$api.htmlToNodes(htmlContent, (err, nodes) => {
                    if (!err) {
                        this.content = nodes
                    }
                })
            } else {
                this.content = htmlContent
            }
            /*------------------------------富文本用法-------------------------------*/
        },
        mounted() {
            console.log('page mounted')
        },
        onShow() {
            console.log('page show')
            // 上个页面带回的数据
            this.$onResultListener({
                success: (code, data) => {
                    console.log(code, data)
                }
            })
        },
        onHide() {
            console.log('page hide')
        },
        destroyed() {
            console.log('page destroyed')
        },

        methods: {
            onSwitchChange(e) {
                let isCheck = e.detail.value === undefined ? e.detail.checked : e.detail.value
                this.setInputFocus = isCheck

                console.log('isCheck', isCheck)
            },
            onFocus(e) {
                console.log('输入框获取焦点')
            },
            onBlur(e) {
                console.log('输入框失去焦点')
            },
            bindInput(e) {
                console.log(e.detail.value)
            },
            onHandleHello(e) {
                this.clicked = true;
                this.btnText = 'You clicked'
                this.$apiAlign.showToast('Received Hello', {duration: 3000})
            },
            onNetClick() {
                this.$request.getCustom({
                    startOrEnd: isStart => {
                        if (isStart) {
                            this.$apiAlign.showNavigationBarLoading()
                        } else {
                            this.$apiAlign.hideNavigationBarLoading()
                        }
                    },
                    success: data => {

                    },
                    fail: msg => {
                        this.$apiAlign.showToast('网络错误')
                    }
                })
            },
            onToastClick() {
                this.$apiAlign.showToast('toast消息')
            },
            onDialogClick() {
                this.$apiAlign.showConfirmDialog('这是一个弹框', {
                    confirm: () => {
                        this.$apiAlign.showToast('确定')
                    },
                    cancel: () => {
                        this.$apiAlign.showToast('取消')
                    }
                })
            },
            onLoadingClick() {
                this.$apiAlign.showLoading('加载中')
                this.$apiAlign.showNavigationBarLoading()
                setTimeout(()=> {
                    this.$apiAlign.hideLoading()
                    this.$apiAlign.hideNavigationBarLoading()
                }, 2000)
            },
            onLocalStorageClick() {
                this.$apiAlign.setStorageSync('token', '123456')
                this.$apiAlign.showToast('来自本地存储的内容:' + this.$apiAlign.getStorageSync('token'))
            },
            onJumpPage() {
                /*this.$api.navigateTo({
                    url: 'template?data=1234556546'
                })*/
                this.$api.navigateTo({
                    url: 'template',
                    query: {
                        data: '123456***'
                    },
                    params: {
                        test: 'sssaaaddd***'
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .home-wrap {
        box-sizing: border-box;
        height: 100vh;
        background: #f0f0f0;
        .app-type {
            margin-left: 20px;

            // 多平台样式兼容写法
            -wx-color: green;
            -ant-color: blue;
            -tt-color: red;
            -swan-color: orange;

            -wx-font-size: 24px;
            -ant-font-size: 36px;
            -tt-font-size: 40px;
            -swan-font-size: 46px;
        }

        .input-code {
            border-bottom: 2px solid #bfbfbf;
            padding-left: 20px;
        }

        .click-tip {
            text-align: center;
            color: red;
        }
        .tools {
            width: 40%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            margin-top: 10px;
            border: 2px solid #bfbfbf;
            border-radius: 10px;
        }
    }

</style>
