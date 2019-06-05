<template>
	<div class="attention">
		<div class="topFix">
			<div class="headtitle">
				<span class="title1">中工头条</span>
				<span class="title2">关注</span>
				<a class="del"><i class="el-icon-edit"></i>编辑</a>
			</div>
		</div>
		<div style="padding-top: 1.5rem;">
			<div class="news" v-for="item in items" :key="item.newsId">
				<el-row>
					<el-col :span="12">
						<div class="title">
							{{item.title}}
						</div>
					</el-col>
					<el-col :span="12">
						<div class="picture">
							<img :src="item.img">
						</div>
					</el-col>
				</el-row>
				<el-row>
					<div class="footerNews">
						{{item.newsFrom}}&#12288;{{item.comments}}&#12288;{{item.time}}
					</div>
					<hr />
				</el-row>
			</div>
			
		</div>
	</div>
</template>

<script>
	import img from '../assets/img1.jpg'
	export default {
		data() {
			return {
				items: [{
					newsId: 1,
					title: '人长时间吃花生，对身体有什么作用？',
					img: img,
					newsFrom: '青年文摘1',
					comments: '21评论',
					time: '12分钟前 '
				}, {
					newsId: 2,
					title: '人长时间吃花生，对身体有什么作用？',
					img: img,
					newsFrom: '青年文摘1',
					comments: '21评论',
					time: '12分钟前 '
				}, {
					newsId: 3,
					title: '人长时间吃花生，对身体有什么作用？',
					img: img,
					newsFrom: '青年文摘1',
					comments: '21评论',
					time: '12分钟前 '
				}, {
					newsId: 4,
					title: '人长时间吃花生，对身体有什么作用？',
					img: img,
					newsFrom: '青年文摘1',
					comments: '21评论',
					time: '12分钟前 '
				}, ],
				
				title: '',
				img: '',
				newsId: '',
				newsFrom: '',
				comments: '',
				time: '',
			}
		},

		mounted() {

		},
		methods: {

		}
	}
</script>


<style scoped>
	.attention {
		overflow: hidden;
		zoom: 1;
		padding-top: 0rem;
	}

	.topFix {
		position: fixed;
		height: 1rem;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		background-color: red;
		padding: 0.2rem;
	}

	.headtitle {
	width: 100%;
	margin-top: 0.2rem;
		
	}

	.headtitle>span.title1 {
		margin-left: 0.2rem;
	}

	.headtitle>span.title2 {
		margin-left: 1.2rem;
		font-size: 0.5rem;
	}

	.headtitle>a.del {
		float: right;
		margin-right: 0.4rem;
	}

	.el-icon-more {
		margin-left: 4.2rem;
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

	.footerNews>i {
		margin-left: 2.5rem;
	}

	.picture>img {
		width: 3.3rem;
		height: 2rem;
	}
</style>
