<!-- 这个是登录页面 -->
<template>
	<div class="login">
		<!-- 	<div class="myhead" :style="note">
			 <Button type="text" ghost><i class="el-icon-arrow-left" to="go(-1)"></i></Button>
			<a class="title1"><i class="el-icon-arrow-left" @click="back"></i></a>
			<span class="title2">登录中工头条</span>
			<div class="headImg">
				<img :src="imgUrl">
			</div>
		</div>
		<div class="information">
			<el-row>
				<div class="note" :style="note"></div>
			</el-row>
			<el-row>
				<el-card>
					<el-form ref="ruleForm2" :rules="rules2" status-icon class="demo-ruleForm" label-width="80px" :model="ruleForm2">
						<el-form-item label="手机号" prop="phone">
							<el-input v-model="ruleForm2.phone" placeholder="请输入手机号"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="pwd">
							<el-input type="password" v-model="ruleForm2.pwd" auto-complete="off" placeholder="请输入密码"></el-input>
						</el-form-item>
						<el-form-item label="验证码" prop="inputCode">
							<input id="input1" class="weui-input" v-model="ruleForm2.inputCode" placeholder="请输入验证码"></input>
							<canvas @click='refushCode' width="110" height="39" id="c1" />
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="getStore()">登录</el-button>
							<div class="loginbut">
								<router-link to="/register" tag="a"> <a>用户注册</a></router-link> |
								<router-link to="/forgetpwd" tag="a"><a>忘记密码</a></router-link>
							</div>
						</el-form-item>
					</el-form>
				</el-card>
			</el-row>
		</div> -->
	</div>
</template>

<script>
	export default {
		data() {
			// 			//手机号
			// 			var validateIphone = (rule, value, callback) => {
			// 				if (value === '') {
			// 					callback(new Error('请输入手机号码'))
			// 				} else if (!this.checkMobile(value)) {
			// 					callback(new Error('手机号码不合法'))
			// 				} else {
			// 					callback()
			// 				}
			// 			};
			// 			//密码
			// 			var validatepwd = (rule, value, callback) => {
			// 				if (value === '') {
			// 					callback(new Error('请输入密码'));
			// 				} else {
			// 
			// 					callback();
			// 				}
			// 			};
			// 			//验证码
			// 			var validateCode = (rule, value, callback) => {
			// 				if (value === '') {
			// 					return callback(new Error('验证码不能为空'));
			// 				} else if (!this.checkCode(value)) {
			// 					callback(new Error('验证码错误！！！'));
			// 					this.refushCode()
			// 				} else {
			// 					callback()
			// 				}
			// 			};
			// 
			// 			return {
			// 				imgUrl: require("@/assets/Name.png"),
			// 				ruleForm2: {
			// 					pwd: '',
			// 					phone: '',
			// 					inputCode: '',
			// 				},
			// 				rules2: {
			// 					phone: [{
			// 						validator: validateIphone,
			// 						trigger: 'blur'
			// 					}],
			// 					pwd: [{
			// 						validator: validatepwd,
			// 						trigger: 'blur'
			// 					}],
			// 					inputCode: [{
			// 						required: true,
			// 						validator: validateCode,
			// 						trigger: 'blur'
			// 					}],
			// 				},
			// 				note: {
			// 					backgroundImage: "url(" + require("../assets/background1.png") + ")",
			// 					backgroundRepeat: "no-repeat",
			// 					backgroundSize: "8rem 7rem",
			// 					// marginTop: "5px",
			// 				},
			// 
			// 
			// 			}
			// 		},
			// 		mounted() {
			// 			var that = this;
			// 			that.$nextTick(function() {
			// 				that.refushCode();
			// 			});
			// 		},
			// 		methods: {
			// 
			// 			getStore() {
			// 				let that = this
			// 				that.$axios({
			// 						method: "put", //指定请求方式
			// 						url: "user/login", //请求接口（相对接口，后面会介绍到）
			// 						data: {
			// 							"phone": that.ruleForm2.phone,
			// 							"pwd": that.ruleForm2.pwd,
			// 						}
			// 					})
			// 					.then(function(res) {
			// 						console.log(res.data.code);
			// 						// console.log(res.data.data);
			// 						if (res.data.code == 'A001') {
			// 							// alert("登录成功，点击跳转首页")
			// 							that.$message({
			// 								message: '登录成功！',
			// 								type: 'success',
			// 								center: true
			// 							});
			// 							that.$router.push({
			// 								path: '/',
			// 							})
			// 							//将用户Id存储在本地
			// 							localStorage.setItem("userId", res.data.data);
			// 							console.log(localStorage.getItem("userId"));
			// 							// console.log(localStorage.valueOf());
			// 						} else if (res.data.code == 'A010') {
			// 							that.$message.error('您还没有注册哦！');
			// 							that.refushCode();
			// 							// alert("您还没有注册哦！")
			// 						} else if (res.data.code == 'A008') {
			// 							that.$message.error('账号或密码输入错误！');
			// 							that.refushCode();
			// 							// alert("账号或密码输入错误！")
			// 						} else {
			// 							that.$message.error('登录失败，请联系工作人员');
			// 							that.refushCode();
			// 							// alert("登录失败，请联系工作人员！")
			// 						}
			// 					})
			// 					.catch(function(err) {
			// 						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
			// 						// console.log("请求失败")
			// 						console.log(err)
			// 
			// 					})
			// 			},
			// 			// <!--提交登录-->
			// 			// 			submitForm(formName) {
			// 			// 				this.$refs[name].validate((valid) => {
			// 			// 					if (valid) {
			// 			// 						this.$Loading.start();
			// 			// 
			// 			// 						this.$axios({
			// 			// 							method: 'put',
			// 			// 							url:'index/User/login',
			// 			// 							data: {
			// 			// 								phone: this.ruleForm2.user,
			// 			// 								pwd: this.ruleForm2.pwd,
			// 			// 							}
			// 			// 						}).then(function(res) {
			// 			// 							var json = res.data;
			// 			// 							if (json.code=="A001") {
			// 			// 								
			// 			// 								window.localStorage.setItem('id', JSON.stringify(json.id));
			// 			// 
			// 			// 								this.$Message.success('登录成功~');
			// 			// 								this.$store.commit('ADD_COUNT', json.id);
			// 			// 
			// 			// 								let clock = window.setInterval(() => {
			// 			// 									this.totalTime--;
			// 			// 									if (this.totalTime < 0) {
			// 			// 										window.clearInterval(clock);
			// 			// 										this.$Loading.finish();
			// 			// 										this.$router.push('/');
			// 			// 									}
			// 			// 								}, 1000)
			// 			// 							} else {
			// 			// 								this.$Message.error(json.msg);
			// 			// 								this.$Loading.error();
			// 			// 							}
			// 			// 
			// 			// 						}.bind(this)).catch(function(err) {
			// 			// 							this.$Message.error('登录失败，错误：' + err);
			// 			// 							this.$Loading.error();
			// 			// 						}.bind(this))
			// 			// 
			// 			// 					} else {
			// 			// 						this.$Message.error('请填写完整的登录信息~~');
			// 			// 					}
			// 			// 				})
			// 			// 			},
			// 			// 验证手机号
			// 			checkMobile(str) {
			// 				let re = /^1\d{10}$/
			// 				if (re.test(str)) {
			// 					return true;
			// 				} else {
			// 					return false;
			// 				}
			// 			},
			// 
			// 			resetForm(formName) {
			// 				this.$refs[formName].resetFields();
			// 			},
			// 			//返回上一页
			// 			back() {
			// 				this.$router.go(-1);
			// 			},
			// 			//验证验证码正确性
			// 			checkCode(str) {
			// 				if (str === this.codes) {
			// 					return true;
			// 				} else {
			// 					return false;
			// 				}
			// 			}, //验证码
			// 			refushCode: function() {
			// 				var that = this;
			// 				var ctx = c1.getContext("2d");
			// 				var pool = "abcdefhijkmnprstwxyz2345678";
			// 				this.drowText(ctx, pool);
			// 			},
			// 			//1.新建一个函数产生随机数
			// 			rn: function(min, max) {
			// 				return parseInt(Math.random() * (max - min) + min);
			// 			},
			// 			//2.新建一个函数产生随机颜色
			// 			rc: function(min, max) {
			// 				var r = this.rn(min, max);
			// 				var g = this.rn(min, max);
			// 				var b = this.rn(min, max);
			// 				return `rgb(${r},${g},${b})`;
			// 			},
			// 			drowText: function(ctx, pool) {
			// 				var w = 120;
			// 				var h = 39;
			// 				var regCode = '';
			// 				ctx.clearRect(0, 0, w, h);
			// 				ctx.fillStyle = this.rc(180, 230);
			// 				ctx.fillRect(0, 0, w, h);
			// 				//4.随机产生字符串
			// 				for (var i = 0; i < 4; i++) {
			// 					var c = pool[this.rn(0, pool.length)]; //随机的字
			// 					regCode += c;
			// 					var fs = this.rn(18, 40); //字体的大小
			// 					var deg = this.rn(-30, 30); //字体的旋转角度
			// 					ctx.font = fs + 'px Simhei';
			// 					ctx.textBaseline = "top";
			// 					ctx.fillStyle = this.rc(80, 150);
			// 					ctx.save();
			// 					ctx.translate(30 * i + 15, 15);
			// 					ctx.rotate(deg * Math.PI / 180);
			// 					ctx.fillText(c, -20 + 5, -20);
			// 					ctx.restore();
			// 				}
			// 				this.codes = regCode;
			// 				console.log("验证码" + this.codes)
			// 				//5.随机产生5条干扰线,干扰线的颜色要浅一点
			// 				for (var i = 0; i < 3; i++) {
			// 					ctx.beginPath();
			// 					ctx.moveTo(this.rn(0, w), this.rn(0, h));
			// 					ctx.lineTo(this.rn(0, w), this.rn(0, h));
			// 					ctx.strokeStyle = this.rc(180, 230);
			// 					ctx.closePath();
			// 					ctx.stroke();
			// 				}
			// 				//6.随机产生40个干扰的小点
			// 				for (var i = 0; i < 25; i++) {
			// 					ctx.beginPath();
			// 					ctx.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
			// 					ctx.closePath();
			// 					ctx.fillStyle = this.rc(150, 200);
			// 					ctx.fill();
			// 				}
			// 			},
		}
	}
</script>


<style scoped>
	.login {
		height: 1.3rem;
		background-color: #66B1FF;
	}

	.loginImg {
		background-color: #000000;
		height: 4rem;
	}

	.information {
		height: 100%;
		width: 100%;
	}

	.img {
		width: 100%;
		height: 3rem;
		margin-top: 0.1rem;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 100px auto;
	}

	.headImg>img {
		width: 1.8rem;
		height: 1.8rem;
		border-radius: 1.875rem;
		margin-top: 0.8rem;
		margin-left: 2.8rem;
		border: 0.1rem solid #C6E2FF;
		padding: 5px;
	}

	.el-card {
		text-align: center;

	}

	.el-card__body {
		padding: 0.5rem;
	}

	.myhead {
		height: 4.5rem;
		padding: 0.2rem;
	}

	.myhead>a.title1 {
		margin-left: 0.1rem;
		color: #000000;
	}

	.title2 {
		margin-left: 1.6rem;
		font-size: 0.5rem;
	}

	.el-button {
		width: 5rem;
		text-align: center;
		margin-left: -1.4rem;
	}

	.el-row {
		padding: 0.1rem;
		background-color: #409eff3b;
		background-clip: border-box;
	}

	label.el-form-item__label {
		width: 0.5rem;
	}

	.div.login {
		text-align: center;
	}

	.el-form {
		margin-top: 1rem;
	}

	.login>a {
		width: 80%;
		margin-top: 0.4rem;
	}

	#input1 {
		width: 2rem;
		height: 0.8rem;
		margin-left: 0.05rem;
		margin-bottom: 0.4rem;
	}

	.loginbut {
		margin-top: 0.4rem;
		text-align: center;
		margin-left: -1.4rem;
	}
</style>
