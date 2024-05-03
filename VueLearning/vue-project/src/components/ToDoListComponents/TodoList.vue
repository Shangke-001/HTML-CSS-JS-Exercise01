<template>
  <div class="todo-main">
		<transition-group name="todo" appear>
			<TodoItem v-for="td in todos" :key="td.id" :todo="td" :checkItem="checkItem" :deleteItem="deleteItem"></TodoItem>
		</transition-group>
	</div>
</template>

<script>
import TodoItem from './TodoItem.vue'
export default {
	components:{
		TodoItem
	},
	props: ['todos','checkItem','deleteItem'],
}
</script>

<style scoped>
.todo-enter-active{
	animation: enterExit 0.5s ease;
}
.todo-leave-active{
	animation: enterExit 0.5s ease reverse;
}
@keyframes enterExit {
	0%{
		transform: translateX(100%);
	}
	100%{
		transform: translateX(0);
	}
}
.todo-main {
	margin-left: 0px;
	border: 1px solid #ddd;
	border-radius: 2px;
	padding: 0px;
	margin-bottom: 10px;
	width: 575px;
}
</style>