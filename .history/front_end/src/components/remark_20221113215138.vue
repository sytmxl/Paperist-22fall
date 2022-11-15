<template>
<el-main>
    <div class="prvoker">
        <div class="image">
            <img src="../../assets/logo.png" alt="" width="20px" height="20px">
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
            <img src="../../logo.png" alt="" width="20px" height="20px">
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

<style scoped>
.provoke{
    margin-top:15px;
}
.response{
    margin-top:10px;
    margin-left:50px;
}
</style>