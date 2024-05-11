<template>
  <el-icon>
    <template v-if="iconName == 'HomeFilled'">
      <i-ep-home-filled />
    </template>
    <template v-else-if="iconName == 'Platform'">
      <i-ep-platform />
    </template>
    <template v-else-if="iconName == 'Lock'">
      <i-ep-lock />
    </template>
    <template v-else-if="iconName == 'User'">
      <i-ep-user />
    </template>
    <template v-else-if="iconName == 'Avatar'">
      <i-ep-avatar />
    </template>
    <template v-else-if="iconName == 'List'">
      <i-ep-list />
    </template>
    <template v-else-if="iconName == 'Goods'">
      <i-ep-goods />
    </template>
    <template v-else-if="iconName == 'ShoppingCart'">
      <i-ep-shopping-cart />
    </template>
    <template v-else-if="iconName == 'Management'">
      <i-ep-management />
    </template>
    <template v-else-if="iconName == 'Memo'">
      <i-ep-memo />
    </template>
    <template v-else-if="iconName == 'TrendCharts'">
      <i-ep-trend-charts />
    </template>
    <template v-else-if="iconName == 'Fold'">
      <i-ep-fold />
    </template>
    <template v-else-if="iconName == 'Expand'">
      <i-ep-expand />
    </template>
    <template v-else-if="iconName == 'ArrowDown'">
      <i-ep-arrow-down />
    </template>
    <template v-else-if="iconName == 'Plus'">
      <i-ep-plus />
    </template>
    <template v-else-if="iconName == 'Picture'">
      <i-ep-picture />
    </template>
  </el-icon>
</template>

<script setup lang="ts">
const { iconName } = defineProps(['iconName'])
</script>

<style scoped lang="scss"></style>
