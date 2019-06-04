<template xmlns="element.dtd">
    <view class="hello-wrap">
        <button plain class="hello-btn" @click="handleClick">这是一个组件 父页面数据：{{from}}</button>
        <image class="image-photo" src="../../common/img/okm.png"/>
    </view>
</template>
<script>
export default {
    config: {
    },

    props: {
        from: String
    },

    components: {
    },

    data: {
    },

    methods: {
        handleClick() {
            this.$emit('hello', {from: this.from})
        }
    }
};
</script>
<style lang="less">
.hello-wrap {
    margin: 20px;

    .hello-btn {
        border: none;
        text-align: center;
        background: #fff;
        color: rebeccapurple;
    }
    .image-photo {
        display: block;
        width: 150px;
        height: 150px;
    }
}
</style>
