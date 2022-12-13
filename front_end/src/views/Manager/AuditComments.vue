<template>
  <div class="main">
    <h1 style="float: left; color: #003B55; margin-left: 20px;">待审核评论举报</h1>
    <el-table :data="comments">
      <el-table-column fixed prop="time" label="提交时间" width="200">
      </el-table-column>
      <el-table-column prop="sender_id" label="举报者id" width="200">
      </el-table-column>
      <el-table-column prop="remark_id" label="评论者id" width="200">
      </el-table-column>
      <el-table-column prop="content" label="评论内容" width="300"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleCreate(scope.row)"
            >审核</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible" :lock-scroll="false">
      <el-form 
        :model="questionForm"
        ref="dataForm"
        label-position="left"
        label-width="90px"
        style="width: 100%; "
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
      now_id:""
    };
  },
  methods: {
    toFile(index) {
      console.log(index);
      this.$router.push("/literature");
    },
    handleCreate(item) {
      this.questionForm = {
        auditContent: "",
        auditResult: [],
      };
      this.now_id = item.remark_id
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
          comment_id:this.now_id,
          note_id:""
        },
      }).then((res) => {
        if(op==0){
          this.$message.success("评论已通过")
        }
        else{
          this.$message.success("评论已删除")
        }
        window.location.reload();
      });
    },
    init() {
      this.$axios({
        url: "http://127.0.0.1:8000/manager/manageTipOff/",
        method: "post",
      }).then((res) => {
        this.comments = res.data.comment
        for(var i=0;i<this.comments.length;i++){
          this.comments[i].time = this.comments[i].time.split('\.')[0].split('T')[0]+' '+this.comments[i].time.split('\.')[0].split('T')[1]
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
  // margin-left: 5%;
  // margin-right: 5%;
}
</style>
