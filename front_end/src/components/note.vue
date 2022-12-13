<template>
    <el-main>

      <div class="image" @click="goto_person()">
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
        token:sessionStorage.getItem("token")
    }
  },
  methods:{
    goto_person(){
        // this.$router.push({
        //   name:'PersonalInformation',
        //   params:{
        //   id:this.list.id
        //   }
        // })
        let routeData = this.$router.resolve({
        name: 'PersonalInformation',
        params: { id: this.list.id }
      })
      window.open(routeData.href, '_blank')
    },
   goto_note(){
    //  this.$router.push({
    //       name:'NoteInformation',
    //       params:{
    //        note_id:this.list.note_id
    //       }
    //     })

        let routeData = this.$router.resolve({
        name: 'NoteInformation',
        params: { note_id:this.list.note_id }
      })
      window.open(routeData.href, '_blank')
   },
   tipoff(id){
    if(this.token){
       this.$axios({
            url:"paper/tipOff/",
            method:"post",
            data:{
                comment_id:"",
                note_id:id,
            }
        }).then(res=>{
          this.$message.success("您的举报已发送，敬请等待后台处理");
        })
    }else{
        this.$message.warning("请先登录")
        setTimeout(()=>{this.$router.push({
        name: 'login',
      })},1000)
      //   setTimeout(()=>{let routeData = this.$router.resolve({
      //   name: 'login',
      // })
      // window.open(routeData.href, '_blank')},1000)
      }
        
    },
     likeit(id){
      if(this.token){
         if(isclick){
        isclick = false
         if(this.like_flag){
                 this.list.likes = this.list.likes-1;
                 this.like_flag = !this.like_flag;
            }
            else{
                 this.list.likes = this.list.likes+1;
                 this.like_flag = !this.like_flag;
            }
        if(!this.like_flag){
          this.$axios({
            url:"paper/likeIt/",
            method:"post",
            data:{
                comment_id:"",
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
            url:"paper/likeIt/",
            method:"post",
            data:{
                comment_id:"",
                note_id:id,
                op:1
            }
          }).then(res=>{
            let data={flag:"1"}
            this.$emit('reaction_note',data)
          })
        }
        setTimeout(()=>{isclick=true},500)
      }
      else{
        this.$message.warning("请勿频繁操作")
      }
      }
      else{
        this.$message.warning("请先登录")
        setTimeout(()=>{this.$router.push({
        name: 'login',
      })},1000)
      //   setTimeout(()=>{let routeData = this.$router.resolve({
      //   name: 'login',
      // })
      // window.open(routeData.href, '_blank')},1000)
      }
    },
    collect(id){
      if(this.token){
        if(isclick){
        isclick = false
        this.collect_flag= !this.collect_flag
        if(!this.collect_flag){
          this.$axios({
            url:"paper/paperCollection/",
            method:"post",
            data:{
                paper_id:"",
                note_id:id,
                op:0
            }
          }).then(res=>{
               this.$message.success("已取消收藏")
              let data={flag:"1"}
              this.$emit('reaction_note',data)
          })
        }
        else{
          this.$axios({
            url:"paper/paperCollection/",
            method:"post",
            data:{
                paper_id:"",
                note_id:id,
                op:1
            }
          }).then(res=>{
            this.$message.success("已收藏")
            let data={flag:"1"}
            this.$emit('reaction_note',data)
          })
        }
        setTimeout(()=>{isclick=true},500)
      }
      else{
        this.$message.warning("请勿频繁操作")
      }
      }
      else{
        this.$message.warning("请先登录")
        setTimeout(()=>{this.$router.push({
        name: 'login',
      })},1000)
      //   setTimeout(()=>{let routeData = this.$router.resolve({
      //   name: 'login',
      // })
      // window.open(routeData.href, '_blank')},1000)
        
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
@import './link.scss';
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
    color:rgb(255, 255, 254);
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
    margin-left:10px;
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
  transition: 0.3s;
}
a:hover {
  background-color: rgb(219, 219, 219) !important;
  color: rgb(0, 0, 0) !important;
}
.thumb, .thumb-filled {
  margin-left: 20px;
}
</style>