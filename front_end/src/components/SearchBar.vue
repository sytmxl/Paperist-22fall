<template>
  <el-row class="header_show"
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
  </el-row>
</template>

<script>
import SearchBox from "@/components/SearchBox";
export default {
  name: "SearchBar",
  components: {SearchBox},
  methods:{
    gotoFirstPage(){
      location.href = "/FirstPage";
    },
    gotoPersonalInformation(){
      location.href = "/PersonalInformation";
    }
  }
}
</script>

<style scoped>

</style>