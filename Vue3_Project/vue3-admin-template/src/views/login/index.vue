<template>
  <div class="login-container">
    <!-- :gutter指定间隔 -->
    <el-row>
      <!-- :span指定占列，:xs为响应式（<768px则），占满为24 -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-card class="login-form">
          <el-form :model="loginInfo" :rules="rules" ref="loginForms">
            <h1>{{ setting.projectName }}项目</h1>
            <h3>尚可-尚硅谷教程</h3>
            <el-form-item prop="username">
              <el-input
                v-model="loginInfo.username"
                size="large"
                placeholder="Username"
                :prefix-icon="User"
                clearable
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="loginInfo.password"
                size="large"
                placeholder="Password"
                :prefix-icon="Lock"
                clearable
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button
                class="login-btn"
                type="primary"
                size="large"
                @click="onUserLogin"
                :loading="isLoading"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock, Warning } from '@element-plus/icons-vue'
import setting from '@/setting'

import { reactive, ref } from 'vue'
import { userStore } from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router'

import { getGeneralTime } from '@/utils/time'

const userS = userStore()
const router = useRouter()
const route = useRoute()

const loginInfo = reactive({
  username: 'admin',
  password: '111111'
})
//加载
let isLoading = ref(false)
//获取vc实例
const loginForms = ref()
//请求
const onUserLogin = async () => {
  //表单校验全部通过再发请求
  await loginForms.value.validate()

  isLoading.value = true
  userS.userLogin(loginInfo).then(
    (res) => {
      //成功
      // console.log(res)

      //router去home
      ElNotification({
        title: `Hi, ${getGeneralTime()}好`,
        message: '欢迎回来',
        type: 'success',
        duration: 2000
      })
      const redirectP: any = route.query.redirect
      router.push({ path: redirectP || '/' })
    },
    (err) => {
      //失败
      console.log(err)
      //提示信息
      ElNotification({
        title: '登录失败',
        message: '账号或密码错误',
        type: 'error',
        duration: 2000
      })
      isLoading.value = false
    }
  )
}

//表单校验
const validateUserName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  } else if (value.length < 4 || value.length > 10) {
    callback(new Error('账号应为4~10位'))
  }
  const reg = /^[A-Za-z0-9]+$/
  if (!reg.test(value)) {
    callback(new Error('账号应为字母与数字的任意组合'))
  } else {
    callback()
  }
}
const rules = {
  username: [{ validator: validateUserName, trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码应为6~16位的任意组合', trigger: 'blur' }
  ]
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login-form {
    position: relative;
    width: 60%;
    top: 25vh;
    left: 10vw;
    padding: 10px;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    border-radius: 10px;
    h1 {
      text-align: center;
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 8px;
      color: aliceblue;
    }
    h3 {
      text-align: center;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 20px;
      color: aliceblue;
      opacity: 80%;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
