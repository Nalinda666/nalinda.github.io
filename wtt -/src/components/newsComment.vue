<template>
	<div class="newscomment">
		<router-view />
		<el-container>
			<el-header>
				<div class="demo-input-suffix">
					用户名：
					<el-input placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="input1">
					</el-input>
					评论内容：
					<el-input placeholder="请输入评论内容" prefix-icon="el-icon-search" v-model="input1">
					</el-input>
					<!-- 评论时间：
					<span class="stuEnt"></span>
					<el-date-picker v-model="value3" type="month" placeholder="输入评论时间">
					</el-date-picker> -->
					<el-button class="searchbut" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
					<el-button class="emptybut" type="primary" icon="el-icon-refresh" @click="getStore">刷新</el-button>
				</div>
			</el-header>
			<el-main>
				<el-table row-style="height:20px" cell-style="padding:0" style="font-size: 12px" border :data="tableWebDate.slice((currentPage-1)*pagesize,currentPage*pagesize)"
				 tooltip-effect="dark" max-height="1000" size="mini" fit show-header>
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="id" type="index" :index="indexMethod(1)" fixed sortable>
					</el-table-column>
					<!-- <el-table-column align="center" prop="id" label="ID" width="100" fixed sortable v-show="show">
					</el-table-column> -->
					<el-table-column align="center" prop="userName" label="用户名" fixed sortable>
					</el-table-column>
					<el-table-column align="center" prop="comContent" label="评论内容" fixed sortable>
					</el-table-column>
					<el-table-column align="center" prop="comTime" label="评论时间" fixed sortable>
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<!-- <router-link :to="{path:'studentDetail',query:{stu_id:scope.row.id}}">
								<el-button size="mini" type="primary" plain icon="el-icon-edit">编辑</el-button>
							</router-link> -->
							<el-button @click="deletes(scope.row.id,scope.$index)" :id="scope.row.id" :index="scope.$index" size="mini" type="danger"
							 plain><i class="el-icon-delete"></i>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="block">
					<span class="demonstration"></span>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
					 :page-sizes="[10,20,30,40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableWebDate.length"
					 background small>
					</el-pagination>
					</el-pagination>
				</div>
				<el-row class="checkbut">
					<el-button @click="open1" class="delets" size="medium" type="danger" icon="el-icon-delete">批量删除</el-button>
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableWebDate: [],
				pageNumber: 1,
				pageSize: 1000,
				input: '',
				input1: '',
				input2: '',
				input3: '',
				value1: '',
				value3: '',
				pagesize: 10,
				currentPage: 0,
				show: true,
			}
		},
		mounted() {
			var that = this;
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
						url: "artComment/queryCommentInfoList", //请求接口（相对接口，后面会介绍到）
						data: {
							"page": {
								"pageNumber": that.pageNumber,
								"pageSize": that.pageSize
							},
							"asc": false,
							"sortKey": "comTime"
						}
					})
					.then(function(res) {
						//接口成功返回结果执行
						console.log(res);
						console.log(res.data.data.list);
						// that.tableWebDate = res.data.data.list;
						for (let item of res.data.data.list) {
							item.comTime = that.timestampToTime(item.comTime)
							that.tableWebDate.push(item)
						}
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
			},
			//删除
			deletes(id, index) {
				let that = this
				console.log("id:"+id);
				console.log("index"+index);
				that.$confirm('是否要删除当前数据?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios({
							method: "post", //指定请求方式
							url: "artComment/update", //请求接口（相对接口，后面会介绍到）
							data: {
								"id": id,
								"comSta": 0
							}
						})
						.then(function(res) {
							//接口成功返回结果执行
							console.log(res);
							if(res.data.code=='A001'){
							that.tableWebDate.splice(index, 1);
							that.$message({
								type: 'success',
								message: '删除成功!'
							});
							}
						})
						.catch(function(err) {
							//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
							// console.log("请求失败")
							console.log(err)

						})

				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			onSubmit() {
				console.log('submit!');
			},
			indexMethod(index) {
				return index++;
			},
			search() {},
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
		}
	}
</script>

<style scoped>
	.newscomment {
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
		width: 100%;
		overflow: auto;
		padding: 10px !important;
		line-height: 0px !important;
	}

	.el-table {
		width: 100%;
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

	.el-button.delets {
		float: right;
		margin-right: 30px;
		margin-bottom: 20px;
	}

	.but1 {
		margin-right: 10px;
	}

	.block {
		margin-top: 30px;
		margin-left: 280px;
	}
</style>
