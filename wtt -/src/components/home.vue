<template>
	<div class="home" ref="home" id="home">
		<el-container>
			<div class="topFix" id="topFix">
				<el-header>
					<span>中工头条管理系统</span>
					<span>管理员</span>
					<span @click="logout">退出</span>
				</el-header>
			</div>
			<el-container>
				<div class="leftFix" id="leftFix">
					<el-aside>
						<el-col :span="12">
							<el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
							 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
								<el-menu-item index="1">
									<router-link :class="li_eq==1?'click':''" to="/manageUser" tag="li">
										<i class="el-icon-menu"></i>
										用户管理
									</router-link>
								</el-menu-item>
								<el-submenu index="2">
									<template slot="title">
										<i class="el-icon-document"></i>
										<span>文章管理</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="2-1">
											<router-link :class="li_eq==2?'click':''" to="/newsManage" tag="li"><i class="el-icon-upload"></i>发布管理</router-link>
										</el-menu-item>
									</el-menu-item-group>
									<el-menu-item-group>
										<el-menu-item index="2-2">
											<router-link :class="li_eq==3?'click':''" to="/newsSource" tag="li"><i class="el-icon-location"></i>来源管理</router-link>
										</el-menu-item>
									</el-menu-item-group>
									<el-menu-item-group>
										<el-menu-item index="2-3">
											<router-link :class="li_eq==4?'click':''" to="/newsComment" tag="li"><i class="el-icon-edit-outline"></i>评论管理</router-link>
										</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<!-- <el-menu-item index="3">
									<router-link :class="li_eq==3?'click':''" to="/spiders" tag="li">
										<i class="el-icon-menu"></i>
										爬虫管理
									</router-link>
								</el-menu-item> -->
							</el-menu>
						</el-col>

					</el-aside>
				</div>
				<el-container>
					<div class="main">
						<el-main>
							<div class="grid-content bg-purple-light">
								<router-view />
								<!-- 其他所有的页面都会显示在这个router-view里 -->
							</div>
						</el-main>
					</div>
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loginInfo: {}, //这个就是存的登录信息啊
				isLogin: true,
				navHeight: 500,
				li_eq: '',
				span1: 4,
				span2: 20,
				admAccount: '',

				index: 1,
			}
		},
		created() {
			let that = this
			let urlTemp = "assets/myIcon.png"
			that.userImg = require("@/" + urlTemp)
		},
		watch: {
			$route(to, from) {
				if (to.path == '') {
					this.li_eq = 1;
				} else if (to.path == '/manageUser') {
					this.li_eq = 1;
				} else if (to.path == '/manageNews') {
					this.li_eq = 2;
				} else {
					this.li_eq =3;
				}
			}
		},

		mounted() {
			let that = this
			that.admAccount = localStorage.getItem("admAccount");
			console.log("管理员Id" + that.admAccount);
			if (that.admAccount != '') {
				// that.$nextTick(function() {
				// 	that.getStore();
				// });
				// that.index = index
			} else {
				alert("请先登录")
				this.$router.push({
					path: '/login'
				})
			}
		},
		watch: {
			isLogin: 'changlogin'
		},
		methods: {
			changlogin() {
				$(".el-header").show();
				$(".el-aside").show();
				$(".el-footer").show();
			},
			logout() {
				let that = this
				console.log('管理员Id：' + that.admAccount)
				that.$confirm('退出将无法进行管理', '退出登录确认', {
					confirmButtonText: '确定退出',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios({
							method: "post", //指定请求方式
							url: "administer/update", //请求接口（相对接口，后面会介绍到）
							data: {
								"id": that.admAccount,
								"loginStatus": 0,
							}
						})
						.then(function(res) {
							//接口成功返回结果执行
							console.log(res.data.code);
							if (res.data.code == "A001") {
								localStorage.removeItem("admAccount");
								that.$router.push({
									path: '/login'
								})
								that.$message({
									type: 'success',
									message: '退出成功!'
								});
								// alert("退出登录成功")
							} else {
								that.$message({
									message: '退出登录失败！！！',
									type: 'warning'
								});
							}
						})
						.catch(function(err) {
							//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
							// console.log("请求失败")
							console.log(err)
						})
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消退出'
					});
				});
				// window.location.reload();
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>
	.home {
		/* background: url(../assets/1.jpg) no-repeat 0 0; */
		background-color: #E9EEF3;
		height: 800px;
		background-size: cover;
		padding-top: 60px;
		padding-left: 280px;
	}


	.topFix {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
	}

	.leftFix {
		position: fixed;
		top: 60px;
		height: 600px;
		left: 0;
		z-index: 10;
	}

	.main {
		left: 0 !important;
		margin-left: -79px;
	}

	.el-header,
	.el-footer {
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-header {
		background-color: #545c64;
		padding-left: 0px;
	}

	.el-aside {
		background-color: #545c64;
		color: #333;
		text-align: center;
		line-height: 200px;
		overflow: hidden;
		height: 100%;
		width: 200px !important;
	}

	.el-menu-vertical-demo {
		width: 200px;
	}

	.el-menu {
		border-right: 0;
	}

	.el-menu-item,
	.el-submenu__title {
		font-size: 13px;
	}

	.el-submenu .el-menu-item {
		font-size: 11px;
	}

	/* .el-menu-item-group>li{
		font-size: 11px;
		} */

	.el-main {
		/* background-color: #00FF00; */
		color: #333;
		padding: 10px !important;
		height: 800px;
		width: 1030px;
		margin-left: -1px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}

	.el-header>span:nth-child(1) {
		font-size: 24px;
		font-weight: 900px;
		margin-left: 0px;
		float: left;
		line-height: 60px;
		text-align: center;
		width: 200px;
		color: #B3C0D1;
		background-color: #303133;
		padding-bottom: 2px;

	}

	.el-header>span:nth-child(2),
	.el-header>span:nth-child(3) {
		float: right;
		line-height: 60px;
		margin-right: 20px;
		color: #FFFFFF;
	}

	.foot1 {
		float: none;
		bottom: 0;
	}

	.foot1,
	.foot2 {
		height: 20px;
	}

	.foot2 {
		text-align: center;
		margin-top: 10px;
	}

	.foot1 {
		margin-top: 20px;
	}


	#navList>li {
		width: 100%;
		height: 60px;
		line-height: 48px;
		text-align: center;
		background: #303133;
		color: #fff;
	}

	#navList>li:after {
		background-color: #00FF00;
	}

	#navList>li.click {
		background-color: #00FF00;
	}
</style>
