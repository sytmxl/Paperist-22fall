<template>
   <el-card>
        <span>论文名称：{{note.name}}</span>
        <span>笔记简介：{{note.intro}}</span>
        <i class="el-icon-thumb">{{note.likes}}</i>
        <i class="el-icon-star-off">{{note.collections}}</i>
        <i class="el-icon-chat-round">{{note.remarks}}</i>
    </el-card>
</template>

<script>
import {$data} from "../../static/pdf/build/pdf.worker";

export default {
 
  props: {
    note:{
        name:{},
        intro:{},
        likes:{},
        collections:{},
        remarks:{}
    }
    
  },
  data(){
    return{
     
    }
  },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
// span{
//     display: block;
//     text-align: left;
//     margin-bottom: 15px;
// }
// i{
//     display: block;
//     float: left;
//     margin-bottom: 15px;
//     margin-right: 40px;
// }
</style>