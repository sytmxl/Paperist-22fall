<template>
  <div class="main">
    <h1>待审核笔记举报</h1>
    <el-table :data="notes">
      <el-table-column fixed prop="time" label="提交时间" width="200">
      </el-table-column>
      <el-table-column prop="author_id" label="作者id" width="200">
      </el-table-column>
      <el-table-column prop="note_id" label="笔记id" width="200"> </el-table-column>
      <el-table-column prop="introduction" label="笔记简介" width="300"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button
            type="primary"
            @click="toNote(scope.row.index)"
            size="small"
            >查看笔记详情</el-button
          > -->
          <el-button type="primary" size="small" @click="handleCreate(scope.row)"
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
      notes: [
      ],
      dialogFormVisible: false,
      input: "",
      now_id:"",
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
    toNote(index) {
      console.log(index);
      this.$router.push("/note");
    },
    handleCreate(item) {
      this.questionForm = {
        auditContent: "",
        auditResult: [],
      };
      this.now_id = item.note_id
      this.dialogFormVisible = true;
    },
    async createData() {
      const params = this.questionForm.auditResult;
      let op;
      console.log(params);
      if(params=="pass"){
        op = 0;
      }
      else{
        op = 1;
      }
      this.dialogFormVisible = false;
      this.$axios({
        url: "http://127.0.0.1:8000/manager/getTipOff/",
        method: "post",
        data: {
          flag:op,
          note_id:this.now_id
        },
      }).then((res) => {
        if(op==0){
          this.$message.success("评论已通过")
        }
        else{
          this.$message.success("评论已删除")
        }
        
      });
      
    },
    init() {
      this.$axios({
        url: "http://127.0.0.1:8000/manager/manageTipOff/",
        method: "post",
      }).then((res) => {
        this.notes = res.data.note
        for(var i=0;i<this.notes.length;i++){
          this.notes[i].time = this.notes[i].time.split('\.')[0].split('T')[0]+' '+this.notes[i].time.split('\.')[0].split('T')[1]
        }
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
