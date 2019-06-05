<template>
	<div class="hello">
		<Drawer class="covers" placement="left" :closable="false" v-model="value2">
			<div class="myHead" v-if="islogin">
				<i class="el-icon-close" @click="setMaskShow(maskShow)"></i>
				<el-row>
					<div class="headImg">
						<img :src="user.useImg" @click="toChangeImg">
					</div>
					<div class="myname">
						<!-- <span>{{user.userName}}</span> -->
						<p>{{user.userName}}</p>
					</div>
				</el-row>
			</div>
			<div class="tologin" v-else>
				<el-button class="login" type="warning" round @click="gologin">登录</el-button>
				<i class="el-icon-close" @click="setMaskShow(maskShow)"></i>
			</div>
			<el-row>
				<div class="information">
					<el-card class="box-card">
						<ul>
							<li v-for="myinfo in myinfos" :key="myinfo.index" class="mylist" @click="pathto(myinfo.path)">
								<img :src="myinfo.img">{{ myinfo.mymag }}
								<router-link to="myinfo.path"></router-link>
							</li>
							<li class="mylist" @click="logout"><img src="../assets/logout.png">退出登录</li>
						</ul>

					</el-card>
				</div>
			</el-row>
		</Drawer>
		<div>
			<div class="topFix">
				<div class="SE">
					<el-row type="flex">
						<img class="home" src="../assets/myhome.png" @click="value2 = true">
						<span class="logo">中工头条</span>
						<img class="search" src="../assets/search.png" @click="tosearch">
					</el-row>
				</div>
				<div class="topBar">
					<nav>
						<p v-for="(item,index) in arr" :key="item.index" @click="toggle(item.path,index)" :class="{active:active==item.index}">
							{{item.title}}
							<router-link to="item.path"></router-link>
						</p>
					</nav>
				</div>
			</div>
			<div class="childs">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				value2: false,
				islogin: false,
				imgUrl: '',
				user: {

				},
				myinfos: [{
						index: '0',
						img: require("@/assets/my.png"),
						mymag: '我的资料',
						path: '/myprofile'
					}, {
						index: '1',
						img: require("@/assets/notice.png"),
						mymag: '我的关注',
						path: '/mynotice'
					},
					{
						index: '2',
						img: require("@/assets/collect1.png"),
						mymag: '我的收藏',
						path: '/my_Collect'
					},
					{
						index: '3',
						img: require("@/assets/like.png"),
						mymag: '我的点赞',
						path: '/my_like'
					}, {
						index: '4',
						img: require("@/assets/commect1.png"),
						mymag: '我的评论',
						path: '/mycomment'
					},
					{
						index: '5',
						img: require("@/assets/history.png"),
						mymag: '浏览历史',
						path: '/myhistory'
					},
					{
						index: '6',
						img: require("@/assets/set.png"),
						mymag: '系统设置',
						path: '/systemset'
					},
				],
				msg: 10,
				input1: '',
				path: '',
				active: 0,
				currentindex: 0,
				arr: [{
						index: 0,
						title: "推荐",
						path: '/recomment'
					}, {
						index: 1,
						title: "校外新闻",
						path: '/notice'
					}, {
						index: 2,
						title: "校内新闻",
						path: '/enroll'
					}, {
						index: 3,
						title: "校内活动",
						path: '/getJob'
					}, {
						index: 4,
						title: "学术论坛",
						path: '/loan'
					}, {
						index: 5,
						title: "应征招聘",
						path: '/test'
					}, {
						index: 6,
						title: "教育工作",
						path: '/teaching'
					}, {
						index: 7,
						title: "交流指导",
						path: '/living'
					}, {
						index: 8,
						title: "党建活动",
						path: '/stuGrant'
					}

				]
			}
		},

		mounted() {
			var that = this;
			that.currentindex = this.$route.query.currentindex
			console.log(that.currentindex)
			if (that.currentindex == '') {
				
				that.active = 0
			} else {
				that.active = that.currentindex
			}
			that.user.id = localStorage.getItem("userId");
			console.log("用户Id" + that.user.id);
			if (that.user.id) {
				that.islogin = true
				that.$nextTick(function() {
					that.getImg(that.user.id);
				});
			} else {
				that.islogin = false
			}
		},
		methods: {

			getImg(id) {
				let that = this
				console.log(id)
				that.$axios({
						method: "post", //指定请求方式
						url: "user/getUserNameAndImg", //请求接口
						data: {
							"id": id,
						}
					})
					.then(function(res) {
						//接口成功返回结果执行
						that.user = res.data.data;
						console.log(res.data.data);
						console.log(res.data.code);
						console.log("用户");

						// console.log(jsonObj);
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
			},
			toChangeImg() {
				this.$router.push({
					path: '/changeHeadImg'
				})
			},
			logout() {
				let that = this
				console.log('文章Id：' + that.user.id)
				this.$confirm('退出当前账号，将失去部分操作权限！', '退出登录确认', {
					confirmButtonText: '确定退出',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios({
							method: "post", //指定请求方式
							url: "user/update", //请求接口
							data: {
								"id": that.user.id,
								"loginStatus": 0,
							}
						})

						.then(function(res) {
							//接口成功返回结果执行
								localStorage.removeItem("userId");
							console.log(res.data.code);
							if (res.data.code == "A001") {
								that.islogin = false
								this.$message({
									type: 'success',
									message: '退出成功!'
								});
								// alert("退出登录成功")
								this.$router.push({
									path: '/'
								})
							} else {
								alert("退出登录失败！")
							}
						})
						.catch(function(err) {
							//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
							// console.log("请求失败")
							console.log(err)
						})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消退出'
					});
				});

			},
			pathto(path) {
				this.$router.push({
					path

				});

			},
			gologin: function() {
				this.$router.push({
					path: '/login'
				});
			},
			goMyHome() {
				this.$router.push({
					path: '/my'
				});
			},
			toggle(path, index) {
				this.$router.push({
						path: path,
						query: {
							currentindex: index
						}
					}),
					this.active = index;
				console.log("当前index" + index)
			},
			tosearch() {
				this.$router.push({
					path: '/search'
				});
			},

		}
	}
</script>

<style scoped>
	.hello {
		padding-top: 2.3rem;
		width: 100%;
		/* height: 100%; */
	}

	.box-card {
		width: 100%;
		border: 0;
		height: 10.4rem;
	}

	.myHead {
		width: 100%;
	}

	div.ivu-drawer-body {
		padding: 0;
	}

	.box-card ul li {
		display: block;
		border-bottom: 1px solid #ccc;
		text-align: left;
		font-size: 0.35rem;
	}

	.box-card img {
		width: .50rem;
		height: .50rem;
		padding: 0;
		float: left;
		/* margin-top: 0.1rem; */
		margin-right: 0.4rem;
		vertical-align: middle;
		/* margin-right: .8rem; */
	}

	.mylist {
		/* margin-bottom: 0.3rem; */
		padding: 0.15rem 0;
		border-bottom: 1px solid #dcdcdc;
		text-align: left;
	}

	.mylist>i {
		float: right;
		margin-right: 0.1rem;
	}

	.myname {
		text-align: center;
		font-size: 0.3rem;
		margin-top: 0.2rem;
		margin-bottom: 0.4rem;
	}

	.tologin {
		text-align: center;
		height: 3.2rem;
		/* margin-top: 40px; */
	}

	.login {
		margin-left: 0.4rem;
		margin-top: 1.2rem;
	}

	div.el-col>p {
		margin-top: 0.8rem;
		font-size: 0.3rem;
		margin-left: 0.2rem;
	}

	.information {
		/* margin-top: 0.5rem; */
	}

	.headImg>img {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 1.875rem;
		margin-top: 0.3rem;
		margin-left: 1.8rem;
		border: 0.02rem solid #DCDCDC;
	}

	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #000;
		opacity: 0.8;
		z-index: 1111;
	}



	.child {
		position: fixed;
		width: 70% !important;
		text-align: left;
		/* width: 200px; */
		height: 100%;
		border: 1px solid #ccc;
		text-align: center;
		top: 0;
		left: 0;
		/* line-height: 400px; */
		/* top: calc(50% - 200px); */
		left: calc(50% - 200px);
		background: #FFF;
		z-index: 1112;
	}

	.topFix {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.topBar>span {
		font-size: 0.4rem;
	}

	.SE {
		background-color: #F44336;
		height: 1.3rem;
	}

	.el-input {
		width: 4.5rem;
		margin-left: 0.6rem;
		margin-top: 0.3125rem;
	}



	.el-icon-close {
		float: right;
		margin-right: 0.1rem;
		margin-top: 0.1rem;
	}

	.weui-search-bar {
		background-color: #26A2FF;
	}

	.logo {
		font-size: 0.6rem;
		text-align: center;
		margin-left: 1.5rem;
		margin-top: 0.2rem;
	}

	img.search {
		float: right;
		/* margin-right: 0.2rem; */
		margin-left: 1.5rem;
		margin-top: 0.3rem;
	}

	img.home {
		margin-left: 0.3rem;
		margin-top: 0.3rem;
	}

	img {
		width: .67rem;
		height: .67rem;
		/* padding: .4rem; */
		/* z-index: 15; */
	}

	.el-row>span:nth-child(1) {
		margin-top: 0.4rem;
		text-align: center;
		margin-left: 0.3rem;
	}

	.refrush {
		text-align: center;
		background-color: #DCDFE6;
		font-size: 0.3rem;
		color: #5DAF34;
	}

	.el-menu-item {
		text-align: center;
		height: 1rem;
		width: 1rem;
		padding: 0px 0px 0px 0px;
	}

	.topBar nav {
		/* padding: 0 10px; */
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: middle;
		-ms-flex-align: middle;
		align-items: middle;
		overflow: auto;
	}

	.topBar p {
		text-align: center;
		font-size: 16px;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		padding: 10px;
		background: #fff;
		;
		/* margin: 5px; */

	}

	.topBar p.active {
		color: #303133;
		color: red;
		/* background-color: red; */
	}
</style>
