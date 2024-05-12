<template>
  <el-card style="margin-bottom: 20px">
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryS.c1Id"
          placeholder="请选择"
          @change="getCategory2"
          class="select-size"
          size="large"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="c1Item of categoryS.c1List"
            :key="c1Item.id"
            :label="c1Item.name"
            :value="c1Item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select
          v-model="categoryS.c2Id"
          placeholder="请选择"
          @change="getCategory3"
          class="select-size"
          size="large"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="c2Item of categoryS.c2List"
            :key="c2Item.id"
            :label="c2Item.name"
            :value="c2Item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select
          v-model="categoryS.c3Id"
          placeholder="请选择"
          class="select-size"
          size="large"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="c3Item of categoryS.c3List"
            :key="c3Item.id"
            :label="c3Item.name"
            :value="c3Item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import CategoryStore from '@/stores/modules/category'

const { scene } = defineProps(['scene'])

const categoryS = CategoryStore()
//一级分类在挂载时就要获取
const getCategory1 = () => {
  categoryS.getC1()
}
onMounted(() => {
  getCategory1()
})
//二级分类在一级分类确定的时候获取,即select change的时候(用watch也可以)
const getCategory2 = () => {
  //一级分类改变时，2、3要清空
  categoryS.c2Id = ''
  categoryS.c3Id = ''
  categoryS.c3List = []

  categoryS.getC2()
}
//三级分类同理在二级分类确定的时候获取
const getCategory3 = () => {
  //二级分类改变时，3要清空
  categoryS.c3Id = ''
  categoryS.getC3()
}
</script>
<script lang="ts">
export default {
  name: 'Category'
}
</script>

<style scoped lang="scss">
.select-size {
  width: 230px;
}
</style>
