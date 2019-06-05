<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<h2>Essential Links</h2>
		<el-button @click="open1()"> 按钮</el-button>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		mounted() {
			let that = this
			that.$nextTick(function() {
				that.test()
			})
		},
		methods: {
			test() {
				var a = [{id:1,value:'one'},{id:2,value:'two'}, {id:3,value:'three'}];
				var b = a.filter(function(value, id) {
					// console.log(value) // 结果依次为1，2，3
					console.log(id) // 结尾依次为0，1，2
					if (id === 2) {
						// that.valueOf(0)="123345"
						console.log(this.a.valueOf(0))
						return false;
					}
					return true;
				})
				console.log("b:"+a[0])
			},
			open1() {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
