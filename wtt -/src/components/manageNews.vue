<!-- 这个是首页 -->
<template>
	<div class="manageNews">
		<!-- <el-container>
			<el-header>
				<el-menu default-active='0'  class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
					<el-menu-item index="0" >
						<router-link :class="li_eq==0?'click':''" to="/newsManage" tag="li" >文章发布管理</router-link>
					</el-menu-item>
					<el-menu-item index="1">
						<router-link :class="li_eq==1?'click':''" to="/newsSource" tag="li">文章来源管理</router-link>
					</el-menu-item>
					<el-menu-item index="2">
						<router-link :class="li_eq==3?'click':''" to="/newsComment" tag="li">评论管理</router-link>
					</el-menu-item>
				</el-menu>
			</el-header>
			<el-main> -->
				<router-view />
<!-- 			</el-main>
		</el-container> -->
	</div>
</template>

<script>
	export default {
		name: 'manageNews',
		data() {
			return {
				msg: 'i am manageNews',
				navHeight: 500,
				li_eq: 0,
			}
		},
		watch: {
			$route(to, from) {
				if (to.path == '/newsManage') {
					this.li_eq = 0;
				} else if (to.path == '/newsSource') {
					this.li_eq = 1;
				} else if (to.path == '/newsLable') {
					this.li_eq = 2;
				} else if (to.path == '/newsComment') {
					this.li_eq = 3;
				} {
					this.li_eq = 5;
					// window.location.reload();
				}
			}
		},
	}
</script>

<style scoped>
	.manageNews{
		margin-left: 30px;
	}
	.el-header{
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		line-height: 60px;
		margin-left: -20px;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		line-height: 160px;
		margin-left: -50px;
	}

	
</style>
