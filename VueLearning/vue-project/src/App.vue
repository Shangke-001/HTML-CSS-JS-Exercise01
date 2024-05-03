<template>
  <div>
    <h1>姓名：{{ person.name }}</h1>
    <h1>年龄：{{ person.age }}</h1>
    <button @click="person.name+='-'">姓名改变</button>
    <button @click="person.age++">年龄改变</button>
  </div>
</template>

<script>
import { reactive, watch } from 'vue';
export default {
  setup() {
    const person = reactive({
      name: '尚可',
      age: 19,
    })
    watch(()=>{return {...person}},
    (newV,oldV)=>{
      console.log(newV,oldV);
    })
    return {
      person,
    }
  }
}
</script>