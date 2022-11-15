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
                    {{list.intro}}
                </div>
                <div class="response">
                    
                    <span>阅读全文</span>
                    <i class="el-icon-thumb">{{list.likes}}</i>
                    <i class="el-icon-star-off"></i>
                    <i class="el-icon-warning-outline"></i>
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
   
  },
  mounted() {
    
    }
}
</script>

<style scoped>
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
.response span{
    margin-right:30px;
}
.response span:hover{
    cursor:pointer;
    color:antiquewhite
}
.name{
    font-weight: bolder;
    font-size:10px;
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
.el-icon-star-off{
    margin-right:30px;
}
.el-icon-star-off:hover{
     cursor:pointer
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