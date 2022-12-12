<template>
  <div class="forgetDiv">
    <el-row class="logo_area">
      <div id="logo1" class="home_logo"></div>
    </el-row>
    <div class="kuang">
      <p>重设您的密码</p>
      <el-form ref="form" :model="form" class="form" :rules="rules">
        <el-form-item id="email" prop="email">
          <el-input placeholder="请输入您的邮箱" clearable
                v-model="form.email">
          </el-input>
        </el-form-item>
        <el-form-item id="password1" prop="password1">
          <el-input prefix-icon="el-icon-lock" placeholder="请输入新密码" show-password type="password" clearable
                    v-model="form.password1" autocomplete="off">
            <el-dropdown slot="suffix" size="mini" placement="top-start">
              <i class="el-icon-warning-outline el-input__icon">
              </i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled>新密码仅能由数字、26个英文字母或者下划线组成，长度为8-16位</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-input>
        </el-form-item>
        <el-form-item id="password2" prop="password2">
          <el-input prefix-icon="el-icon-lock" placeholder="请确认新密码" show-password type="password" clearable
                    v-model="form.password2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item id="code" prop="code">
          <el-input placeholder="请输入验证码" clearable
                v-model="form.code" autocomplete="off">
          </el-input>
        </el-form-item>
        <div class="regis">
          <el-button class="btn_login" type="primary" @click="findPass('form')" round>保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CryptoJS from 'crypto-js'
import instance from "@/http";
import qs from "qs"
export default {
  name: "Forget",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新的密码"));
      }
      else if (!/^\w+$/.exec(value) || value.length > 16 || value.length < 8) {
        callback(new Error('新密码格式错误'));
      }
      else {
        if (this.form.password2 !== "") {
          this.$refs.form.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      }
      else if (value !== this.form.password1) {
        callback(new Error("两次输入密码不一致!"));
      }
      else {
        callback();
      }
    };
    return {
      // str: this.$route.params.id,
      form: {
        email: "",
        password1: "",
        password2: "",
        code: "",
      },
      rules: {
        password1: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password2: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    findPass(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.$axios({
            method: "post",
            url: "user/retrievePassword/",
            data:{
              // token: this.str.toString().split('localhost/')[1]
              email: this.form.email,
              encrypted_pwd: CryptoJS.MD5(this.form.password1).toString(),
              code: this.form.code,
            },
          })
              .then((res) => {


                if (res.data.errornumber == 0) {
                  this.$message({
                    message: "成功重设您的密码",
                    center: true,
                    type: "success",
                    duration: 900,
                  })
                  this.$axios(
                      {
                        url: 'user/login/',method:"post",
                        data:{
                          'email':this.form.email,
                          encrypted_pwd:CryptoJS.MD5(this.form.password1).toString()
                        }
                      }
                  ).then(async res => {
                    if (res.data.errornumber == 0) {
                      sessionStorage.setItem("token", res.data.token);
                      await  this.$router.push("/FirstPage")
                    }
                  })
                  // this.$message.success("成功重设您的密码，将跳转至登录页面");
                  // setTimeout(() => {
                  //   this.$router.push({ name: 'login' });
                  // }, 2000);
                }
                else {
                  this.$message({
                    message: "重置失败，请检查您的验证码是否正确",
                    // message: res.data.msg,
                    center: true,
                    type: "error",
                  });
                }
              })
              .catch((err) => {

              });
        }
        else {

          this.$message.warning("请检查您的输入")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>

.forgetDiv{
  height: 700px;
}

.home_logo {
  // display:none !important;
  width: 300px;
  height: 200px;
  margin: 0 auto;
}
.logo_area {
  width: 100%;
  margin: 0 auto;
  padding-top: 160px;
  clear: both;
}

.kuang {
  width: 400px;
  height: auto;
  padding: 30px 25px;
  /* border: 1px solid grey; */
  margin: 21px auto;
  line-height: 80px;
  /*可以让文字往下移一点 */

  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -35%);

  transition: 0.4s;

  border-radius: 20px !important;
  border: none !important;
  box-shadow: 0 0 7px rgba(204, 204, 204, 0.713);
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px) brightness(105%);
  // box-shadow: 0 0px 0px rgb(0 0 0 / 10%), 0 12px 20px rgb(38 38 38 / 12%);
}

.kuang:hover {
  width: 420px;
  height: auto;
}

.login {
  height: calc(100vh);
  width: 100%;
  overflow: hidden;
  overflow-y: hidden;
}

.login img {
  height: 100%;
  width: 100%;
}
.el-tabs {
  // margin-top: 30px;
}

.regis {
  font-size: 12px;
  float: right;
  color: #999;
  cursor: pointer;
  transition: 0.4s;
}

.regis:hover {
  color: rgb(145, 171, 203);
  font-size: 15px;
  padding: 0px 0px 10px 0px;
}

.back {
  font-size: 12px;
  float: left;
  color: #999;
  cursor: pointer;
  transition: 0.4s;
}

.back:hover {
  color: rgb(145, 171, 203);
  font-size: 15px;
  padding: 0px 0px 10px 0px;
}

.el-form {
  border-radius: 20px !important;
}

.el-button:not(.forget) {
  border: none;
  border-radius: 20px !important;
  background-color: rgba(121, 167, 213, 0.73);
  font-size: 20px;
  width: 100%;
  transition: 0.4s !important;
}

.el-button:hover:not(.forget:hover) {
  border-radius: 20px !important;
  background-color: rgba(121, 167, 213, 0.377);
  margin: 10px 0px 10px 0px;
  font-size: 20px;
}

.el-button:active:not(.forget:active) {
  border-radius: 20px !important;
  background-color: rgb(82, 109, 137);

  font-size: 20px;
}
.forget {
  width: 40%;
}
/deep/ #forget {
  width: 250% !important;
}
//tabs
.el-tabs--left {
  color: rgb(164, 170, 183) !important;
  /* background: #000; */
  border: rgba(164, 170, 183, 0.403) solid 1px;
  border-radius: 28px !important;
  // background-color: #ffffff7a;
  padding: 10px 0px;
}
/* 这里的样式应该只能用/deep/改 */
/deep/ .el-tabs__item.is-active {
  color: rgb(2, 2, 2);
}
/deep/ .el-tabs__item:hover {
  color: #75889c;
}
/deep/ .el-tabs__item {
  color: #909399;
  font-size: 14px;
  font-weight: 500;
}
/deep/ .el-tabs__active-bar {
  height: 4px;
  border-radius: 2px;
  background: #003B55;
}
</style>
