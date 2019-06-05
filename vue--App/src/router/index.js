import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import register from '@/components/register'
import login from '@/components/login'
import attention from '@/components/attention'
import my from '@/components/my'
import recomment from '@/components/recomment'
import notice from '@/components/notice'
import forgetPass from '@/components/forgetPass'
import enroll from '@/components/enroll'
import getJob from '@/components/getJob'
import loan from '@/components/loan'
import stuGrant from '@/components/stuGrant'
import test from '@/components/test'
import teaching from '@/components/teaching'
import living from '@/components/living'
import detail from '@/components/detail'
import test1 from '@/components/firstpage/test1'
import myprofile from '@/components/firstpage/myprofile'
import mynotice from '@/components/firstpage/mynotice'
import my_Collect from '@/components/firstpage/my_Collect'
import myhistory from '@/components/firstpage/myhistory'
import my_like from '@/components/firstpage/my_like'
import systemset from '@/components/firstpage/systemset'
import changes from '@/components/firstpage/changes'
import mytoutiao from '@/components/firstpage/mytoutiao'
import changepass from '@/components/firstpage/changepass'
import changeiPhone from '@/components/firstpage/changeiPhone'
import changeemial from '@/components/firstpage/changeemial'
import mycomment from '@/components/firstpage/mycomment'
import search from '@/components/firstpage/search'
import myScroll from '@/components/firstpage/myScroll'
import changeHeadImg from '@/components/firstpage/changeHeadImg'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'HelloWorld',
			component: HelloWorld,
			// redirect: '/Loading', //默认子路由
			// meta: {
			// 	requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			// },
		},
		{
			path: '/HelloWorld',
			name: 'HelloWorld',
			component: HelloWorld,
			children: [{
					path: '/',
					name: 'recomment',
					component: recomment
				},
				{
					path: '/recomment', //推荐
					name: 'recomment',
					component: recomment
				},
				{
					path: '/notice', //校外新闻
					name: 'notice',
					component: notice
				}, {
					path: '/enroll', //校内新闻
					name: 'enroll',
					component: enroll
				}, {
					path: '/getJob', //校内活动
					name: 'getJob',
					component: getJob
				}, {
					path: '/loan', //学术论坛
					name: 'loan',
					component: loan
				},
				{
					path: '/stuGrant', //党建活动
					name: 'stuGrant',
					component: stuGrant
				},
				{
					path: '/test', //应征招聘
					name: 'test',
					component: test
				}, {
					path: '/teaching', //教育工作
					name: 'teaching',
					component: teaching
				}, {
					path: '/living', //交流指导
					name: 'living',
					component: living
				},

			]
		},
		{ //注册
			path: '/register',
			name: 'register',
			component: register
		},
		{ //登录
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/attention', //关注
			name: 'attention',
			component: attention
		},
		{
			path: '/my', //我的
			name: 'my',
			component: my
		},
		{
			path: '/forgetPass', //忘记密码
			name: 'forgetPass',
			component: forgetPass
		}, {
			path: '/detail', //详情页
			name: 'detail',
			component: detail
		}, {
			path: '/myprofile', //我的资料
			name: 'myprofile',
			component: myprofile
		}, {
			path: '/mynotice', //我的关注
			name: 'mynotice',
			component: mynotice
		}, {
			path: '/mycomment', //我的评论
			name: 'mycomment',
			component: mycomment
		}, {
			path: '/my_Collect', //我的收藏
			name: 'my_Collect',
			component: my_Collect
		}, {
			path: '/myhistory', //浏览历史
			name: 'myhistory',
			component: myhistory
		}, {
			path: '/my_like', //我的点赞
			name: 'my_like',
			component: my_like
		}, {
			path: '/systemset', //系统设置
			name: 'systemset',
			component: systemset
		}, {
			path: '/changes', //账号设置
			name: 'changes',
			component: changes
		}, {
			path: '/changepass', //更改密码
			name: 'changepass',
			component: changepass
		}, {
			path: '/changeiPhone', //更改手机号
			name: 'changeiPhone',
			component: changeiPhone
		}, {
			path: '/changeemial', //更改邮箱
			name: 'changeemial',
			component: changeemial
		}, {
			path: '/mytoutiao', //关于头条
			name: 'mytoutiao',
			component: mytoutiao
		}, {
			path: '/search', //搜索页
			name: 'search',
			component: search
		}, {
			path: '/myScroll', //刷新组件
			name: 'myScroll',
			component: myScroll
		}, {
			path: '/changeHeadImg', //换头像
			name: 'changeHeadImg',
			component: changeHeadImg
		},
		{
			path: '/test1',
			name: 'test1',
			component: test1
		},
	]
})
