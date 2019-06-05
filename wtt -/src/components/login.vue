<!-- 这个是登录页面 -->
<template>
	<div class="hello">
		<div class="login">
			<div class="logo">
				<!-- <p class="p1">中工头条</p> -->
				<img :src="Logo" />
				<!-- <span class="p2">你关心的就是头条</span> -->
			</div>
			<div class="mycard">
				<el-card class="box-card">
					<el-form ref="ruleForm2" :rules="rules2" status-icon class="demo-ruleForm" label-width="80px" :model="ruleForm2">
						<el-form-item prop="admAccount">
							<img class="NameImg" :src="ImgName" />
							<el-input v-model="ruleForm2.admAccount"></el-input>
						</el-form-item>
						<el-form-item prop="admPwd">
							<img class="NameImg" :src="ImgPwd" />
							<el-input type="password" v-model="ruleForm2.admPwd"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
						</el-form-item>
					</el-form>

				</el-card>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var validateName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入账号'))
				} else {
					callback()
				}
			};

			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'))
				} else {
					callback();
				}
			};
			return {
				navHeight: '500',
				isLogin: false,
				note: {
					backgroundImage: "url(" + require("../assets/bigdata.png") + ")",
					width: "100 % ",
					height: "921 px",
					backgroundRepeat: "no - repeat",
					backgroundPosition: "center top",
					backgroundSize: " 100 % 100 % ",
					overflow: "hidden",
				},
				ruleForm2: {
					admAccount: '',
					admPwd: '',
				},
				rules2: {
					admAccount: [{
						validator: validateName,
						trigger: 'blur'
					}],
					admPwd: [{
						validator: validatePass,
						trigger: 'blur'
					}],
				},

			}
		},
		created() {

			let that = this
			let urlTemp = "assets/logo.png"
			let urlname = "assets/Name.png"
			let urlPwd = "assets/lock.png"
			that.Logo = require("@/" + urlTemp)
			that.ImgName = require("@/" + urlname)
			that.ImgPwd = require("@/" + urlPwd)
		},
		mounted() {
			var that = this;
			that.$nextTick(function() {
				that.hidefooter();
			});

		},

		methods: {

			hidefooter() {
				$("#leftFix").hide();
				$("#topFix").hide();
				$(".el-footer").hide();
			},
			// <!--提交登录-->
			submitForm(formName) {
				let that = this
				that.$axios({
						method: "put", //指定请求方式
						url: "administer/login", //请求接口（相对接口，后面会介绍到）
						data: {
							"admAccount": that.ruleForm2.admAccount,
							"admPwd": that.ruleForm2.admPwd,
						}
					})
					.then(function(res) {
						console.log(res.data);
						// console.log(res.data.data);
						if (res.data.code == 'A001') {
							// alert("登录成功，点击跳转首页")
							that.$message({
								message: '登录成功！',
								type: 'success',
								center: true
							});
							that.$router.push({
								path: '/',
							})
							//将管理员Id存储在本地
							localStorage.setItem("admAccount", that.ruleForm2.admAccount);
							console.log(localStorage.getItem("admAccount"));
							// console.log(localStorage.valueOf());
						} else if (res.data.code == 'A008') {
							that.$message.error('账号或密码输入错误！');
							that.refushCode();
							// alert("账号或密码输入错误！")
						} else {
							that.$message.error('登录失败，请联系工作人员');
							that.refushCode();
							// alert("登录失败，请联系工作人员！")
						}
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
			},
		},

	}
</script>


<style scoped>
	.hello {
		background-size: cover;
		font-size: 16px;
		padding-top: 100px;
		box-sizing: border-box;
		width: 100%;
		height: 600px;
		background-color: #BFCBD9
	}


	.login {
		width: 400px;
		height: 380px;
		margin-left: 470px;
		align-content: center;
		background-color: #FFFFFF;
		/* padding-top: 10px; */
	}

	.el-input {
		width: 200px;
		height: 20px !important;
	}

	input.el-input__inner {
		height: 10px !important;
	}

	.mycard {
		width: 100%;
		height: 300px;
		margin-top: -20px;
	}

	.logo>img {
		height: 170px;
		width: 100%;
		z-index: -20;
	}

	.el-form-item__error {
		font-size: 10px;
	}

	.box-card {
		width: 80%;
		height: 200px;
		/* margin-top: 40px; */
		/* border: 0px solid #000000; */
		margin-left: 35px;
	}

	img.NameImg {
		margin-top: 3px;
		/* margin-left: -25px; */
		margin-right: 5px;
	}

	.el-form-item {
		margin-left: -40px;
		margin-top: 10px;
	}

	.box-card img {
		width: 20px;
		height: 20px;
		padding: 0;
		vertical-align: middle;
	}


	.el-card_body {
		height: 200px !important;
		/* margin-top: 10px; */
	}


	.el-button {
		width: 200px;
		margin-left: 20px;
		margin-top: 5px;
	}

	.el-main {
		padding: 0 !important;
	}
</style>
