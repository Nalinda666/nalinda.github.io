<template>
	<div class="myhistory">
		<div class="topFix">
			<div class="myhead">
				<a class="title1" @click="back"><i class="el-icon-arrow-left"></i></a>
				<span class="title2">浏览历史</span>
				<a class="del"><i class="el-icon-edit"></i>编辑</a>
			</div>
		</div>
		<el-row>
			<div class="newfrom" v-for="mynew in news" :key="mynew.newsId">
				<el-row>
					<el-col :span="6"><img class="picture" :src="newsImg"></el-col>
					<el-col :span="8">{{mynew.newsFrom}}<br />
						{{mynew.commentTime}}</el-col>
				</el-row>
				<el-row>
					<el-col>
						<h4>{{mynew.newsTitle}}</h4>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" class="a1">{{mynew.newsCollect}}-</el-col>
					<el-col :span="8" class="a1">{{mynew.newslike}}-</el-col>
					<el-col :span="8" class="a1">{{mynew.newslike}}-</el-col>
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
				news: [{
					newsId: "0",
					newsFrom: '新华网',
					commentTime: '2小时前',
					newsTitle: '习近平同俄罗斯总统普京举行会谈',
					newslike: '点赞量',
					newsCollect: '收藏量',
					newslook: '浏览量',
					// newsImg: '../assets/img1.jpg',
				}, {
					newsId: "1",
					newsFrom: '新华网',
					commentTime: '2小时前',
					newsTitle: '习近平同俄罗斯总统普京举行会谈',
					newslike: '点赞量',
					newsCollect: '收藏量',
					newslook: '浏览量',
					// newsImg: '../assets/img1.jpg',
				}]
			}
		},
		mounted() {
			var that = this;
			that.$nextTick(function() {
				that.hidefooter();
			});


		},
		created() {
			let urlTemp = "assets/img1.jpg"
			this.newsImg = require("@/" + urlTemp)

		},
		methods: {
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
	.myhistory {
		height: 1.3rem;
		padding-top: 1rem;
	}

	.el-row {
		padding: 0.1rem;

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
</style>
