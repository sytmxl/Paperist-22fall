<template>
    <el-main>

      <div class="image">
        <img :src="list.image" alt="">
      </div>
      <div class="content">
        <div class="name">
            <span>{{list.name}}</span>
        </div>
        <div class="intro">
            {{list.introduction}}
        </div>
        <div class="time">
                发表于{{list.time}}
            </div>
        <div class="response">
            <a @click="goto_note()">阅读全文</a>
            <div class="thumb-filled" @click="likeit(list.note_id)" v-if="like_flag" title="取消" :key="list.likes">{{list.likes}}</div>
            <div class="thumb" @click="likeit(list.note_id)" v-else title="点赞" :key="list.likes">{{list.likes}}</div>
            <i class="el-icon-star-off" v-if="!collect_flag" @click="collect(list.note_id)" title="收藏"></i>
            <i class="el-icon-star-on" v-else @click="collect(list.note_id)" title="取消收藏"></i>
            <i class="el-icon-warning-outline" @click="tipoff(list.note_id)"></i>
        </div>
      </div>
    </el-main>
    
</template>

<script>
let isclick = true
export default {
  props: {
    list:[]
  },
  data(){
    return{
        like_flag:this.list.like_flag,
        collect_flag:this.list.collect_flag,
    }
  },
  methods:{
   goto_note(){
     this.$router.push({
          name:'NoteInformation',
          params:{
           note_id:this.list.note_id
          }
        })
   },
   tipoff(id){
         this.$axios({
            url:"http://127.0.0.1:8000/tipOff/",
            method:"post",
            data:{
                comment_id:"",
                note_id:id,
            }
        }).then(res=>{
          this.$message.success("您的举报已发送，敬请等待后台处理");
        })
    },
     likeit(id){
      if(isclick){
        isclick = false
        this.like_flag=!this.like_flag
        if(this.list.like_flag){
          this.$axios({
            url:"http://127.0.0.1:8000/likeIt/",
            method:"post",
            data:{
                comment_id:"",
                note_id:id,
                op:0
            }
          }).then(res=>{
            this.list.likes = this.list.likes-1;
            let data={flag:"1"}
              this.$emit('reaction_note',data)
          })
        }
        else{
          
          this.$axios({
            url:"http://127.0.0.1:8000/likeIt/",
            method:"post",
            data:{
                comment_id:"",
                note_id:id,
                op:1
            }
          }).then(res=>{
            this.list.likes = this.list.likes+1;
            let data={flag:"1"}
            this.$emit('reaction_note',data)
          })
        }
        setTimeout(()=>{isclick=true},500)
      }
      else{
        this.$message.warning("请勿频繁操作")
      }
    },
    collect(id){
      if(isclick){
        isclick = false
        this.collect_flag= !this.collect_flag
        if(this.collect_flag){
            this.$message.success("已收藏")
        }
        else{
          this.$message.success("已取消收藏")
        }
        if(this.list.collect_flag){
          this.$axios({
            url:"http://127.0.0.1:8000/paperCollection/",
            method:"post",
            data:{
                paper_id:"",
                note_id:id,
                op:0
            }
          }).then(res=>{
              
              let data={flag:"1"}
              this.$emit('reaction_note',data)
          })
        }
        else{
          this.$axios({
            url:"http://127.0.0.1:8000/paperCollection/",
            method:"post",
            data:{
                paper_id:"",
                note_id:id,
                op:1
            }
          }).then(res=>{
            
            let data={flag:"1"}
            this.$emit('reaction_note',data)
          })
        }
        setTimeout(()=>{isclick=true},1500)
      }
      else{
        this.$message.warning("请勿频繁操作")
      }
      },
        process_time(){
        let msg = JSON.stringify(this.list.time)
        let currentTimeInMilliseconds = Date.now();
        let currentDate = new Date(currentTimeInMilliseconds);
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth()+1;
        let currentDay = currentDate.getDate();
        let currentHours = currentDate.getHours();
        let currentMinutes = currentDate.getMinutes();
        let time = msg.split(/-|:|\"|T/gi)
        if(parseInt(time[1])==currentYear){
            if(parseInt(time[2])==currentMonth){
                if(parseInt(time[3])==currentDay){
                    if(parseInt(time[4])==currentHours){
                        if(parseInt(time[5])==currentMinutes){
                            this.list.time = "刚刚"
                        }
                        else{
                            this.list.time = parseInt(currentMinutes)-parseInt(time[5])+"分钟前"
                        }
                    }
                    else{
                        this.list.time = parseInt(currentHours)-parseInt(time[4])+"小时前"
                    }
                }
                else{
                    this.list.time = this.list.time.split("T")[0]+" "+currentHours+":"+currentMinutes
                }
            }
            else{
                    this.list.time = this.list.time.split("T")[0]+" "+currentHours+":"+currentMinutes
            }
        }
        else{
                this.list.time = this.list.time.split("T")[0]+" "+currentHours+":"+currentMinutes
        }
     }
  },
  mounted() {
    this.process_time()
    }
}
</script>

<style lang="scss" scoped>
@import './icon.scss';
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
.response{
  // display: flex;
    float: right;
    
}
.response a{
    text-decoration: none;
}
.response a:visited{
    color: #000;
}
.el-main .response a:hover{
    cursor:pointer;
    color:antiquewhite;
}

.name{
    font-weight: bolder;
    font-size:10px;
}

.el-icon-thumb{
    margin-left:30px;
}
.el-icon-thumb:hover{
    cursor:pointer
}
.el-icon-star-off, .el-icon-star-on{
    margin-left:30px;
}
.el-icon-star-off:hover,.el-icon-star-on:hover{
  cursor:pointer
}
.el-icon-warning-outline{
    margin-left:30px;
}
.el-icon-warning-outline:hover{
    cursor:pointer
}
.intro{
    font-size:15px;
}
.time{
    margin-top: 3px;
    font-size:10px;
}
.content{
    text-align: left;
}
a {
  padding: 3px;
  border-radius: 5px;
}
a:hover {
  background-color: #003b558e !important;
  color: white;
}
</style>