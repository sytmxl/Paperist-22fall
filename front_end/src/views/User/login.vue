<template>
  <div>
    <el-card style="height: calc(45vh + 5vw); width: calc(25vw);
  margin-top: calc(20vh); margin-left: calc(37.5vw);
  min-width: 300px">
      <h1 style="margin-bottom: 20%">欢迎回来</h1>
      <el-input placeholder="用户名或邮箱" v-model="username" style="margin-bottom: 10%"/>
      <el-input placeholder="密码" v-model="password" show-password style="margin-bottom: 10%"/>
      <el-button type="info" round  style="margin-bottom: 10%">登录</el-button>
      <div style="float: bottom">
        <p style="float: left; color: #B3C0D1">忘记密码</p>
        <p style="float: right; color: #B3C0D1">注册账号</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default{
  name:"login",
  props :{
  },
  data() {
    return{
      username:"",
      password:"",
    }
  },
  methods :{

  }
}
</script>