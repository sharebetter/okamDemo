<template xmlns="element.dtd">
    <web-view src="{{url}}"></web-view>
</template>
<script>
    export default {
        config: {
            title: '加载中...',
            _antEnv: {
                defaultTitle: '加载中...'
            }
        },
        data: {
            url: ''
        },
        created() {
            let {title, url} = this.$query
            this.$apiAlign.setNavigationBarTitle(title)
            this.url = url
        }
    }
</script>
<style>
</style>
