<template>
<el-main>
 <div class="prvoker">

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