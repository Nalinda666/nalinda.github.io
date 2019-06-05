// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import '../static/css/common.css'
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueQuillEditor)
 Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(iView);
import $ from 'jquery' 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// 配置请求头  headers: {'X-Requested-With': 'XMLHttpRequest'}
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
/* 设置基本请求路径 */
axios.defaults.baseURL = 'http://139.224.12.43:8080/'   //服务器
// axios.defaults.baseURL = 'http://192.168.2.104:8080/'    //星星
// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 使用qs对参数进行处理
  // config.data = Qs.stringify(config.data) 
  // return config
// }, function (error) {
  // 对请求错误做些什么
  // return Promise.reject(error)
// })
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