<template>
<el-main>
<div class="intro">
    <span style="float:left">笔记简介</span>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
      v-model="props.introduction"
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
<el-button style="margin-top:10px;float:right" @click="submit()">发布</el-button>
</el-main>

</template>

<script>
export default {
    props:{
        introduction:"",
        paper_id:"",
        
    },
    methods:{
        submit(){
        this.$axios({
            url:"http://127.0.0.1:8000/noteInit/",
            method:"post",
            data:{
                note_id:this.$route.params.note_id
            }
        }).then(res=>{
            this.pdf_src = res.data.note_info[0].note_url
            this.list = res.data.other_note
            this.author = res.data.author_info[0]
            this.note = res.data.note_info[0]
            // this._loadFile(this.pdf_src)
        })
        }
    }
}
</script>

<style lang="scss" scoped>
.intro .el-input{
    margin-top: 20px;
}
.file .el-upload{
    margin-top: 20px;
}
</style>