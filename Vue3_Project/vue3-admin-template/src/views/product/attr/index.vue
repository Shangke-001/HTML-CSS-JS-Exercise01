<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card>
      <div v-show="scene == 0">
        <el-button
          type="primary"
          :icon="Plus"
          style="margin-bottom: 15px"
          :disabled="categoryS.c3Id ? false : true"
          @click="addAttr"
          v-has="'btn.Attr.add'"
        >
          添加属性
        </el-button>
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="attrName" label="属性名称" min-width="70" align="center" />
          <el-table-column label="属性值名称" min-width="250">
            <template #default="{ row, $index }">
              <div>
                <el-tag
                  type="primary"
                  v-for="r of row.attrValueList"
                  :key="`${row.id}-${r.id}`"
                  style="margin-right: 10px"
                >
                  {{ r.valueName }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="200" align="center">
            <template #default="{ row, $index }">
              <el-button :icon="Edit" @click="editAttr(row)" v-has="'btn.Attr.update'">
                编辑
              </el-button>
              <el-popconfirm
                confirm-button-text="是的"
                cancel-button-text="不了"
                title="确定要删除吗?"
                @confirm="deleteAttr(row)"
              >
                <template #reference>
                  <el-button type="danger" :icon="Delete" v-has="'btn.Attr.remove'">
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form :model="attrForm" :inline="true">
          <el-form-item label="属性名称" label-width="90">
            <el-input
              v-model="attrForm.attrName"
              autocomplete="off"
              placeholder="请输入属性名称"
              size="large"
            />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          :icon="Plus"
          @click="addAttrValue"
          :disabled="attrForm.attrName ? false : true"
          >添加属性值
        </el-button>
        <el-table :data="attrForm.attrValueList" style="width: 100%; margin: 10px 0" border>
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column label="属性值名称" min-width="280" align="left">
            <template #default="{ row, $index }">
              <el-input
                :ref="
                  //把input实例放进数组中，便于之后做聚焦
                  (vc: any) => {
                    inputList[$index] = vc
                  }
                "
                placeholder="请输入属性名称"
                v-model="row.valueName"
                style="width: 250px"
                v-if="row.flag"
                @blur="toLook(row, $index)"
                @keyup.enter="toEnterNext($index)"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作" min-width="200" align="left">
            <template #default="{ row, $index }">
              <el-button :icon="Delete" type="danger" @click="deleteAttrValue($index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="attrSave"
          :disabled="!(attrForm.attrValueList.length > 0)"
        >
          保存
        </el-button>
        <el-button @click="scene = 0">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, nextTick, onBeforeUnmount, onMounted } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { reqAttrList, reqAttrSave, reqAttrDelete } from '@/api/product/attr'
import type { Attr, AttrValue, AttrList } from '@/api/product/attr/type'
import CategoryStore from '@/stores/modules/category'

const categoryS = CategoryStore()
const attrList = ref<AttrList>([]) //放多个属性

//#region 拿数据
//监听c3Id拿attrList的数据
watch(
  () => categoryS.c3Id,
  () => {
    //处理清空c3Id也会发请的问题
    attrList.value = [] //清空
    //保证三级分类得有才能发请求
    if (!categoryS.c3Id) {
      return
    }
    getAttr()
  }
)
const getAttr = async () => {
  //发请求拿属性数组
  //console.log(categoryS.c1Id, categoryS.c2Id, categoryS.c3Id)
  const res = await reqAttrList(categoryS.c1Id, categoryS.c2Id, categoryS.c3Id)
  if (res.code == 200) {
    attrList.value = res.data
  }
}
//#endregion

//#region 添加修改删除属性
let scene = ref<number>(0)
const attrForm = reactive<Attr>({
  //一个属性的内容
  attrName: '',
  categoryId: '',
  categoryLevel: 3,
  attrValueList: []
})
const addAttr = () => {
  //清空attrForm
  Object.assign(attrForm, {
    attrName: '',
    categoryId: categoryS.c3Id,
    categoryLevel: 3,
    attrValueList: []
  })
  scene.value = 1
}
const editAttr = (row: Attr) => {
  //这是一个浅拷贝，点击取消修改的页面数据会变，但服务器数据其实没变
  //Object.assign(attrForm, row)
  //所以需要用深拷贝
  Object.assign(attrForm, JSON.parse(JSON.stringify(row)))
  scene.value = 1
}
const deleteAttr = async (row: Attr) => {
  const res = await reqAttrDelete(row.id as number)
  if (res.code == 200) {
    ElMessage({
      message: '属性删除成功',
      type: 'success'
    })
    getAttr()
  } else {
    ElMessage({
      message: '属性删除失败',
      type: 'warning'
    })
  }
}
const addAttrValue = () => {
  attrForm.attrValueList.push({
    valueName: '',
    flag: true //控制每一个属性值编辑模式与切换模式的切换
  })
  nextTick(() => {
    inputList.value[attrForm.attrValueList.length - 1].focus()
  })
}
const deleteAttrValue = ($index: number) => {
  attrForm.attrValueList.splice($index, 1)
}
const attrSave = async () => {
  const res = await reqAttrSave(attrForm)
  if (res.code == 200) {
    scene.value = 0
    ElMessage({
      message: attrForm.id ? '属性修改成功' : '属性添加成功',
      type: 'success'
    })
    getAttr() //没有数据才会报错  //有些属性有权限不能添加
  } else {
    ElMessage({
      message: attrForm.id ? '属性修改失败' : '属性添加失败',
      type: 'warning'
    })
  }
}
//#endregion

//#region input框编辑、查看切换 与 聚焦
//input框编辑查看切换，处理输入并判断是否违法

//准备一个数组:将来存储对应的组件实例el-input
let inputList = ref<any>([])

const toLook = (row: AttrValue, $index: number) => {
  //如果为空，就删掉对应项
  if (row.valueName.trim() == '') {
    attrForm.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
    return
  }
  //如果属性值重复
  let repeated = attrForm.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeated) {
    attrForm.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    })
    return
  }
  row.flag = false
}
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  nextTick(() => {
    inputList.value[$index].focus()
  })
}
const toEnterNext = ($index: number) => {
  //先让目前的input框失焦
  inputList.value[$index].blur()
  //再加一个input框
  addAttrValue()
}
//#endregion

//切换路由，组件销毁时，清空所有数据
onBeforeUnmount(() => {
  categoryS.$reset()
  //销毁监听事件
})
</script>

<script lang="ts">
export default {
  name: 'Attr'
}
</script>

<style scoped lang="scss"></style>
