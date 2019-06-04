/**
 * @file Build mini program base config
 * @author 李林祥<lilx@jjshebao.com>
 */

'use strict'

const path = require('path')
const fs = require('fs')

const DEV_SERVER_PORT = 9090


module.exports = {
    verbose: false,
    root: path.join(__dirname, '..'),
    output: {
        dir: 'dist',
        depDir: 'src/common'
    },
    component: {
        extname: 'vue',
        template: {
            // vue -v 前缀支持， 默认为 false
            useVuePrefix: true,
            // 标签转换配置项
            transformTags: {
            }
        }
    },
    framework: [
        'data',
        'watch',
        'model',
        'vhtml',
        'broadcast',
        'ref'
    ],
    api: {
        // 'utils': './common/utils/utils' // this.$api.utils
    },
    resolve: {
        alias: {
            'okam$': 'okam-core/src/index',
            '@img/': path.join(__dirname, '../src/common/img/'),
            '@components/': path.join(__dirname, '../src/components/'),
            '@pages/': path.join(__dirname, '../src/pages/')
        }
    },
    processors: {
        babel: {
            extnames: ['js']
        },
        postcss: {
            extnames: ['less'],
            options: {
                // plugins: ['env']
                plugins: {
                    env: {},
                    px2rpx: {
                        // 设计稿尺寸
                        designWidth: 750
                        // 开启 1px 不转, 即有 1px 的数字不会进行转换
                        // 开启 1px 不转, okam-build 0.4.6 版本开始支持
                        // noTrans1px: true,
                        // 保留的小数点单位, 默认为 2
                        // precision: 2
                    }
                }
            }
        },
        myPlugin: {
            processor: './scripts/myPlugin'
        }
    },
    /*source: {
        exclude: ['src/common/imgCloud/!*.png', /^src\/common\/imgCloud\/.*!/]
    },*/
    script: {
        onBuildDone(opts) {
            // 正式环境构建完后删除imgCloud
            if (!opts.watch) {
                ['dist_wx', 'dist_ant', 'dist_tt', 'dist_swan'].forEach(function (warp) {
                    let path = `${process.cwd()}/${warp}/common/imgCloud`
                    if (fs.existsSync(path)) {
                        fs.readdirSync(path).forEach(function(file) {
                            fs.unlinkSync(`${path}/${file}`)
                        })
                        fs.rmdirSync(path)
                    }
                })
            }
        }
    },
    /*rules: [
        {
            match: 'template.vue',
            processors: [
                'myPlugin'
            ]
        },
        /!*{
            match: 'template.vue.tpl',
            processors: [
                'myPlugin'
            ]
        },*!/
    ],*/

    // 启用开发 Server
    server: {
        port: DEV_SERVER_PORT,
        type: 'connect',
        // 需要安装 mock 中间件 npm i autoresponse --save-dev
        middlewares: [
            // {
            //     name: 'autoresponse',
            //     options: {
            //         post: true,
            //         get: true
            //     }
            // }
        ]
    },

    prod: {
        // 正式环境云图片自动转化（自动加上云图片地址前缀）
        processors: {
            view: {
                extnames: ['pug', 'tpl'],
                options: {
                    plugins: [
                        'vuePrefix', 'syntax', 'tagTransform',
                        {
                            tag(element) {
                                if (element.name === 'image') {
                                    if (element.attribs.src && element.attribs.src.indexOf('common/imgCloud') !== -1) {
                                        element.attribs.src = 'https://ycb-multi-platform.oss-cn-beijing.aliyuncs.com/imgCloud' + element.attribs.src.split('common/imgCloud')[1]
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        },
        rules: [
            {
                match: '*.js',
                processors: [
                    ['replacement', {'process.env.NODE_ENV': '"production"'}]
                ]
            }
        ]
    },

    dev: {
        rules: [
            {
                match: '*.js',
                processors: [
                    ['replacement', {
                        // 'https://online.com': 'https://dev.com',
                        'process.env.NODE_ENV': '"development"'
                    }]
                ]
            }
        ]
    },
    test: {
        rules: [
            {
                match: '*.js',
                processors: [
                    ['replacement', {
                        // 'https://online.com': 'https://test.com',
                        'process.env.NODE_ENV': '"development"'
                    }]
                ]
            }
        ]
    }
};
