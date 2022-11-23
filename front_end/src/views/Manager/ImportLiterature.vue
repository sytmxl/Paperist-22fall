<template>
  <div class="tab-container">
    <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
    >导入文献</el-button>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form
          :model="questionForm"
          ref="dataForm"
          label-position="left"
          label-width="90px"
          style="width: 70%; margin-left: 20%;"
      >
        <el-form-item label="文献doi">
          <el-input type="text" v-model="questionForm.doi"></el-input>
        </el-form-item>
        <el-form-item label="文章标题">
          <el-input type="text" v-model="questionForm.title"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input type="text" v-model="questionForm.author"></el-input>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input type="textarea" :rows="8" v-model="questionForm.abstract"></el-input>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input type="text" v-model="questionForm.keyword"></el-input>
        </el-form-item>
        <el-form-item label="年份">
          <el-input type="text" v-model="questionForm.year"></el-input>
        </el-form-item>
        <el-form-item label="引用量">
          <el-input type="text" v-model="questionForm.cites"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input type="textarea" :rows="3" v-model="questionForm.link"></el-input>
        </el-form-item>
<!--        <el-form-item label="预计用款时间:">-->
<!--          <el-date-picker style="width: 180px;"-->
<!--                          v-model="form.estimateTime"-->
<!--                          type="datetime"-->
<!--                          format="yyyy-MM-dd HH:mm:ss"-->
<!--                          value-format="yyyy-MM-dd HH:mm:ss"-->
<!--                          placeholder="预计用款时间">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="审核结果">-->
<!--          <el-select-->
<!--              v-model="questionForm.auditResult"-->
<!--              class="filter-item"-->
<!--              placeholder="选择审核结果"-->
<!--          >-->
<!--            <el-option-->
<!--                v-for="item in tabMapOptions"-->
<!--                :key="item.key"-->
<!--                :label="item.label"-->
<!--                :value="item.key"-->
<!--            />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="附加说明" prop="auditContent">-->
<!--          <el-input type="textarea" :rows="3" v-model="questionForm.auditContent"></el-input>-->
<!--        </el-form-item>-->

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
  name: "importLiterature",
  data() {
    return {
      input: "",
      questionForm: {
        doi: "",
        title: "",
        author: "",
        abstract: "",
        keyword: "",
        year: "",
        cites: "",
        link: "",
      },
      dialogFormVisible: false,
    };
  },
  methods: {
    handleCreate() {
      this.questionForm = {
        doi: "",
        title: "",
        author: "",
        abstract: "",
        keyword: "",
        year: "",
        cites: "",
        link: "",
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
