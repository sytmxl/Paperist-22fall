<template>
  <div class="main">
    <h1>待审核文献申诉</h1>
    <el-table :data="files">
      <el-table-column fixed prop="date" label="提交时间" width="150">
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="120">
      </el-table-column>
       <el-table-column prop="phone" label="用户联系方式" width="150">
      </el-table-column>
      <el-table-column prop="fileId" label="文献id"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="toFile(scope.row.index)"
            size="small"
            >查看申诉详情</el-button
          >
          <!-- <el-button type="primary" size="small">下载文献</el-button> -->
          <el-button type="primary" size="small" @click="handleCreate"
            >审核</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
export default {
  name: "AuditLiterature",
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
    init() {
      this.$axios({
        url: "http://127.0.0.1:8000/manager/review_notes/list/",
        method: "get",
      }).then((res) => {
        console.log(res);
      });
    },
    toFile(index) {
      console.log(index);
      this.$router.push("/literature");
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
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.main {
  margin-left: 5%;
  margin-right: 5%;
}
</style>
