<template xmlns="element.dtd">
    <view class="body">
        模板
    </view>
</template>
<script>

    export default {
        config: {
            title: '模板',
            _antEnv: {
                defaultTitle: '模板'
            },
        },
        components: {},
        data: {
            info: ''
        },

        created() {
            console.log('params', this.$params()) // 获取对象数据
            console.log('query', this.$query)
        },
        onShow() {},
        onHide() {},
        destroyed() {
            // 回传数据到上个页面
            this.$setResult(20, '123456')
        },

        methods: {

        }
    }
</script>
<style lang="less" scoped>
    .body {
        width: 100%;

    }
</style>
