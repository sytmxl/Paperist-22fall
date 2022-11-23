<template>
  <el-row  style="min-height: calc(8vh); background: #B3C0D1">
    <el-col :span="4"  style="margin-right: calc(1vw); cursor:pointer">
      <img src="../assets/logo/bar_name_logo.svg" style="height: calc(4vw)" @click="gotoFirstPage">
    </el-col>
    <el-col :span="14">
      <search-box style="margin-top:calc(1.5vh);max-width: calc(40vw)"/>
    </el-col>
    <el-col :span="5" style="margin-top: calc(0.5vw); margin-right: calc(1vh)">
      <div @click="gotoPersonalInformation">
        <el-avatar :src="require('../assets/mope.jpeg')"
                   style="float: right; margin-right: calc(1vw); margin-top: calc(0.5vh); cursor:pointer"
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