<template>
  <el-dialog
    v-if="claimScholarDialog"
    :modal="false"
    title="认领学者身份"
    :visible.sync="claimScholarDialog"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    top="10vh"
    center
  >
    <el-form
      :model="AuthorInfo"
      :rules="rules"
      ref="AuthorInfo"
      label-width="110px"
      class="demo-MissText"
      style="margin-top: 30px; padding-bottom: -20px"
      size="medium"
    >
      <el-form-item label="认证学者" prop="author">
        <el-select
          v-model="AuthorInfo.author"
          filterable
          remote
          placeholder="请输入您的真实姓名"
          no-match-text="系统内未找到匹配学者"
          no-data-text="系统内未找到匹配学者"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.value
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="CancelUpMiss()">取 消</el-button>
      <el-button type="primary" @click="ConfirmUploadMissText('AuthorInfo')"
        >认证
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "claimScholarDialog",
  data() {
    return {
      claimScholarDialog: false,
      user_id: "",
      loading: false,
      AuthorInfo: {
        author: "",
      },
      authors: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项4",
          label: "须龙面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      rules: {
        author: [{ required: true, message: "请选择您要认证的学者" }],
      },
    };
  },
  mounted() {
    // this.initScholar();
    this.initId();
  },
  methods: {
    // 获取学者
    // initScholar(){

    // }
    initId() {
      this.$axios({
        url: "/user/getPersonalInformation/",
        method: "post",
        data: { token: sessionStorage.getItem("token"), isToken: 1, id: 1 },
      }).then((res) => {
        this.user_id = res.data.data[0].id;
        // 加回调函数解决异步问题
        this.saveId(this.user_id);
      });
    },
    saveId(user_id) {
      console.log(user_id);
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    CancelUpMiss() {
      this.resetForm("AuthorInfo");
      this.claimScholarDialog = false;
    },
    ConfirmUploadMissText(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   this.$axios({
          //     method: "post",
          //     url: "/app/feedback_missingpaper",
          //     data: {
          //       id: this.user_id,
          //       title: this.MissText.name,
          //       author: this.MissText.author,
          //       keyword: this.MissText.keyword,
          //       date: this.MissText.date,
          //       doi: this.MissText.doi,
          //       abstract: this.MissText.summary,
          //       link: JSON.stringify(this.MissDomains.urls),
          //     },
          //   }).then((res) => {
          //     console.log(this.user_id);
          //     if (res.data.code == 200) {
          //       this.$message({
          //         message: "上传成功",
          //         type: "success",
          //       });
          //       this.CancelUpMiss();
          //     } else {
          //       this.$message({
          //         message: "上传失败",
          //         type: "error",
          //       });
          //     }
          //   });
          alert("submit!");
          this.resetForm("AuthorInfo");
          console.log(this.AuthorInfo);
          this.$nextTick(() => {
            this.claimScholarDialog = false;
          });
          //
        } else {
          console.log("error submit!!");
        }
      });
    },
    initclaimScholar() {
      this.claimScholarDialog = true;
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.authors.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$dark-color: #111;
$light-color: #eee;
$dark-theme: #001c2a;
$theme: #003b55;
.el-dialog {
  border-radius: 20px !important;
  box-shadow: 0 0 7px rgba(204, 204, 204, 0.713);
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px) brightness(100%);
}
button {
  border: 0px;
  border-radius: 10px;
  transition: 0.3s;
  background-color: $theme;
  color: $light-color;
}
button:hover {
  background-color: $light-color;
  color: $dark-theme;
}
.el-button--primary {
  background-color: #647c90;
}
</style>
