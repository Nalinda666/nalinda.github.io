<!-- 这个是登录页面 -->
<template>
	<div class="fogetpass">
		<div class="myhead">
			<a class="title1" @click="back"><i class="el-icon-arrow-left"></i></a>
			<span class="title2">找回密码</span>
		</div>
		<el-row>
			<div class="information">
				<el-card class="box-card">
					<div class="weui-cell">
						<el-col>
							<label class="weui-label">手机号</label>
						</el-col>
						<el-col>
							<input id="input1" class="weui-input" type="number" pattern="[0-9]*" v-model="news.phone" placeholder="请输入手机号"></input>
						</el-col>
					</div>
					<div class="weui-cell">
						<el-col>
							<label class="weui-label">邮箱</label>
						</el-col>
						<el-col>
							<input id="input1" class="weui-input" type="number" pattern="[0-9]*" v-model="news.email" placeholder="请输入邮箱"></input>
						</el-col>
					</div>
					<div class="weui-cell">
						<el-col>
							<label class="weui-label">新密码</label>
						</el-col>
						<el-col>
							<input id="input1" class="weui-input" pattern="[0-9]*" v-model="news.pwd" placeholder="请输入新密码"></input>
						</el-col>
					</div>
					<div class="weui-cell">
						<el-col>
							<label class="weui-label">确认新密码</label>
						</el-col>
						<el-col>
							<input id="input1" class="weui-input" pattern="[0-9]*" v-model="news.pwd2" placeholder="请再次输入新密码"></input>
						</el-col>
					</div>
					<div class="weui-cell">
						<el-col>
							<label class="weui-label">验证码</label>
						</el-col>
						<el-col>
							<input class="weui-input" v-model="inputCode" placeholder="请输入验证码"></input>
						</el-col>
						<el-col>
							<canvas @click='refushCode' width="100" height="39" id="c1" />
						</el-col>
					</div>
				</el-card>
			</div>
		</el-row>
		<a class="weui-btn weui-btn_disabled weui-btn_warn" @click="onSubmit()">确认</a>

	</div>

</template>

<script>
	export default {
		data() {
			return {
				input1: '',
				news: {},
			}
		},
		mounted() {
			var that = this;
			that.$nextTick(function() {
				that.refushCode();
			});
		},
		methods: {
			onSubmit() {
				let that = this
				if (that.news.pwd == that.news.pwd2) {
					that.$axios({
							method: "put", //指定请求方式
							url: "user/forgetPwd",
							data: {
								"phone": that.news.phone,
								"email": that.news.email,
								"pwd": that.news.pwd
							} //请求接口（相对接口，后面会介绍到）
						})
						.then(function(res) {
							//接口成功返回结果执行
							console.log("返回结果" + res);
							if (res.data.code == 'A001') {
								alert("找回密码成功！快去登录吧 >~<")
								this.$router.push({
									path: '/login'
								})
							} else {
								alert("找回密码失败！若您操作无误，请联系网站管理人员！")
							}
							console.log(jsonObj);
						})
						.catch(function(err) {
							//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
							console.log("请求失败")
							console.log(err)

						})
				} else {
					alert("两次密码不一致，请重新输入...")
				}
			},
			refushCode() {
				var that = this;
				var ctx = c1.getContext("2d");
				var pool = "abcdefhijkmnprstwxyz2345678";
				this.drowText(ctx, pool);
			},
			//1.新建一个函数产生随机数
			rn: function(min, max) {
				return parseInt(Math.random() * (max - min) + min);
			},
			//2.新建一个函数产生随机颜色
			rc: function(min, max) {
				var r = this.rn(min, max);
				var g = this.rn(min, max);
				var b = this.rn(min, max);
				return `rgb(${r},${g},${b})`;
			},
			drowText: function(ctx, pool) {
				var w = 120;
				var h = 39;
				var regCode = '';
				ctx.clearRect(0, 0, w, h);
				ctx.fillStyle = this.rc(180, 230);
				ctx.fillRect(0, 0, w, h);
				//4.随机产生字符串
				for (var i = 0; i < 4; i++) {
					var c = pool[this.rn(0, pool.length)]; //随机的字
					regCode += c;
					var fs = this.rn(18, 40); //字体的大小
					var deg = this.rn(-30, 30); //字体的旋转角度
					ctx.font = fs + 'px Simhei';
					ctx.textBaseline = "top";
					ctx.fillStyle = this.rc(80, 150);
					ctx.save();
					ctx.translate(30 * i + 15, 15);
					ctx.rotate(deg * Math.PI / 180);
					ctx.fillText(c, -20 + 5, -20);
					ctx.restore();
				}
				this.codes = regCode;
				//5.随机产生5条干扰线,干扰线的颜色要浅一点
				for (var i = 0; i < 3; i++) {
					ctx.beginPath();
					ctx.moveTo(this.rn(0, w), this.rn(0, h));
					ctx.lineTo(this.rn(0, w), this.rn(0, h));
					ctx.strokeStyle = this.rc(180, 230);
					ctx.closePath();
					ctx.stroke();
				}
				//6.随机产生40个干扰的小点
				for (var i = 0; i < 25; i++) {
					ctx.beginPath();
					ctx.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
					ctx.closePath();
					ctx.fillStyle = this.rc(150, 200);
					ctx.fill();
				}
			},
			back: function() {
				this.$router.go(-1);
			},

		}
	}
</script>


<style scoped>
	.fogetpass {
		height: 1.3rem;
		background-color: red;

	}

	.getPass {
		margin-top: 0.5rem;
	}

	.myhead {
		height: 0.5rem;
		padding: 0.2rem;
	}

	.myhead>a.title1 {
		margin-left: 0.1rem;
	}

	.title2 {
		margin-left: 2rem;
		font-size: 0.5rem;
	}



	.box-card {
		width: 100%;
		margin-top: 1rem;
		font-size: 0.35rem;
	}

	.weui-input {
		margin-left: -0.2rem;

	}

	#input1 {
		width: 6rem;
	}

	.el-row {
		padding: 0.1rem;

	}

	.information>div>#c1 {
		vertical-align: middle;
	}

	.div.login {
		text-align: center;
	}

	.fogetpass>a {
		width: 80%;
		margin-top: 0.4rem;
	}
</style>
