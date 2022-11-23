<template>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>{{name}}</span>
    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
  </div>
    
    <div class="text item">
    {{intro}}
  </div>
  <div class="text item">
    作者：{{author}}
  </div>
   <div class="text item">
    来源：{{origin}}
  </div>
    <div class="text item">
    引用量：{{cite}}
  </div>
</el-card>
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