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
            <el-dropdown-item v-if="!isScholar" command="claimScholar,"
              >学者认证</el-dropdown-item
            >
            <el-dropdown-item command="b">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else-if="!loged" class="notLog" @click="gotoLogin">
        <el-dropdown
          size="small"
          placement="bottom"
          @command="handleCommand"
          type="primary"
        >
          <el-button size="small" type="warning">
            未登录<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <!-- <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="c">注册</el-dropdown-item>
            <el-dropdown-item command="d">登录</el-dropdown-item>
          </el-dropdown-menu> -->
        </el-dropdown>
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
      if (command == "c") {
        location.href = "/Register";
      } else if (command == "d") {
        location.href = "/Login";
      } else if (command == "a") {
        this.$refs.claimScholar.initclaimScholar();
      } else if (command == "b") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userInfo");
        location.href = "/FirstPage";
      }
    },
    gotoFirstPage() {
      location.href = "/FirstPage";
    },
    gotoLogin() {
      location.href = "/Login";
    },
    gotoPersonalInformation() {
      location.href =
        "/PersonalInformation/" +
        JSON.parse(sessionStorage.getItem("userInfo")).id;
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
