<template>
  <el-dialog
    v-if="MissTextDialogVisible"
    :modal="false"
    title="反馈文献缺失"
    :visible.sync="MissTextDialogVisible"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    top="10vh"
    center
  >
    <el-steps :active="Miss_Active" align-center finish-status="success">
      <el-step title="缺失文献基本信息"> </el-step>
      <el-step title="输入缺失文献链接"> </el-step>
    </el-steps>
    <el-form
      v-show="Miss_Active === 0"
      :model="MissText"
      :rules="rules"
      ref="MissText"
      label-width="110px"
      class="demo-MissText"
      style="margin-top: 30px; padding-bottom: -20px"
      size="mini"
    >
      <el-form-item label="文献名称" prop="name">
        <el-input v-model="MissText.name"></el-input>
      </el-form-item>
      <el-form-item label="文献作者" prop="author">
        <el-input v-model="MissText.author">
          <el-dropdown slot="suffix" size="mini" placement="top-start">
            <i class="el-icon-warning-outline el-input__icon"> </i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled
                >文章作者按顺序用顿号隔开</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown></el-input
        >
      </el-form-item>
      <el-form-item label="文献关键词" prop="keyword">
        <el-input
          v-model="MissText.keyword"
          placeholder="多个关键之间用逗号隔开"
        ></el-input>
      </el-form-item>
      <el-form-item label="文献发表日期" prop="date">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="MissText.date"
          style="width: 100%"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="文献DOI" prop="doi">
        <el-input v-model="MissText.doi"></el-input>
      </el-form-item>
      <el-form-item label="文献摘要" prop="summary">
        <el-input type="textarea" v-model="MissText.summary"></el-input>
      </el-form-item>
    </el-form>
    <el-form
      v-show="Miss_Active === 1"
      :model="MissDomains"
      ref="MissDomains"
      label-width="110px"
      class="demo-MissText"
      style="margin-top: 30px; padding-bottom: -20px"
      size="mini"
      :inline="true"
    >
      <el-form-item
        v-for="(url, index) in MissDomains.urls"
        label-width="150px"
        :label="'文献阅读链接' + index"
        :key="url.value"
        :prop="'urls.' + index + '.value'"
        :rules="[
          { required: true, message: '域名不能为空', trigger: 'blur' },
          {
            type: 'url',
            message: '请输入正确的域名',
            trigger: ['blur', 'change'],
          },
        ]"
        size="mini"
        ><el-col :span="21">
          <el-input
            v-model="url.value"
            style="width: 100%"
            placeholder="必须以http://或https://开头"
          ></el-input
          ><el-button
            v-show="index == MissDomains.urls.length - 1"
            type="primary"
            @click="addMissDomain()"
            >新增域名</el-button
          ><el-button
            v-show="index != 0"
            type="primary"
            @click.prevent="removeMissDomain(url)"
            >删除</el-button
          >
        </el-col>
      </el-form-item>
    </el-form>
    <span v-if="Miss_Active <= 0" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="CancelUpMiss()">取 消</el-button>
      <el-button type="default" @click="initId(), submitForm1_Miss('MissText')"
        >下一步</el-button
      >
    </span>
    <span v-else slot="footer" class="dialog-footer">
      <el-button type="primary" @click="CancelUpMiss()">取 消</el-button>
      <el-button type="default" @click="Miss_Active = 0">上一步</el-button>
      <el-button type="primary" @click="ConfirmUploadMissText('MissDomains')"
        >上 传
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "MissTextComplain",
  data() {
    // var validatePass = (rule, value, callback) => {
    //   let strRegex =
    //     /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
    //   let re = new RegExp(strRegex);
    //   if (value === "") {
    //     callback(new Error("请输入域名"));
    //   } else if (!re.test(value)) {
    //     callback(new Error("请检查您的输入"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      MissTextDialogVisible: false,
      Miss_Active: 0,
      user_id: "",
      MissText: {
        name: "",
        author: "",
        keyword: "",
        date: "",
        doi: "",
        summary: "",
        href: "",
      },
      MissDomains: {
        urls: [
          {
            value: "",
          },
        ],
      },
      rules: {
        name: [
          { required: true, message: "请输入文献名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
        author: [
          { required: true, message: "请输入作者名称", trigger: "blur" },
        ],
        keyword: [{ required: true, message: "请输入关键词", trigger: "blur" }],
        doi: [{ required: true, message: "请输入DOI", trigger: "blur" }],
        summary: [{ required: true, message: "请输入摘要", trigger: "blur" }],
        // urls: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
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
    submitForm1_Miss(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.next_Miss();
          // alert('submit!');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    next_Miss() {
      if (this.Miss_Active++ > 1) this.Miss_Active = 0;
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    uploadTextMiss() {
      this.MissTextDialogVisible = true;
    },
    CancelUpMiss() {
      this.resetForm("MissText"),
        (this.MissDomains.urls = [
          {
            value: "",
          },
        ]);
      // this.resetForm("MissDomains"),
      this.Miss_Active = 0;
      this.$nextTick(() => {
        this.MissTextDialogVisible = false;
      });
    },
    ConfirmUploadMissText(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "/app/feedback_missingpaper",
            data: {
              id: this.user_id,
              title: this.MissText.name,
              author: this.MissText.author,
              keyword: this.MissText.keyword,
              date: this.MissText.date,
              doi: this.MissText.doi,
              abstract: this.MissText.summary,
              link: JSON.stringify(this.MissDomains.urls),
            },
          }).then((res) => {
            console.log(this.user_id);
            console.log(res.data);
            if (res.data.errno == 0) {
              this.$message({
                message: "反馈成功",
                type: "success",
              });
              // this.CancelUpMiss();
            } else {
              this.$message({
                message: "反馈失败",
                type: "error",
              });
            }
          });
          // alert("submit!");
          this.resetForm("MissText");
          this.MissDomains.urls = [
            {
              value: "",
            },
          ];
          // this.resetForm("MissDomains");
          console.log(this.MissDomains.urls);
          this.Miss_Active = 0;
          this.$nextTick(() => {
            this.MissTextDialogVisible = false;
          });
          //
        } else {
          console.log("error submit!!");
        }
      });
    },
    removeMissDomain(item) {
      var index = this.MissDomains.urls.indexOf(item);
      if (index !== -1) {
        this.MissDomains.urls.splice(index, 1);
      }
    },
    addMissDomain() {
      this.MissDomains.urls.push({
        value: "",
      });
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
