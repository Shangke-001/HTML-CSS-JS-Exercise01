<template>
  <div class="login-container">
    <!-- :gutter指定间隔 -->
    <el-row>
      <!-- :span指定占列，:xs为响应式（<768px则），占满为24 -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-card class="login-form">
          <el-form>
            <h1>Vue-Admin项目</h1>
            <h3>尚可-尚硅谷教程</h3>
            <el-form-item>
              <el-input
                v-model="loginInfo.username"
                size="large"
                placeholder="Username"
                :prefix-icon="User"
                clearable
              />
            </el-form-item>
            <el-form-item>
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
              <el-button class="login-btn" type="primary" size="large" @click="">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock, Warning } from '@element-plus/icons-vue'
import { reactive } from 'vue'

const loginInfo = reactive({
  username: 'admin',
  password: '111111'
})
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
