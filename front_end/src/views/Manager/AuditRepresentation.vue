<template>
  <div class="tab-container">
    <p>ONE REPRESENTATION</p>
    <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
    >审核</el-button>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form
          :model="questionForm"
          ref="dataForm"
          label-position="left"
          label-width="90px"
          style="width: 400px; margin-left:50px;"
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
          <el-input type="textarea" :rows="3" v-model="questionForm.auditContent"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click=" createData() ">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  data() {
    return {
      input: "",
      tabMapOptions: [
        { label: "通过", key: "pass" },
        { label: "不通过", key: "notPass" },
      ],
      questionForm: {
        auditContent: "",
        auditResult: [],
      },
      dialogFormVisible: false,
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
    //add
    async createData() {
      const params = this.questionForm;
      alert(JSON.stringify(params))
    },
  },
};
</script>
<style scoped>
</style>
