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
                <i class="el-icon-chat-round"></i>
                <i class="el-icon-thumb">{{likes}}</i>
                <i class="el-icon-warning-outline"></i>
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
                <i class="el-icon-chat-round"></i>
                <i class="el-icon-thumb">{{likes}}</i>
                <i class="el-icon-warning-outline"></i>
            </div>
        </div>
    </div>
    </div>

</el-main>
   
</template>

<script>
export default {

  props: {
    list:{type:String}
  },
  methods:{
    init(){
        let i=0;
        while(i<this.list.size()){
            this.list[i].image = require("");
        }
    }
  },
  mounted() {
      this.init();
  
    }
}
</script>

<style scoped>
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
.el-icon-thumb{
    margin-right:30px;
}
.comment{
    font-size:15px;
}
.content{
    text-align: left;
}
</style>