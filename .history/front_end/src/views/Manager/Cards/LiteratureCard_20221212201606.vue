<template>
  <div class="main">
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <span style="text-align:left">
      <h2>问题描述</h2>
      <p>{{ fileInfo.intro }}</p>
    </span>
    <span style="text-align:left">
      <h2>相关图片</h2>
       <div v-for="i in 4" :key="i">
      <img src="../../../assets/mosy.jpg" alt="" width="50%" height="50%">
    </div>
    </span>
    
   
  </div>
</template>

<script>
export default {
  name: "LiteratureCard",
  data() {
    return {
      fileInfo: {
        intro:"笔记涉嫌抄袭",
        pic:["../../../assets/mosy.jpg"]
      },
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
}

.abstract {
  color: #919fb5;
  text-align: left;
}
</style>
