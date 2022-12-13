<template>
  <div class="main">
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <span>
      <h2>问题描述</h2>
      <p>{{ fileInfo.intro }}</p>
    </span>
    <div v-for="i in fileInfo.pic" :key="i">
      <img :src="i" alt="" width="50%">
    </div>
  </div>
</template>

<script>
export default {
  name: "LiteratureCard",
  data() {
    return {
      fileInfo: {
        intro:{},
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
