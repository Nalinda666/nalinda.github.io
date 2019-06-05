<template>
	<div class="mycomment">
		<div class="topFix">
			<div class="myhead">
				<a class="title1" @click="back"><i class="el-icon-arrow-left"></i></a>
				<span class="title2">我的评论</span>
				<!-- <a class="del"><i class="el-icon-edit"></i>编辑</a> -->
			</div>
		</div>
		<el-row>
			<div class="newfrom" v-for="mynew in news" :key="mynew.newsId" @click="godetail(mynew.userId,mynew.id)">
				<el-row>
					<el-col :span="4"><img class="picture" :src="mynew.imgSource"></el-col>
					<el-col :span="12">
						<p>{{mynew.source}}</p>
						<span>{{timestampToTime(mynew.comment.comTime)}}</span>
					</el-col>
				</el-row>
				<el-row>
					<div class="mycontent">
						<p>{{mynew.comment.comContent}}</p>
					</div>
				</el-row>
				<el-row>
					<el-col>
						<el-card class="box-card">
							<div class="text item">
								<span>{{mynew.title}}</span>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-row>
					<div class="footerNews">
						<el-col :span="7">
							<div class="myCommentImg">
								<img :src="commentImg">
								{{mynew.commentCount}}
							</div>
						</el-col>
						<el-col :span="7">
							<div class="myCollectImg">
								<img :src="collectActImg" v-if="mynew.collectionSta" @click="Nocollect">
								<img :src="collectImg" v-else @click="collect">
								{{mynew.collectionCount}}
							</div>
						</el-col>
						<el-col :span="7">
							<div class="myLikeImg">
								<img :src="likeActImg" v-if="mynew.pointPriseSta" @click="Nolike">
								<img :src="likeImg" v-else @click="like">
								{{mynew.pointCount}}
							</div>
						</el-col>
					</div>
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
				msg: '我的评论',
				userId: '',
				pageNumber: 1,
				pageSize: 1000,
				news: [],
				comment: {},
			}
		},

		created() {
			let that = this
			let urlTemp = "assets/img1.jpg"
			that.newsImg = require("@/" + urlTemp)
			let urlAdd = "assets/add.png"
			let urlNotice = "assets/noticed.png"
			let urlComment = "assets/comment2.png"
			let urlCollect = "assets/collect.png"
			let urlCollectAct = "assets/collect-active.png"
			let urlLike = "assets/mylike.png"
			let urlLikeAct = "assets/like-active.png"
			that.addImg = require("@/" + urlAdd)
			that.noticeImg = require("@/" + urlNotice)
			that.commentImg = require("@/" + urlComment)
			that.collectImg = require("@/" + urlCollect)
			that.collectActImg = require("@/" + urlCollectAct)
			that.likeImg = require("@/" + urlLike)
			that.likeActImg = require("@/" + urlLikeAct)
		},
		mounted() {
			var that = this;
			that.$nextTick(function() {
				that.userId = localStorage.getItem("userId");
				console.log(that.userId);
				if (that.userId) {
					that.$nextTick(function() {
						that.getStore(that.userId);
					});
				} else {
					alert("请先登录")
					this.$router.push({
						path: '/login'
					})
				}

			});
		},
		methods: {
			//跳转详情页
			godetail(userId, id) {
				console.log("文章Id" + id)
				let that = this
			
				that.$router.push({
					path: '/detail',
					query: {
						newsId: id,
					}
				});
				//记录浏览记录
				that.$axios({
						method: "put", //指定请求方式
						url: "hisAct/add", //请求接口
						data: {
							"userId": userId,
							"artId": id,
							// "sortKey": "artResTime"
						}
					})
					.then(function(res) {
						//接口成功返回结果执行
						console.log(res);
						if (res.data.code == "A001") {
							console.log("添加浏览记录成功");
						} else {
							console.log("添加浏览记录失败")
							console.log(err)
						}
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)
					})
			},
			getStore() {
				let that = this
				that.$axios({
						method: "put", //指定请求方式
						url: "artComment/MyComments", //请求接口
						data: {
							"page": {
								"pageNumber": that.pageNumber,
								"pageSize": that.pageSize,
							},
							"userId": that.userId,
							"asc": false,
							"sortKey": "comTime"
						}
					})
					.then(function(res) {
						//接口成功返回结果执行
						// that.news = res.data.data.list;
						console.log(res.data.data.list);
						// console.log(res.data.data.list.comment);
						for (let item of res.data.data.list) {
							item.comment.comTime = that.timestampToTime(item.comment.comTime)
							that.news.push(item)
						}
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
			},
			back: function() {
				this.$router.go(-1);
			},
			hidefooter() {
				$("#footer").hide();
			},
			//取消关注
			notice() {
				this.isNotice = true
			},
			//关注
			add() {
				this.isNotice = false
			},
			//取消收藏
			Nocollect() {
				this.isCollect = false
			},
			//收藏
			collect() {
				this.isCollect = true
			},
			//取消点赞
			Nolike() {
				this.isLike = false
			},
			//点赞
			like() {
				this.isLike = true
			},
		}
	}
</script>

<style scoped>
	.mycomment {
		height: 1.3rem;
		padding-top: 1rem;
	}

	.el-row {
		/* padding: 0.1rem; */
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
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 1.875rem;
		margin-left: 0.3rem;
		margin-top: 0.1rem;
		margin-right: 0.2rem;
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
		font-size: 0.3rem;
	}
	.mycontent>p{
		font-size: 0.3rem;
		margin-left: 0.5rem;
	}
	div.el-card__body{
		padding: 0.2rem !important;
	}
	div.text.item{
		font-size: 0.35rem;
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
		padding: 0.2rem;
	}

	.a1 {
		text-align: center;
	}

	.footerNews {
		font-size: 0.3rem;
		height: 0.3rem;
		margin-top: 0.1rem;
		text-align: center;
	}

	img {
		width: 0.4rem;
		height: 0.4rem;
		margin-left: 0.2rem;
	}
</style>
