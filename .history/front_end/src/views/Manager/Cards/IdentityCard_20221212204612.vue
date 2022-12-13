<template>
  <div class="main">
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <div style="margin-top:50px">
    <span style="text-align:left;">
      <h2>个人认证简介</h2>
    </span>
   
    </div>
  </div>
</template>

<script>
export default {
  name: "IdentityCard",
  data() {
    return {
      intro:"",
      pic:[require("../../../assets/mosy.jpg"),require("../../../assets/mosy.jpg"),require("../../../assets/mosy.jpg")]
    };
  },
  methods:{
    goBack() {
        window.history.go(-1)
    }
  }
};
</script>

<style>
.main {
  margin-left: 5%;
  margin-right: 5%;
  text-align: left;
}

.abstract {
  color: #919fb5;
  text-align: left;
}
</style>
