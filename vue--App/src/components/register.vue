<template>
	<div class="register ">
		<div class="topFix">
			<div class="myhead">
				<a class="title1" @click="back"><i class="el-icon-arrow-left"></i></a>
				<span class="title2">账号注册</span>
			</div>
		</div>
		<el-card>
			<el-form ref="userinformation" :rules="rules2" status-icon class="demo-ruleForm" label-width="1.7rem" :model="userinformation">
				<el-form-item label="用户名" prop="userName">
					<el-input v-model="userinformation.userName"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<div class="checksex">
						<input class="boy" type="radio" value="男" v-model="userinformation.sex" id="one"><label for="one">男</label>
						<input class="girl" type="radio" value="女" v-model="userinformation.sex" id="two"><label for="two">女</label>
					</div>
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-input v-model="userinformation.age"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="userinformation.phone"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="userinformation.email"></el-input>
				</el-form-item>
				<el-form-item label="入学时间" prop="schTime">
					<el-date-picker type="date" placeholder="选择日期" v-model="userinformation.schTime" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="密码" prop="pwd">
					<el-input type="password" v-model="userinformation.pwd" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="userinformation.checkPass" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="inputCode">
					<input id="input1" class="weui-input" v-model="userinformation.inputCode" placeholder="请输入验证码"></input>
					<canvas @click='refushCode' width="110" height="39" id="c1" />
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="getStore(userinformation)">注册</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			// 用户名
			var validateName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('用户名不能为空'));
				} else if (!this.checkName(value)) {
					callback(new Error('用户名不合法'))
				} else {
					callback()
				}
			};
			//年龄
			var validatestuAge = (rule, value, callback) => {
				if (value == '') {
					callback();
				} else if (!this.checkAge(value)) {
					callback(new Error('年龄不合法'))
				} else {
					callback()
				}
			};
			//手机号
			var validateIphone = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('手机号不能为空'));
				} else if (!this.checkIphone(value)) {
					callback(new Error('手机号不合法'))
				} else {
					callback()
				}
			};
			//邮箱
			var validateemail = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('邮箱不能为空'));
				} else if (!this.checkemail(value)) {
					callback(new Error('邮箱不合法'))
				} else {
					callback()
				}
			}; //入学时间
			var validateEnt = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('入学时间不能为空'));
				} else {
					callback()
				}
			};
			//密码
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('密码不能为空'));
				} else {
					if (this.userinformation.checkPass !== '') {
						this.$refs.userinformation.validateField('checkPass');
					}
					callback();
				}
			};
			//第二次密码
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('密码不能为空'));
				} else if (value !== this.userinformation.pwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			//验证码
			var validateCode = (rule, value, callback) => {
				if (value === '') {
					return callback(new Error('验证码不能为空'));
				} else if (!this.checkCode(value)) {
					callback(new Error('验证码错误！！！'));
					this.refushCode()
				} else {
					callback()
				}
			};
			return {
				userinformation: {
					
				},
				rules2: {
					userName: [{
						required: true,
						validator: validateName,
						trigger: 'blur'
					}],
					sex: [{
						validator: '',
						trigger: 'blur'
					}],
					age: [{
						validator: validatestuAge,
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						validator: validateIphone,
						trigger: 'blur'
					}],
					email: [{
						required: true,
						validator: validateemail,
						trigger: 'blur'
					}],
					schTime: [{
						required: true,
						validator: validateEnt,
						trigger: 'blur'
					}],
					pwd: [{
						required: true,
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						required: true,
						validator: validatePass2,
						trigger: 'blur'
					}],
					inputCode: [{
						required: true,
						validator: validateCode,
						trigger: 'blur'
					}],
				}
			}
		},
		mounted() {
			var that = this;
			that.$nextTick(function() {
				that.refushCode();
			});
		},

		methods: {
			getStore(userlist) {
				let that = this
				// let Url = that.HOST + "user/add"
				// console.log('用户Id：'+userId)
				// console.log('文章Id：'+id)
				that.$axios({
						method: "put", //指定请求方式
						// url: Url, //请求接口（相对接口，后面会介绍到）
						url: "user/userAdd", //请求接口（相对接口，后面会介绍到）
						data: {
							"useImg":'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558618047619&di=040e8c1bbc231045e0abcabc3675227c&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F69ad7a731f43d4b8729f1a2fbe65c43801ca0f033250-EV1vMf_fw658',
							"userName": userlist.userName, //姓名
							"age": userlist.age, //年龄
							"sex": userlist.sex, //性别
							"phone": userlist.phone, //手机号
							"email": userlist.email, //邮箱
							"schTime": userlist.schTime, //入学时间
							"pwd": userlist.pwd, //第一次输入密码
							"loginStatus":0
							
						}
					})
					.then(function(res) {
						//接口成功返回结果执行
						console.log(res);
						if (res.data.data == '') {
							console.log(res.data.code);
							if (res.data.code == 'A001') {
								that.$message({
									message: '注册成功！请登录',
									type: 'success',
									center: true
								});
								that.$router.push({
									path: '/login'
								})
							} else if (res.data.code == 'E002') {
								alert("注册失败，手机号已注册！")
							} else if (res.data.code == 'E003') {
								alert("注册失败，邮箱已注册！")
							} else {
								alert("注册失败，请联系工作人员！")
							}
						} else {
							that.userinformation = res.data.data;
							console.log(res.data.data);
						}
						// console.log(jsonObj);
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
			},
			//返回上一页
			back: function() {
				this.$router.go(-1);
			},
			//验证用户名
			checkName(str) {
				if (str.length < 12 && str.length > 2) {
					return true;
				} else {
					return false;
				}
			},
			//验证性别
			checkSex(str) {
				if (str === "男" || str === "女") {
					return true;
				} else {
					return false;
				}
			},
			//验证年龄
			checkAge(str) {
				let re = /^[1-9]\d*$/
				if (re.test(str)) {
					return true;
				} else {
					return false;
				}
			},

			// 验证手机号
			checkIphone(str) {
				let re = /^1\d{10}$/
				if (re.test(str)) {
					return true;
				} else {
					return false;
				}
			},
			// 验证邮箱
			checkemail(str) {
				let re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
				if (re.test(str)) {
					return true;
				} else {
					return false;
				}
			},
			//验证验证码正确性
			checkCode(str) {
				if (str === this.codes) {
					return true;
				} else {
					return false;
				}
			},
			//注册提交
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('注册成功!');
						this.$router.push('/login');
					} else {
						console.log('注册失败!!');
						return false;
					}
				});
			},
			//验证码
			refushCode: function() {
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
		}
	}
</script>

<style scoped>
	.register {
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
		margin-left: 1.8rem;
		font-size: 0.5rem;
	}

	.myhead>a.del {
		margin-left: 0.8rem;
	}

	.box-card {
		width: 100%;
		margin-top: 0.2rem;
		font-size: 0.35rem;
	}

	.checksex>input {
		margin-left: 0.2rem;
		margin-right: 0.2rem;
	}

	.el-row {
		padding: 0.1rem;
	}

	.weui-cell {
		height: 0.6rem;
	}

	.el-select {
		margin-left: -0.6rem;
	}

	.weui-input {
		margin-left: -0.6rem;

	}

	#input1 {
		width: 2rem;
		margin-top: 0.4rem;
		margin-left: 0.05rem;
		padding: 0.1rem;
	}

	.information>a {
		width: 80%;
		margin-top: 0.4rem;
	}

	.el-button {
		width: 5rem;
		margin-left: -0.8rem;
	}
</style>
