<template>
  <el-dialog
      v-if="visible"
      :title="form.id?'修改':'新增'"
      :visible.sync="visible"
      modal
      :close-on-click-modal="false"
      width="30%"
      :before-close="close"
  >
    <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
        class="form"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入地址"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        name:'',
        email:''
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        email: [
            { required: true, message: "请输入地址", trigger: "blur" }
        ],
      },
    };
  },
  methods: {
    open(row, index) {
      this.visible = true;
      //   有id则是编辑 否则则是新增
      if (row && row.id) {
        this.form = JSON.parse(JSON.stringify(row));
        // 因为要模拟修改 此处需要索引 实际项目操作不需要index
        this.form.index = index;
      }
    },
    close() {
      this.visible = false;
      this.form = {};
      // 移除校验结果并重置数据
      this.$refs.form.resetFields()
    },
    confirm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id) {
            // 编辑的提交
            // 调用修改接口 并在接口返回成功后调用父组件的getList()方法
            // editApi(this.form).then(res=>{if(res.code===200) {this.$message.sucess(res.msg);this.$parent.getList();this.close()}})

            // 模拟修改-（以下四句实际操作不需要 逻辑处理在接口返回 参考上面的代码）
            let cloneForm=JSON.parse(JSON.stringify(this.form))
            this.$parent.tableData.splice(this.form.index, 1, cloneForm);
            this.close();
          } else {
            // 新增的提交
            // 调用新增接口 并在接口返回成功后调用父组件的getList()方法
            // addApi(this.form).then(res=>{if(res.code===200) {this.$message.sucess(res.msg);this.$parent.getList();this.close()}})

            // 模拟添加-（以下四句实际操作不需要 逻辑处理在接口返回 参考上面的代码）
            this.form.id=this.$parent.tableData.length+1
            let cloneForm=JSON.parse(JSON.stringify(this.form))
            this.$parent.tableData.push(cloneForm);
            this.close();
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
