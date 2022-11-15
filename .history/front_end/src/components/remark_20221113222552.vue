<template>
<el-main>
    <div class="prvoker">
        <div class="image">
            <img src="../assets/cat.jpg" alt="">
        </div>
        <div class="content">
            <div class="name">
                <span>胡博轩</span>
            </div>
            <div class="comment">
                马哥太尴尬了哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
            <div class="response">
                <i class="el-icon-chat-round"></i>
                <i></i>
            </div>
        </div>
    </div>
    <div class="responser">
        <div class="image">
            <img src="../assets/mosy.jpg" alt="">
        </div>
        <div class="content">
            <div class="name">
                <span>李阳</span>
                <span>&nbsp;<i class="el-icon-caret-right"></i>&nbsp;</span>
                <span>胡博轩</span>
            </div>
            <div class="comment">
                马哥确实尴尬...但是写的真好！
            </div>
        </div>
    </div>
</el-main>
   
</template>

<script>
export default {
  props: {
    name:{default: ""},
    author: {default: ""},
    intro:{default: ""},
    origin: {default: ""},
    cite:{default: ""},
  },
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
.comment{
    font-size:15px;
}
.content{
    text-align: left;
}
</style>