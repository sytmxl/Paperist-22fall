<template>
<el-main>
    <div class="prvoker">
        <div class="image">
            <img src="../../logo.png" alt="" width="20px" height="20px">
        </div>
        <div class="content">
            <div class="name">
                <span>朱康乐</span>
                <span>王宇奇</span>
            </div>
            <div class="comment">

            </div>
        </div>
    </div>
    <div class="responser">
        
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
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 1250px;
  }
</style>