<template>
  <div class="main">
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <div style="margin-top:50px">
    <span style="text-align:left;">
      <h2>个人认证简介</h2>
      {{intro}}
      <h2>个人材料</h2>
       <iframe style="width: 100%; height: 100%" :src="'/pdfjs-2.14.305-legacy-dist/web/viewer.html?file='+pdf_src" title="myFrame"></iframe>
    </span>
   
    </div>
  </div>
</template>

<script>
export default {
  name: "IdentityCard",
  data() {
    return {
      intro:"我叫马泽远，我要当你们这的院士，不要不识抬举",
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
