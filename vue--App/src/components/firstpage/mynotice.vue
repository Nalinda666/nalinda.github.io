<template>
	<div class="mynotice">
		<div class="topFix">
			<div class="myhead">
				<a class="title1" @click="back"><i class="el-icon-arrow-left"></i></a>
				<span class="title2">我的关注</span>
				<!-- <a class="del"><i class="el-icon-edit"></i>编辑</a> -->
			</div>
		</div>
		<el-row>
			<div class="newfrom" v-for="mynew in news" :key="mynew.id">
				<el-row>
					<el-col :span="6"><img class="picture" :src="mynew.imgSouce"></el-col>
					<el-col :span="12">
						<span>{{mynew.sourceName}}</span>
						<div class="noticePic" v-if="mynew.focusSta" @click="notice">
							<img class="notice" :src="noticeImg">
						</div>
						<div class="addPic" v-else @click="add">
							<img class="add" :src="addImg">
						</div>
						<p> 粉丝量 1</p>
						<p>{{timestampToTime(mynew.focusDate)}}</p>
					</el-col>
				</el-row>
			</div>
			<el-row>
				<div class="nodata">
					<span>暂无数据</span>
				</div>
			</el-row>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: '我的关注',
				mynew: '',
				addImg: '',
				isNotice: false,
				news: [{
					
				}, ],
				pageNumber: 1,
				pageSize: 10,
			}
		},
		mounted() {
			var that = this;
			that.$nextTick(function() {
				that.hidefooter();
				that.news.id = localStorage.getItem("userId");
				console.log(that.news.id);
				if (that.news.id) {
					that.$nextTick(function() {
						that.getStore(that.news.id);
					});
				} else {
					alert("请先登录")
					this.$router.push({
						path: '/login'
					})
				}
			});


		},
		created() {
			let urlAdd = "assets/add.png"
			let urlNotice = "assets/noticed.png"
			this.addImg = require("@/" + urlAdd)
			this.noticeImg = require("@/" + urlNotice)
		},
		methods: {
			getStore(id) {
				let that = this
				that.$axios({
						method: "post", //指定请求方式
						url: "focus/queryMyFocus/" + id, //请求接口（相对接口，后面会介绍到）
					})
					.then(function(res) {
						//接口成功返回结果执行
						that.news = res.data.data;
						console.log(res.data.data);
						console.log(res.data.code);
						console.log(res.data);
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
			},
			notice() {
				// let that = this
				// that.$axios({
				// 		method: "post", //指定请求方式
				// 		url: "focus/queryMyFocus/"+that.userId, //请求接口（相对接口，后面会介绍到）
				// 	})
				// 	.then(function(res) {
				// 		//接口成功返回结果执行
				// 		that.news = res.data.data;
				// 		console.log(res.data.data);
				// 		console.log(res.data.code);
				// 		console.log(res.data);
				// 		
				// 	})
				// 	.catch(function(err) {
				// 		//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
				// 		// console.log("请求失败")
				// 		console.log(err)
				// 			
				// 	})
				// this.mynew.focusSta = true
			},
			add() {
				// this.mynew.focusSta = false
			},
			back: function() {
				this.$router.go(-1);
			},
			hidefooter() {
				$("#footer").hide();
			},
		}
	}
</script>

<style scoped>
	.mynotice {
		height: 1.3rem;
		padding-top: 1rem;
	}

	.topFix {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		background-color: red;
	}

	.myhead {
		/* height: 0.9rem; */
		padding: 0.2rem;
	}

	.picture {
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 1.875rem;
		margin-left: 0.3rem;
		margin-top: 0.2rem;
	}

	.headImg>span {
		margin-left: 0.2rem;
	}

	.myhead>a.title1 {
		margin-left: 0rem;
	}

	.myhead>span.title2 {
		margin-left: 2rem;
		font-size: 0.5rem;
	}

	.myhead>a.del {
		float: right;
		margin-right: 0.1rem;
	}

	.el-col>p {
		font-size: 0.3rem;
	}

	.el-col>span {
		font-size: 0.35rem;
		/* margin-left: 0.5rem; */
	}

	.newfrom {
		width: 100%;
		padding: 0.2rem;
		border-bottom: 1px solid #B4BCCC;
		border-width: medium;
		padding: 0rem 0rem 0.3125rem 0rem;
		padding-top: 0.2rem;
		padding-bottom: 0.2rem;
	}

	.newfrom>span {
		margin-left: 1rem;

	}

	.el-button {
		margin-left: 2rem;
		margin-top: 0.3rem;
	}

	.nodata {
		text-align: center;
		font-size: 0.3rem;
		color: #B4BCCC;
		padding: 0.2rem;
	}

	.addPic {
		width: 0.9rem;
		height: 0.6rem;
		background-color: #FF0000;
		margin-left: 2rem;
		margin-top: 0.3rem;
	}

	.noticePic {
		width: 0.9rem;
		height: 0.6rem;
		background-color: #DCDCDC;
		float: right;
		/* margin-left: 1rem; */
		margin-right: -1.3rem;
		margin-top: 0.5rem;
	}

	img {
		width: .5rem;
		height: .5rem;
		margin-top: 0.05rem;
		margin-left: 0.2rem;
	}
</style>
