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
        <el-select v-model="AuthorInfo.author" filterable placeholder="请选择您要认领的学者">
          <el-option
            v-for="item in authors"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
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
    this.initScholar()
  },
  methods: {
    // 获取学者
    // initScholar(){

    // }
    initId() {
      this.$axios({
        url: "/user/getPersonalInformation/",
        method: "post",
        data: { token: sessionStorage.getItem("token") },
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
          this.resetForm("MissText");
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
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
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
