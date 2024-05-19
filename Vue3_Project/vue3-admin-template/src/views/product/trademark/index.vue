<template>
  <div>
    <el-card class="trademark-container">
      <el-button
        type="primary"
        :icon="Plus"
        style="margin-bottom: 15px"
        @click="addTrademarkItem"
        v-has="'btn.Trademark.add'"
      >
        添加品牌
      </el-button>
      <el-table :data="trademarkList" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="tmName" label="品牌名称" min-width="100" align="center" />
        <el-table-column label="品牌Logo" min-width="250" align="center">
          <template #default="{ row, $index }">
            <!-- <img :src="row.logoUrl" alt="图片找不到了QAQ" style="height: 100px" /> -->
            <el-image :src="row.logoUrl" style="height: 75px; border-radius: 10px">
              <template #error>
                <div class="picture-not-find">
                  <ElIcon iconName="Picture" style="margin-bottom: 3px"></ElIcon>
                  图片找不到了
                </div>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="250" align="center">
          <template #default="{ row, $index }">
            <el-button :icon="Edit" @click="editTrademarkItem(row)" v-has="'btn.Trademark.update'">
              编辑
            </el-button>
            <el-popconfirm
              confirm-button-text="是的"
              cancel-button-text="不了"
              title="确定要删除吗?"
              @confirm="deleteTrademarkItem(row.id)"
            >
              <template #reference>
                <el-button type="danger" :icon="Delete" v-has="'btn.Trademark.remove'">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
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

    <el-dialog v-model="dialogVisible" :title="dialogForm.id ? '修改品牌' : '添加品牌'" width="500">
      <el-form :model="dialogForm" :rules="rules" ref="tmForms">
        <el-form-item label="品牌名称" label-width="90" prop="tmName">
          <el-input v-model="dialogForm.tmName" autocomplete="off" placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item label="品牌Logo" label-width="90" prop="logoUrl">
          <!-- action: 图片上传请求地址 -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="dialogForm.logoUrl" :src="dialogForm.logoUrl" class="avatar" />
            <div v-else class="avatar-uploader-icon">上传品牌Logo图片</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmBtn"> 确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ref, reactive, onMounted, nextTick } from 'vue'
import {
  reqTrademarkList,
  reqAddOrEditTrademark,
  reqDeleteTrademark
} from '@/api/product/trademark'
import type { Records, TradeMark } from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'

//#region 品牌展示部分
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
//#endregion

//#region 品牌增删改部分
let dialogVisible = ref<boolean>(false)
let dialogForm = reactive<TradeMark>({
  tmName: '',
  logoUrl: ''
})
//表单校验
const tmForms = ref()
const validateTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称需大于等于两位'))
  }
}
const rules = {
  tmName: [{ required: true, validator: validateTmName, trigger: 'blur' }],
  logoUrl: [{ required: true, message: '请上传品牌Logo', trigger: 'blur' }]
}

//上传头像：通过el-upload发请求
//before-upload文件上传之前的钩子，需要检查文件格式与文件大小
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M'
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式需为jpg|png|gif'
    })
    return false
  }
}
//on-success文件上传成功之后的钩子，
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  dialogForm.logoUrl = response.data
  //清除校验信息
  tmForms.value.clearValidate('logoUrl')
}

const addTrademarkItem = async () => {
  dialogVisible.value = true
  //清空收集的数据
  dialogForm.id = 0
  dialogForm.tmName = ''
  dialogForm.logoUrl = ''

  //清除校验信息
  tmForms.value?.clearValidate('tmName')
  tmForms.value?.clearValidate('logoUrl')
}
const editTrademarkItem = (row: TradeMark) => {
  dialogVisible.value = true
  //将原本的数据混入到dialogForm
  Object.assign(dialogForm, row)
  // console.log(dialogForm)
  //清空校验规则错误提示信息
  nextTick(() => {
    tmForms.value.clearValidate('tmName')
    tmForms.value.clearValidate('logoUrl')
  })
}
const deleteTrademarkItem = async (id: number) => {
  const result = await reqDeleteTrademark(id)
  if (result.code == 200) {
    ElMessage({
      showClose: true,
      message: '删除品牌成功',
      type: 'success'
    })
    //成功才需要，再次获取已有的品牌数据
    getCurrentPageTrademark(
      trademarkList.value.length > 1 ? currentPage.value : currentPage.value - 1
    )
  } else {
    ElMessage({
      showClose: true,
      message: '删除品牌失败',
      type: 'error'
    })
  }
}

//确认按钮
const confirmBtn = async () => {
  //确认之前校验表单
  await tmForms.value.validate()

  dialogVisible.value = false
  const result = await reqAddOrEditTrademark(dialogForm)
  //console.log(result)
  if (result.code == 200) {
    //添加成功
    ElMessage({
      showClose: true,
      message: dialogForm.id ? '修改品牌成功' : '添加品牌成功',
      type: 'success'
    })
    //刷新一下数据
    getCurrentPageTrademark(currentPage.value)
  } else {
    //添加失败
    ElMessage({
      showClose: true,
      message: dialogForm.id ? '修改品牌失败' : '添加品牌失败',
      type: 'error'
    })
  }
}
//#endregion
</script>

<script lang="ts">
export default {
  name: 'Trademark'
}
</script>

<style scoped lang="scss">
.trademark-container {
  padding: 10px;
  .picture-not-find {
    background-color: #f1f1f1;
    height: 75px;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #aaa;
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
