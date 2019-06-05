// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '../static/css/common.css'
import router from './router'
import $ from 'jquery'
import weui from 'weui.js'
import axios from 'axios'
import Vuex from 'vuex'; //引入状态管理
// import store from './vuex/store'
import 'weui'
Vue.prototype.$axios = axios
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.prototype.$weui = weui
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(iView);
Vue.use(Vuex);
/* eslint-disable no-new */
const ADD_COUNT = 'ADD_COUNT'; // 用常量代替事件类型，使得代码更清晰
const REMOVE_COUNT = 'REMOVE_COUNT';

Vue.prototype.timestampToTime = function(cjsj) {
	var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	var D = (date.getDate() + 1 < 10 ? '0' + date.getDate()  : date.getDate() )
	var h = (date.getHours() + 1 < 10 ? '0' + date.getHours()  : date.getHours() ) + ':'
	var m = (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes() + 1) : date.getMinutes() + 1)
	return Y + M + D + " " + h + m
}
Vue.prototype.timestampToData = function(cjsj) {
	var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	var D = (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1)
	return Y + M + D
}
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
/* 设置基本请求路径 */
axios.defaults.baseURL = 'http://139.224.12.43:8080/'   //服务器
// axios.defaults.baseURL = 'http://192.168.2.104:8080/' //项目
