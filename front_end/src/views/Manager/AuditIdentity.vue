<template>
  <div class="main">
    <h1 style="float: left; color: #003B55; margin-left: 20px;">待审核学者身份认领请求</h1>
    <el-table :data="files">
      <el-table-column fixed prop="time" label="提交时间" width="200">
      </el-table-column>
      <el-table-column prop="user_id" label="用户id" width="300">
      </el-table-column>
      <el-table-column prop="author_id" label="申请认领的学者id" width="400"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="toFile(scope.row)"
            size="small"
            >查看申请详情</el-button
          >
          <el-button type="primary" size="small" @click="handleCreate(scope.row)"
            >审核</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :lock-scroll="false" :visible.sync="dialogFormVisible">
      <el-form
        :model="questionForm"
        ref="dataForm"
        label-position="left"
        label-width="90px"
        style="width: 100%"
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
  name: "AuditIdentity",
  data() {
    return {
      files: [],
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
      user_id:"",
      author_id:""
    };
  },
  methods: {
    toFile(index) {
      console.log(index);
      let intro = index.text
      let src = index.image_url
      this.$router.push({
        name: 'identyCard',
        params: { src: index.image_url,intro: index.text}
      })
      // let routeData = this.$router.resolve({
      //   name: 'identyCard',
      //   params: { src: index.image_url,intro: index.text}
      // })
      // window.open(routeData.href, '_blank')
    },
    handleCreate(item) {
      this.questionForm = {
        auditContent: "",
        auditResult: [],
      };
      this.dialogFormVisible = true;
      this.now_id = item.claim_id
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
        url: "http://127.0.0.1:8000/manager/getClaimAuthor/",
        method: "post",
        data: {
          flag:op,
          claim_id:this.now_id
        },
      }).then((res) => {
        if(op==0){
          this.$message.success("身份已通过")
        }
        else{
          this.$message.success("身份不通过")
        }
        window.location.reload();
      });
    },
    init(){
      this.$axios({
        url: "http://127.0.0.1:8000/manager/manageClaimAuthor/",
        method: "post",
        data: {
        },
      }).then((res) => {
        this.files = res.data.data;
        for(var i=0;i<this.files.length;i++){
          this.files[i].time = this.files[i].time.split('\.')[0].split('T')[0]+' '+this.files[i].time.split('\.')[0].split('T')[1]
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
