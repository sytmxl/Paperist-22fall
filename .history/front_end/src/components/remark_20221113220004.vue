<template>
<el-main>
    <div class="prvoker">
        <div class="image">
            <img src="../assets/cat.jpg" alt="">
        </div>
        <div class="content">
            <div class="name">
                <span>朱康乐</span>
            </div>
            <div class="comment">
                马哥太尴尬了
            </div>
        </div>
    </div>
    <div class="responser">
        <div class="image">
            <img src="../assets/cat.jpg" alt="">
        </div>
        <div class="content">
            <div class="name">
                <span>王宇奇</span>
            </div>
            <div class="comment">
                马哥确实尴尬...
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

<style lang="scss" scoped>
.provoke{
    margin-top:15px;
    height: 100px;
    margin-bottom: 20px;
}
.response{
    margin-top:20px;
    margin-left:30px;
    height: 100px;
}
.image{
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 15px;
}
.image img{
    width:100%;
    height: 100%;
    border-radius: 50%;
}
.content{
    text-align: left;
}
</style>