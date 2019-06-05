<template>
	<div class="mytoutiao">
		<div class="topFix">
			<div class="myhead">
				<a class="title1" @click="back"><i class="el-icon-arrow-left"></i></a>
				<span class="title2">关于头条</span>
			</div>
		</div>
		<div class="infor">
			<div class="inforHead">
				<span>中工软件头条简介</span>
			</div>
			<p>欢迎使用“中工软件头条”软件！！！</p>
			<p>1. 本系统主要为用户提供与中原工学院相关的新闻资讯。</p>
			<p>2. 参与开发人员：王甜甜（前端）、任星燃（后台）、李鑫（算法）</p>
			<p>3. 版本信息：v1.0</p>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				msg: '关于头条'
			}
		},
		mounted() {
			var that = this;
			that.$nextTick(function() {
				that.hidefooter();
			});
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
	.mytoutiao {
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

	.myhead>a.title1 {
		margin-left: 0rem;
	}

	.myhead>span.title2 {
		margin-left: 2rem;
		font-size: 0.5rem;
	}

	.infor {
		padding: 0.2rem;
	}

	.infor>p {
		padding: 0.1rem;
		font-size: 0.35rem;
	}

	.inforHead{
		padding: 0.1rem;
		font-size: 0.4rem;
		text-align: center;
	}
</style>
