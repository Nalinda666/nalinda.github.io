<!-- 这个是爬虫详情页页面 -->
<template>
	<div class="spiderDetail">
		<el-button class="back" @click="back" size="medium" type="primary" icon="el-icon-arrow-left
">返回</el-button>
		<!-- </div> -->
		<div class="tables" align="center">
			<div class="spiderInfo" :data="spiderInfo" :style="'min-height:'+conheight+'px'">
				<el-row :gutter="20" type="flex" class="demo">
					<el-col :span="6">
						<div class="demo1">
							编号：</div>
					</el-col>
					<el-col :span="16">
						<div class="grid-content bg-purple">
							<el-input v-model="sperId" placeholder="编号" :disabled="true"></el-input>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="20" type="flex" class="demo">
					<el-col :span="6">
						<div class="demo1">
							开始时间：</div>
					</el-col>
					<el-col :span="16">
						<div class="grid-content bg-purple">
							<el-input v-model="sperBegin" placeholder="开始时间" :disabled="true"></el-input>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="20" type="flex" class="demo">
					<el-col :span="6">
						<div class="demo1">
							结束时间：</div>
					</el-col>
					<el-col :span="16">
						<div class="grid-content bg-purple">
							<el-input v-model="sperStop" placeholder="结束时间" :disabled="true"></el-input>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="20" type="flex" class="demo">
					<el-col :span="6">
						<div class="editor">
							<el-button type="primary" round size="medium" native-type="submit" icon="el-icon-edit-outline">编辑</el-button>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="editor">
							<el-button type="primary" round size="medium" native-type="submit" icon="el-icon-success">确定</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sperId:'',
				sperBegin: '',
				sperStop: '',
				spiderInfo: {
					sperId: 35,
					sperBegin: '20:00',
					sperStop: '22:00',
				},
				conheight: '0',
			}
		},
		mounted() {
			var that = this;
			var stu_id = this.$route.query.stuId;
			// this.params = params;
			console.log(stu_id);

			// 		$.ajax({		//根据id获取学生信息
			// 			url'...?stu_id='+stu_id,
			// 			type:'GET',
			// 			success:function(res){
			// 				if(res.code === 200){
			// 					that.studentInfo = res.data;		//获取成功后，填充到页面上
			// 				}
			// 			}
			// 		})

			//知识点：
			// 	1，学生列表页用query传参（学生id），
			// 	2.学生详细信息页面用this.$route.query接受学生id，
			// 	3.用学生id获取学生信息
			// 	4.将学生信息渲染到页面上
		},
		methods: {
			back: function() {
				this.$router.go(-1);
			},
			getHeight() {
				this.conheight.height = window.innerHeight - 170 + 'px';
			},
			created() {
				window.addEventListener('resize', this.getHeight);
				this.getHeight()
			}
		},
	}
</script>


<style scoped>
	.spiderDetail {
		width: 100%;
		height: 100%;
		/* overflow: scroll; */
		font-size: 16px;
	}

	.studentInfo {
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
	}

	.demo {
		margin-top: 30px;
	}

	.el-button.back {
		margin-left: -500px;
	}

	.demo.el-row {
		width: 400px;
	}

	.backUser {}

	.el-main {
		text-align: left;
	}

	.studentInfo>div {
		margin-bottom: 20px;
	}

	.studentInfo>div>.el-input,
	.studentInfo>div>#c1 {
		vertical-align: middle;
	}

	.el-dropdown {
		vertical-align: top;
	}

	.el-dropdown+.el-dropdown {
		margin-left: 15px;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	.demo1 {
		text-align: left;
	}

	.demo1:after {
		display: inline-block;
		width: 100%;
		content: '';
	}

	.editor {
		margin-left: 500px;
		margin-top: 30px;
	}
</style>
