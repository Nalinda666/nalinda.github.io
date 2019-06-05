<template>
	<div class="hello">
		<router-view />
		<el-container>
			<el-header>
				<div class="demo-input-suffix">
					网站名：
					<el-input placeholder="请输入网站名" prefix-icon="el-icon-search" v-model="input1">
					</el-input>
					<!-- 网址：
					<el-input placeholder="请输入网址" v-model="input2">
						<i slot="prefix" class="el-input__icon el-icon-search"></i>
					</el-input> -->
					<el-button class="searchbut" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
					<el-button class="emptybut" type="danger" icon="el-icon-refresh" @click="empty">重置</el-button>
				</div>
			</el-header>
			<el-main>
				<el-table border :data="tableWebDate.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark"
				 max-height="1000" size="mini" fit show-header>
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column  label="id" type="index" :index="indexMethod(1)" width="80" fixed sortable>
					</el-table-column>
					<el-table-column :span="2" align="center" width="200" prop="sourceName" label="网站名" fixed sortable>
					</el-table-column>
					<el-table-column align="center" prop="sourceURL"  width="200" label="网址">
					</el-table-column>
					<el-table-column align="center" width="100px" prop="focusNum" label="关注量" fixed sortable>
					</el-table-column>
					<el-table-column align="center" width="100px" prop="releaseNum" label="发布量" sortable>
					</el-table-column>
					<el-table-column align="center" label="操作" width="100px">
						<template slot-scope="scope">
							<el-button @click="toDetail(scope.row.id,scope.row.sourceName,true)" icon="el-icon-document" size="mini" type="primary" plain>详情</el-button>
							<el-button @click="deletes(scope.$index)" size="mini" type="danger" icon="el-icon-delete"  plain>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="block">
					<span class="demonstration"></span>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
					 :page-sizes="[10,20,30,40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableWebDate.length"
					 background small>
					</el-pagination>
				</div>
			</el-main>
		</el-container>
		<!-- 第一层信息 -->
		<Drawer title="文章来源信息详情:" v-model="value1" width="720" :closable="false" :styles="styles">
			<Form :model="userFormData">
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="网站名" label-position="top">
						<Input v-model="userFormData.sourceName" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="网站ID" label-position="top">
						<Input v-model="userFormData.id" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">

					<Col span="12">
					<FormItem label="粉丝量" label-position="top">
						<Input v-model="userFormData.focusNum" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="发布量" label-position="top">
						<Input v-model="userFormData.releaseNum" :disabled="true" />
						<!-- <Button @click="value2 = true" type="primary">查看</Button> -->
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="网站URL" label-position="top">
						<Input v-model="userFormData.sourceURL" :disabled="true" />
						<!-- <Button @click="value2 = true" type="primary">查看</Button> -->
					</FormItem>
					</Col>

				</Row>
			</Form>
			<div class="demo-drawer-footer">
				<Button style="margin-right: 8px" @click="value1 = false">关闭</Button>
				<Button type="primary" @click="value1 = false">确认</Button>
			</div>
		</Drawer>
		<!-- 第二层信息 -->
		<Drawer title="Two-level Drawer" :closable="false" v-model="value2">
			This is two-level drawer.
		</Drawer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				input: '',
				input1: '',
				input2: '',
				value1: false,
				value2: false,
				pagesize: 10,
				currentPage: 1,
				pageNumber: 1,
				pageSize: 20,
				styles: {
					height: 'calc(100% - 55px)',
					overflow: 'auto',
					paddingBottom: '53px',
					position: 'static'
				},
				userFormData: {

				},
				tableWebDate: [],


			}
		},
		mounted(){
			let that = this;
			that.admAccount = localStorage.getItem("admAccount");
			console.log("管理员Id" + that.admAccount);
			if (that.admAccount == '') {
				alert("请先登录")
				this.$router.push({
					path: '/login'
				})
			} else {
				that.$nextTick(function() {
					that.getStore();
				});
			}
		},
		methods: {
			//获取表格数据
			getStore() {
				let that = this
				console.log(that.pageNumber);
				console.log(that.pageSize);
				that.$axios({
						method: "post", //指定请求方式
						url: "sourceW/querySourceWInfoLists", //请求接口（相对接口，后面会介绍到）
						data: {
							"page": {
								"pageNumber": that.pageNumber,
								"pageSize": that.pageSize
							},
						}
					})
					.then(function(res) {
						//接口成功返回结果执行
						console.log(res);
						console.log(res.data.data.list);
						that.tableWebDate = res.data.data.list;
						// examineN == 0 待审核
						// examineN == 2 审核不通过
						// examineN == 1 && releaseN == 0 待发布
						// releaseN == 1 已发布

					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
			},
			//跳转详情页
			toDetail(id, sourceName,value) {
				let that = this
				// console.log('文章Id：' + that.user.id)
				that.$axios({
						method: "post", //指定请求方式
						url: "sourceW/getSourceWDetails", //请求接口（相对接口，）
						data: {
							"id": id,
							"sourceName": sourceName
						}
					})
					.then(function(res) {
						//接口成功返回结果执行
						console.log(res.data.code);
						if (res.data.code == "A001") {
							console.log(res.data.data);
							that.userFormData = res.data.data;
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
			back: function() {
				this.$router.go(-1);
			},
			indexMethod(index) {
				return index++;
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
					this.tableWebDate.splice(index, 1);
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
			open1() {
				this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
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
			onSubmit() {
				console.log('submit!');
			},
			search() {

			},
			empty() {
				this.input1 = "";
				this.input2 = "";
				this.input3 = "";
			},
			handleSizeChange(val) {
				this.pagesize = val;
				console.log(`每页 ${val} 条`);

			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
			},


		}

	}
</script>

<style scoped>
	.hello {
		font-size: 14px;
		margin-left: 20px;

	}

	.demo-input-suffix {
		margin-left: 30px;
		text-align: left;
	}

	.el-header {
		height: 40px;
		background-color: #E9EEF3;
	}



	.el-input {
		width: 150px;
		margin-bottom: 20px;
		margin-right: 15px;
	}

	.el-main {
		/* margin-top: 10px; */
		min-height: 800px;
		/* width: 100%; */
		overflow: auto;
		line-height: 0px !important;
		padding: 10px !important;
		/* margin-left: -20px; */
	}


	.el-table {
		/* width: 100%; */
		top: 20px;
	}

	.el-row {
		width: 100%;
		margin-top: 30px;
	}

	.el-button {
		margin: auto;
		margin-bottom: 10px;
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

	.but1 {
		margin-right: 10px;
	}

	.el-button.delets {
		float: right;
		margin-right: 30px;
		margin-bottom: 20px;
	}


	.block {
		margin-top: 30px;
		margin-left: 280px;
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
</style>
