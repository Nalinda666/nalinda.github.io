<template>
	<div class="my_like">
		<div class="topFix">
			<div class="myhead">
				<a class="title1" @click="back"><i class="el-icon-arrow-left"></i></a>
				<span class="title2">我的点赞</span>
				<!-- <a class="del"><i class="el-icon-edit"></i>编辑</a> -->
			</div>
		</div>
		<el-row>
			<div class="newfrom" v-for="mynew in news" :key="mynew.id" @click="godetail(mynew.userId,mynew.id)">
				<el-row>
					<!-- <el-col :span="6"><img class="headPicture" :src="mynew.imgSouce"></el-col> -->
					<el-row>
						<el-col :span="6">
							<img class="headPicture" :src="mynew.imgSource">
						</el-col>
						<el-col :span="12">
							<p>{{mynew.source}}</p>
							<span>{{timestampToTime(mynew.pointPriseDate)}}</span>
						</el-col>
					</el-row>
				</el-row>
				<el-row>
					<div v-if="mynew.imgF!=''">
						<el-row>
							<el-col :span="12">
								<div class="title">
									{{mynew.title}}
								</div>
							</el-col>
							<el-col class="col1" :span="12">
								<div class="pictureF">
									<img :src="mynew.imgF">
								</div>
							</el-col>
						</el-row>
					</div>
					<div v-else>
						<el-row>
							<el-col>
								<div class="title">
									{{mynew.title}}
								</div>
							</el-col>
						</el-row>
					</div>
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
				msg: '我的点赞',
				news: [{
					// id: "",
					// page: '',
					// asc: null,
					// sortKey: null,
					// artResTime: 1556675040000,
					// title: "你好呀",
					// content: "<p style=\"text-indent:64px\"><a></a><strong><span style=\"font-size:21px;font-family:宋体\">就业指导工作处组织召开东北袜业暑期实习汇报会</span></strong></p> \n<p style=\"text-indent:37px\"><span style=\"font-size:19px;font-family:宋体\">&nbsp;</span></p> \n<p style=\"text-indent:37px\"><span style=\"font-size:19px;font-family:宋体\">2018</span><span style=\"font-size:19px;font-family:宋体\">年9月11日下午，就业指导工作处组织暑期参与东北袜业实习的学生在镇泰楼402召开东北袜业实习汇报会，所有14名参加暑期在东北袜业实习的学生全部参加，就业指导工作处处长刘国存，副处长吕继东参加了汇报会。</span></p> \n<p style=\"text-indent:37px\"><span style=\"font-size:19px;font-family:宋体\"><img src=\"https://img.goworkla.cn/college/5b45a1603c8fb0312c35ba9d/article/images/db02313c36d34a439d865804b3568662.jpg\" alt=\"\"></span></p> \n<p style=\"margin-left:28px\"><span style=\"font-size:19px;font-family:宋体\"><img src=\"https://img.goworkla.cn/college/5b45a1603c8fb0312c35ba9d/article/images/c14603ef1f3e498ea484a8debe63d525.jpg\" alt=\"\"></span></p> \n<p style=\"text-indent:37px\"><span style=\"font-size:19px;font-family:宋体\">2018</span><span style=\"font-size:19px;font-family:宋体\">年7月16日-28日，中原工学院就业指导工作处与吉林辽源东北袜业园有限公司进行校企合作，在校内公开招募了14名大三同学到东北袜业园进行实习。同学们在炎热的夏天，以饱满的热情深入企业，在各个岗位上进行实习实践，圆满的完成了实习任务，受到了实习单位的肯定和表扬。</span></p> \n<p style=\"text-indent:37px\"><span style=\"font-size:19px;font-family:宋体\">汇报会上，分别来自我校纺织学院、服装学院、经济管理学院、机电学院的14名同学依次上台，为大家分享了暑期东北袜业实习的过程、个人收获和心得体会。</span></p> \n<p style=\"text-indent:37px\"><span style=\"font-size:19px;font-family:宋体\">通过这次实习，同学们对袜业行业以及电子商务有了一定的了解，进一步明确了将来发展的方向，清楚地认识到了自己目前存在的缺点和短板，对大四的学习生活有了更加明确的规划。</span></p> \n<p style=\"text-indent:37px\"><span style=\"font-size:19px;font-family:宋体\"><img src=\"https://img.goworkla.cn/college/5b45a1603c8fb0312c35ba9d/article/images/403141d4dc1f42db8a15977a584421a9.jpg\" alt=\"\"></span></p> \n<p style=\"text-indent:37px\"><span style=\"font-size:19px;font-family:宋体\">汇报会上，刘国存处长跟大家进行了深入地交流。从国际形势到国内经济的影响，从我国制造企业面临人口红利的逐渐消失到外加工型企业纷纷迁往东南亚的现实情况发表了自己的看法，他希望同学们能够认清形势，认清自我，通过此次实习，对自己的个人职业发展能有一个更加清楚的定位，根据自己的长短期目标有效地实施自己的人生规划，对自己的将来进一步的发展学会思考。同时，他也希望参加实习的14为同学能够珍惜这次实习给大家结成的深厚友谊，在将来的学习工作中共同学习、加强交流，共同进步，将这种来之不易的缘分持续下去。</span></p> \n<p style=\"text-indent:37px\"><span style=\"font-size:19px;font-family:宋体\">&nbsp;</span></p> \n<p style=\"text-indent:37px\"><span style=\"font-size:19px;font-family:宋体\">中原工学院就业指导工作处</span></p> \n<p style=\"text-indent:355px\"><span style=\"font-size:19px;font-family:宋体\">2018</span><span style=\"font-size:19px;font-family:宋体\">年9月11日</span></p> \n<p><span style=\"font-size:19px;font-family:宋体\"></span><br></p> \n<p><br></p><img src=\"/Shared/images/images-details/shijian.png\" title=\"发布时间\"><span>2018年9月13日 星期四 </span> <img src=\"/Shared/images/images-details/benxiaofabu.png\" title=\"发布机构\" style=\"margin-left: 10px\"> <span>就业处</span> <img src=\"/Shared/images/images-details/liulanliang.png\" title=\"浏览次数\" style=\"margin-left: 10px\"><span>2006 </span> <img src=\"/Shared/images/images-details/infoSource.png\" title=\"新闻来源\" style=\"margin-left: 10px\"><span> 就业处 </span>",
					// url: "http://job.zut.edu.cn/module/newsdetail/id-11503/nid-1617",
					// source: "中原工学院官网",
					// imgF: "https://img.goworkla.cn/college/5b45a1603c8fb0312c35ba9d/article/images/db02313c36d34a439d865804b3568662.jpg",
					// examineN: 1,
					// releaseN: 0,
					// artcomments: null,
					// commentCount: 12,
					// pointCount: 35,
					// collectionCount: 67,
					// collectionSta: false,
					// pointPriseSta: true,
					// focusSta: true,
					// focusDate: "",
					// userId: null,
					// artHisCount: 243
				}, ],
				pageNumber: 1,
				pageSize: 10,
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
				that.news.userId = localStorage.getItem("userId");
				console.log(that.news.userId);
				if (that.news.userId) {
					that.$nextTick(function() {
						that.getStore(that.news.userId);
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
			getStore(id) {
				let that = this
				console.log("用户" + id);
				that.$axios({
						method: "put", //指定请求方式
						url: "pointPrise/MyPointPrise",
						data: {
							"page": {
								"pageNumber": that.pageNumber,
								"pageSize": that.pageSize,
							},
							"userId": id
						} 
					})
					.then(function(res) {
						//接口成功返回结果执行
						console.log(res);
						that.news = res.data.data.list;
						console.log(res.data.data.list);
						console.log(res.data.data);
						// console.log(that.news);
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						// console.log(err)

					})
					that.pageNumber++
			},
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
			back: function() {
				this.$router.go(-1);
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
	.my_like {
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

	.el-row {
		padding: 0.05rem;

	}

	.myhead {
		/* height: 0.9rem; */
		padding: 0.2rem;
	}

	.footerNews {
		font-size: 0.3rem;
		height: 0.3rem;
		/* margin-top: 0.2rem; */
		/* margin-bottom: 0.2rem; */
		text-align: center;
	}


	.el-icon-circle-close-outline {
		float: right;
		margin-right: 0.5rem;
	}

	.box-card {
		width: 7.45rem;

	}

	.el-card__body {
		padding: 0.2rem;
	}

	.title {
		font-size: 0.32rem;
	}

	.pictureF>img {
		width: 3rem;
		height: 1.5rem;
	}




	.headPicture {
		width: 1rem;
		height: 1rem;
		border-radius: 1.875rem;
		margin-left: 0.3rem;
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

	.el-col>p {
		font-size: 0.3rem;
	}

	.el-col>span {
		font-size: 0.3rem;
	}

	.el-button {
		margin-left: 2rem;
		margin-top: 0.3rem;

	}

	.nodata {
		text-align: center;
		padding: 0.2rem;
		font-size: 0.3rem;
		color: #D9D9D9;
	}

	.a1 {
		text-align: center;
	}

	img {
		width: 0.4rem;
		height: 0.4rem;
		margin-left: 0.2rem;
	}
</style>
