<template>
<el-main>
    <div v-for="i in list" :key="i">
    <div class="prvoker" v-if="i.flag==0">
        <div class="image">
            <img :src="i.image" alt="">
        </div>
        <div class="content">
            <div class="name">
                <span>{{i.name}}</span>
            </div>
            <div class="comment">
                {{i.comment}}
            </div>
            <div class="response">
                <i class="el-icon-chat-round" @click="ready(i)"></i>
                <i class="el-icon-thumb" @click="likeit(i.id,i.like_flag)" v-if="i.like_flag" title="取消">{{i.likes}}</i>
                <i class="el-icon-thumb" @click="likeit(i.id,i.like_flag)" v-else title="赞">{{i.likes}}</i>
                <i class="el-icon-warning-outline" @click="tipoff(i.id)"></i>
            </div>
        </div>
    </div>
    <div class="responser" v-if="i.flag==1">
        <div class="image">
            <img :src="i.image" alt="">
        </div>
        <div class="content">
            <div class="name">
                <span>{{i.name}}</span>
                <span>&nbsp;<i class="el-icon-caret-right"></i>&nbsp;</span>
                <span>{{i.res_name}}</span>
            </div>
            <div class="comment">
                {{i.comment}}
            </div>
              <div class="response">
                <i class="el-icon-chat-round" @click="ready(i)"></i>
                <i class="el-icon-thumb" @click="likeit(i.id,i.like_flag,i)" v-if="i.like_flag" title="取消">{{i.likes}}</i>
                <i class="el-icon-thumb" @click="likeit(i.id,i.like_flag,i)" v-else title="赞">{{i.likes}}</i>
                <i class="el-icon-warning-outline" @click="tipoff(i.id)"></i>
            </div>
        </div>
    </div>
 
    </div>
    <el-dialog
        title="留下你的评论吧~"
        :visible.sync="CreatCommentVisible"
        width="30%"
        :before-close="handleClose">
        <CreateComment :receiver_id="receiver_id" :note_id="note_id" :paper_id="paper_id" :remark_id="remark_id"/>
      </el-dialog>
</el-main>

  


</template>

<script>
import CreateComment from "../components/CreateComment.vue"
export default {
    components:{
        CreateComment
    },
  props: {
    list:[],
    note_id:"",
    paper_id:"",
  },
  data(){
    return{
        CreatCommentVisible:false,
        receiver_id:-1,
        remark_id:-1
    }
  },
  methods:{
    likeit(id,like_flag,item){
        if(like_flag){
          this.$axios({
            url:"http://127.0.0.1:8000/likeIt/",
            method:"post",
            data:{
                comment_id:id,
                note_id:"",
                op:0
            }
          }).then(res=>{
              i.likes = i.likes-1;
          })
        }
        else{
          this.$axios({
            url:"http://127.0.0.1:8000/likeIt/",
            method:"post",
            data:{
                comment_id:id,
                note_id:"",
                op:1
            }
          }).then(res=>{
            i.likes = i.likes+1;
          })
        }
    },
    tipoff(id){
         this.$axios({
            url:"http://127.0.0.1:8000/tipOff/",
            method:"post",
            data:{
                comment_id:id,
                note_id:"",
            }
        }).then(res=>{
          this.$message.success("您的举报已发送，敬请等待后台处理");
        })
    },
    ready(item){
        this.CreatCommentVisible =true ,
        this.receiver_id=item.sender_id,
        this.remark_id=item.id
    }
  },
  mounted() {
    }
}

</script>

<style lang="scss" scoped>
.prvoker{
    margin-top:15px;
    /* height: 100px; */
    margin-bottom: 20px;
}
.responser{
    margin-top:20px;
    margin-left:50px;
    /* height: 100px; */
}
.image{
    float: left;
    width: 40px;
    height: 40px;
    margin-right: 10px;
}
.image img{
    width:100%;
    height: 100%;
    border-radius: 50%;
}
.name{
    font-weight: bolder;
    font-size:10px;
}
.response{
    float: right;
}
.el-icon-chat-round{
    margin-right:30px;
}
.el-icon-chat-round:hover{
    cursor:pointer
}
.el-icon-thumb{
    margin-right:30px;
}
.el-icon-thumb:hover{
    cursor:pointer
}
.el-icon-warning-outline:hover{
    cursor:pointer
}
.comment{
    font-size:15px;
}
.content{
    text-align: left;
}
</style>