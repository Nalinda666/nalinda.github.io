<template>
	<div class="hello">
		<router-view />
		<el-container>
			<el-header>
				<div class="demo-input-suffix">
					<el-row>
						<label class="opens">手动开关：</label>
						<el-switch class="" lable="手动开关" v-model="open" active-text="开启" inactive-text="关闭">
							手动开关</el-switch>
						<el-button class="add" type="primary" @click="dialogFormVisible= true" icon="el-icon-edit">添加</el-button>
					</el-row>
					<el-dialog title="添加时间段" :visible.sync="dialogFormVisible">
						<el-form>
							<el-form-item label="开始时间" prop="sperBegin">
								<!-- <el-date-picker format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="sperBegin" style="width: 100%;"></el-date-picker> -->
								<el-time-picker v-model="sperBegin" :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
								 format='HH:mm' 设置下拉框时间格式 value-format="HH:mm" placeholder="任意时间点">
								</el-time-picker>
							</el-form-item>
							<!-- <el-form-item :label-width="formLabelWidth">
								开始时间：<el-input v-model="sperBegin" auto-complete="off"></el-input>
							</el-form-item> -->
							<!-- <el-form-item :label-width="formLabelWidth">
							结束时间：<el-input v-model="sperStop" auto-complete="off"></el-input>
						</el-form-item> -->
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="add(sperBegin)">确定添加</el-button>
						</div>
					</el-dialog>
				</div>
			</el-header>
			<el-main>
				<el-table border :data="tableLableDate.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark"
				 max-height="800px" row-style="height:20px" cell-style="padding:0" style="font-size: 12px" >
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="id" type="index"  prop="sperId" :index="indexMethod(1)" fixed sortable>
					</el-table-column>
					<el-table-column align="center" prop="sperBegin" label="启动时间" fixed sortable>
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<el-button @click="deletes(scope.$index)" :id="scope.row.id" :index="scope.$index" size="mini" type="danger"
							 plain><i class="el-icon-delete"></i>删除</el-button>
						</template>
					</el-table-column>

				</el-table>
				<div class="block">
					<span class="demonstration"></span>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
					 :page-sizes="[10,20,30,40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableLableDate.length"
					 background small>
					</el-pagination>
				</div>
			</el-main>
		</el-container>

	</div>
</template>

<script>
	export default {
		name: 'spiders',

		data() {
			return {
				pagesize: 10,
				currentPage: 0,
				tableLableDate: [{
					sperId: '0',
					sperBegin: '24：00',
				}, ],
				input: '',
				open: true,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				sperBegin: '',
				sperStop: '',
				sperId: ''
			}
		},
		methods: {

			indexMethod(index) {
				return index++;
			},
			handleSizeChange(val) {
				this.pagesize = val;
				console.log(`每页 ${val} 条`);

			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
			},
			//添加 
			add(Begin) {
				console.log(Begin);
				let date = new Date(Begin);
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				let sperBegin = h + ':' + m;
				this.dialogFormVisible = false;
				// 包装成tableLableDate要求的对象
				var p = {
					sperId: this.tableLableDate.length++, //添加的编号无法自动添加
					sperBegin: this.sperBegin,
				}
				console.log(p);
				this.tableLableDate.push(p);
				// 清空文本框中的数据
				this.sperBegin = '';

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
					this.tableLableDate.splice(index, 1);
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
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

		}
	}
</script>

<style scoped>
	.hello {
		font-size: 14px;
		margin-left: 40px;
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
		padding: 0px !important;
	}

	.el-table {
		width: 100%;
	}

	.el-switch {
		float: left;
		margin-left: 30px;
		margin-top: 10px;
	}

	.opens {
		float: left;
		margin-left: 100px;
		margin-top: -10px;
	}

	.el-row {
		width: 100%;
		/* margin-top: 30px; */
	}

	.block {
		margin-top: 30px;
		margin-left: 280px;
	}

	.el-button {
		margin: auto;
		margin-bottom: 10px;

	}

	.el-button.check {
		float: right;
		margin-right: 20px;
		margin-top: 20px;
	}

	.el-row.checkbut {
		margin-top: 10px;
	}

	.el-button.add {
		float: right;
		margin-right: 20px;
		margin-top: 10px;
	}
</style>
