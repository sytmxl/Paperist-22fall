<template>
  <div class="main">
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <div style="margin-top:50px">
    <span style="text-align:left;">
      <h2>个人认证简介</h2>
      {{intro}}
      <h2>个人材料</h2>
       
    </span>
    <div style="height:500px">
      <iframe style="width: 100%; height: 100%" :src="'/static/pdf/web/viewer.html?file='+pro()" title="myFrame"></iframe>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IdentityCard",
  data() {
    return {
      intro:this.$route.params.intro,
      src:this.$route.params.src,
      url:"",
      // src:encodeURIComponent('http://124.70.8.57/pdf/'+str.split('/')[str.split('/').length-1]),
      };
  },

  methods:{
    pro(){
      let str = this.src.split('/')
      // let url = encodeURIComponent('http://124.70.8.57/pdf/'+str[str.length-1])
      let url = encodeURIComponent('http://paperist.mosymosy.cn/pdf/'+str[str.length-1])
      return url;
    },
    goBack() {
        window.history.go(-1)
    }
  },
  mounted(){
    console.log(this.intro)
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
