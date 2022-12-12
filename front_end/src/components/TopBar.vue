<template>
  <el-header id="topbar">
    <div id="bar-content">
      <img
        class="logo"
        src="../assets/logo/cube_logo.svg"
        @click="gotoFirstPage"
      />

      <el-button
        size="mini"
        type="default"
        id="switch"
        name="dark_light"
        @click="toggleDarkLight"
        title="Toggle dark/light mode"
        >日/夜</el-button
      >
      <search-box />
      <div v-if="loged" class="avatar" @click="gotoPersonalInformation">
        <el-dropdown size="medium" placement="bottom" @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar
              v-if="!avatar_src"
              class="picture"
              :src="localAvatar"
            ></el-avatar>
            <el-avatar v-else-if="avatar_src" :src="avatar_src"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="!isScholar" command="a"
              >学者认证</el-dropdown-item
            >
            <el-dropdown-item command="b">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else-if="!loged" class="notLog" @click="gotoLogin">
        <el-popover
          placement="top"
          width="160"
          v-model="visible"
          trigger="hover"
        >
          <el-row>
            <el-col :span="12"
              ><el-button type="primary" @click="(visible = false), gotoLogin()"
                >登录</el-button
              >
            </el-col>
            <el-col :span="12"
              ><el-button
                type="primary"
                @click="(visible = false), gotoRegister()"
                >注册</el-button
              >
            </el-col>
          </el-row>
          <span slot="reference">登录</span>
        </el-popover>
      </div>
    </div>
    <claimScholar ref="claimScholar"></claimScholar>
  </el-header>
</template>

<script>
import SearchBox from "@/components/SearchBox";
import axios from "axios";
import localAvatar from "@/assets/mosy.jpg";
import claimScholar from "@/components/claimScholar.vue";
export default {
  name: "TopBar",
  components: { SearchBox, claimScholar },
  mounted() {
    let tok = sessionStorage.getItem("token");
    if (tok != null && tok != "") {
      this.loged = true;
      this.$axios({
        method: "post",
        url: "/user/getPersonalInformation/",
        data: {
          token: sessionStorage.getItem("token"),
          isToken: 1,
          id: 1,
        },
      }).then((res) => {
        console.log("res.data");
        console.log(res.data.data);
        this.avatar_src = res.data.data[0].profile;
        sessionStorage.setItem("userInfo", JSON.stringify(res.data.data[0]));
        if (res.data.data[0].isScholar == 1) {
          this.isScholar = true;
        } else {
          this.isScholar = false;
        }
        // console.log(JSON.parse(sessionStorage.getItem("userInfo")));
      });
    } else {
      this.loged = false;
    }
  },
  data() {
    return {
      avatar_src: "",
      loged: false,
      localAvatar: localAvatar,
      isScholar: false,
    };
  },
  methods: {
    handleCommand(command) {
      if (command == "a") {
        const h = this.$createElement;
        this.$notify({
          title: "如何认证学者？",
          message: h(
            "i",
            { style: "color: teal" },
            "您可以搜索学者，进入到学者主页，点击认证学者按钮，填写学者认证信息，等待管理员审核，管理员审核通过后，即可完成认证。"
          ),
          type: "warning",
          duration:2000,
          offset: 100
        });
      } else if (command == "b") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userInfo");
        sessionStorage.removeItem("last_search");
        // 页面刷新
        location.reload();
        // location.href = "/FirstPage";
      }
    },
    gotoFirstPage() {
      location.href = "/FirstPage";
    },
    gotoRegister() {
      location.href = "/Register";
    },
    gotoLogin() {
      location.href = "/Login";
    },
    gotoPersonalInformation() {
      let routeData = this.$router.resolve({
        name: "PersonalInformation",
        params: { id: JSON.parse(sessionStorage.getItem("userInfo")).id },
      });
      window.open(routeData.href, "_blank");
    },
    toggleDarkLight() {
      let body = document.getElementById("app");
      let currentClass = body.className;
      body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./topbar.scss";
</style>
