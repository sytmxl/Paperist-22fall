<template>
  <div class="main">
    <h1>待审核文献申诉</h1>
     <div v-for="i in files" :key="i">
        <el-card style="margin-top:30px;text-align:left">
          <span>提交时间：{{i.time}}</span>
          <span>投诉论文id: {{i.paper_id}}</span>
          <span>投诉内容: {{}}</span>
          <span>投诉人联系方式: {{i.contact}}</span>
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
    </div>
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
         
      <span style="text-align:left;">
      <h2>问题描述</h2>
      <p>{{ introduction }}</p>
    </span>
   
    <span style="text-align:left;">
      <h2>相关图片</h2>
    </span>
     <el-carousel :interval="4000" type="card" height="400px">
         <el-carousel-item v-for="item in url" :key="item">
              <!-- <h3 class="medium">{{ item }}</h3> -->
              <img :src="item" alt="">
            </el-carousel-item>
         </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AuditLiterature",
  data() {
    return {
      files: [],
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
      url:[],
      introduction:""
    };
  },
  methods: {
    info(item){
      this.ContentVisible = true;
      this.url.push(item.image_url)
      this.introduction=item.introduction
    },
    init() {
      this.$axios({
        url: "http://127.0.0.1:8000/manager/managePaperComplain/",
        method: "post",
      }).then((res) => {
        this.files = res.data.data
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
