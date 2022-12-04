<template>
   <el-card>
        <span>论文名称：{{i.name}}</span>
        <span>笔记简介：{{i.intro}}</span>
        <i class="el-icon-thumb">{{i.likes}}</i>
        <i class="el-icon-star-off">{{i.collections}}</i>
        <i class="el-icon-chat-round">{{i.remarks}}</i>
    </el-card>
</template>

<script>
import {$data} from "../../static/pdf/build/pdf.worker";

export default {
 
  props: {
   likes:{},
   collections:{},
   remarks:{}
  },
  data(){
    return{
      isFavourite : false
    }
  },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>

</style>