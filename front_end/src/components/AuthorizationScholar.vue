<template>
  <el-main>
    <div class="intro">
      <span style="float: left">个人认证简介</span>
      <el-input
        style="margin-top: 20px"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入内容"
        v-model="introduction"
        maxlength="100"
        show-word-limit
      >
      </el-input>
    </div>
    <div style="margin-top: 20px" class="file">
      <span>上传认证内容</span>
      <el-upload
        style="margin-top: 20px; width: 100%"
        class="upload-demo"
        drag
        ref="upload"
        action=""
        :on-change="loadJsonFromFile"
        :http-request="submitAvatarHttp"
        :file-list="fileList"
        accept=".pdf,.PDF"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em> ，文件请转为pdf格式提交
        </div>
      </el-upload>
    </div>
    <el-button
      style="margin-top: 40px; float: right; width: 100%"
      @click="submit()"
      >提交认证申请</el-button
    >
  </el-main>
</template>

<script>
let formdata = new FormData();
export default {
  props: {
    es_id: "",
  },
  data() {
    return {
      introduction: "",
    };
  },
  methods: {
    submitAvatarHttp(val) {
      formdata.append("pdf", val.file);
    },
    loadJsonFromFile(file, fileList) {
      this.uploadFiles = fileList;
    },
    submit() {
      this.$axios({
        url: "/user/claimAuthor/",
        headers: { "Content-Type": "multipart/form-data" },
        method: "post",
        data: {
          es_id: this.es_id,
          text: this.introduction,
          file: formdata.get("pdf"),
        },
      }).then((res) => {
        this.$message.success("上传成功，正在审核");
        // 延时2s显示审核通过
        setTimeout(() => {
          this.$message.success("恭喜您审核通过，认证成功！");
        }, 2000);
        let msg = "success";
        this.$emit("finish_upload", msg);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.file {
  text-align: left;
}
</style>
