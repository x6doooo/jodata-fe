import Vue from 'vue';


require('font-awesome/css/font-awesome.css');

window.$ = require('jquery');
window._ = require('lodash');

import 'element-theme-default';
import Element from 'element-ui';
Vue.use(Element);

require('./app/styles/global.sass');


import VueRouter from 'vue-router';
Vue.use(VueRouter);


//ace
// require('ace-builds/src-noconflict/ace.js');
// require('ace-builds/src-noconflict/theme-chrome.js');
// require('ace-builds/src-noconflict/mode-javascript.js');
// require('ace-builds/src-noconflict/mode-json.js');


var MainView = require('./app/containers/MainView/index.vue');

// let ScriptView = require('./app/containers/ScriptView/index.vue');
//
// var InitView = require('./app/containers/InitView/index.vue');
// var ChartView = require('./app/containers/ChartView/index.vue');
// var StocksView = require('./app/containers/StocksView/index.vue');

const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            name: 'MainView',
            path: '/',
            component: MainView,
            children: [{
                // name: 'ScriptView',
                // path: 'script',
                // component: ScriptView
            // }, {
            //     name: 'InitView',
            //     path: 'initialize',
            //     component: InitView
            // }, {
            //     name: 'ChartView',
            //     path: 'chart',
            //     component: ChartView
            // }, {
            //     name: 'StocksView',
            //     path: 'stocks',
            //     component: StocksView
            }]
        },

    ]
});

export default new Vue({
    el: '#root',
    router,
    render: h => h('router-view')
});
