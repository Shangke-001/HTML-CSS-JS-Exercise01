<template>
  <ElIcon
    :iconName="layoutSettingS.isCollapse ? 'Expand' : 'Fold'"
    @click="layoutSettingS.layoutCollapse"
    style="vertical-align: middle; margin-right: 10px"
  ></ElIcon>
  <el-breadcrumb :separator-icon="ArrowRight">
    <template v-for="rItem of route.matched" :key="rItem.path">
      <el-breadcrumb-item v-if="rItem.meta.title" :to="rItem.path">
        <ElIcon :iconName="rItem.meta.icon" style="vertical-align: middle"></ElIcon>
        {{ rItem.meta.title }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import layoutSettingStore from '@/stores/modules/setting'
import { useRoute } from 'vue-router'

const layoutSettingS = layoutSettingStore()
const route = useRoute()
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb'
}
</script>

<style scoped lang="scss"></style>
