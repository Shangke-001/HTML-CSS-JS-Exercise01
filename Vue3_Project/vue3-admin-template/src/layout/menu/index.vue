<template>
  <template v-for="item of menuRoutes" :key="item.path">
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta.hidden" :index="item.path">
        <ElIcon :iconName="item.meta.icon"></ElIcon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-else-if="item.children.length == 1">
      <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path">
        <ElIcon :iconName="item.children[0].meta.icon"></ElIcon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-else>
      <el-sub-menu v-if="!item.meta.hidden" :index="item.path">
        <template #title>
          <ElIcon :iconName="item.meta.icon"></ElIcon>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menuRoutes="item.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import ElIcon from '@/components/ElIcon/index.vue'
const { menuRoutes } = defineProps(['menuRoutes'])
</script>

<script lang="ts">
export default {
  name: 'Menu'
}
</script>

<style lang="scss"></style>
