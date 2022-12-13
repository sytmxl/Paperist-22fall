<template>
  <div class="main">
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
      <el-descriptions title="文献详情信息" column="1">
    <el-descriptions-item label="文献名">kooriookami</el-descriptions-item>
    <el-descriptions-item label="作者">18100000000</el-descriptions-item>
    <el-descriptions-item label="关键词">苏州市</el-descriptions-item>
    <el-descriptions-item label="发表年份">1999</el-descriptions-item>
    <el-descriptions-item label="DOI">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    <el-descriptions-item label="摘要">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    <el-descriptions-item label="阅读链接">
      <div v-for="(i,index) in url" :key="index" style="display:block">
         {{i}}
      </div>
    </el-descriptions-item>
</el-descriptions>
  </div>
</template>

<script>
export default {
  name: "RepreCard",
  data() {
    return {
      url:["666","888","+++"]
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
.el-descriptions{
  margin-top: 50px;
  background: none;
}
.main {
  margin-left: 5%;
  margin-right: 5%;
}

.abstract {
  color: #919fb5;
  text-align: left;
}
</style>
