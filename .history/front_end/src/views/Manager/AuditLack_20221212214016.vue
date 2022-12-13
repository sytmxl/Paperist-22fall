<template>
  <div class="main">
    <h1>待审核缺失文献</h1>
    <el-table :data="fileLacks">
      <el-table-column fixed prop="time" label="提交时间" width="150">
      </el-table-column>
      <el-table-column prop="user_id" label="用户id" width="120">
      </el-table-column>
      <el-table-column prop="title" label="缺失文献名">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
           <el-button
            type="primary"
            @click="ContentVisible=true"
            size="small"
            >查看申诉详情</el-button
          >
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
        <el-dialog :visible.sync="ContentVisible">
        <el-descriptions title="文献详情信息" column="1">
        <el-descriptions-item label="文献名">kooriookami</el-descriptions-item>
        <el-descriptions-item label="作者">18100000000</el-descriptions-item>
        <el-descriptions-item label="关键词">苏州市</el-descriptions-item>
        <el-descriptions-item label="发表年份">1999</el-descriptions-item>
        <el-descriptions-item label="DOI">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
        <el-descriptions-item label="摘要">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
        <el-descriptions-item label="阅读链接">
      <div v-for="(i,index) in url" :key="index" style="margin-right:50px">
         {{i}};
      </div>
    </el-descriptions-item>
</el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AuditLiterature",
  data() {
    return {
      fileLacks: [
        {
          date: "2022.11.13",
          name: "ando",
          lackFileName: "Denoising Diffusion Probabilistic Models",
        },
        {
          date: "2022.11.13",
          name: "ando",
          lackFileName: "Denoising Diffusion Probabilistic Models",
        },
        {
          date: "2022.11.13",
          name: "ando",
          lackFileName: "Denoising Diffusion Probabilistic Models",
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
    init(){
      this.$axios({
        url: "http://127.0.0.1:8000/manager/manageMissingPaper/",
        method: "post",
        data: {
         
        },
      }).then((res) => {
        this.fileLacks = res.data;
      });
    }
  },
  mounted(){
    this.init()
  }
};
</script>

<style lang="scss" scoped>
.main {
  margin-left: 5%;
  margin-right: 5%;
}
</style>
