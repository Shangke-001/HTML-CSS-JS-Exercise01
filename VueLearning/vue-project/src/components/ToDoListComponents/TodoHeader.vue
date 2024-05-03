<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入代办事项，按下回车确认" @keyup.enter="addTodo">
  </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
  // props:['receiveAddItem'],
  methods: {
    addTodo(e){
      const addItem={id:nanoid(), todoTitle:e.target.value, done:false}
      //this.receiveAddItem(addItem);
      //自定义事件：$emit绑定（事件名，传参）
      this.$emit('receiveAddItem',addItem);
      e.target.value='';
    }
  },
}
</script>

<style scoped>
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>