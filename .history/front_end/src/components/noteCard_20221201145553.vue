<template>
<div class="other_note">
       <el-card>
        <span @click="goto_paper()">对应论文：{{note.paper_name}}</span>
        <span>笔记简介：{{note.introduction}}</span>
        <i class="el-icon-thumb">{{note.likes}}</i>
        <i class="el-icon-star-off">{{note.collections}}</i>
        <i class="el-icon-chat-round">{{note.remarks}}</i>
        <span>阅读笔记</span>
    </el-card>
</div>

</template>

<script>
import {$data} from "../../static/pdf/build/pdf.worker";

export default {
 
  props: {
    note:{
        note_id:"",
        paper_id:"",
        paper_name:"",
        introduction:"",
        likes:"",
        collections:"",
        remarks:""
    }
    
  },
  data(){
    return{
     
    }
  },
  methods:{
    goto_paper(){
      this.$router.push({
          name:'PaperInformation',
          params:{
           paper_id:this.paper_id
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.other_note{
    margin-top: 15px;
    .el-card {
      background-color: rgba(255, 255, 255, 0.231) !important;
      border-radius: 15px !important;
      border: none !important;
    }
}
.other_note span{
    display: block;
    text-align: left;
    margin-bottom: 15px;
}
.other_note i{
    display: block;
    float: left;
    margin-bottom: 15px;
    margin-right: 40px;
}
</style>