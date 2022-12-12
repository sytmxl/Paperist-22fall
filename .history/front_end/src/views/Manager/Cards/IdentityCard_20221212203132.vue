<template>
  <div class="main">
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <div style="margin-top:100px">
    <span style="text-align:left;">
      <h2>图片材料</h2>
    </span>
     <el-carousel :interval="4000" type="card" height="400px">
         <el-carousel-item v-for="item in pic" :key="item">
              <!-- <h3 class="medium">{{ item }}</h3> -->
              <img :src="item" alt="">
            </el-carousel-item>
         </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "IdentityCard",
  data() {
    return {
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
