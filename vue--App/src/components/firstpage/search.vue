<template>
	<div class="mysearch">
		<div class="topFix">
			<div class="search">
				<a class="title1" @click="back"><i class="el-icon-arrow-left"></i></a>
				<el-input class="title2" id="myintput" placeholder="请输入内容" prefix-icon="el-icon-search" @focus="searchAgain"
				 v-model="input1"></el-input>
				<el-button class="searchbut" type="text" @click="search()">搜索</el-button>
			</div>
		</div>
		<div class="words" v-if="isSearch">
			<div class="hotsearch">
				<el-card class="box-card">
					<div class="text item clear">
						<el-row class="s1">
							<span>搜索发现</span>
						</el-row>
						<el-col v-for="word in hotwords" :key="word.index" :span="8">
							<div @click="inputHotword(word.value)">
								{{word.value }}</div>
						</el-col>
					</div>
				</el-card>
			</div>
		</div>
		<!-- 搜索结果 -->
		<div class="newsList" v-else>
			<el-card class="box-card" dis-hover v-for="item in items" :key="item.id" style="margin: 0.1rem 0">
				<div @click="godetail(item.userId,item.id)">
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
			<div class="nodata">
				<p>{{nodata}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: '搜索页',
				input1: '',
				isSearch: true,
				nodata: '没有了？换个词试试>_<~',
				title: '',
				img: '',
				newsId: '',
				newsFrom: '',
				comments: '',
				time: '',
				items: [{

				}],
				// 热搜词
				hotwords: [{
					index: 0,
					value: '党员',
					path: '',
				}, {
					index: 1,
					value: '就业',
					path: '',
				}, {
					index: 2,
					value: '新生',
					path: '',
				}, {
					index: 3,
					value: '考试',
					path: '',
				}, {
					index: 4,
					value: '运动会',
					path: '',
				}, {
					index: 5,
					value: '讲坛',
					path: '',
				}, {
					index: 6,
					value: '合作',
					path: '',
				}, {
					index: 7,
					value: '毕业',
					path: '',
				}, ],
			}
		},
		mounted() {
			var that = this;
			that.items.userId = localStorage.getItem("userId");
			 var t = this.$route.query.item
			if(t==''){
				that.myfocus();
			}else{
				that.items=that.t
			}
		},
		methods: {
			//返回上一页
			back: function() {
				this.$router.go(-1);
			},
			//将搜索历史输入到搜索框
			inputHistory(value) {
				this.input1 = value;
			},
			//将热搜词输入到搜索框
			inputHotword(value) {
				this.input1 = value;
			},
			//清除搜索历史
			clearHistory() {
				this.searchHistory = "";
				$("#history").hide();
				localStorage.removeItem("history")
			},
			//自动获取输入框焦点
			myfocus() {
				var idObj = document.getElementById('myintput');
				idObj.focus();
			},
			//搜索
			search() {
				let that = this
				console.log(that.input1);
				that.$axios({
						method: "post", //指定请求方式
						url: "artAndComment/searchNews", //请求接口（相对接口，后面会介绍到）
						data: {
							"keyWords": that.input1,
						}
					})
					.then(function(res) {
						//接口成功返回结果执行
						that.items = res.data.data;
						console.log(res.data.data);
						console.log(res.data.code);

						// console.log(jsonObj);
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
				this.isSearch = false
			},
			//再次点击输入框时，搜索历史，热搜词显示出来 搜索结果列表隐藏
			searchAgain() {
				this.isSearch = true
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
							item:that.items
						}
					});
					this.isSearch = true
					//记录浏览记录
					that.$axios({
							method: "put", //指定请求方式
							url: "hisAct/add", //请求接口（相对接口，后面会介绍到）
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
				}

			},
		},

	}
</script>

<style scoped>
	.mysearch {
		padding-top: 1.6rem;
	}

	.search {
		margin-top: 0.2rem;
	}

	.clear {
		zoom: 1;
	}

	.clear:after {
		/*添加一个内容*/
		content: "";
		/*转换为一个块元素*/
		display: block;
		/*清除两侧的浮动*/
		clear: both;
	}

	.topFix {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		height: 1.3rem;
		background-color: red;
	}

	.clearfix {
		height: 0.6rem;
	}

	button {
		font-size: 0.3rem;
	}

	img.tosearch {
		padding: 0;
		float: right;
		margin-left: 1.4rem;
		margin-top: 0.3rem;
	}

	.picture>img {
		width: 2.8rem;
		height: 1.5rem;
		padding: 0rem;
		margin-left: 0.2rem;
		margin-top: 0.1rem;
	}

	img {
		width: .67rem;
		height: .67rem;
		padding: .4rem;
	}

	.title1 {
		margin-left: 0.3rem;
	}

	.title2 {
		width: 5rem;
		margin-left: 0.3rem;
		margin-right: 0.1rem;
	}

	.searchbut {
		color: #F0F0F0;
		font-size: 0.35rem;
	}

	.clearfix {
		padding: 0.2rem;
	}

	.text {
		font-size: 0.3rem;
		color: #888888;
	}

	.item {
		margin-bottom: 0.4rem;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.s1.el-row {
		padding: 0rem;
		margin-bottom: 0.1rem;

	}

	.title {
		font-size: 0.3rem;
		margin-left: 0.2rem;
	}


	.box-card {
		width: 7.45rem;

	}

	.el-card__body {
		padding: 0.2rem;
	}

	.clearHistory {
		margin-left: 3rem;
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
		margin-left: .2rem;
	}



	.nodata {
		font-size: 0.3rem;
		color: #C0C4CC;
		text-align: center;
		padding: 0.3rem;
	}
</style>
