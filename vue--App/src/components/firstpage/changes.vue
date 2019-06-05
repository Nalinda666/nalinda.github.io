<template>
	<div class="changes">
		<div class="topFix">
			<div class="myhead">
				<a class="title1" @click="back"><i class="el-icon-arrow-left"></i></a>
				<span class="title2">账号设置</span>
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
				msg: '账号设置',
				path: '',
				myinfos: [{
						index: '0',
						mymag: '更改密码',
						path: '/changepass'
					}, {
						index: '1',
						mymag: '更换手机号',
						path: '/changeiPhone'
					},
					{
						index: '2',
						mymag: '更换邮箱',
						path: '/changeemial'
					}

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
	.changes {
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
		margin-left: 0.1rem;
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
		float: right;
		margin-right: 0.1rem;
	}

	.changes>a {
		width: 80%;
		margin-top: 0.4rem;
	}
</style>
