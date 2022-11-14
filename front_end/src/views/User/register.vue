<template>
  <div>
    <el-card style="height: calc(70vh); width: calc(25vw);
  margin-top: calc(15vh); margin-left: calc(37.5vw);
  min-width: 300px">
      <h1 style="margin-bottom: 20%">欢迎加入</h1>
      <el-input placeholder="用户名" v-model="username" style="margin-bottom: 10%"/>
      <el-input placeholder="邮箱" v-model="email" style="margin-bottom: 10%"/>
      <el-input placeholder="密码" v-model="password" show-password style="margin-bottom: 10%"/>
      <el-input placeholder="确认密码" v-model="passwordConfirm" show-password style="margin-bottom: 10%"/>
      <el-input placeholder="验证码" v-model="recaptcha" style="margin-bottom: 5%">
        <el-button slot="append">发送</el-button>
      </el-input>
      <p style="font-size: 10px; color: #B3C0D1">{{notice}}</p>
      <el-button type="info" round style="margin-bottom: 10%">注册</el-button>
    </el-card>
  </div>
</template>

<script>
export default{
  name:"register",
  props :{
  },
  data() {
    return{
      username:"",
      password:"",
      passwordConfirm:"",
      email:"",
      recaptcha:"",
      notice:"操作提示，如两次密码不一致",
    }
  },
  methods :{

  }
}
</script>