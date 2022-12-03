<template>
  <el-header id="topbar">
    <div id="bar-content">
      <img class="logo" src="../assets/logo/cube_logo.svg" @click="gotoFirstPage">

      <search-box/>
      <el-button  type="default" id="switch" name="dark_light" @click="toggleDarkLight" title="Toggle dark/light mode">日/夜</el-button>
      <div @click="get_avatar">test</div>
      <div class="avatar" @click="gotoPersonalInformation">
        <el-avatar :src=avatar_src ></el-avatar>
      </div>
    </div>
  </el-header>
</template>

<script>
import SearchBox from "@/components/SearchBox";
import axios from "axios";
export default {
  name: "TopBar",
  components: {SearchBox},
  mounted() {
    let tok = sessionStorage.getItem("token")
    if(tok !== ""){
      this.loged = true
      if(this.have_avatar){
        //TODO 这里获取头像src，但目前后端似乎没有对应接口
      }else {
        this.$axios({
          method: "post", url:"/user/getPersonalInformation/",data:{}
        }).then(res=>{
          console.log("res.data");
          console.log(res.data.data);
          sessionStorage.setItem("userInfo",res.data.data)
        })
      }
    }
  },
  data(){
    return{
      have_avatar : false,
      avatar_src : "",
      loged : false
    }
  },
  methods:{
    get_avatar(){
      let tok = sessionStorage.getItem("token")
      if(tok !== "") {
        this.loged = true
        if (this.have_avatar) {
          //TODO 这里获取头像src，但目前后端似乎没有对应接口
        } else {
          this.$axios({
            method: "post", url: "/user/getPersonalInformation/", data: {}
          }).then(res => {
            console.log("res.data");
            console.log(res.data.data);
            sessionStorage.setItem("userInfo", res.data.data)
          })
        }
      }
    },
    gotoFirstPage(){
      location.href = "/FirstPage";
    },
    gotoPersonalInformation(){
      location.href = "/PersonalInformation";
    },
    toggleDarkLight() {
      let body = document.getElementById("app");
      let currentClass = body.className;
      body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
    },
  }
}
</script>

<style lang="scss" scoped>
@import './topbar.scss';
</style>