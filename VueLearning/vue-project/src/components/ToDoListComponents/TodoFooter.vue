<template>
  <div class="todo-footer" v-show="allTodoNum">
    <span>
      <input type="checkbox" :checked="isAllDone" @change="checkToChangeThis">
      <span>已完成{{doneTodoNum}}/全部{{allTodoNum}}</span>
    </span>
    <input class="btn btn-danger" type="button" value="清除已完成任务" @click="deleteDoneItems">
  </div>
</template>

<script>
export default {
  props:['todos','deleteDoneItems'],
  computed:{
    doneTodoNum(){
      let doneNum=0;
      this.todos.forEach(todo => {
        if(todo.done==true){
          doneNum++;
        }
      });
      return doneNum;
    },
    allTodoNum(){
      return this.todos.length;
    },
    isAllDone(){
      return this.allTodoNum>0 && this.allTodoNum==this.doneTodoNum;
    }
  },
  methods: {
    checkToChangeThis(e){
      //this.checkToChange(e.target.checked);
      this.$emit('checkToChange',e.target.checked);
    }
  },
}
</script>

<style scoped>
.todo-footer {
  width: 560px;
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
  display: flex;
	justify-content: space-between;
}
.todo-footer button {
  float: right;
  margin-top: 5px;
}
.todo-footer span input {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}
</style>