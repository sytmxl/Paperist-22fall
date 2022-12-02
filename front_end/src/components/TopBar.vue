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
#topbar {
  z-index: 100;
  width: 100%;
  height:60px;
  position: fixed; 
  transition: 0.3s;
  animation: test 0.3s cubic-bezier(.23,1.38,.65,.99);
}
@keyframes test {
  0% {
    filter: blur(20px);
    opacity: 0%;
    top:-60px;
  }
  100% {
    filter: blur(0px);
    opacity: 100%;
    top:0px;
  }
}
#bar-content {
  width: max-content;
  margin: 0px auto;
  height: 60px;
  background-color: #003b55 !important;
  display: flex;
  border-radius: 0px 0px 20px 20px ;
}
.dark-mode {
  #bar-content {
    // background-color: #fff !important;
  }
}
.logo {
  // background: rgb(255, 255, 255);
  float: left;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
  }
}
.search_input {
  margin: 10px auto 0px auto;
  width: 500px;
  transition: 0.3s;
  padding: auto;
  // overflow: hidden;

}
.el-input {
  width: 80px !important;
}
.search_input:focus{
    background-color: #bddce9 !important;
  // width: 800px;
    
    // /deep/.el-input-group__prepend {
    //   display: table-cell;
    // }
    // /deep/.advsearch {
    //   display: block;
    // }
  }
/deep/.el-input-group__prepend {
  // display: none;
  transition: 0.3s;
}
/deep/.advsearch {
  // display: none;
  transition: 0.8s;
}

#switch {
  width: 100px;
  height: 40px;
  margin: 10px 20px 0px 50px;
  border: 1px solid white;
}
.el-avatar {
  margin: 10px 10px 0px 0px;
  &:hover {
    cursor: pointer;
  }
}
@keyframes exit_blur {
  0% {
    filter: blur(0px);
    opacity: 100%;
  }
  100% {
    filter: blur(20px);
    opacity: 0%;
  }
}
</style>