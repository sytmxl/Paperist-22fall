<template>
  <div class="main">
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <span style="text-align:left">
      <h2>问题描述</h2>
      <p>{{ fileInfo.intro }}</p>
    </span>
    <span style="text-align:left;margin-top:100px">
      <h2>相关图片</h2>
        <el-carousel :interval="4000" type="card" height="200px">
         <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="medium">{{ item }}</h3>
            </el-carousel-item>
         </el-carousel>
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
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
