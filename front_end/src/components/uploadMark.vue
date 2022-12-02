<template>
<el-main>
<div class="intro">
    <span style="float:left">笔记简介</span>
    <el-input
    style="margin-top:20px"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
      v-model="introduction"
       maxlength="100"
        show-word-limit>
    </el-input>
</div>
<div style="margin-top:20px" class="file">
    <span>上传笔记</span>
<el-upload
style="margin-top:20px; width: 100%;"
  class="upload-demo"
  drag
  ref="upload"
  action=""
  :file-list="fileList"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em> ，支持pdf,word,markdown格式</div>
</el-upload>
</div>
<el-button style="margin-top:40px;float:right;width: 100%;" @click="submit()">发布</el-button>
</el-main>

</template>

<script>
export default {
    props:{
        paper_id:"",
    },
    data(){
        return{
             introduction:"",
             fileList:""
        }
    },
    methods:{
        submit(){
        var file = this.$refs.upload.files[0];
        var filedata = new FormData();
        filedata.append("file",file);
        console.log(file);
        this.$axios({
            url:"http://127.0.0.1:8000/noteInit/",
            method:"post",
            data:{
                note_id:this.$route.params.note_id,
                pdf:filedata
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

.file {
    text-align: left;
}
</style>