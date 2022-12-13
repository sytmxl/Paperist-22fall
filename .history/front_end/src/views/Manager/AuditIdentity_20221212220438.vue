<template>
  <div class="main">
    <h1>待审核学者身份认领请求</h1>
    <div v-for="i in fileLacks" :key="i">
        <el-card style="margin-top:30px;text-align:left">
          <span>提交时间：{{i.time}}</span>
          <span>用户id: {{i.user_id}}</span>
          <el-button type="primary" size="small" @click="handleCreate"
            >审核</el-button
          >
           <el-button
            type="primary"
            @click="info(i)"
            size="small"
            >查看申诉详情</el-button
          >
          
        </el-card>
    </div>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form
        :model="questionForm"
        ref="dataForm"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="审核结果">
          <el-select
            v-model="questionForm.auditResult"
            class="filter-item"
            placeholder="选择审核结果"
          >
            <el-option
              v-for="item in tabMapOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="附加说明" prop="auditContent">
          <el-input
            type="textarea"
            :rows="3"
            v-model="questionForm.auditContent"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createData()">确定</el-button>
      </div>
    </el-dialog>
        <el-dialog :visible.sync="ContentVisible">
        <el-descriptions title="文献详情信息" column="1">
        <el-descriptions-item label="文献名">{{nowitem.title}}</el-descriptions-item>
        <el-descriptions-item label="作者">{{nowitem.author}}</el-descriptions-item>
        <el-descriptions-item label="关键词">{{nowitem.keyword}}</el-descriptions-item>
        <el-descriptions-item label="发表年份">{{nowitem.date}}</el-descriptions-item>
        <el-descriptions-item label="DOI">{{nowitem.doi}}</el-descriptions-item>
        <el-descriptions-item label="摘要">{{nowitem.abstract}}</el-descriptions-item>
        <el-descriptions-item label="阅读链接">{{nowitem.link}};</el-descriptions-item>
</el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AuditIdentity",
  data() {
    return {
      files: [
        {
          date: "2022.11.13",
          name: "ando",
          fileName: "Denoising Diffusion Probabilistic Models",
        },
        {
          date: "2022.11.13",
          name: "ando",
          fileName: "Denoising Diffusion Probabilistic Models",
        },
        {
          date: "2022.11.13",
          name: "ando",
          fileName: "Denoising Diffusion Probabilistic Models",
        },
      ],
      dialogFormVisible: false,
      ContentVisible:false,
      input: "",
      tabMapOptions: [
        { label: "通过", key: "pass" },
        { label: "不通过", key: "notPass" },
      ],
      questionForm: {
        auditContent: "",
        auditResult: [],
      },
    };
  },
  methods: {
    toFile(index) {
      console.log(index);
      this.$router.push("/identity");
    },
    handleCreate() {
      this.questionForm = {
        auditContent: "",
        auditResult: [],
      };
      this.dialogFormVisible = true;
    },
    async createData() {
      const params = this.questionForm;
      console.log("发送审核结果");
      console.log(JSON.stringify(params));
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin-left: 5%;
  margin-right: 5%;
}
</style>
