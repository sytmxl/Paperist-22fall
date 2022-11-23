<template>
    <el-main>
        <div v-for="i in list" :key="i">
             <div class="image">
            <img :src="i.image" alt="">
            </div>
             <div class="content">
                <div class="name">
                    <span>{{i.name}}</span>
                </div>
                <div class="intro">
                    {{i.intro}}
                </div>
                <div class="response">
                    <i class="el-icon-chat-round" @click="CreatCommentVisible =true"></i>
                    <i class="el-icon-thumb">{{likes}}</i>
                    <i class="el-icon-warning-outline"></i>
                </div>
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