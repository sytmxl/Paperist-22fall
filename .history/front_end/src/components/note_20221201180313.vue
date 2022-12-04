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
                <div class="response">
                    <a @click="goto_note()">阅读全文</a>
                    <i class="el-icon-thumb">{{list.likes}}</i>
                    <i class="el-icon-star-off"></i>
                    <i class="el-icon-warning-outline" @click="tipoff(list.id)"></i>
                </div>
             </div>
    </el-main>
</template>

<script>
export default {
  props: {
    list:{image:{default:"",type:String}}
  },
  data(){
    return{
        
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
    }
  },
  mounted() {
    
    }
}
</script>

<style lang="scss" scoped>
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
.el-icon-star-off{
    margin-left:30px;
}
.el-icon-star-off:hover{
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
.content{
    text-align: left;
}
</style>