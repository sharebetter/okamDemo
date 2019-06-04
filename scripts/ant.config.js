/**
 * @file Build ant mini program build config
 * @author 李林祥<lilx@jjshebao.com>
 */

'use strict';

const merge = require('okam-build').merge;

module.exports = merge({}, require('./base.config'), {
    output: {
        dir: 'dist_ant',
        depDir: 'src/common'
    },
    localPolyfill: [
        'async',
        'promise'
    ],
    processors: {
        babel: {
            options: {
                presets: ['babel-preset-env']
            }
        }
    },
    api: {
        htmlToNodes: 'mini-html-parser2'
    }
});
