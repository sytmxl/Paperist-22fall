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
          <div v-for="(item, index) in questionForm.authors" :key="index">
            <el-form-item>
              <el-input
                  type="text"
                  v-model.number="item.num"
                  @input="
                  (val) => {
                    handleNumChange(val, index)
                  }
                "
              ></el-input>
              <span
                  v-if="index === 0"
                  :class="
                  item.num === null || item.author === ''
                    ? 'change-icon-add'
                    : 'change-icon'
                "
              ><i
                  :style="{
                    pointerEvents:
                      item.num === null ? 'none' : 'auto',
                  }"
                  class="el-icon-circle-plus-outline"
                  @click="addItemOfAuthor()"
              ></i
              ></span>
              <span v-else class="change-icon" @click="deleteItemOfAuthor(index)"
              ><i class="el-icon-remove-outline"></i
              ></span>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="来源">
          <el-input type="text" v-model="questionForm.venueraw"></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input type="text" v-model="questionForm.publisher"></el-input>
        </el-form-item>
        <el-form-item label="期号">
          <el-input type="text" v-model="questionForm.issue"></el-input>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input type="textarea" :rows="8" v-model="questionForm.abstract"></el-input>
        </el-form-item>
        <el-form-item label="关键词">
          <div v-for="(item, index) in questionForm.keywords" :key="index">
            <el-form-item>
              <el-input
                  type="text"
                  v-model.number="item.num"
                  @input="
                  (val) => {
                    handleNumChange(val, index)
                  }
                "
              ></el-input>
              <span
                  v-if="index === 0"
                  :class="
                  item.num === null || item.keyword === ''
                    ? 'change-icon-add'
                    : 'change-icon'
                "
              ><i
                  :style="{
                    pointerEvents:
                      item.num === null ? 'none' : 'auto',
                  }"
                  class="el-icon-circle-plus-outline"
                  @click="addItemOfKeyword()"
              ></i
              ></span>
              <span v-else class="change-icon" @click="deleteItemOfKeyword(index)"
              ><i class="el-icon-remove-outline"></i
              ></span>
            </el-form-item>
          </div>
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
        authors: [{author: ""}],
        venueraw: "",
        publisher: "",
        issue: "",
        abstract: "",
        keywords: [{keyword: ""}],
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
        authors: [{author: ""}],
        venueraw: "",
        publisher: "",
        issue: "",
        abstract: "",
        keywords: [{keyword: ""}],
        year: "",
        cites: "",
        link: "",
      };
      this.dialogFormVisible = true;
    },
    //add
    // async createData() {
    //   const params = this.questionForm;
    //   alert(JSON.stringify(params))
    //
    //   const res = await saveSubject(params);
    //   console.log(res);
    //   if (res.code === "0000") {
    //     this.$message({
    //       type: "info",
    //       message: "保存成功",
    //     });
    //     this.dialogFormVisible = false;
    //     this.getQuerySubjectList();
    //     return;
    //   }
    //   this.$message({
    //     type: "error",
    //     message: "保存失败",
    //   });
    // },
    //addKeyword
    handleNumChange(v, i) {
      console.log(v)
      console.log(i)
    },
    addItemOfKeyword() {
      this.questionForm.keywords.push({
        keyword: "",
      })
    },
    deleteItemOfKeyword(i) {
      this.questionForm.keywords.splice(i, 1)
    },
    addItemOfAuthor(){
      this.questionForm.authors.push({
        author: "",
      })
    },
    deleteItemOfAuthor(i){
      this.questionForm.authors.splice(i, 1)
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
