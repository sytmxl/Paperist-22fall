<template>
  <el-header id="topbar">
    <div class="content">
      <img class="logo" src="../assets/logo/cube_logo.svg" @click="gotoFirstPage">
      <search-box/>
      <el-button  type="default" id="switch" name="dark_light" @click="toggleDarkLight" title="Toggle dark/light mode">日/夜</el-button>

      <div class="avatar" @click="gotoPersonalInformation">
        <el-avatar :src="require('../assets/mope.jpeg')"></el-avatar>
      </div>
    </div>
  </el-header>
  <!-- <el-row class="header_show"
      style="height: calc(8vh)">
    <el-col :offset="3" :span="4"  style= "margin-right: calc(1vw); cursor:pointer">
      <img src="../assets/logo_for_dark/bar_name_logo.svg" style="height: calc(4vw)" @click="gotoFirstPage">
    </el-col>
    <el-col :span="10">
      <search-box style="margin-top:calc(1vh);  width: calc(50vw); float: left"/>
    </el-col>
    <el-col :span="5" style="margin-top: calc(0.5vw); margin-right: calc(1vh)">
      <div @click="gotoPersonalInformation">
        <el-avatar :src="require('../assets/mope.jpeg')"
                   style="float: right; margin-top: calc(0.5vh); cursor:pointer"
        ></el-avatar>
      </div>
    </el-col>
  </el-row> -->
</template>

<script>
import SearchBox from "@/components/SearchBox";
export default {
  name: "TopBar",
  components: {SearchBox},
  methods:{
    gotoFirstPage(){
      location.href = "/FirstPage";
    },
    gotoPersonalInformation(){
      location.href = "/PersonalInformation";
    },
    toggleDarkLight() {
      var body = document.getElementById("app");
      var currentClass = body.className;
      body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
    },
  }
}
</script>

<style lang="scss" scoped>
#topbar {
  z-index: 10000;
  width: 100%;
  height:60px;
  position: fixed; 
}
.content {
  width: max-content;
  margin: 0px auto;
  height: 60px;
  background-color: #003b55 !important;
  display: flex;
  border-radius: 0px 0px 20px 20px ;
}
.logo {
  // background: rgb(255, 255, 255);
  float: left;
  transition: 0.3s;
}
.logo:hover {
  cursor: pointer;
  // margin: 200px;
}
.search_input {
  margin: 10px auto 0px 20px;
  width: 300px;
  transition: 0.3s;
  padding: auto;
  // overflow: hidden;
}
/deep/.el-input-group__prepend {
  display: none;
  transition: 0.3s;
}
/deep/.advsearch {
  display: none;
  transition: 0.8s;
}
// .content:hover {
//   .search_input {
//     width: 800px;
//     /deep/.el-input-group__prepend {
//       display: table-cell;
//     }
//     /deep/.advsearch {
//       display: block;
//     }
//   }
// }
.search_input:hover {
    width: 800px;
    /deep/.el-input-group__prepend {
      display: table-cell;
    }
    /deep/.advsearch {
      display: block;
    }
  }
#switch {
  width: 100px;
  height: 40px;
  margin: 10px 20px 0px 0px;
  border: 1px solid white;

}
.el-avatar {
  margin: 10px 10px 0px 0px;
}
.el-avatar:hover {
  cursor: pointer;
}
</style>