<template xmlns="element.dtd">
	<view class="home-body">
        首页
        <navigator class="color-blue font-size-36" url="/pages/OtherModule/demo">跳转Demo</navigator>
	</view>
</template>
<script>

	export default {
		config: {
			// title: '',
			// defaultTitle: ''
		},
		components: {
		},
		data: {
		    info: '',
		},

		created() {
			// 为了实现百度小程序启动页效果，特做以下方式兼容
			if (this.platform === 'swan') {
				// 监听广播事件
				this.$eventHub.on(this.$eventFlag.refreshHome, (data) => {
					// 百度小程序执行初始化操作
					console.log('执行初始化操作')
                    this.checkUpdate()
				})
				this.$api.navigateTo({
					url: '/pages/AppModule/splashPage'
				})
			} else {
				// 其他小程序执行初始化操作
				console.log('执行初始化操作')
                this.checkUpdate()
			}
		},
		onShow() {
		},
		onHide() {
		},
		methods: {
		},
		/**
		 * 检查更新
		 */
		checkUpdate() {
			if (process.env.NODE_ENV === "development" || this.platform === 'ant' || this.platform === 'tt') return
			const updateManager = this.$api.getUpdateManager()
			updateManager.onCheckForUpdate((res) => {
				// 请求完新版本信息的回调
                if (res.hasUpdate) {
                    this.$apiAlign.showToast('检测到新版本，正在为您更新')
                }
			})
			updateManager.onUpdateReady(() => {
				this.$apiAlign.showConfirmDialog('新版本已经准备好，即将重启应用', {
					confirm: () => {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate()
					}
				})
			})
			updateManager.onUpdateFailed(() => {
				// 新版本下载失败
				console.log('新版本下载失败')
			})
		}
	}
</script>
<style lang="less" scoped>
	.home-body {
		width: 100%;
		background: white;

	}
</style>
