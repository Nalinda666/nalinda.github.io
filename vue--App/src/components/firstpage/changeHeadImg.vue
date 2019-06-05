<template>
	<div id="app">
		<div class="topFix">
			<div class="myhead">
				<a class="title1" @click="back"><i class="el-icon-arrow-left"></i></a>
				<span class="title2">更换头像</span>
			</div>
		</div>
		<div class="item_bock head_p">
			<div class="head_img">
				<!-- 图片地址动态绑定 -->
				<img :src="userInfo.avatar" />
			</div>
			<div class="setting_right" @click.stop="uploadHeadImg">
				<el-button type="primary" class="caption">更改头像</el-button>
			</div>
			<input type="file" accept="image/*" @change="handleFile" class="hiddenInput" />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					avatar: require("@/assets/Name.png"),
				}
			}
			// 初始图片
		},
		methods: {
			back: function() {
				this.$router.go(-1);
			},
			// 打开图片上传
			uploadHeadImg: function() {
				this.$el.querySelector('.hiddenInput').click()
			},
			// 将头像显示
			handleFile: function(e) {
				let $target = e.target || e.srcElement
				let file = $target.files[0]
				var reader = new FileReader()
				reader.onload = (data) => {
					let res = data.target || data.srcElement
					this.userInfo.avatar = res.result
				}
				reader.readAsDataURL(file)
			},
		},

	}
</script>

<style scoped>
	.app{
		overflow: hidden;
		zoom: 1;
		padding-top: 1.5rem;
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
		padding: 0.2rem;
	}
	
	.myhead>a.title1 {
		margin-left: 0.1rem;
	}
	
	.title2 {
		margin-left: 2rem;
		font-size: 0.5rem;
	}
	
	.myhead>a.del {
		margin-left: 0.8rem;
	}
	.item_bock {
		align-items: center;
		justify-content: space-between;
		height: 3rem;
		width: 100%;
		padding: 0px 1rem 0px 1rem;
		border-bottom: 1px solid #f7f7f7;
		background: #fff;
	}

	.head_p {
		margin-top: 1.8rem;
		height: 5rem;
	}

	.head_img {
		height: 3rem;

	}

	.head_img img {
		width: 2rem;
		height: 2rem;
		border-radius: 1.875rem;
		margin-left: 1.8rem;
		border: 0.02rem solid #DCDCDC;
	}

	.setting_right {
		display: flex;
		height: 2rem;
		/* justify-content: flex-end; */
		align-items: center;
		margin-left: 1.2rem;
	}

	.hiddenInput {
		display: none;
	}

	.caption {
		color: #000000;
		font-size: 0.6rem;
		height: 1rem;
		margin-top: 0.3rem;

	}
</style>
