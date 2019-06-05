<template>
	<div class="myprofile">
		<div class="topFix">
			<div class="myhead">
				<a class="title1" @click="back"><i class="el-icon-arrow-left"></i></a>
				<span class="title2">我的资料</span>
				<a class="MyProfileOk" @click="changeMyProfile" v-if="isChange"></i>完成</a>
				<a class="del" @click="toChangeMyProfile" v-else></a>
			</div>
		</div>
		<el-row>
			<div class="information">
				<el-card class="box-card">
					<div class="weui-cells weui-cells_form">
						<div class="weui-cell" @click="toChangeImg">
							<el-col>
								<label class="weui-label">头像</label>
							</el-col>
							<el-col>
								<img :src="mystus.stuImg">
							</el-col>
						</div>
						<div class="weui-cell">
							<el-col>
								<label class="weui-label">姓名</label>
							</el-col>
							<el-col>
								<input class="weui-input" v-model="mystus.userName"></input>
							</el-col>
						</div>
						<div class="weui-cell">
							<el-col>
								<label class="weui-label">年龄</label>
							</el-col>
							<el-col>
								<input class="weui-input" type="number" pattern="[0-9]*" v-model="mystus.age"></input>
							</el-col>
						</div>
						<div class="weui-cell">
							<el-col>
								<label class="weui-label">性别</label>
							</el-col>
							<el-col>
								<el-select v-model="mystus.sex" placeholder="请选择性别">
									<el-option label="男" value="男"></el-option>
									<el-option label="女" value="女"></el-option>
								</el-select>
							</el-col>
						</div>
						<div class="weui-cell">
							<el-col>
								<label class="weui-label">手机号</label>
							</el-col>
							<el-col>
								<input class="weui-input" type="number" pattern="[0-9]*" v-model="mystus.phone"></input>
							</el-col>
						</div>
						<div class="weui-cell">
							<el-col>
								<label class="weui-label">邮箱</label>
							</el-col>
							<el-col>
								<input class="weui-input" pattern="[0-9]*" v-model="mystus.email"></input>
							</el-col>
						</div>

						<div class="weui-cell">
							<el-col>
								<div class="weui-cell__hd"><label for="" class="weui-label">入学时间</label></div>
							</el-col>
							<el-col>
								<div class="weui-cell__bd">
									<!-- <input class="weui-input" type="date" value="" v-model="mystu.stuEnt"> -->
									<el-date-picker type="date" placeholder="选择日期" v-model="mystus.schTime" style="width: 100%;"></el-date-picker>
								</div>
							</el-col>
						</div>
						<!-- <div class="weui-cell">
							<el-col>
								<div class="weui-cell__hd"><label for="" class="weui-label">注册时间</label></div>
							</el-col>
							<el-col>
								<div class="weui-cell__bd">
									<el-date-picker type="date" placeholder="选择日期" v-model="mystus.stuDate" style="width: 100%;"></el-date-picker>
								</div>
							</el-col>
						</div> -->
					</div>

				</el-card>
			</div>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isChange: false,
				mystus: {
					// id: '',
					// useImg:'' ,
					// userName: '',
					// age: '',
					// sex: '',
					// phone: '',
					// email: '',
					// schTime: '',
					// stuDate: '',
				},
			}
		},
		mounted() {
			var that = this;
			var oinpt = document.getElementsByClassName("weui-input");
			oinpt.onfocus = function() {
					this.isChange = true
				},
				that.$nextTick(function() {
					that.getStore();
				});
			that.mystus.id = localStorage.getItem("userId");
			console.log(that.mystus.id);
			if (that.mystus.id) {
				that.islogin = true
				that.$nextTick(function() {
					that.getStore();
				});
			} else {
				that.islogin = false
			}
		},
		watch: {
			mystus: {
				handler(newValue, oldValue) {
					this.isChange = true
					console.log(newValue)
				},
				deep: true
			}
		},
		methods: {
			//请求接口
			getStore() {
				let that = this
				// console.log('用户Id：'+userId)
				// console.log(that.userId)
				that.$axios({
						method: "get", //指定请求方式
						url: "user/getUserDetails/" + that.mystus.id, //请求接口（相对接口，后面会介绍到）
					})
					.then(function(res) {
						//接口成功返回结果执行
						that.mystus = res.data.data;
						console.log(res.data.data.id);
						console.log(res.data.code);
						if (res.data.data.userImg == '') {

						}

						// console.log(jsonObj);
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
			},
			//更改头像
			toChangeImg() {
				this.$router.push({
					path: '/changeHeadImg'
				})
			},
			//返回上一页
			back: function() {
				this.$router.go(-1);
			},
			//提交更改数据
			changeMyProfile() {
				let that = this
				that.$axios({
						method: "post", //指定请求方式
						url: "user/update", //请求接口（相对接口，后面会介绍到）
						data: {
							"id": that.mystus.id,
							"useImg": that.mystus.useImg,
							"userName": that.mystus.userName,
							"age": that.mystus.age,
							"sex": that.mystus.sex,
							"phone": that.mystus.phone,
							"email": that.mystus.email,
							"schTime": that.mystus.schTime,
						}
					})
					.then(function(res) {
						console.log(res.data.code);
						if (res.data.code == 'A001') {
							alert("修改成功")
						} else if (res.data.code == 'D003') {
							alert("您没有更改信息哦！")
						} else if (res.data.code == 'D002') {
							alert("修改失败！")
						} else {
							alert("修改，请联系工作人员！")
						}
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
				that.isChange = false
				that.back()

			},
			//编辑资料
			toChangeMyProfile() {
				this.isChange = true
			},
		}
	}
</script>

<style scoped>
	.myprofile {
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
		margin-top: 1rem;
	}

	.myhead>a.del {
		float: right;
		margin-right: 0.1rem;
		margin-top: 0.1rem;
		color: #F0F0F0;
	}

	.myhead>a.MyProfileOk {
		float: right;
		margin-right: 0.1rem;
		margin-top: 0.1rem;
		color: #F0F0F0;
	}

	.myhead>a:hover {
		color: #F0F0F0;
	}

	.box-card {
		width: 100%;
		margin-top: 0.4rem;
	}

	.el-row {
		padding: 0.1rem;
	}

	.checksex>input.girl {
		margin-left: 0.2rem;
	}

	img {
		width: .6rem;
		height: .6rem;
		border-radius: 1.875rem;
		margin-top: 0.05rem;
		margin-left: 0.1rem;
	}
</style>
