<template>
	<div class="todo-all">
    <!-- 自定义事件：@事件名（子组件中绑定触发）=“回调函数（父组件中定义）” -->
		<TodoHeader @receiveAddItem="addItemCall"></TodoHeader>
    <TodoList :todos="todos" :checkItem="checkItem" :deleteItem="deleteItem"></TodoList>
    <TodoFooter :todos="todos" :deleteDoneItems="deleteDoneItems" @checkToChange="checkToChange"></TodoFooter>
	</div>
</template>

<script>
import TodoHeader from './components/ToDoListComponents/TodoHeader.vue'
import TodoFooter from './components/ToDoListComponents/TodoFooter.vue'
import TodoList from './components/ToDoListComponents/TodoList.vue'
export default {
	components: {
		TodoHeader,
		TodoFooter,
    TodoList
	},
  data(){
    return {
      todos:JSON.parse(localStorage.getItem('todos')) || []
    }
  },
  methods: {
    addItemCall(item){
      this.todos.push(item);
    },
    checkItem(todoId){
      this.todos.some((todo)=>{
        if(todo.id==todoId){
          todo.done=!todo.done;
        }
      })
    },
    deleteItem(todoId){
      this.todos = this.todos.filter((todo)=>{
        return todo.id!=todoId;
      })
    },
    deleteDoneItems(){
      this.todos = this.todos.filter((todo)=>{
        return todo.done==false;
      })
    },
    checkToChange(isChecked){
      this.todos.forEach(todo => {
        todo.done=isChecked;
      });
    }
  },
  watch: {
    todos: {
      deep:true,
      handler(newV){
        //console.log('change');
        localStorage.setItem('todos', JSON.stringify(newV));
      }
    }
  }
}
</script>

<style>
.todo-all{
  width:600px;
  margin: auto;
}
.btn {
  /* display: inline-block; */
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}
</style>



<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
 -->