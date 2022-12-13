<template>
  <div>
    <div class="btn-box">
      <el-button style="float: right; font-size: larger; border-radius: 100px; " type="primary" @click="add">+</el-button>
    </div>
    <el-table :data="tableData" :style="'width: 100%;'">
      <el-table-column prop="id" label="ID" width="100"> </el-table-column>
      <el-table-column prop="name" label="用户名" width="100"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="default" @click="edit(scope.row, scope.$index)"
          >修改</el-button
          >
          <el-button type="primary" @click="del(scope.row, scope.$index)"
          >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <ScholarDialog ref="operaDialog" />
  </div>
</template>

<script>
import ScholarDialog from "@/views/Manager/ScholarDialog";
export default {
  name: "manageScholar",
  components: { ScholarDialog },
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.tableData = [
        {
          id: 1,
          name: "林林",
          email: "linliqun@buaa.edu.cn",
        },
      ];
    },

    add() {
      this.$refs.operaDialog.open();
    },

    edit(row, index) {
      this.$refs.operaDialog.open(row, index);
    },

    del(row, index) {
        this.$confirm("确定移出该学者？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            this.tableData.splice(index, 1);
            this.$message({
              type: "success",
              message: "移出成功!",
            });
            //   // 实际操作调接口请求删除当前选中数据
            //   delRow(row.id).then((res) => {
            //     if (res.code === 200) {
            //       this.$message({
            //         type: "success",
            //         message: res.msg,
            //       });
            //     }
            //   });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
