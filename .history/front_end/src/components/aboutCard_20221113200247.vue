<template>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <div class="text item">
    标题
  </div>
    <div class="text item">
    作者
  </div>
    <div class="text item">
    摘要
  </div>
    <div class="text item">
    引用量
  </div>
</el-card>
</template>

<script>
export default {
    
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
    width: 100%;
  }
</style>