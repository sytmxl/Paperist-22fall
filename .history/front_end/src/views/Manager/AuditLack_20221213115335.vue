<template>
  <div class="main">
    <h1>待审核缺失文献</h1>
    <el-table :data="files">
      <el-table-column fixed prop="time" label="提交时间" width="200">
      </el-table-column>
      <el-table-column prop="user_id" label="用户id" width="300">
      </el-table-column>
      <el-table-column prop="title" label="缺失文献名" width="400"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="info(scope.row)"
            size="small"
            >查看申请详情</el-button
          >
          <el-button type="primary" size="small" @click="handleCreate"
            >审核</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <div v-for="i in fileLacks" :key="i">
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
    </div> -->
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
        <el-descriptions-item label="阅读链接" v-if="nowitem.link!=null"><span v-for="i in nowitem.link" :key="i">{{i.value}}</span></el-descriptions-item>
        <el-descriptions-item label="阅读链接" v-else><span>未提供</span></el-descriptions-item>
</el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AuditLiterature",
  data() {
    return {
      files: [],
      nowitem:{},
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
      now_id:""
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
    async createData(item) {
      const params = this.questionForm;
      console.log("发送审核结果");
      console.log(JSON.stringify(params));
      this.dialogFormVisible = false;
      this.now_id = item.missingpaper_id
    },
    init(){
      this.$axios({
        url: "http://127.0.0.1:8000/manager/manageMissingPaper/",
        method: "post",
        data: {
         
        },
      }).then((res) => {
        this.files = res.data.data;
         for(var i=0;i<this.files.length;i++){
          this.files[i].time = this.files[i].time.split('\.')[0].split('T')[0]+' '+this.files[i].time.split('\.')[0].split('T')[1]
          this.files[i].date = this.files[i].date.split('\.')[0].split('T')[0]+' '+this.files[i].date.split('\.')[0].split('T')[1]
          // this.files[i].link = JSON.parse(this.files[i].link)
          // console.log(this.files[i].link[0].value)
        }
      });
    },
    info(item){
      this.ContentVisible = true;
      this.nowitem = item
    
      this.nowitem.link = JSON.parse(this.nowitem.link)
        console.log(this.nowitem)
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
// .el-button{
//   float: right;
//   margin-right: 20px;
// }
</style>
