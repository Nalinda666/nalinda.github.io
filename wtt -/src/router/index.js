import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import manageUser from '@/components/manageUser'
import manageNews from '@/components/manageNews'
import spiders from '@/components/spiders'
import studentDetail from '@/components/studentDetail'
import sourceDetail from '@/components/sourceDetail'
import spiderDetail from '@/components/spiderDetail'
import newsManage from '@/components/newsManage'
import newsSource from '@/components/newsSource'
import newsComment from '@/components/newsComment'
import test from '@/components/test'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/login', //登录
		name: 'login',
		component: login
	}, {
		path: '/HelloWorld',
		name: 'HelloWorld',
		component: HelloWorld
	}, {
		path: '/', //首页
		name: 'home',
		component: home,
		children: [{
				path: '/', //用户管理
				name: 'manageUser',
				component: manageUser
			},{
				path: '/manageUser', //用户管理
				name: 'manageUser',
				component: manageUser
			},
			{
				path: '/spiders', //爬虫管理页面
				name: 'spiders',
				component: spiders
			},
			{
				path: '/studentDetail', //学生信息详情页
				name: 'studentDetail',
				component: studentDetail
			}, {
				path: '/sourceDetail', //文章来源详情页
				name: 'sourceDetail',
				component: sourceDetail
			}, {
				path: '/spiderDetail', //爬虫详情页
				name: 'spiderDetail',
				component: spiderDetail
			}, {
				path: '/test', //
				name: 'test',
				component: test
			},
			{
				path: '/manageNews', //文章管理
				name: 'manageNews',
				component: manageNews,
				children: [{
						path: '/',   //文章发布审核管理
						name: 'newsManage',
						component: newsManage
					},{
						path: '/newsManage',   //文章发布审核管理
						name: 'newsManage',
						component: newsManage
					},
					{
						path: '/newsSource', //网站来源管理
						name: 'newsSource',
						component: newsSource
					}, {
						path: '/newsComment', //评论管理
						name: 'newsComment',
						component: newsComment
					},

				],
			},

		]
	}, ]
})
