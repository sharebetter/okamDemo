<template xmlns="element.dtd">
    <view class="city-body">
        <input class="city-search" placeholder="请输入城市名或拼音" @input="input"/>
        <view v-for="cityGroupListDemo" v-bind:key="item">{{item.groupName}}</view>
        <view class="container">
            <!--  scroll-with-animation="true" 使用滚动动画会有bug -->
            <scroll-view class="city-list" scroll-y :scroll-into-view="scrollIntoViewId">
                <view v-for="cityGroup in cityGroupList" v-bind:key="cityGroup">
                    <!-- 定位城市 -->
                    <view v-if="cityGroup.groupName==='定位'" class="selection-location" id="location">
                        <view class="select-head">{{cityGroup.groupName}}</view>
                        <view class="btn-grid" @click="locationCity(cityGroup.locationCity)">定位中...</view>
                    </view>
                    <!-- 热门城市 -->
                    <view v-else-if="cityGroup.groupName==='热门'" class="selection-hot" id="hot">
                        <view class="select-head">{{cityGroup.groupName}}</view>
                        <view class="btn-grid-container">
                            <view v-for="cityHot in cityGroup.cityList" v-bind:key="cityHot" class="btn-grid" @click="chooseCity(cityHot)">{{cityHot.cityName}}</view>
                        </view>
                    </view>
                    <!-- 列表城市 -->
                    <view v-else class="selection-item" :id="cityGroup.groupName">
                        <view class="select-head">{{cityGroup.groupName}}</view>
                        <!-- <view class="btn-item">厦门市</view> -->
                        <view v-for="city in cityGroup.cityList" v-bind:key="city" class="btn-item" @click="chooseCity(city)">{{city.cityName}}</view>
                    </view>
                </view>
            </scroll-view>
            <view class="city-index" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchMove">
                <view v-for="cityIndexList" v-bind:key="item" class="index-item" :class="cityIndexTipsShow && cityIndexList[cityIndex] === item ? 'index-item-select' : ''">{{item}}</view>
                <!--<repeat v-for="cityIndexList" key="index" index="index">
					<view class="index-item {{cityIndexTipsShow&&cityIndexList[cityIndex]===item?'index-item-select':''">{{item}}</view>
				</repeat>-->
            </view>
            <view v-if="cityIndexTipsShow" class="city-index-tips">
                <view class="tips">{{cityIndexList[cityIndex]}}</view>
            </view>
            <view v-if="cityGroupList.length===0" class="empty-parent">
                <image src="../../common/img/icon_empty.png" />
                <view>没有搜到，换个词试试~~</view>
            </view>
        </view>
    </view>
</template>
<script>

    export default {
        config: {
            title: '城市选择',
            _antEnv: {
                defaultTitle: '城市选择'
            },
        },
        components: {},
        data: {
            windowHeight: 0,
            scrollIntoViewId: '',
            cityIndexTipsShow: false,
            cityIndex: 0,
            cityIndexList: ['定位', '热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
            cityGroupList: [],
            cityGroupListDemo: [],
            cityArray: [],
            tempCityArray: []
        },

        created() {
            this.$api.getSystemInfo({
                success: res => {
                    this.windowHeight = res.windowHeight
                }
            })
            // todo 定位
            /*this.$api.getLocation({
                type: 'wgs84',
                success: res => {
                    console.log(res)
                }
            })*/
            this.cityArray = this.$app.globalData.baseData.city
            // this.cityArray = res.params.cityArray
            this.initCity(false)
        },
        onShow() {},
        onHide() {},

        methods: {
            touchStart(res) {
                let {currentTarget, touches} = res
                let x = touches[0].pageX
                let y = touches[0].pageY
                if (x >= currentTarget.offsetLeft && y >= currentTarget.offsetTop) {
                    let index = parseInt((y - currentTarget.offsetTop) / (this.windowHeight - currentTarget.offsetTop) * 29)
                    this.cityIndex = index
                    if (this.cityIndexList[index] === '定位') {
                        this.scrollIntoViewId = 'location'
                    } else if (this.cityIndexList[index] === '热门') {
                        this.scrollIntoViewId = 'hot'
                    } else {
                        this.scrollIntoViewId = this.cityIndexList[index]
                    }
                    this.cityIndexTipsShow = true
                }
            },
            touchEnd(res) {
                this.cityIndexTipsShow = false
            },
            touchMove(res) {
                let {currentTarget, touches} = res
                let y = touches[0].pageY
                if (y >= currentTarget.offsetTop) {
                    let index = parseInt((y - currentTarget.offsetTop) / (this.windowHeight - currentTarget.offsetTop) * 29)
                    if (this.cityIndex !== index) {
                        this.cityIndex = index
                        if (this.cityIndexList[index] === '定位') {
                            this.scrollIntoViewId = 'location'
                        } else if (this.cityIndexList[index] === '热门') {
                            this.scrollIntoViewId = 'hot'
                        } else {
                            this.scrollIntoViewId = this.cityIndexList[index]
                        }
                    }
                }
            },
            input(res) {
                this.searchCity(res.detail.value)
            },
            locationCity() {

            },
            chooseCity(city) {
                this.$app.globalData.chooseCity = city
                this.$api.navigateBack()
            }
        },
        searchCity(keyword) {
            this.tempCityArray = []
            if (keyword) {
                this.cityArray.forEach(city => {
                    if (city.cityName.indexOf(keyword) !== -1 || city.cityPy.indexOf(keyword) !== -1) {
                        this.tempCityArray.push(city)
                    }
                })
                this.initCity(true)
            } else {
                this.initCity(false)
            }
        },
        initCity(isSearch) {
            if (this.cityArray.length === 0) return
            let tempCityGroupList = []
            if (isSearch) {
                // 列表城市
                for (let d = 0; d < 26; d++) {
                    let list = []
                    this.tempCityArray.forEach(city => {
                        if (city.cityIndex === String.fromCharCode(97 + d)) {
                            list.push(city)
                        }
                    })
                    if (list.length !== 0) {
                        tempCityGroupList.push({
                            groupName: String.fromCharCode(65 + d),
                            cityList: list
                        })
                    }
                }
            } else {
                // 定位城市
                // let local = {
                //     groupName: '定位',
                //     locationCity: {cityName: '定位中...'}
                // }
                // tempCityGroupList.push(local)
                // 热门城市
                let hot = {
                    groupName: '热门',
                    cityList: this.$app.globalData.baseData.topCity
                }
                tempCityGroupList.push(hot)
                // 列表城市
                for (let i = 0; i < 26; i++) {
                    let list = []
                    if (!this.cityArray) return
                    this.cityArray.forEach(city => {
                        if (city.cityIndex === String.fromCharCode(97 + i)) {
                            list.push(city)
                        }
                    })
                    if (list.length !== 0) {
                        tempCityGroupList.push({
                            groupName: String.fromCharCode(65 + i),
                            cityList: list
                        })
                    }
                }
            }
            this.cityGroupList = tempCityGroupList
        }
    }
</script>
<style lang="less" scoped>
    .city-body{
        position: fixed;
        width: 100%;
        height: 100%;
        background: white;
        /*top: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        /*bottom: 0;*/

        .city-search{
            width: 690px;
            height: 85px;
            margin: 20px 30px;
            padding-left: 40px;
            background: #f0f0f0;
            border-radius: 10px;
            box-sizing: border-box;
            font-size: 32px;
        }

        .container{
            flex: 1;
            display: flex;
            height: 89.5%;
            flex-direction: row;

            .city-list{
                flex: 1;
                height: 100%;

                .btn-grid{
                    width: 175px;
                    height: 70px;
                    line-height: 70px;
                    margin-left: 30px;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    background: #f1f1f1;
                    border-radius: 10px;
                    font-size: 30px;
                    text-align: center;
                    color: grey;
                }
                .select-head{
                    width: 100%;
                    height: 60px;
                    line-height: 60px;
                    padding-left: 30px;
                    background: #f0f0f0;
                    font-size: 32px;
                    box-sizing: border-box;
                }

                .selection-location{
                    width: 100%;

                }
                .selection-hot{
                    width: 100%;

                    .btn-grid-container {
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        .btn-grid{
                            width: 175px;
                            height: 70px;
                            line-height: 70px;
                            margin-left: 30px;
                            margin-right: 20px;
                            background: #f1f1f1;
                            border-radius: 10px;
                            font-size: 30px;
                            text-align: center;
                            color: grey;
                        }
                    }
                }
                .selection-item{
                    width: 100%;

                    .btn-item{
                        width: 100%;
                        height: 90px;
                        line-height: 80px;
                        padding-left: 34px;
                        box-sizing: border-box;
                        font-size: 32px;
                        color: grey;
                    }
                }
            }
            .city-index{
                width: 70px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;

                .index-item{
                    font-size: 26px;
                    color: gray
                }
                .index-item-select{
                    color: #00aaff
                }
            }
            .city-index-tips{
                position: absolute;
                display: flex;
                justify-content: center;
                align-content: center;
                align-items: center;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                .tips{
                    width: 180px;
                    height: 180px;
                    line-height: 180px;
                    text-align: center;
                    color: white;
                    background: rgba(0, 0, 0, .6);
                    border-radius: 20px;
                }
            }
            .empty-parent{
                position: absolute;
                top: 30%;
                bottom: 30%;
                left: 20%;
                right: 20%;
                background: white;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
                align-items: center;

                image{
                    width: 250px;
                    height: 201px;
                }
                view{
                    color: gray;
                    font-size: 30px;
                    margin-top: 20px;
                }
            }
        }
    }
</style>
