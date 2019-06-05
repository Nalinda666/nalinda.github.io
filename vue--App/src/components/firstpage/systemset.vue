<template>
	<div class="systemset">
		<div class="topFix">
			<div class="myhead">
				<a class="title1" @click="back"><i class="el-icon-arrow-left"></i></a>
				<span class="title2">系统设置</span>
			</div>
		</div>
		<el-row>
			<div class="information">
				<el-card class="box-card">
					<ul>
						<li v-for="myinfo in myinfos" :key="myinfo.index" class="mylist" @click="pathto(myinfo.path)">
							{{ myinfo.mymag }}
							<i class="el-icon-arrow-right"></i>
							<router-link to="myinfo.path"></router-link>
						</li>
					</ul>

				</el-card>
			</div>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: '系统设置',
				path: '',
				myinfos: [{
						index: '0',
						mymag: '编辑资料',
						path: '/myprofile'
					}, {
						index: '1',
						mymag: '隐私设置',
						path: '/changes'
					},
					{
						index: '2',
						mymag: '关于头条',
						path: '/mytoutiao'
					},

				]
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
			pathto(path) {
				this.$router.push({
					path

				});
				$("#footer").hide();

			},
		}
	}
</script>

<style scoped>
	.systemset {
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
		padding: 0.2rem;
	}

	.myhead>a.title1 {
		margin-left: 0rem;
	}

	.myhead>span.title2 {
		margin-left: 2rem;
		font-size: 0.5rem;
	}

	.box-card {
		width: 100%;
		margin-top: 0.2rem;
	}

	.mylist {
		margin-bottom: 0.3rem;
		padding: 0.15rem 0;
		border-bottom: 1px solid #dcdcdc;
	}

	.mylist>i {
		margin-left: 4.5rem;
	}

	.systemset>a {
		width: 80%;
		margin-top: 0.4rem;
	}
</style>
