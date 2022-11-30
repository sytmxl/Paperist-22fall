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
      <div class="text item">
      发表时间：{{date}}
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
    date:{default:""},
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

.el-card {
  width: auto !important;
  border-radius: 10px !important;
  background: none;
  margin-bottom: 15px !important;
}
.dark-mode {
  .el-card {
    background-color: rgba(255, 255, 255, 0);
    // border: none !important;
    border-color: rgba(215, 215, 215, 0.691);
    color: rgb(245, 245, 245) !important;
    // backdrop-filter: blur(20px) brightness(100%);
  }
}
</style>