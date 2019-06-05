<template>
	<!-- 校内新闻 -->
	<div class="notice">
		<Scroll :on-reach-edge="handleReachEdge">

			<el-card class="box-card" dis-hover style="margin: 0.1rem 0" v-for="item in items" :key="item.id">
				<div class="news" @click="godetail(item.userId,item.id)">
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
				updata: {
					newLength: '',
				},
				pageNumber: 1,
				pageSize: 10,
				items: [{
					id: '0',
					title: '纪念五四100周年国旗下宣讲',
					imgF: require("@/assets/54.jpg"),
					path: '/detail',
					source: '软件学院官网',
					artHisCount: '21',
					artResTime: '2019/05/07',
				}],
				// winChips: items,
			}
		},

		mounted() {
			var that = this;
			that.items.userId = localStorage.getItem("userId");
			console.log(that.items.userId)
			that.$nextTick(function() {
				that.getStore();
			});
		},
		
		methods: {
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
						console.log(res.data.data.list)
						console.log("获取数据：" + that.updata.length)
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
							// this.getUpdata(1,10)
							const first = that.items[0];
							// let x=that.updata
							console.log(that.updata)
							console.log("加载列表时" + that.updata.length)
							that.updata.newLength = that.updata.length
							for (let i = 0; i < that.updata.length; i++) {
								that.items.unshift(that.updata[i]);
							}
							that.updata = ''
							console.log(that.updata.newLength)
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
			//跳转详情页
			godetail(userId, id) {
				console.log("文章Id" + id)
				let that = this
				if (userId == "") {
					alert("请先登录！！！")
					this.$router.push({
						path: '/login'
					})
				} else {
					that.$router.push({
						path: '/detail',
						query: {
							newsId: id,
						}
					});
					//记录浏览记录
					that.$axios({
							method: "put", //指定请求方式
							url: "hisAct/add", //请求接口（相对接口，后面会介绍到）
							data: {
								"userId": userId,
								"artId": id,
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
				}

			},
			getStore() {
				let that = this
				that.$axios({
						method: "post", //指定请求方式
						url: "fm/queryFM", //请求接口（相对接口，后面会介绍到）
						data: {
							"page": {
								"pageNumber": that.pageNumber,
								"pageSize": that.pageSize
							},
							"fmname": '校内新闻',
							// "sortKey": "artResTime"
						}
					})
					.then(function(res) {
						//接口成功返回结果执行
						that.items = res.data.data;
						console.log(res.data.data);
						// console.log("返回data" + res.data);
						console.log(res);
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
			},
		}
	}
</script>


<style scoped>
	.recomment {
		overflow: hidden;
		zoom: 1;
	}

	.news {
		margin-bottom: 0.2rem;
		text-align: left;
	}

	.el-row {
		padding: 0.1rem;

	}

	.footerNews {
		font-size: 0.3rem;
		color: #C0C4CC;
		margin-bottom: 0.2rem;
	}

	.el-icon-circle-close-outline {
		float: right;
		margin-right: 0.5rem;
	}

	.picture>img {
		width: 3rem;
		height: 1.7rem;
	}

	.box-card {
		width: 7.45rem;

	}

	.el-card__body {
		padding: 0.2rem;
	}

	.title {
		font-size: 0.3rem;
	}
</style>
