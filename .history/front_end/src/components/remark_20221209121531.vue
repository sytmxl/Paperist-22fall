<template>
<el-main>
    <div class="prvoker" v-if="list.flag==0">
        <div class="image">
            <img :src="list.image" alt="">
        </div>
        <div class="content">
            <div class="name">
                <span>{{list.name}}</span>
            </div>
            <div class="comment">
                {{list.comment}}
            </div>
            <div class="time">
                发表于{{list.time}}
            </div>
            <div class="response" id="response">
                <i class="el-icon-chat-round" @click="ready(list)"></i>
                <i class="el-icon-thumb" @click="likeit(list.id,list.like_flag)" v-if="list.like_flag" title="取消">{{list.likes}}</i>
                <i class="el-icon-thumb" @click="likeit(list.id,list.like_flag)" v-else title="赞">{{list.likes}}</i>
                <i class="el-icon-warning-outline" @click="tipoff(list.id)"></i>
            </div>
        </div>
    </div>
    <div class="prvoker" v-if="list.flag==1">
        <div class="image">
            <img :src="list.image" alt="">
        </div>
        <div class="content">
            <div class="name">
                <span>{{list.name}}</span>
                <span>&nbsp;<i class="el-icon-caret-right"></i>&nbsp;</span>
                <span>{{list.res_name}}</span>
            </div>
            <div class="comment">
                {{list.comment}}
            </div>
            <div class="time">
                发表于{{list.time}}
            </div>
              <div class="response" id="response">
                <i class="el-icon-chat-round" @click="ready(list)"></i>
                <i class="el-icon-thumb" @click="likeit(list.id,list.like_flag)" v-if="like_flag" title="取消" :key="list.likes">{{list.likes}}</i>
                <i class="el-icon-thumb" @click="likeit(list.id,list.like_flag)" v-else title="赞" :key="list.likes">{{list.likes}}</i>
                <i class="el-icon-warning-outline" @click="tipoff(list.id)"></i>
            </div>
        </div>
    </div>
 
    <el-dialog
        title="留下你的评论吧~"
        :visible.sync="CommentVisible"
        width="30%"
        :before-close="handleClose">
        <CreateComment :receiver_id="receiver_id" :note_id="note_id" :paper_id="paper_id" :remark_id="remark_id" @finish_remark="close_comment"/>
    </el-dialog>
</el-main>

  


</template>

<script>
let isclick = true
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
        CommentVisible:false,
        receiver_id:-1,
        remark_id:-1,
        like_flag:this.list.like_flag,
    }
  },
  methods:{
    likeit(id,like){
        if(isclick){
            isclick=false
            this.like_flag = !this.like_flag;
        if(like){

          this.$axios({
            url:"http://127.0.0.1:8000/likeIt/",
            method:"post",
            data:{
                comment_id:id,
                note_id:"",
                op:0
            }
          }).then(res=>{
            //   $("#response").load(location.href + "#response");
            //   document.getElementById("#response").load(location.href + "#response");
            this.list.likes = this.list.likes-1;
            let data = {
            op:"like"
            }
        this.$emit('throw_remark',data)
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
            // $("#response").load(location.href + "#response");
            // document.getElementById("#response").load(location.href + "#response");
            this.list.likes = this.list.likes+1;
            let data = {
            op:"like"
            }
            this.$emit('throw_remark',data)
            })
        }
        setTimeout(()=>{isclick=true},1500)
        }
        else{
            this.$message.warning("请勿频繁操作")
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
        let data = {
            op:"remark",
            sender_id: item.sender_id,
            remark_id: item.id
        }
        this.$emit('throw_remark',data)
        // this.CommentVisible =true ,
        // this.receiver_id=item.sender_id,
        // this.remark_id=item.id
    },
    close_comment(data){
           this.CreatCommentVisible = false;
  
     },
     process_time(){
        let currentTimeInMilliseconds = Date.now();
        let currentDate = new Date(currentTimeInMilliseconds);
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        let currentDay = currentDate.getDate();
        let currentHours = currentDate.getHours();
        let currentMinutes = currentDate.getMinutes();
        let time = this.list.time.split("-")
        if(time[0]==currentYear){
            if(time[1]==currentMonth){
                if(time[2]==currentDay){
                    if(time[3]==currentHours){
                        if(time[4]==currentMinutes){
                            this.list.time = "刚刚"
                        }
                        else{
                            this.list.time = parseInt(currentMinutes)-parseInt(time[4])+"分钟前"
                        }
                    }
                    else{
                        this.list.time = parseInt(currentHours)-parseInt(time[3])+"小时前"
                    }
                }
                else{
                    this.list.time = this.list.time.split("T")
                }
            }
            else{
                    this.list.time = this.list.time.split("T")
            }
        }
        else{
                this.list.time = this.list.time.split("T")
        }
     }
  },
  mounted() {
        process_time()
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
.time{
    margin-top: 3px;
    font-size:10px;
}
.content{
    text-align: left;
}
</style>