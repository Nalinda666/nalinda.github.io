<template>
	<div>
		<div class="detail">
			<div :class="{'topFix': needFixed == true}">
				<div class="myhead">
					<a class="title1" @click="back"><i class="el-icon-arrow-left"></i></a>
					<span class="title2">中工头条</span>
					<a class="del"><i class="el-icon-more"></i></a>
				</div>
			</div>
			<div class="mybody">
				<el-row>
					<div class="title">
						<h4>{{news.title}}</h4>
					</div>
				</el-row>
				<el-row>
					<div class="newfrom">
						<el-col :span="8">
							<p>{{news.source}}</p>
							<p>{{timestampToData(news.artResTime)}}</p>
						</el-col>
						<el-col :span="8">
							<div class="noticePic" v-if="news.focusSta" @click="Nonotice">
								<img class="notice" :src="noticeImg">
							</div>
							<div class="addPic" v-else @click="addNotice">
								<img class="add" :src="addImg">
							</div>
						</el-col>
						</p>
					</div>
				</el-row>
				<el-row>
					<!-- 新闻详情内容 -->
					<div class="newdetail" v-html="news.content">
					</div>
				</el-row>
				<el-row>
					<div class="commenting">
						<p><img :src="commentImg">我来说两句
							<span>{{news.commentCount}} 条评论</span>
						</p>
						<el-input type="textarea" :rows="2" v-model="textarea" placeholder="说点什么吧>~<"></el-input>
						<el-button type="primary" size="small" @click="putComment(textarea)">发表评论</el-button>
					</div>
				</el-row>
				<!-- 评论显示 -->
				<el-row>
					<div class="comment">
						<ul>
							<li v-for="comments in artcomments" :key="comments.userId">
								<el-row>
									<el-col :span="4">
										<div class="head">
											<img :src="comments.userImg">
										</div>
									</el-col>
									<el-col :span="6">
										<div class="userName">
											<span>{{comments.userName}}</span>
										</div>
									</el-col>
								</el-row>
								<el-row>
									<div class="body">
										<p>{{comments.comContent}}</p>
									</div>
								</el-row>
								<el-row>
									<div class="time">
										<span>{{timestampToTime(comments.comTime)}}</span>
									</div>
								</el-row>
								<div class="action">
									<a href v-show="false">
										<span>
											<i class="iconfont icon-trash"></i> 删除
										</span>
									</a>
								</div>
							</li>
						</ul>
					</div>
				</el-row>
			</div>
			<!-- 底部 -->
			<div class="newfooter">
				<!-- 评论量 -->
				<el-col :span="8">
					<div class="myCommentImg">
						<img :src="commentImg2">
						{{news.commentCount}}
					</div>
				</el-col>
				<!-- 收藏 -->
				<el-col :span="8">
					<div class="myCollectImg">
						<img :src="collectActImg" v-if="news.collectionSta" @click="Nocollect" :plain="true">
						<img :src="collectImg" v-else @click="collect" :plain="true">
						{{news.collectionCount}}
					</div>
				</el-col>
				<!-- 点赞 -->
				<el-col :span="8">
					<div class="myLikeImg">
						<img :src="likeActImg" v-if="news.pointPriseSta" @click="Nolike" :plain="true">
						<img :src="likeImg" v-else @click="like" :plain="true">
						{{news.pointCount}}
					</div>
				</el-col>
			</div>
			<!-- </el-row> -->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: '详情页',
				needFixed: true,
				path: '',
				news: {

				},
				artcomments: [{}],
				textarea: '',
				items: [],
			}
		},
		created() {
			let that = this
			that.getQuery();
			let urlTemp = "assets/img1.jpg"
			that.userImg = require("@/" + urlTemp)
			let urlAdd = "assets/add.png"
			let urlNotice = "assets/noticed.png"
			let urlComment = "assets/comment.png"
			let urlComment2 = "assets/comment2.png"
			let urlCollect = "assets/collect.png"
			let urlCollectAct = "assets/collect-active.png"
			let urlLike = "assets/mylike.png"
			let urlLikeAct = "assets/like-active.png"
			that.addImg = require("@/" + urlAdd)
			that.noticeImg = require("@/" + urlNotice)
			that.commentImg = require("@/" + urlComment)
			that.commentImg2 = require("@/" + urlComment2)
			that.collectImg = require("@/" + urlCollect)
			that.collectActImg = require("@/" + urlCollectAct)
			that.likeImg = require("@/" + urlLike)
			that.likeActImg = require("@/" + urlLikeAct)

		},
		watch: {
			'$route': 'getQuery'
		},
		mounted() {
			let that = this
			window.addEventListener('scroll', this.handleScroll)
			that.news.userId = localStorage.getItem("userId");
			that.currentindex = this.$route.query.currentindex
			that.news.id = this.$route.query.newsId
			that.items = this.$route.query.item
			console.log("wz"+that.news.id)
			if (that.news.userId) {
				that.$nextTick(function() {
					that.getStore();
				});
			} else {
				alert("请先登录")
				this.$router.push({
					path: '/login'
				})
			}
		},
		destroyed() {
			window.removeEventListener('scroll', this.handleScroll)
		},
		methods: {
			handleScroll() {
				let that = this
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				console.log(scrollTop)
				if (scrollTop > 20) {
					that.needFixed = true;
				} else {
					that.needFixed = false;
				}
			},
			//发布评论
			putComment(comment) {
				let that = this
				that.$axios({
						method: "put", //指定请求方式
						url: "artComment/addComment", //请求接口（相对接口，后面会介绍到）
						data: {
							"userId": that.news.userId,
							"artId": that.news.id,
							"comContent": that.textarea
						},
					})
					.then(function(res) {
						//接口成功返回结果执行
						if (res.data.code == 'A001') {
							that.artcomments.push(res.data.data)
							that.news.commentCount = res.data.data.commentCount
							that.$message({
								message: '发布评论成功',
								type: 'success',
								center: true
							});
							that.textarea = ''
						}
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						console.log(err)
					})
			},
			//取消关注
			Nonotice() {
				let that = this
				that.$axios({
						method: "post", //指定请求方式
						url: "focus/cancleFocusSource", //请求接口
						data: {
							"userId": that.news.userId,
							"artId": that.news.id,
						},
					})
					.then(function(res) {
						//接口成功返回结果执行
						if (res.data.code == 'A001') {
							that.news.focusSta = res.data.data.focusSta
							that.$message({
								message: '已取消关注!',
								type: 'warning',
								center: true
							});
						}
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						console.log(err)
					})
			},
			//关注
			addNotice() {
				let that = this
				that.$axios({
						method: "post", //指定请求方式
						url: "focus/addFocusSource", //请求接口（相对接口，后面会介绍到）
						data: {
							"userId": that.news.userId,
							"artId": that.news.id,
						},
					})
					.then(function(res) {
						//接口成功返回结果执行
						if (res.data.code == 'A001') {
							that.news.focusSta = res.data.data.focusSta
							that.$message({
								message: '关注成功！',
								type: 'success',
								center: true
							});
						}
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						console.log(err)
					})
			},
			//取消收藏
			Nocollect() {
				let that = this
				that.$axios({
						method: "put", //指定请求方式
						url: "artCollection/cancleCollection", //请求接口（相对接口，后面会介绍到）
						data: {
							"userId": that.news.userId,
							"artId": that.news.id,
						},
					})

					.then(function(res) {
						//接口成功返回结果执行
						if (res.data.code == 'A001') {
							that.news.collectionSta = res.data.data.collectionSta
							that.news.collectionCount = res.data.data.collectionCount
							that.$message({
								message: '已取消收藏',
								type: 'warning',
								center: true
							});
						}
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						console.log(err)
					})
			},
			//收藏
			collect() {
				let that = this
				that.$axios({
						method: "put", //指定请求方式
						url: "artCollection/addCollection", //请求接口（相对接口，后面会介绍到）
						data: {
							"userId": that.news.userId,
							"artId": that.news.id,
						},
					})
					.then(function(res) {
						//接口成功返回结果执行
						if (res.data.code == 'A001') {
							that.news.collectionSta = res.data.data.collectionSta
							that.news.collectionCount = res.data.data.collectionCount
							that.$message({
								message: '收藏成功！',
								type: 'success',
								center: true
							});
						}
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						console.log(err)

					})
			},
			//取消点赞
			Nolike() {
				let that = this
				that.$axios({
						method: "put", //指定请求方式
						url: "pointPrise/canclePointPrise", //请求接口（相对接口，后面会介绍到）
						data: {
							"userId": that.news.userId,
							"artId": that.news.id,
						},
					})
					.then(function(res) {
						//接口成功返回结果执行
						if (res.data.code == 'A001') {
							that.news.pointPriseSta = res.data.data.pointPriseSta
							that.news.pointCount = res.data.data.pointCount
							that.$message({
								message: '已取消点赞',
								type: 'warning',
								center: true
							});
						}
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						console.log(err)
					})
			},
			//点赞
			like() {
				let that = this
				that.$axios({
						method: "put", //指定请求方式
						url: "pointPrise/addPointPrise", //请求接口（相对接口，后面会介绍到）
						data: {
							"userId": that.news.userId,
							"artId": that.news.id,
						},
					})
					.then(function(res) {
						//接口成功返回结果执行
						if (res.data.code == 'A001') {
							that.news.pointPriseSta = res.data.data.pointPriseSta
							that.news.pointCount = res.data.data.pointCount
							that.$message({
								message: '点赞成功！',
								type: 'success',
								center: true
							});
						}
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
			},
			//获取参数
			getQuery() {
				var that = this
				let Id = this.$route.query.newsId
				that.news.id = Id;
			},
			//返回上一页
			back: function(currentindex) {
				var that = this
				that.$router.go(-1),
					that.$router.push({
						query: {
							currentindex: that.currentindex,
							item: that.items
						}
					});
			},
			//获取新闻详情
			getStore() {
				let that = this
				console.log(that.news.userId)
				console.log("wz"+that.news.id)
				that.$axios({
						method: "post", //指定请求方式
						url: "artAndComment/getArtAndComment", //请求接口
						data: {
							"userId": that.news.userId,
							"id": that.news.id,
						},
						"asc": true,
						"sortKey": that.artcomments.comTime,
					})
					.then(function(res) {
						//接口成功返回结果执行
						console.log(res)
						console.log(res.data.data.title)
						that.news = res.data.data;
						that.artcomments = res.data.data.artcomments;
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						console.log(err)
					})
			},
		}
	}
</script>

<style scoped>
	.detail {
		height: 1.3rem;
		width: 100%;
		/* padding-top: 0.7rem; */
	}

	.topFix {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
	}

	.headImg>img {
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 1.875rem;
		margin-top: 0.4rem;
		margin-left: 0.3rem;
	}

	.head>img {
		border-radius: 1.875rem;
		margin-top: 0.1rem;
	}

	.commenting>p>img {
		width: 0.35rem;
		height: 0.35rem;
		margin-left: 0.4rem;
		margin-right: 0.1rem;
	}

	.commenting>p {
		color: #C0C0C0;
		font-size: 0.35rem;
	}

	.commenting>p>span {
		color: #000000;
		float: right;
		margin-right: 0.35rem;
	}

	.el-textarea {
		margin-left: 0.35rem;
	}


	.commenting>el-input {
		width: 80% !important;
		padding: 0.2rem;
	}

	.headImg>span {
		margin-left: 0.2rem;
	}

	.myhead {
		/* height: 0.7rem; */
		width: 100%;
		padding: 0.2rem;
		background-color: red;
	}

	.myhead>a.title1 {
		margin-left: 0.15rem;
		color: #000000;

	}

	.myhead>span.title2 {
		margin-left: 1.7rem;
		font-size: 0.5rem;
	}

	.head {
		height: 0.6rem;
	}

	.head>img {
		margin-left: 0;
		width: 0.5rem;
		height: 0.5rem;
	}

	.mybody {
		margin-bottom: 0.2rem;
	}

	.body>p {
		font-size: 0.32rem;
	}

	.time>span {
		font-size: 0.25rem;
	}

	.myhead>a.del {
		float: right;
		margin-right: 0.2rem;
		color: #000000;
	}

	.el-row {
		padding: 0.1rem;
	}

	.newfrom {
		padding: 0rem !important;
		margin-left: 0.1rem;
	}

	.title,
	.newfrom,
	.newdetail,
	.comment {
		padding: 0.2rem;
		margin-top: 0.2rem;
	}

	.newfrom {
		font-size: 0.3rem;
	}

	.newdetail {
		font-size: 0.3rem;
	}

	.newdetail>img {
		width: 100px;
		height: 0.5rem;
	}

	.myCommentImg>img,
	.myCollectImg>img,
	.myLikeImg>img {
		margin-top: 0.15rem;
	}

	.time>span {
		margin-top: -1rem;
		font-size: 0.25rem;
	}

	.userName>span {
		font-size: 0.3rem;
		margin-top: -0.2rem;
	}

	.title {
		width: 100%;
	}

	.el-button {
		float: right;
		margin-top: 0.1rem;
		margin-right: 0.3rem;

	}

	.addPic {
		width: 0.9rem;
		height: 0.6rem;
		background-color: #FF0000;
		margin-left: 3rem;
		margin-top: 0.1rem;
	}

	.comment {
		margin-bottom: 0.5rem;
	}

	.noticePic {
		width: 0.9rem;
		height: 0.6rem;
		background-color: #DCDCDC;
		margin-left: 3rem;
		margin-top: 0.1rem;
	}

	img.add,
	img.notice {
		width: .5rem;
		height: .5rem;
		margin-top: 0.05rem;
		margin-left: 0.2rem;
	}

	.newfooter {
		position: fixed;
		background-color: #F0F0F0;
		text-align: center;
		bottom: 0;
		left: 0;
		padding: 0.1rem;
		border: 0.01rem solid #C0C0C0;
		height: 1rem;
		margin-top: 0.2rem;
		z-index: 10;
		width: 100%
	}

	.myInput {
		height: 0.1rem;
	}

	img {
		width: 0.5rem;
		height: 0.5rem;
		margin-left: 0.2rem;
	}
</style>
