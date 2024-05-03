<template>
	<li>
		<label>
			<input type="checkbox" :checked="todo.done" @change="checkItem(todo.id)">
			<span>{{ todo.todoTitle }}</span>
		</label>
		<input class="btn btn-danger" type="button" value="删除" @click="deleteItemThis(todo.id)">
	</li>
</template>

<script>
export default {
	props:{
		todo:{
			id: String,
			todoTitle: String,
			done: Boolean,
		},
		checkItem:{
			type: Function
		},
		deleteItem:{
			type: Function
		}
	},
	methods: {
		deleteItemThis(todoId){
			if(confirm('确定删除吗？')){
				this.deleteItem(todoId);
			}
		}
	},
}
</script>

<style scoped>
li {
	list-style: none;
	height: 36px;
	width:560px;
	line-height: 36px;
	/* padding: 0 10px; */
	margin:auto;
	border-bottom: 1px solid #ddd;
	display: flex;
	justify-content: space-between;
}

li label {
	cursor: pointer;
}

li label li input {
	vertical-align: middle;
	margin-right: 6px;
	position: relative;
	top: -1px;
}

li .btn {
	margin-top: 3px;
	display: none;
}

li:before {
	content: initial;
}

li:last-child {
	border-bottom: none;
}

li:hover {
	background-color: #eee;
}

li:hover .btn{
	display: block;
}
</style>