<template>
<div class="other_note">
       <el-card>
        <span @click="goto_paper()" title="了解此论文">对应论文：{{note.paper_name}}</span>
        <span title="点击阅读笔记">笔记信息：{{note.introduction}}</span>
        <i class="el-icon-thumb">{{note.likes}}</i>
        <i class="el-icon-star-off">{{note.collections}}</i>
        <i class="el-icon-chat-round">{{note.remarks}}</i>
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
    cursor:pointer; 
}
.other_note i{
    display: block;
    float: left;
    margin-bottom: 15px;
    margin-right: 40px;
}
</style>