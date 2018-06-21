/**
 * @file 开发与示例入口
 * @author LeuisKen <leuisken@foxmail.com>
 */

'use strict';

var san = require('san');
var injectTapEvent = require('../src/index.js');

injectTapEvent(san);

var AppClass = san.defineComponent({
    template: '<div on-touch-tap="handleTap">123</div>',
    handleTap: function () {
        alert('123');
    }
});
var app = new AppClass();
app.attach(document.getElementById('app'));
