<template>
  <div class="register">
    <el-row class="logo_area">
      <div id="logo1" class="home_logo"></div>
    </el-row>
    <div class="kuang">
      <p>欢迎注册</p>
      <el-form ref="form" v-model="form" class="form">
        <el-form-item prop="email"
          :rules="[{ required: true, message: '邮箱不能为空', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
          <el-input v-model="form.email" placeholder="请输入邮箱" type="email" autocomplete="off" clearable
            prefix-icon="el-icon-postcard">
          </el-input>
        </el-form-item>
        <el-form-item prop="username" :rules="[{ required: true, message: '用户名不能为空' }]">
          <el-input v-model="form.username" placeholder="请输入用户名" type="text" autocomplete="off" clearable
            prefix-icon="el-icon-user" maxlength="15">
            <el-dropdown slot="suffix" size="mini" placement="top-start">
              <i class="el-icon-warning-outline el-input__icon">
              </i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled>用户名仅能由中文字符、数字、下划线以及英文字母组成，长度不超过15个字符</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-input>
        </el-form-item>
        <el-form-item prop="realname" :rules="[{ required: true, message: '真实姓名不能为空' }]">
          <el-input v-model="form.realname" placeholder="请输入真实姓名" type="realname" autocomplete="off" clearable
            prefix-icon="el-icon-user" maxlength="15">
            <el-dropdown slot="suffix" size="mini" placement="top-start">
              <i class="el-icon-warning-outline el-input__icon">
              </i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled>真实姓名仅能由中文字符或英文组成，长度不超过15个字符</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-input>
        </el-form-item>
        <el-form-item id="password1" prop="password1" :rules="[{ required: true, message: '密码不能为空' }]">
          <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" show-password type="password" clearable
            v-model="form.password1" autocomplete="off" @keyup.enter.native="register">
            <el-dropdown slot="suffix" size="mini" placement="top-start">
              <i class="el-icon-warning-outline el-input__icon">
              </i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled>密码仅能由数字、26个英文字母或者下划线组成，长度为8-16位</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-input>
        </el-form-item>
        <el-form-item id="password2" prop="password2" :rules="[{ required: true, message: '请再次输入密码' }]">
          <el-input prefix-icon="el-icon-lock" placeholder="请确认密码" show-password type="password" clearable
            v-model="form.password2" autocomplete="off" @keyup.enter.native="register"></el-input>
        </el-form-item>
        <el-form-item id="code" prop="code" :rules="[{ required: true, message: '请输入验证码' }]">
          <el-input placeholder="请输入验证码" type="text" clearable v-model="form.code" autocomplete="off"
            prefix-icon="el-icon-s-check" @keyup.enter.native="register" style="width: 60%; float: left"></el-input>
          <el-button ref="btnSend" class="send" type="primary" style="float: right" @click="sendEmail(form.email)">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn_register" type="primary" @click="register" round>注&nbsp;册</el-button>
          <el-button class="btn_reset" @click="resetForm('form')" round>重&nbsp;置</el-button>
        </el-form-item>
        <div class="re" @click="toFirst">返回首页</div>
        <div class="regis" @click="toRegister">已有账号？前去登录</div>
      </el-form>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import qs from "qs";
export default {
  name: "Register",
  mounted(){
    var body = document.getElementById("topbar");
    body.style.display="none";
  },
  data() {
    return {
      form: {
        email: "",
        username: "",
        realname: "",
        password1: "",
        password2: "",
        code: "",
      },
      btnText: '已发送验证码',
    };
  },
  methods: {
    // sendEmail(email){
    //    this.$axios({
    //     method: "post",
    //     url: "app/send_email/",
    //     data: {
    //       email: email,
    //       type: 0,
    //     },
    //   })
    //     .then((res) => {
    //      this.$message.success("验证码已发送，请您查收")
    //     });
    // },
    register() {
      if (
        this.form.username === "" ||
        this.form.password1 === "" ||
        this.form.email === "" ||
        this.form.password2 === "" ||
        this.form.realname === "" ||
        this.form.code === ""
      ) {
        this.$message.warning("注册相关信息不能为空！");
        return;
      }
      if (
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.exec(
          this.form.email
        )
      ) {
        this.$message.warning("请检查您的邮箱格式！");
        return;
      }
      if (
        !/^[\u4E00-\u9FA5A-Za-z]+$/.exec(this.form.realname)
      ) {
        this.$message.warning("真实姓名仅能由中文字符或英文组成，请检查您的真实姓名输入！");
        return;
      }
      if (
        !/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.exec(this.form.username)
      ) {
        this.$message.warning("用户名仅能由中文字符、数字、下划线以及英文字母组成，请检查您的用户名输入！");
        return;
      }
      if (
        !/^\w+$/.exec(this.form.password1) || this.form.password1.length > 16 || this.form.password1.length < 8
      ) {
        this.$message.warning("密码仅能由数字、26个英文字母或者下划线组成，长度为8-16位，请检查您的密码");
        return;
      }
      if (this.form.password1 != this.form.password2) {
        this.$message.warning("两次输入密码不一致，请检查");
        return;
      }
      if (this.code == '') {
        this.$message.warning("请输入验证码");
        return;
      }
      this.$axios({
        method: "post",
        url: "user/register/",
        data: {
          email: this.form.email,
          username: this.form.username,
          encrypted_pwd: CryptoJS.MD5(this.form.password1).toString(),
          realname: this.form.realname,
          code: this.form.code,
        },
      })
        .then((res) => {
          /* res 是 response 的缩写 */

          if (res.data.errornumber == 0) {
            this.$message({
              message: "注册成功",
              center: true,
              type: "success",
              duration: 900
            });
            this.$axios(
                {
                  url:'user/login/',method:"post",
                  data:{'email':this.form.email,encrypted_pwd:CryptoJS.MD5(this.form.password1).toString()}
                }
            ).then(async res => {
              if (res.data.errornumber == 0) {
                sessionStorage.setItem("token", res.data.token);
                await this.$router.push("/FirstPage")
              }
            })
          }
          else {
            this.$message({
              message: res.data.msg,
              center: true,
              type: "error",
            });
          }
        })
        .catch((err) => {

        });
    },
    toRegister() {
      this.$router.push({ path: "/login" });
    },
    toFirst() {
      this.$router.push({ path: "/" });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    sendEmail(i) {
      if (
          this.form.email === ""
      ) {
        this.$message.warning("注册邮箱不能为空！");
        return;
      }
      this.$axios({
        method: "post",
        url: "app/send_email/",
        data: qs.stringify({
          email: i,
          type: 0,
        }),
      })
          .then((res) => {


                if (res.data.errno == 0) {
                  this.$message.success("验证码已发送,请前往您的邮箱查看信息")
                  var name = this.btnText;
                  this.btnText = this.$refs.btnSend.$el.innerText;
                  this.$refs.btnSend.$el.innerText = name;
                }
                else {
                  this.$message({
                    message: res.data.msg,
                    center: true,
                    type: "error",
                  });
                }
              },
          )
          .catch((err) => {

          });
    },
  },
};
</script>

<style lang="scss" scoped>
.home_logo {
  width: 300px;
  height: 200px;
  margin: 0 auto;
}
.logo_area {
  width: 100%;
  margin: 0 auto;
  padding-top: 50px;
  clear: both;
}
.kuang {
  width: 400px;
  height: auto;
  padding: 30px 25px 0px 25px;
  /* border: 1px solid grey; */
  margin: 21px auto;
  // border-radius: 40px;
  line-height: 80px;
  /*可以让文字往下移一点 */

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);

  transition: 0.4s;

  border-radius: 20px !important;
	border: none !important;
  box-shadow: 0 0 7px rgba(204, 204, 204, 0.713);
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px) brightness(105%);
}

.kuang p {
  color: black;
  /* font-family: myfont; */
  font-size: 30px;
}

.kuang:hover {
  // width: 420px;
  // height: auto;
}

.register {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* background-image: url(../assets/bg.png);
  background-repeat:no-repeat;
  background-size:100%; */
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.register img {
  height: 100%;
  width: 100%;
}

.register>>>.el-input__inner {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

/* .btn_register {
  width: 30%;
  margin-top: 5px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.btn_reset {
  width: 30%;
  margin-top: 5px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
} */
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

.re {
  font-size: 12px;
  float: left;
  color: #999;
  cursor: pointer;
  transition: 0.5s;
}

.re:hover {
  color: rgb(145, 171, 203);
  font-size: 15px;
  padding: 0px 0px 10px 0px;
}

.el-button:not(.send) {
  border: none;
  border-radius: 10px !important;
  background-color: rgba(121, 167, 213, 0.73);
  font-size: 20px;
  width: 48%;
  transition: 0.4s !important;
}

// .el-button:not(.send):hover {
//   border-radius: 10px !important;
//   background-color: rgba(121, 167, 213, 0.377);
//   margin: 10px 0px 10px 0px;
//   font-size: 20px;
//   color: rgb(255, 255, 255);

//   // width: 60%;
// }

// .el-button:active {
//   border-radius: 20px !important;
//   background-color: rgb(82, 109, 137);
//   color: rgb(255, 255, 255);

//   font-size: 20px;
// }

.send {
  height: 40px !important;
  border: 2px rgba(121, 167, 213, 0.377) solid;
  border-radius: 20px !important;
  background-color: rgba(121, 167, 213, 0);
  color: rgb(255, 255, 255);
  font-size: 20px;
  padding: 1px;
  width: 30%;
  transition: 0.4s !important;
}

.send:hover {
  border-radius: 20px !important;
  background-color: rgb(121, 167, 213);
  color: rgb(255, 255, 255);
  width: 33%;
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
