<template>
	<div>
		<Button @click="value3 = true" type="primary">详情</Button>
		<!-- 第一层信息 -->
		<Drawer title="Multi-level drawer" v-model="value3" width="720" :closable="false" :styles="styles">
			<Button  @click="value6 = true" type="primary">Two-level Drawer</Button>
			<Form :model="userFormData">
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="用户名" label-position="top">
						<Input v-model="userFormData.userName" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="用户ID" label-position="top">
						<Input v-model="userFormData.userId" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="性别" label-position="top">
						<Input v-model="userFormData.userSex" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="年龄" label-position="top">
						<Input v-model="userFormData.userAge" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="手机号" label-position="top">
						<Input v-model="userFormData.userIphone" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="邮箱" label-position="top">
						<Input v-model="userFormData.userEmail" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="密码" label-position="top">
						<Input v-model="userFormData.userPass" :disabled="true" />
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
					<FormItem label="关注" label-position="top">
						<Input v-model="userFormData.userLike" :disabled="true" />
						<Button  @click="value6 = true" type="primary">查看</Button>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="收藏" label-position="top">
						<Input v-model="userFormData.userCollect" :disabled="true" />
						<Button  @click="value6 = true" type="primary">查看</Button>
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="入学年月" label-position="top">
						<Input v-model="userFormData.userSchool" :disabled="true" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="注册时间" label-position="top">
						<Input v-model="userFormData.userEnter" :disabled="true" />
					</FormItem>
					</Col>
				</Row>
			</Form>
			<div class="demo-drawer-footer">
				<Button style="margin-right: 8px" @click="value3 = false">关闭</Button>
				<Button type="primary" @click="value3 = false">确认</Button>
			</div>
		</Drawer>
		<!-- 第二层信息 -->
		<Drawer title="Two-level Drawer" :closable="false" v-model="value6">
			This is two-level drawer.
		</Drawer>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				value5: false,
				value6: false,
				value3: false,
				styles: {
					height: 'calc(100% - 55px)',
					overflow: 'auto',
					paddingBottom: '53px',
					position: 'static'
				},
				userFormData: {
					userId:0,
					userName: '小橘子',
					userAge: '17',
					userSex: '',
					userPass: '1234567',
					userIphone: '13567457865',
					userEmail: '3890823@qq.com',
					userLike: '45',
					userCollect: '23',
					itemLike: '就业 ',
					userSchool: '',
					userEnter: '',
				},
			}
		}
	}
</script>
<style scoped>
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
	.ivu-input[disabled]{
		color: #000000;
	}
</style>
