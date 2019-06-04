/**
 * @file 小程序入口
 * @author 李林祥<lilx@jjshebao.com>
 */

'use strict';
import Okam from 'okam-core/src/base/base'
import './common/config'
import './common/globalVariable'
import './common/eventFlag'
import './common/apiAlign/apiAlign'
import './common/apiAlign/extension'
import './common/request/request'
Okam.platform = process.env.APP_TYPE // 判断小程序平台 wx、ant、tt、swan


export default {
    config: {
        // 页面配置
        pages: [
            // App模块
            'pages/AppModule/splashPage',
            'pages/AppModule/webPage',
            'pages/AppModule/smsLogin',
            'pages/AppModule/cityPicker',

            // 主页模块
            'pages/MainTabModule/mainHome',
            'pages/MainTabModule/mainService',
            'pages/MainTabModule/mainFind',
            'pages/MainTabModule/mainMine',

            // 其他模块
            'pages/OtherModule/template',
            'pages/OtherModule/demo'
        ],
        // 统一配置
        window: {
            navigationBarBackgroundColor: '#FFFFFF',
            navigationBarTextStyle: 'black',
            backgroundTextStyle: 'light',
            navigationStyle: 'default',
            backgroundColor: '#FFFFFF',
            enablePullDownRefresh: false,
            navigationBarTitleText: 'Okam标题'
        },
        tabBar: {
            'color': '#BFBFBF',
            'selectedColor': '#00AAFF',
            'backgroundColor': '#FFFFFF',
            'borderStyle': 'black',
            'list': [{
                'pagePath': 'pages/MainTabModule/mainHome',
                'text': '首页',
                'iconPath': 'common/img/icon_home_normal.png',
                'selectedIconPath': 'common/img/icon_home_select.png'
            }, {
                'pagePath': 'pages/MainTabModule/mainService',
                'text': '参保',
                'iconPath': 'common/img/icon_service_normal.png',
                'selectedIconPath': 'common/img/icon_service_select.png'
            }, {
                'pagePath': 'pages/MainTabModule/mainFind',
                'text': '发现',
                'iconPath': 'common/img/icon_find_normal.png',
                'selectedIconPath': 'common/img/icon_find_select.png'
            }, {
                'pagePath': 'pages/MainTabModule/mainMine',
                'text': '我',
                'iconPath': 'common/img/icon_mine_normal.png',
                'selectedIconPath': 'common/img/icon_mine_select.png'
            }]
        },
        // 网络超时时间配置
        networkTimeout: {
            request: 30000
        },
        // 微信小程序差异化配置
        _wxEnv: {
            window: {
            },
            permission: {
                'scope.userLocation': {
                    'desc': '你的位置信息将用于易参保小程序为您提供更好的服务'
                }
            }
        },
        // 支付宝小程序差异化配置
        _antEnv: {
            window: {
                defaultTitle: 'Okam标题',
                allowsBounceVertical: 'NO',
                titleBarColor: '#FFFFFF'
            },
            tabBar: {
                'textColor': '#BFBFBF',
                'selectedColor': '#00AAFF',
                'backgroundColor': '#FFFFFF',
                'items': [{
                    'pagePath': 'pages/MainTabModule/mainHome',
                    'name': '首页',
                    'icon': 'common/img/icon_home_normal.png',
                    'activeIcon': 'common/img/icon_home_select.png'
                }, {
                    'pagePath': 'pages/MainTabModule/mainService',
                    'name': '参保',
                    'icon': 'common/img/icon_service_normal.png',
                    'activeIcon': 'common/img/icon_service_select.png'
                }, {
                    'pagePath': 'pages/MainTabModule/mainFind',
                    'name': '发现',
                    'icon': 'common/img/icon_find_normal.png',
                    'activeIcon': 'common/img/icon_find_select.png'
                }, {
                    'pagePath': 'pages/MainTabModule/mainMine',
                    'name': '我',
                    'icon': 'common/img/icon_mine_normal.png',
                    'activeIcon': 'common/img/icon_mine_select.png'
                }]
            }
        },
        // 头条小程序差异化配置
        _ttEnv: {
            window: {
            }
        },
        // 百度小程序差异化配置
        _swanEnv: {
            window: {
            }
        }
    },
    $promisifyApis: [
        'getSystemInfo'
    ],
    globalData: {
        isLogin: false,      // 是否登录
        isAccredit: false,   // 是否授权
        userInfo: null,      // 微信用户信息
        userInfoApp: null,   // 应用用户信息
        pageData: {},        // 页面数据
        baseData: {},        // 基础数据
        sceneCode: '',       // 场景Code
        jjsbCode: '',        // 临时令牌
        channel: ''          // 小程序来源渠道
    },
    // API Hook
    $interceptApis: {
        navigateTo: {
            init(config, ctx) {
                if (config.query) {
                    config.url += object2UrlParams(config.query)
                }
                if (config.params) {
                    Okam.ParamData = config.params
                }
            }
        },
        redirectTo: {
            init(config, ctx) {
                if (config.query) {
                    config.url += object2UrlParams(config.query)
                }
                if (config.params) {
                    Okam.ParamData = config.params
                }
            }
        },
        switchTab: {
            init(config, ctx) {
                if (config.query) {
                    config.url += object2UrlParams(config.query)
                }
                if (config.params) {
                    Okam.ParamData = config.params
                }
            }
        }
    },
    onLaunch(data) {
        console.log('show onLaunch...', data)
        this.globalData.sceneCode = data.scene
    },

    /*async onLaunch() {
        let result = await this.$api.getSystemInfo();
        console.log('launch system info', result);
        console.log('show onLaunch...')
    },*/

    onShow() {
        console.log('show app...')
        /*this.$api.getSystemInfo().then(function (res) {
            console.log('systemInfo', res)
        })*/
    },

    onHide() {
        console.log('hide app...')
    }

}

function object2UrlParams(object = {}) {
    let paramsStr = ''
    let first = true
    for (let key in object) {
        if (first) {
            paramsStr = `?${key}=${object[key]}`
            first = false
        } else {
            paramsStr += `&${key}=${object[key]}`
        }
    }
    return paramsStr
}
