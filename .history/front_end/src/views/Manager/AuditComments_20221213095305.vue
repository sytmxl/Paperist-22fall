<template>
  <div class="main">
    <h1>待审核评论举报</h1>
    <el-table :data="comments">
      <el-table-column fixed prop="date" label="提交时间" width="150">
      </el-table-column>
      <el-table-column prop="reportUserName" label="举报者用户名" width="120">
      </el-table-column>
      <el-table-column prop="commentUserName" label="评论者用户名" width="120">
      </el-table-column>
      <el-table-column prop="content" label="评论内容"> </el-table-column>
      <el-table-column prop="id" label="评论id"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
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
  name: "AuditComments",
  data() {
    return {
      comments: [
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
    init() {
      this.$axios({
        url: "http://127.0.0.1:8000/manager/manageTipOff/",
        method: "post",
      }).then((res) => {
        this.comments = res.data.data
        // for(var i=0;i<this.files.length;i++){
        //   this.files[i].time = this.files[i].time.split('\.')[0].split('T')[0]+' '+this.files[i].time.split('\.')[0].split('T')[1]
        // }
      });
    },
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
