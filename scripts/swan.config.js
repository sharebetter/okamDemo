/**
 * @file Build swan smart program build config
 * @author 李林祥<lilx@jjshebao.com>
 */

'use strict';

const merge = require('okam-build').merge;

module.exports = merge({}, require('./base.config'), {
    output: {
        dir: 'dist_swan',
        depDir: 'src/common'
    },
    polyfill: ['async'],
    // wx2swan: true,
    rules: []
});
