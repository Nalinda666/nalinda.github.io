<template>
	<div class="my">
		<div class="myHead" v-if="islogin">
			<el-row>
				<el-col :span="12">
					<div class="headImg">
						<img :src="imgUrl">
					</div>
				</el-col>
				<el-col :span="12">
					<div class="myname">
						一颗花心大萝卜
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="tologin" v-else>
			<el-button type="warning" round @click="gologin">登录</el-button>
		</div>
		<el-row>
			<div class="information">
				<el-card class="box-card">
					<ul>
						<li v-for="myinfo in myinfos" :key="myinfo.index" class="mylist" @click="pathto(myinfo.path)">
							{{ myinfo.mymag }}
							<i class="el-icon-arrow-right"></i>
							<router-link to="myinfo.path"></router-link>
						</li>
					</ul>
				</el-card>
			</div>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: '',
				mymag: '',
				index: '',
				path: '',
				islogin: false,
				myinfos: [{
						index: '0',
						mymag: '我的资料',
						path: '/myprofile'
					}, {
						index: '1',
						mymag: '我的关注',
						path: '/mynotice'
					},
					{
						index: '2',
						mymag: '我的收藏',
						path: '/my_Collect'
					},
					{
						index: '3',
						mymag: '我的点赞',
						path: '/my_like'
					},{
						index: '4',
						mymag: '我的评论',
						path: '/mycomment'
					},
					{
						index: '5',
						mymag: '浏览历史',
						path: '/myhistory'
					},
					{
						index: '6',
						mymag: '系统设置',
						path: '/systemset'
					},
				],
			}
		},


		created() {
			let urlTemp = "assets/img1.jpg"
			this.imgUrl = require("@/" + urlTemp)

		},
		mounted() {
			var that = this;
			that.$nextTick(function() {
				that.showfooter();
			});
		},
		methods: {
			pathto(path) {
				this.$router.push({
					path
				});
				$("#footer").hide();

			},
			gologin: function() {
				this.$router.push({
					path: '/login'
				});
			},
			showfooter() {
				$("#footer").show();
			},
		}
	}
</script>


<style scoped>
	
	.my{
		width: 70%;
		height: 14rem;
		background-color: darkslategrey;
	}
	.myHead {
		background-color: #66B1FF;
		width: 100%;
	}

	.headImg>img {
		width: 2rem;
		height: 2rem;
		border-radius: 1.875rem;
		margin-top: 0.48rem;
		margin-left: 0.3rem;
		padding: 0;
	}
	

	.myname {
		margin-top: 1.3rem;
	}

	.box-card {
		width: 100%;
		margin-top: 0.2rem;
	}

	.mylist {
		/* margin-bottom: 0.3rem; */
		padding: 0.15rem 0;
		border-bottom: 1px solid #dcdcdc;
	}

	.mylist>i {
		float: right;
		margin-right: 0.1rem;
	}

	.tologin {
		text-align: center;
		height: 100px;
		/* margin-top: 40px; */
	}
	.el-button{
		margin-top: 0.8rem;
	}
</style>
