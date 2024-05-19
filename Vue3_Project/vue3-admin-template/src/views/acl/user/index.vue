<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <el-form
        :inline="true"
        style="display: flex; align-items: center; justify-content: space-between"
      >
        <el-form-item label="用户名">
          <el-input v-model="keyword" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchKeyword">搜索</el-button>
          <el-button @click="resetKeyword">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" @click="addUser" v-has="'btn.User.add'">添加用户</el-button>
      <el-button type="danger" @click="deleteUserIdList" v-has="'btn.User.remove'">
        批量删除
      </el-button>
      <el-table
        style="width: 100%; margin: 10px 0"
        border
        :data="userList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="55" align="center" />
        <el-table-column prop="id" label="id" width="70" align="center" />
        <el-table-column prop="username" label="用户名" min-width="120" align="center" />
        <el-table-column prop="name" label="用户昵称" min-width="120" align="center" />
        <el-table-column
          prop="roleName"
          label="用户角色"
          min-width="120"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          min-width="120"
          align="left"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="updateTime"
          label="更新时间"
          min-width="120"
          align="left"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="操作" min-width="320" align="center">
          <template #default="{ row, $index }">
            <el-button :icon="User" @click="changeRole(row)" v-has="'btn.User.assgin'">
              分配角色
            </el-button>
            <el-button :icon="Edit" type="primary" @click="editUser(row)" v-has="'btn.User.update'">
              编辑
            </el-button>
            <el-popconfirm
              confirm-button-text="是的"
              cancel-button-text="不了"
              title="确定要删除吗?"
              @confirm="deleteUser(row.id)"
            >
              <template #reference>
                <el-button type="danger" :icon="Delete" v-has="'btn.User.remove'"> 删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10]"
        :background="true"
        :disabled="false"
        layout="prev, pager, next, jumper, ->, total, sizes"
        :total="totalNum"
        style="margin-top: 20px"
        @size-change="sizeChangeUserList"
        @current-change="getUserList"
      />
    </el-card>

    <!-- 添加与修改的抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      :show-close="true"
      :title="userForm.id ? '修改用户' : '添加用户'"
    >
      <el-form :model="userForm" :rules="rules" ref="userFormRef">
        <el-form-item label="用户名" label-width="90" prop="username">
          <el-input v-model="userForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" label-width="90" prop="name">
          <el-input v-model="userForm.name" placeholder="请输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item
          label="用户密码"
          label-width="90"
          v-show="userForm.id ? false : true"
          prop="password"
        >
          <el-input v-model="userForm.password" placeholder="请输入用户密码"></el-input>
        </el-form-item>
      </el-form>
      <template #footer="{ close }">
        <el-button type="primary" @click="confirmSave">确定</el-button>
        <el-button @click="drawerVisible = false">取消</el-button>
      </template>
    </el-drawer>

    <!-- 分配角色抽屉 -->
    <el-drawer v-model="drawerRoleVisible" :show-close="true" title="分配角色">
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="roleForm.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="display: flex; flex-direction: column">
            <el-checkbox v-model="roleForm.checkAll" @change="checkAll"> 全选 </el-checkbox>
            <el-checkbox-group v-model="roleForm.userRoles">
              <el-checkbox v-for="role in roleForm.allRoles" :key="role.id" :label="role">
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>
      <template #footer="{ close }">
        <el-button type="primary" @click="confirmChangeRole">确定</el-button>
        <el-button @click="drawerRoleVisible = false">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { User, Edit, Delete } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
import {
  reqUserList,
  reqUserAddOrEdit,
  reqUserDeleteOne,
  reqUserDeleteList,
  reqUserRoleList,
  reqUserRoleChange
} from '@/api/acl/user'
import type { UserList, UserOne } from '@/api/acl/user/type'
import { userStore } from '@/stores/modules/user'

let userS = userStore()
let flagThisUser = false

//#region 查看用户数据
let currentPage = ref<number>(1)
let pageSize = ref<number>(5)
let totalNum = ref<number>(0)
let userList = ref<UserList>([])
let keyword = ref<string>('')

const getUserList = async (pager: number = 1) => {
  currentPage.value = pager
  const res = await reqUserList(currentPage.value, pageSize.value, keyword.value)
  if (res.code == 200) {
    userList.value = res.data.records
    totalNum.value = res.data.total
  } else {
    ElMessage({
      message: '获取用户信息失败',
      type: 'warning'
    })
  }
}
const searchKeyword = () => {
  getUserList()
  keyword.value = ''
}
//重置==刷新吗？可是刷新有刷新的按钮，我感觉不是很需要
const resetKeyword = () => {
  keyword.value = ''
  getUserList()
}
const sizeChangeUserList = () => {
  getUserList()
}
onMounted(() => {
  getUserList()
})
//#endregion

//#region 添加修改删除批量删除用户数据
let drawerVisible = ref<boolean>(false)
const userForm = reactive<UserOne>({
  username: '',
  password: '',
  name: ''
})
let selectList: any = []
let userFormRef = ref()
const handleSelectionChange = (selections: any[]) => {
  selectList = selections
}
const deleteUserIdList = async () => {
  //只要id列表
  let idList: number[] = []
  selectList.forEach((selectItem: any) => {
    idList.push(selectItem.id)
  })

  const res = await reqUserDeleteList(idList)
  if (res.code == 200) {
    ElMessage({
      message: '批量删除用户成功',
      type: 'success'
    })
    getUserList()
  } else {
    ElMessage({
      message: '批量删除用户失败',
      type: 'error'
    })
  }
}
const addUser = () => {
  drawerVisible.value = true
  flagThisUser = false

  //清空收集的数据
  userForm.id = 0
  userForm.username = ''
  userForm.name = ''
  userForm.password = ''

  //清除校验信息 或者用nextTick
  userFormRef.value?.clearValidate('username')
  userFormRef.value?.clearValidate('name')
  userFormRef.value?.clearValidate('password')
}
const editUser = (row: UserOne) => {
  flagThisUser = row.username == userS.userName
  Object.assign(userForm, JSON.parse(JSON.stringify(row))) //深拷贝
  drawerVisible.value = true

  //清除校验信息 或者用nextTick
  userFormRef.value?.clearValidate('username')
  userFormRef.value?.clearValidate('name')
  userFormRef.value?.clearValidate('password')
}
const deleteUser = async (id: number) => {
  const res = await reqUserDeleteOne(id)
  if (res.code == 200) {
    ElMessage({
      message: '删除用户成功',
      type: 'success'
    })
    getUserList()
  } else {
    ElMessage({
      message: '删除用户失败',
      type: 'error'
    })
  }
}
const confirmSave = async () => {
  await userFormRef.value.validate()
  const res = await reqUserAddOrEdit(userForm)
  if (res.code == 200) {
    ElMessage({
      message: userForm.id ? '修改用户成功' : '添加用户成功',
      type: 'success'
    })
    drawerVisible.value = false
    getUserList(userForm.id ? currentPage.value : 1)
    if (flagThisUser == true) {
      window.location.reload()
    }
  } else {
    ElMessage({
      message: '添加用户失败',
      type: 'error'
    })
  }
}
//表单校验
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名在5-10位之间', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    { min: 5, max: 10, message: '用户昵称在5-10位之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
    { min: 5, message: '用户密码不少于5位', trigger: 'blur' }
  ]
}
//#endregion

let drawerRoleVisible = ref<boolean>(false)
let roleForm = reactive<any>({
  userName: '',
  userId: '',
  checkAll: false,
  allRoles: [],
  userRoles: []
})
const changeRole = async (row: any) => {
  roleForm.userName = row.username
  roleForm.userId = row.id
  const res = await reqUserRoleList(roleForm.userId)
  if (res.code == 200) {
    //把全部和已分配分开
    roleForm.allRoles = res.data.allRolesList
    roleForm.userRoles = res.data.assignRoles
    drawerRoleVisible.value = true
  } else {
    ElMessage({
      message: '获取用户角色列表失败',
      type: 'error'
    })
  }
}
const checkAll = (isCheck: boolean) => {
  roleForm.userRoles = isCheck ? roleForm.allRoles : []
}
const confirmChangeRole = async () => {
  const data = {
    userId: roleForm.userId,
    roleIdList: roleForm.userRoles.map((role: any) => {
      return role.id
    })
  }
  const res = await reqUserRoleChange(data)
  if (res.code == 200) {
    ElMessage({
      message: '分配角色成功',
      type: 'success'
    })
    getUserList()
  } else {
    ElMessage({
      message: '分配角色失败',
      type: 'error'
    })
  }
  drawerRoleVisible.value = false
}
</script>

<script lang="ts">
export default {
  name: 'User'
}
</script>

<style scoped lang="scss"></style>
