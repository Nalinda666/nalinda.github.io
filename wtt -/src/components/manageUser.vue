<!-- 这个是用户管理页面 -->
<template>
	<div class="user">
		<el-container>
			<el-header>
				<div class="demo-input-suffix">
					用户名：
					<el-input placeholder="请输入用户名" v-model="input2">
						<i slot="prefix" class="el-input__icon el-icon-search"></i>
					</el-input>
					<el-button type="primary" class="emptybut" icon="el-icon-refresh" @click="getStore">
					刷新</el-button>
					<el-button type="primary" class="searchbut" icon="el-icon-search" @click="goSearch">搜索</el-button>
				</div>
			</el-header>
			<el-main>
				<el-table border :data="tablestustuDate.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark"
				 max-height="1000px" height="400px" row-key="id">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="id" type="index" :index="indexMethod(1)" fixed sortable>
					</el-table-column>
					<!-- <el-table-column :span="2" align="center" prop="id" label="ID"  sortable>
					</el-table-column> -->
					<el-table-column :span="2" align="center" prop="userName" label="用户名" sortable>
					</el-table-column>
					<el-table-column :span="1" align="center" prop="sex" width="70px" label="性别">
					</el-table-column>
					<el-table-column :span="2" align="center" prop="age" width="80px" label="年龄" sortable>
					</el-table-column>
					<el-table-column :span="2" align="center" prop="phone" label="手机号">
					</el-table-column>
					<el-table-column :span="2" align="center" prop="email" label="邮箱">
					</el-table-column>
					<el-table-column :span="2" align="center" label="操作">
						<template slot-scope="scope">
							<!-- <router-link :to="{path:'studentDetail',query:{stu_id:scope.row.id}}"> -->
							<el-button @click="toDetail(scope.row,true)" icon="el-icon-document" size="small" type="primary" plain>详情</el-button>
							<!-- </router-link> -->
							<!-- <el-button @click="deletes(scope.$index)" :id="scope.row.id" :index="scope.$index" size="small" type="danger"
							 plain><i class="el-icon-delete"></i>删除</el-button> -->
						</template>
					</el-table-column>
				</el-table>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
					 :page-sizes="[5,10,20,30,40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tablestustuDate.length"
					 background small>
					</el-pagination>
				</div>
			</el-main>
		</el-container>
		<!-- 第一层信息 -->
		<Drawer title="用户信息详情:" v-model="value1" width="720" :closable="false" :styles="styles">
			<Form :model="userFormData">
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="用户名" label-position="top">
						<Input v-model="userFormData.userName" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="用户ID" label-position="top">
						<Input v-model="userFormData.id" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">

					<Col span="12">
					<FormItem label="年龄" label-position="top">
						<Input v-model="userFormData.age" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="性别" label-position="top">
						<Input v-model="userFormData.sex" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="手机号" label-position="top">
						<Input v-model="userFormData.phone" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="邮箱" label-position="top">
						<Input v-model="userFormData.email" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="密码" label-position="top">
						<Input v-model="userFormData.pwd" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="文章偏好" label-position="top">
						<Input v-model="userFormData.itemLike" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="关注量" label-position="top">
						<Input v-model="userFormData.focusNum" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="收藏量" label-position="top">
						<Input v-model="userFormData.collectionNum" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="入学年月" label-position="top">
						<Input v-model="userFormData.schTime" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="注册时间" label-position="top">
						<Input v-model="userFormData.registrationTime" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
			</Form>
			<div class="demo-drawer-footer">
				<!-- <Button type="error" style="margin-right: 8px" @click="onLine">重置密码</Button> -->
				<Button type="primary" style="margin-right: 8px" @click="value1 = false">关闭</Button>
			</div>
		</Drawer>
	</div>
</template>

<script>
	export default {
		name: 'manageUser',
		data() {
			return {
				input: '',
				input1: '',
				input2: '',
				loading: true,
				value1: false,
				pagesize: 10,
				currentPage: 0,
				styles: {
					height: 'calc(100% - 55px)',
					overflow: 'auto',
					paddingBottom: '53px',
					position: 'static'
				},
				// 用户详情
				userFormData: {

				},
				//用户表格
				tablestustuDate: [{

				}],

			}
		},
		mounted() {
			var that = this;
			that.admAccount = localStorage.getItem("admAccount");
			console.log("管理员Id" + that.admAccount);
			if (that.admAccount != '') {
				that.$nextTick(function() {
					that.getStore();

				});
			} else {
				alert("请先登录")
				this.$router.push({
					path: '/login'
				})
			}

		},
		methods: {
			//搜索
			goSearch() {
				let that = this
				that.$axios({
						method: "post", //指定请求方式
						url: "user/searchUserName",
						data: {
							"userName": that.input2
						} //请求接口（相对接口）
					})
					.then(function(res) {
						console.log("搜索词" + that.input2);
						//接口成功返回结果执行
						console.log(res);
						that.tablestustuDate = res.data.data;
						console.log(res.data.data);
						// console.log(res.data.data);
						// console.log(that.news);
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
			},
			getStore() {
				let that = this
				console.log("hahahahahah");
				that.$axios({
						method: "post", //指定请求方式
						url: "user/userInfoList", //请求接口（相对接口，后面会介绍到）
						data: {
							"page": {
								"pageNumber": 1,
								"pageSize": 10
							},
						}
					})
					.then(function(res) {
						//接口成功返回结果执行
						that.tablestustuDate = res.data.data.list;
						// console.log(res.data.data.list);
						// console.log("返回data" + res.data);
						console.log(res);
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
			},
			indexMethod(index) {
				return index++;
			},

			//发布
			onLine() {},
			//跳转详情页
			toDetail(row, value) {
				let that = this
				// console.log('文章Id：' + that.user.id)
				that.$axios({
						method: "get", //指定请求方式
						url: "user/getUserDetails/" + row.id, //请求接口（相对接口，后面会介绍到）
					})
					.then(function(res) {
						//接口成功返回结果执行
						console.log(res.data.code);
						if (res.data.code == "A001") {
							console.log(res.data.data);
							that.userFormData = res.data.data;
							var y = that.timestampToTime(res.data.data.registrationTime)
							var x = that.timestampToData(res.data.data.schTime);
							that.userFormData.schTime = x
							that.userFormData.registrationTime = y
							that.value1 = value
						} else {
							alert("查看失败！")
						}
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
			},

			changeTime(time) {
				that.userFormData.schTime = timestampToTime(time)
			},

			resetForm(formName) {
				window.location.reload()
			},
			handleSizeChange(val) {
				this.pagesize = val;
				console.log(`每页 ${val} 条`);

			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
			},
			//删除
			deletes(index) {
				console.log(index);
				this.$confirm('是否要删除当前数据?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// var index = this.tableLableDate.findIndex(function(tableLableDate) {
					// 	return tableLableDate.lableId == index;
					// });
					this.tablestustuDate.splice(index, 1);
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
		},
	}
</script>

<style scoped>
	.user {
		margin-left: 30px;
	}

	.el-input {
		width: 180px;
		margin-bottom: 20px;
		margin-right: 15px;
	}

	.el-header {
		background-color: #E9EEF3;
	}

	.el-main {
		margin-top: 10px;
		width: 100%;
		min-height: 800px;
		overflow: auto;
		padding: 0px !important;
		line-height: 0px !important;
	}

	.demo-input-suffix {
		margin-left: 30px;
		text-align: left;
	}

	.el-table {
		highlight-current-row: true;
		/* width: 100%; */
	}

	.demo-drawer-footer {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		border-top: 1px solid #e8e8e8;
		padding: 10px 16px;
		text-align: right;
		background: #fff;
	}

	.ivu-input[disabled] {
		color: #00000;
	}

	.el-row {
		width: 100%;
	}

	.el-button {
		margin: auto;
		margin-bottom: 10px;

	}

	.el-button.check {
		margin-right: 10px;
	}

	.el-button.check {
		float: right;
		margin-right: 100px;
		margin-bottom: 20px;
	}

	.el-button.searchbut {
		float: right;
		margin-right: 20px;
		margin-top: 10px;
	}

	.el-button.emptybut {
		float: right;
		margin-right: 20px;
		margin-top: 10px;
	}

	.el-row.checkbut {
		margin-top: 30px;
	}

	.block {
		margin-top: 30px;
		margin-left: 280px;
	}

	.el-table-column {
		height: 20px;
	}

	.app {
		padding-top: 40px;
		padding-left: 280px;
	}
</style>
