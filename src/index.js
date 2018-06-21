/**
 * @file 事件注册入口
 * @author leiusken <leuisken@foxmail.com>
 */

'use strict';

var FastButton = require('./FastButton');

// 为 san 注入 tap 事件
function injectTapEvent(san) {
    var componentProto = san.Component.prototype;
    var elementProto = getElementProto(san);
    var rawOnEl = componentProto._onEl;
    var rawElementOwnDetach = componentProto.elementOwnDetach;
    var rawElementOwnDispose = componentProto.elementOwnDispose;

    // 改写 onEl，添加 touch-tap 事件
    function onEl(name, listener, capture) {
        if (name === 'touch-tap') {
            this.__touch__ = this.__touch__ || [];
            this.__touch__.push(new FastButton(this.el, listener));
        }
        rawOnEl.call(this, name, listener, capture);
    }

    // detach 生命周期下清理事件
    function elementOwnDetach() {
        if (isArray(this.__touch__)) {
            clearTouches.call(this);
        }
        rawElementOwnDetach.call();
    }

    // dispose 生命周期下清理事件
    function elementOwnDispose(noDetach, noTransition) {
        if (isArray(this.__touch__)) {
            clearTouches.call(this);
        }
        rawElementOwnDispose.call(this, noDetach, noTransition);
    }

    // 改写的方法替换原来的方法
    componentProto._onEl = elementProto._onEl = onEl;
    componentProto.elementOwnDetach = elementProto.elementOwnDetach = elementOwnDetach;
    componentProto.elementOwnDispose = elementProto.elementOwnDispose = elementOwnDispose;
}

function getElementProto(san) {
    var Class = san.defineComponent({
        template: '<p s-for="a in b"><b>1</b></p>'
    });
    var instance = new Class();
    instance.attach();
    return instance.children[0].constructor.prototype;
}

function clearTouches() {
    for (var i = 0; i < this.__touch__.length; i++) {
        this.__touch__[i].dispose();
    }
    this.__touch__ = null;
}

function isArray(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
}

exports = module.exports = injectTapEvent;
