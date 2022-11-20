<template>
    <el-dialog
      v-if="MissTextDialogVisible"
      :modal="false"
      title="反馈文献缺失"
      :visible.sync="MissTextDialogVisible"
      width="50%"
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
          <el-input v-model="MissText.keyword"></el-input>
        </el-form-item>
        <el-form-item label="文献发表日期" prop="date">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="MissText.date"
            style="width: 100%"
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
          :label="'域名' + index"
          :key="url.key"
          :prop="'urls.' + index + '.value'"
          :rules="{
            required: true,
            message: '域名不能为空',
            trigger: 'blur',
          }"
          size="mini"
          ><el-col :span="21">
            <el-input v-model="url.value" style="width: 100%"></el-input
            ><el-button @click="addMissDomain">新增域名</el-button
            ><el-button @click.prevent="removeMissDomain(url)">删除</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <span v-if="Miss_Active <= 0" slot="footer" class="dialog-footer">
        <el-button class="forget" @click="CancelUpMiss()">取 消</el-button>
        <el-button @click="submitForm1_Miss('MissText')">下一步</el-button>
      </span>
      <span v-else slot="footer" class="dialog-footer">
        <el-button class="forget" @click="CancelUpMiss()">取 消</el-button>
        <el-button class="forget" @click="Miss_Active = 0">上一步</el-button>
        <el-button
          class="forget"
          type="primary"
          @click="ConfirmUploadMissText('MissDomains')"
          >上 传
        </el-button>
      </span>
    </el-dialog>
  </template>
  
  <script>
  export default {
    name: "MissTextComplain",
    data() {
      return {
        MissTextDialogVisible: false,
        Miss_Active: 0,
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
              min: 8,
              max: 20,
              message: "长度在 8 到 20 个字符",
              trigger: "blur",
            },
          ],
          author: [
            { required: true, message: "请输入作者名称", trigger: "blur" },
          ],
          keyword: [{ required: true, message: "请输入关键词", trigger: "blur" }],
          date: [
            { required: true, message: "请输入日期", trigger: "blur" },
            { type: "date", message: "请输入正确的日期格式", trigger: "change" },
          ],
          doi: [{ required: true, message: "请输入DOI", trigger: "blur" }],
          summary: [{ required: true, message: "请输入摘要", trigger: "blur" }],
        },
      };
    },
    methods: {
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
          this.resetForm("MissDomains"),
          (this.MissTextDialogVisible = false),
          (this.Miss_active = 0);
      },
      ConfirmUploadMissText(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 发包
            alert("submit!");
            this.resetForm("MissText");
            this.resetForm("MissDomains");
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
          key: Date.now(),
        });
      },
    },
  };
  </script>
  
  <style scoped></style>
  