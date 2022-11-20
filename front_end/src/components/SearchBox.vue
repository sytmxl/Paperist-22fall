<template>
  <div class="search_input">
    <el-row :gutter="10">
      <el-col :span="20"
        ><el-input
          placeholder="请输入内容"
          v-model="input"
          class="input-with-select"
          clearable
        >
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option
              v-for="(item, index) in list"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button
            type="primary"
            slot="append"
            icon="el-icon-search"
            @click="SimpletoResult"
            >开始搜索</el-button
          >
        </el-input></el-col
      >
      <el-col :span="4"
        ><el-button
          type="primary"
          icon="el-icon-search"
          round
          @click="AdvancedSearch()"
          >高级搜索</el-button
        ></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  created() {
    if (this.$route.path == "/result") {
      this.input = this.$route.query.input;
      this.select = this.$route.query.type;
    }
  },
  data() {
    return {
      input: "",
      select: 1,
      isAdvanced: false,
      list: [
        { label: "篇名", value: 1 },
        { label: "领域", value: 2 },
        { label: "关键词", value: 3 },
        { label: "作者", value: 4 },
        { label: "摘要", value: 5 },
        { label: "DOI", value: 6 },
      ],
    };
  },
  methods: {
    AdvancedSearch() {
      this.isAdvanced = true;
    },
    SimpletoResult() {
      if (this.input.match(/^[ ]*$/)) {
        this.$message.error("请输入搜索内容");
        return;
      }
      this.$emit("select", this.input, this.select);
      this.$router.push({
        path: "/result",
        query: {
          input: this.input,
          type: this.select,
        },
      });
    },
  },
};
</script>

<style scoped>
.search_input {
  width: 55%;
  margin: 20px auto;
}

.el-select {
  width: 110px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
/deep/.el-input-group__prepend {
  border-radius: 18px 0 0 18px;
}
/deep/.el-input-group__append {
  border-radius: 0 18px 18px 0;
  color: #fff;
  background-color: #409eff;
}
</style>
