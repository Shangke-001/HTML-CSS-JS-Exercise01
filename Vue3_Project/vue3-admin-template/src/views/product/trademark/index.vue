<template>
  <el-card class="trademark-container">
    <el-button type="primary" :icon="Plus" style="margin-bottom: 15px" @click="addTrademarkItem">
      商品管理</el-button
    >
    <el-table :data="trademarkList" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="tmName" label="品牌名称" min-width="100" />
      <el-table-column label="品牌Logo" min-width="300">
        <template #default="{ row, $index }">
          <!-- <img :src="row.logoUrl" alt="图片找不到了QAQ" style="height: 100px" /> -->
          <el-image :src="row.logoUrl" style="height: 75px; border-radius: 10px">
            <template #error>
              <div style="background-color: #eee; height: 75px; line-height: 75px; padding: 0 15px">
                图片找不到了
              </div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="tmName" label="操作" min-width="250">
        <template #default>
          <template class="tmName-template">
            <el-button :icon="Edit" @click="editTrademarkItem"> 编辑 </el-button>
            <el-button type="danger" :icon="Delete" @click="deleteTrademarkItem"> 删除</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 6, 9, 12]"
      :background="true"
      layout=" prev, pager, next, jumper, ->, total, sizes "
      :total="totalNum"
      style="margin-top: 20px"
      @size-change="sizeChangeTrademark"
      @current-change="getCurrentPageTrademark"
    />
  </el-card>

  <el-dialog v-model="dialogVisible" title="添加品牌" width="500">
    <el-form :model="dialogForm">
      <el-form-item label="品牌名称" label-width="90">
        <el-input
          v-model="dialogForm.brandName"
          autocomplete="off"
          aria-placeholder="请输入品牌名称"
        />
      </el-form-item>
      <el-form-item label="品牌Logo" label-width="90">
        <el-upload class="avatar-uploader" action="" :show-file-list="false">
          <img v-if="dialogForm.logoImg" :src="dialogForm.logoImg" class="avatar" />
          <div :iconName="Plus" v-else class="avatar-uploader-icon">上传品牌Logo图片</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"> 确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import ElIcon from '@/components/ElIcon/index.vue'
import { ref, reactive, onMounted } from 'vue'
import { reqTrademarkList } from '@/api/product/trademark'
import type { Records } from '@/api/product/trademark/type'

let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
let totalNum = ref<number>(0)
let trademarkList = ref<Records>([])

const getCurrentPageTrademark = async (pager = 1) => {
  //此处pager指定默认参数，不传参则为1，而@current-change、@size-change都会自动传入对应参数
  currentPage.value = pager
  let result = await reqTrademarkList(currentPage.value, pageSize.value)
  // console.log(result)
  if (result.code == 200) {
    //成功获取
    trademarkList.value = result.data.records
    totalNum.value = result.data.total
  } else {
    ElMessage('获取Trademark失败')
  }
}
const sizeChangeTrademark = () => {
  //这样就不传参数
  getCurrentPageTrademark()
}
onMounted(() => {
  getCurrentPageTrademark()
})

//对话框增删改
let dialogVisible = ref<boolean>(false)
let dialogForm = reactive<any>({
  brandName: '',
  logoImg: ''
})
const addTrademarkItem = () => {
  dialogVisible.value = true
}
const editTrademarkItem = () => {
  dialogVisible.value = true
}
const deleteTrademarkItem = () => {
  dialogVisible.value = true
}
</script>

<script lang="ts">
export default {
  name: 'Trademark'
}
</script>

<style scoped lang="scss">
.trademark-container {
  padding: 10px;
  .tmName-template {
    display: flex;
    align-items: center;
  }
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 14px;
  color: #a8acb1;
  width: 160px;
  height: 160px;
  text-align: center;
  line-height: 160px;
}
</style>
