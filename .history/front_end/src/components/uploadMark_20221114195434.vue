<template>
<el-main>
<div class="intro">
    <span style="float:left">笔记简介</span>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
      v-model="textarea"
       maxlength="100"
        show-word-limit>
    </el-input>
</div>
<div class="file">
    <span style="float:left">上传笔记</span>
<el-upload
  class="upload-demo"
  drag
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em> ，支持pdf,word,markdown格式</div>
</el-upload>
</div>

</el-main>

</template>

<script>
export default {
    data(){
        return{
            textarea:""
        }
    }
}
</script>

<style scoped>
.intro .el-input{
    margin-top: 20px;
}
</style>