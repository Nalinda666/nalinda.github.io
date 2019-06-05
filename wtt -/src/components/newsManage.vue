<template>
	<div class="hello">
		<router-view />
		<el-container>
			<el-header>
				<div class="demo-input-suffix">
					文章标题：
					<el-input class="in1" placeholder="请输入文章标题" prefix-icon="el-icon-search" v-model="input1">
					</el-input>
					文章来源：
					<el-input id="in2" placeholder="请输入文章来源" v-model="input2">
						<i slot="prefix" class="el-input__icon el-icon-search"></i>
					</el-input>
					<el-button class="upDatabut" type="primary" size="mini" icon="el-icon-refresh" @click="getStore">刷新</el-button>
					<el-button class="searchbut" type="primary" size="mini" icon="el-icon-search" @click="goSearch">搜索</el-button>
				</div>
			</el-header>
			<el-main>
				<el-table @row-click="clickRow" ref="multipleTable" empty-text border :data="tableNewsDate.slice((currentPage-1)*pagesize,currentPage*pagesize)"
				 tooltip-effect="dark" max-height="1000px" height="500px" size="mini" fit show-header @selection-change="changeFun"
				 row-key="id">
					<el-table-column type="selection" width="55" reserve-selection="true" class="selection" :selectable="selectable"
					 @selection-change="changeFun">
					</el-table-column>
					<el-table-column label="id" type="index" :index="indexMethod(1)" fixed sortable>
					</el-table-column>
					<!-- <el-table-column align="center" prop="id" label="ID" fixed sortable>
					</el-table-column> -->
					<el-table-column align="center" width="230px" prop="title" label="文章标题" fixed sortable>
					</el-table-column>
					<el-table-column align="center" prop="source" width="140" label="文章来源" sortable>
						<template slot-scope="scope">
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">{{ scope.row.source }}</el-tag>
							</div>
						</template>
					</el-table-column>
					<!-- <el-table-column align="center" prop="features" label="文章标签">
					</el-table-column> -->
					<el-table-column align="center" prop="artHisCount" label="浏览量" sortable>
					</el-table-column>
					<el-table-column align="center" prop="commentCount" label="评论量" sortable>
					</el-table-column>
					<el-table-column align="center" prop="articleStatus" :formatter="formatterColumn" label="文章状态" sortable>
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<el-button @click="toDetail(scope.row.id,true)" icon="el-icon-document" size="mini" type="primary" plain>详情</el-button>
							<el-button class="checkbut" @click="checkNews(scope.row.id,scope.row.articleStatus)" :id="scope.row.id" :index="scope.$index"
							 v-if="scope.row.articleStatus==0?true:false" icon="el-icon-success" size="mini" type="primary" plain>审核</el-button>
							<el-button onlinebut @click="onLine(scope.row.id,scope.row.articleStatus)" :id="scope.row.id" :index="scope.$index"
							 v-if="scope.row.articleStatus==2?true:false" icon="el-icon-upload" size="mini" type="primary" plain>发布</el-button>
							<el-button onlinebut @click="discard(scope.row.id,scope.row.articleStatus)" :id="scope.row.id" :index="scope.$index"
							 v-if="scope.row.articleStatus==0?true:false" icon="el-icon-upload" size="mini" type="primary" plain>废除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<template>
					<div class="block">
						<span class="demonstration"></span>
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
						 :page-sizes="[10,20,50,100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableNewsDate.length"
						 background small>
						</el-pagination>
					</div>
				</template>
				<el-row class="buts">
					<el-button class="noSelect" size="medium" type="primary" @click="toggleSelection(tableNewsDate)">全选</el-button>
					<el-button class="delets" size="medium" type="danger" icon="el-icon-delete">批量删除</el-button>
					<el-button class="checkbuts" size="medium" type="primary" icon="el-icon-success">批量审核</el-button>
					<el-button class="onlinebuts" size="medium" type="primary" icon="el-icon-upload">批量发布</el-button>
				</el-row>
			</el-main>
		</el-container>
		<!-- 第一层信息 -->
		<Drawer title="文章信息详情:" v-model="value1" width="720" :closable="false" :styles="styles">
			<Form :model="newsFormData">
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="文章标题" label-position="top">
						<Input v-model="newsFormData.title" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="文章ID" label-position="top">
						<Input v-model="newsFormData.id" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">

					<Col span="12">
					<FormItem label="文章来源" label-position="top">
						<Input v-model="newsFormData.source" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="文章标签" label-position="top">
						<Input v-model="newsFormData.features" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="文章浏览量" label-position="top">
						<Input v-model="newsFormData.artHisCount" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="文章评论量" label-position="top">
						<Input v-model="newsFormData.commentCount" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="文章收藏量" label-position="top">
						<Input v-model="newsFormData.artHisCount" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="文章状态" label-position="top">
						<Input v-model="newsFormData.articleStatus" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="发布时间" label-position="top">
						<Input v-model="newsFormData.artResTime" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
				<FormItem label="文章内容" label-position="top">
					<quill-editor v-model="newsFormData.content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
					 @focus="onEditorFocus($event)" @change="onEditorChange($event)">
					</quill-editor>
					<!-- <Input type="textarea" v-model="newsFormData.content" :rows="4" placeholder="please enter the description" /> -->
				</FormItem>
			</Form>
			<div class="demo-drawer-footer">
				<Button type="primary" style="margin-right: 8px" @click="checkNews" v-if="newsFormData.articleStatus==0?true:false">审核</Button>
				<Button type="primary" style="margin-right: 8px" @click="onLine" v-if="newsFormData.articleStatus==2?true:false">发布</Button>
				<Button type="primary" style="margin-right: 8px" @click="onLine" v-if="newsFormData.articleStatus==0?true:false">废除</Button>
				<Button type="primary" style="margin-right: 8px" @click="submitItem" v-if="isEdtail">提交</Button>
				<Button type="primary" style="margin-right: 8px" @click="value1 = false" v-else>关闭</Button>
			</div>
		</Drawer>
	</div>
</template>

<script>
	import {
		quillEditor
	} from 'vue-quill-editor'
	export default {
		name: 'newsManage',
		data() {
			return {
				small: '',
				input: '',
				input1: '',
				input2: '',
				input3: '',
				value1: false,
				newsSta: false,
				isEdtail: false,
				pagesize: 10,
				examineN: 1,
				releaseN: 1,
				currentPage: 1,
				pageNumber: 1,
				pageSize: 100,
				admAccount: '',
				index: 1,
				multipleSelection: [],
				styles: {
					height: 'calc(100% - 55px)',
					overflow: 'auto',
					paddingBottom: '53px',
					position: 'static'
				},
				newsFormData: {

				},
				tableNewsDate: [],
				editorOption: {
					modules: {
						toolbar: [
							['bold', 'italic', 'underline', 'strike'], // toggled buttons
							['blockquote', 'code-block']
						]
					}
				}

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
			selectable(row, index) {
				if (row.id === "10001") {
					return false;
				} else {
					return true;
				}
			},

			upDataTable() {},
			clickRow(row) {
				this.$refs.multipleTable.toggleRowSelection(row)
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			//记录已选行
			changeFun(val) {
				this.multipleSelection = val;
			},
			//获取表格数据
			getStore() {
				let that = this
				console.log(that.pageNumber);
				console.log(that.pageSize);
				that.$axios({
						method: "post", //指定请求方式
						url: "artAndComment/ArtInfoList", //请求接口（相对接口，后面会介绍到）
						data: {
							"page": {
								"pageNumber": that.pageNumber,
								"pageSize": that.pageSize
							},
							"asc": false,
							"sortKey": "artResTime"
						}
					})
					.then(function(res) {
						//接口成功返回结果执行
						// that.tableNewsDate = res.data.data.list;
						console.log(res);
						console.log(res.data.data.list);
						// examineN == 0 待审核
						// examineN == 2 审核不通过
						// examineN == 1 && releaseN == 0 待发布
						// releaseN == 1 已发布
						for (let item of res.data.data.list) {
							if (item.examineN == 0 && item.releaseN == 0) {
								item.articleStatus = 0
							} else if (item.examineN == 2 && item.releaseN == 0) {
								item.articleStatus = 1
							} else if (item.examineN == 1 && item.releaseN == 0) {
								item.articleStatus = 2
							} else if (item.examineN == 1 && item.releaseN == 1) {
								item.articleStatus = 3
							} else {

							}

							that.tableNewsDate.push(item)
							console.log("状态" + item.articleStatus)
						}
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
				that.pageNumber++
			},
			//跳转详情页
			toDetail(id, value) {
				let that = this
				// console.log('文章Id：' + that.user.id)
				that.$axios({
						method: "get", //指定请求方式
						url: "artAndComment/getArtDetails/" + id, //请求接口（相对接口，后面会介绍到）
					})
					.then(function(res) {
						//接口成功返回结果执行
						console.log(res.data.code);
						console.log(res.data);
						if (res.data.code == "A001") {
							console.log(res.data.data);
							that.newsFormData = res.data.data;
							if (res.data.data.examineN == 0 && res.data.data.releaseN == 0) {
								that.newsFormData.articleStatus = "待审核"
							} else if (res.data.data.examineN == 2 && res.data.data.releaseN == 0) {
								that.newsFormData.articleStatus = "废除"
							} else if (res.data.data.examineN == 1 && res.data.data.releaseN == 0) {
								that.newsFormData.articleStatus = "待发布"
							} else if (res.data.data.examineN == 1 && res.data.data.releaseN == 1) {
								that.newsFormData.articleStatus = "已发布"
							} else {
								that.newsFormData.articleStatus = "未知"
							}
							that.newsFormData.artResTime = that.timestampToTime(res.data.data.artResTime)
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
			//搜索
			goSearch() {
				let that = this
				console.log(that.input1);
				console.log(that.input2);
				that.$axios({
						method: "post", //指定请求方式
						url: "artAndComment/searchNewsTitle",
						data: {
							"title": that.input1,
							"source": that.input2
						} //请求接口（相对接口）
					})
					.then(function(res) {
						//接口成功返回结果执行
						console.log(res);
						that.tableNewsDate.splice(0, that.tableNewsDate.length);
						console.log("清空");
						console.log(that.tableNewsDate);
						for (let item of res.data.data) {
							if (item.examineN == 0 && item.releaseN == 0) {
								item.articleStatus = 0
							} else if (item.examineN == 2 && item.releaseN == 0) {
								item.articleStatus = 1
							} else if (item.examineN == 1 && item.releaseN == 0) {
								item.articleStatus = 2
							} else if (item.examineN == 1 && item.releaseN == 1) {
								item.articleStatus = 3
							} else {

							}
							that.tableNewsDate.push(item)
							console.log("状态" + item.articleStatus)
						}
						// that.tableNewsDate = res.data.data;
						console.log("data");
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
			indexMethod(index) {
				return index++;
			},
			onEditorBlur() { //失去焦点事件
			},
			onEditorFocus() { //获得焦点事件
				let that = this
				that.isEdtail = true
			},
			onEditorChange() { //内容改变事件
				//this.content可以实时获取到当前编辑器内的文本内容
				console.log(this.content);
			},
			//提交修改文章
			submitItem() {},
			//清空输入框
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
				this.currentPage = val;
				console.log(`当前页: ${val}`);
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
			formatterColumn(row, column) {
				switch (row.articleStatus) {
					case 0:
						return '待审核';
						break;
					case 1:
						return '审核不通过';
						break;
					case 2:
						return '待发布'; //已审核直接显示待发布
						break;
					case 3:
						return '已发布';
						break;
					default:
						return '未知';
				}
			},

			//审核
			checkNews(id, articleStatus) {
				let that = this
				console.log("用户" + id);
				that.$axios({
						method: "post", //指定请求方式
						url: "artAndComment/update",
						data: {
							"id": id,
							"examineN": "1"
						} //请求接口（相对接口，后面会介绍到）
					})
					.then(function(res) {
						//接口成功返回结果执行
						console.log(res);
						if (res.data.data) {
							for (let item of that.tableNewsDate) {
								if (item.id == id) {
									item.articleStatus = 2
								}
								console.log("状态" + item.articleStatus)
							}
						}
						// console.log(that.news);
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						console.log(err)

					})
			},
			//发布
			onLine(id, articleStatus) {
				let that = this
				console.log("用户" + id);
				that.$axios({
						method: "post", //指定请求方式
						url: "artAndComment/update",
						data: {
							"id": id,
							"releaseN": "1"
						} //请求接口（相对接口，后面会介绍到）
					})
					.then(function(res) {
						//接口成功返回结果执行
						console.log(res);
						if (res.data.data) {
							for (let item of that.tableNewsDate) {
								if (item.id == id) {
									item.articleStatus = 3
								}
								console.log("状态" + item.articleStatus)
							}
						}
						// console.log(that.news);
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						// console.log(err)

					})
				that.pageNumber++
				// console.log(that.news);
			},
			discard(id, articleStatus) {
				let that = this
				console.log("用户" + id);
				that.$axios({
						method: "post", //指定请求方式
						url: "artAndComment/update",
						data: {
							"id": id,
							"examineN": "2"
						} //请求接口（相对接口，后面会介绍到）
					})
					.then(function(res) {
						//接口成功返回结果执行
						console.log(res);
						if (res.data.data) {
							for (let item of that.tableNewsDate) {
								if (item.id == id) {
									item.articleStatus = 1
								}
								console.log("状态" + item.articleStatus)
							}
						}
						// console.log(that.news);
					})
					.catch(function(err) {
						//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
						// console.log("请求失败")
						// console.log(err)

					})
				that.pageNumber++
				// console.log(that.news);
			}
		},
	}
</script>

<style scoped>
	.hello {
		font-size: 14px;
		margin-left: 20px;
		width: 100%;
	}

	.demo-input-suffix {
		margin-left: 15px;
		text-align: left;

	}

	.el-input {
		height: 30px !important;
		width: 150px;
		margin-bottom: 10px;
		margin-left: 5px;
		margin-right: 10px;
	}

	.el-main {
		width: 100%;
		min-height: 800px;
		line-height: 0px !important;
		padding: 0px !important;
		padding: 10px !important;
	}

	.el-table {
		top: 20px;
		width: 100%;
	}

	.el-header {
		background-color: #E9EEF3;
	}

	.el-row {
		width: 100%;
		margin-top: 30px;
	}

	.el-button {
		margin: auto;
		margin-bottom: 10px;
		margin-right: 10px;
	}

	.el-button.checkbuts,
	.el-button.noSelect,
	.el-button.onlinebuts,
	.el-button.delets {
		float: right;
		margin-right: 30px;
		margin-bottom: 20px;
	}



	.el-button.searchbut,
	.el-button.upDatabut,
	.el-button.emptybut {
		float: right;
		margin-right: 8px;
		margin-top: 20px;
	}

	/* .el-button.upDatabut {
		float: right;
		margin-right: 300px;
	} */


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
