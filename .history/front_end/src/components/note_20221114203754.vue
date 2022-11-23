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
                    <a href="../NoteInformation">阅读全文</a>
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
.response a:hover{
    cursor:pointer;
    color:antiquewhite;
    text-decoration: none;
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