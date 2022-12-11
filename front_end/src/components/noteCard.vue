<template>
<div class="other_note">
       <el-card>
        <span style="font-weight:bolder; font-size: large; color: #003B55;" title="点击阅读笔记" @click="goto_note(note.note_id)">{{note.introduction}}</span>
        <span @click="goto_paper(note.paper_id)" title="了解此论文">关联论文：{{note.paper_name}}</span>
        <!-- <span class="inline">获赞：{{note.likes}}</span>
        <span class="inline">评论：{{note.remarks}}</span>
        <span class="inline">收藏：{{note.collections}}</span> -->
        <!-- <i class="el-icon-thumb">{{note.likes}}</i>
        <i class="el-icon-star-off">{{note.collections}}</i>
        <i class="el-icon-chat-round">{{note.remarks}}</i> -->
        <div class="info">
            <div class="thumb">{{note.likes}}</div>
            <i class="el-icon-star-off"   title="收藏">&nbsp;{{note.collections}}</i>
            <i class="el-icon-chat-round">&nbsp;{{note.remarks}}</i>
        </div>
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
    goto_paper(paper_id){
      // this.$router.push({
      //     name:'PaperInformation',
      //     params:{
      //      paper_id:paper_id
      //     }
      //   })

        let routeData = this.$router.resolve({
        name: 'PaperInformation',
        params: { paper_id:paper_id }
      })
      window.open(routeData.href, '_blank')
    },
    goto_note(note_id){
      // this.$router.push({
      //     name:'NoteInformation',
      //     params:{
      //      note_id:note_id
      //     }
      //   })
      //   window.location.reload()

        let routeData = this.$router.resolve({
        name: 'NoteInformation',
        params: { note_id:note_id }
      })
      window.open(routeData.href, '_blank')
    },
  }
}
</script>

<style lang="scss" scoped>
// @import './icon.scss';
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
.info {
  float: right;
}
@mixin thumb-base {
  height: 22px;
  width: 30px;
  position: relative;
  padding-left: 20px;
  margin: auto 0 auto 0px;
  align-self: center;
  display: inline-block;
  background-repeat: no-repeat;
  // transition: 0.3s;
  transition: 0.8s cubic-bezier(.23,1.38,.65,.99) 0s;
 
}
    
.thumb {
  @include thumb-base;
  background-image: url('../assets/icon/like.svg');
}
.thumb-filled {
  @include thumb-base;
  background-image: url('../assets/icon/like-filled.svg');
}
.info{
  margin-bottom: 10px;
  i {
    border-radius: 10px;
    transition: 0.2s;
    margin: 3px 20px 3px 0px;
    height: 100%;
    // margin-left: 30px;
  }
  .thumb {
    text-align: left;
  }
}
</style>