<template>
	<!-- 推荐页 -->
	<div class="recomment">
		<Scroll :on-reach-edge="handleReachEdge">
			<el-card class="box-card" dis-hover v-for="item in items" :key="item.id" style="margin: 0.1rem 0">
				<div @click="godetail(item.user_id,item.id)">
					<div v-if="item.imgF!=''">
						<el-row>
							<el-col :span="12">
								<div class="title">
									{{item.title}}
								</div>
							</el-col>
							<el-col class="col1" :span="12">
								<div class="picture">
									<img :src="item.imgF">
								</div>
							</el-col>
						</el-row>
					</div>
					<div v-else>
						<el-row>
							<el-col>
								<div class="title">
									{{item.title}}
								</div>
							</el-col>
						</el-row>
					</div>
					<el-row>
						<div class="footerNews">
							{{item.source}}&#12288;<i class="el-icon-view"></i>{{item.artHisCount}}&#12288;{{timestampToData(item.artResTime)}}
						</div>
					</el-row>
				</div>
			</el-card>
		</Scroll>
	</div>
</template>

<script>
	import img from '../assets/img1.jpg'
	export default {
		data() {
			return {
				upData: {
					newLength: '',
				},
				pageNumber: 1,
				pageSize: 10,
				items: [],
				userId: ''
			}
		},
		mounted() {
			var that = this;
			that.userId = localStorage.getItem("userId");
			that.$nextTick(function() {
				that.getQuery();
				that.getStore();
			});
		},
		methods: {
			//获取页码参数
			getQuery() {
				var that = this
				that.currentindex = this.$route.query.currentindex
			},
			//跳转详情页
			godetail(userId, artId) {
				let that = this
				console.log(artId)
				if (userId == "") {
					alert("请先登录！！！")
					this.$router.push({
						path: '/login'
					})
				} else {
					that.$router.push({
						path: '/detail',
						query: {
							newsId: artId,
							currentindex: that.currentindex
						}
					});
					//记录浏览记录
					that.$axios({
							method: "put", //指定请求方式
							url: "hisAct/add", //请求接口
							data: {
								"userId": userId,
								"artId": artId,
							}
						})
						.then(function(res) {
							//接口成功返回结果执行
							if (res.data.code == "A001") {
							} else {
								console.log(err)
							}
						})
						.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
							console.log(err)
						})
				}
			},
			//加载数据接口请求
			getUpdata() {
				let that = this
				that.$axios({
						method: "post", //指定请求方式
						url: "artAndComment/queryArtLists", //请求接口
						data: {
							"page": {
								"pageNumber": that.pageNumber,
								"pageSize": that.pageSize
							},
							"asc": true,
							"sortKey": "artResTime"
						}
					})
					.then(function(res) {
						that.updata = res.data.data.list
					})
				that.pageNumber++;
			},
			//刷新
			handleReachEdge(dir) {
				let that = this
				that.getUpdata();
				return new Promise(resolve => {
					setTimeout(() => {
						//下拉刷新
						if (dir > 0) {
							const first = that.items[0];
							that.updata.newLength = that.updata.length
							for (let i = 0; i < that.updata.length; i++) {
								that.items.unshift(that.updata[i]);
							}
							that.updata = ''
							this.$message({
								message: '搜索引擎刷新' + that.updata.newLength + '条',
								center: true
							});
						} else {
							//上拉加载
							const last = that.items[that.items.length - 1];
							that.updata.newLength = that.updata.length
							for (let i = 1; i < that.updata.length; i++) {
								that.items.push(that.updata[i]);
							}
							that.updata = ''
							this.$message({
								message: '加载' + that.updata.newLength + '条',
								center: true
							});
						}
						resolve();
					}, 2000);
				});
			},
			getStore() {
				let that = this
				that.$axios({
						method: "post", //指定请求方式
						url: "artAndComment/queryArtLists", //请求接口
						data: {
							"page": {
								// "pageNumber": that.pageNumber,
								// "pageSize": that.pageSize,
							},
							// "asc": false,
							// "sortKey":"artResTime",
						}
					})
					.then(function(res) {
						//接口成功返回结果执行
						console.log(res)
						for (let item of res.data.data.list) {
							item.user_id = that.userId;
							that.items.push(item)
						}
					})
					.catch(function(err) {
					//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						console.log(err)
					})
				that.pageNumber++;
			},
		}
	}
</script>


<style scoped>
	.recomment {
		overflow: scroll;
		zoom: 1;

	}

	.news {
		margin-bottom: 0.2rem;
		text-align: left;
	}

	.ivu-scroll-container {
		overflow-y: scroll;
	}

	.el-row {
		padding: 0.1rem;
	}

	.footerNews {
		font-size: 0.3rem;
		color: #C0C4CC;
		margin-bottom: 0.2rem;
		margin-left: .2rem;
	}

	.el-icon-circle-close-outline {
		float: right;
		margin-right: 0.5rem;
	}

	.picture>img {
		width: 2.8rem;
		height: 1.5rem;
		margin-left: 0.2rem;
	}

	.box-card {
		width: 7.45rem;
	}

	.updata {
		color: #C0C4CC;
		font-size: 0.3rem;
		text-align: center;
	}

	.el-card__body {
		padding: 0.2rem;
	}

	.title {
		font-size: 0.3rem;
		margin-left: 0.2rem;
	}
</style>
