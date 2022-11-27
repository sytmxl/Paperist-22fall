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
    <el-row
      v-if="this.isAdvanced"
      style="z-index: 999"
      type="flex"
      justify="left"
    >
      <el-col :span="16">
        <el-card>
          <el-form
            :model="AdvancedSearchInput"
            :rules="rules"
            ref="AdvancedSearchInput"
            label-width="150px"
            label-position="left"
            class="demo-AdvancedSearchInput"
            style="margin-top: 10px; padding-bottom: -20px"
            size="mini"
          >
            <el-form-item label="包含全部检索词" prop="Allselect">
              <el-input v-model="AdvancedSearchInput.allselect"></el-input>
            </el-form-item>
            <el-form-item label="包含精确检索词" prop="Exectselect">
              <el-input
                v-model="AdvancedSearchInput.Exectselect"
                placeholder="多个检索词以逗号,分隔"
              >
                <el-dropdown slot="suffix" size="mini" placement="top-start">
                  <i class="el-icon-warning-outline el-input__icon"> </i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item disabled
                      >多个检索词以逗号,分隔</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown></el-input
              >
            </el-form-item>
            <el-form-item label="包含至少一个检索词" prop="LeastOneSelect">
              <el-input
                v-model="AdvancedSearchInput.LeastOneSelect"
                placeholder="多个检索词以逗号,分隔"
              ></el-input>
            </el-form-item>
            <el-form-item label="不包含检索词" prop="NoSelect">
              <el-input
                v-model="AdvancedSearchInput.NoSelect"
                placeholder="多个检索词以逗号,分隔"
              ></el-input>
            </el-form-item>
            <el-form-item label="出现检索词的位置" prop="Position">
              <el-select
                v-model="PositionValue"
                placeholder="请选择"
                style="width: 150px; margin-left: -58%"
              >
                <el-option
                  v-for="item in Positions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作者" prop="AdAuthor">
              <el-input
                v-model="AdvancedSearchInput.AdAuthor"
                placeholder="多个作者间以顿号、分隔"
              ></el-input>
            </el-form-item>
            <el-form-item label="机构" prop="AdOrganization">
              <el-input v-model="AdvancedSearchInput.AdOrganization"></el-input>
            </el-form-item>
            <el-form-item label="出版物" prop="AdPublish">
              <el-input
                v-model="AdvancedSearchInput.AdPublish"
                placeholder="请输入名称"
              >
                <el-select
                  v-model="PublishSelect"
                  slot="prepend"
                  placeholder="请选择"
                >
                  <el-option label="期刊" value="1"></el-option>
                  <el-option label="会议" value="2"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="发表时间" prop="AdTime">
              <el-date-picker
                v-model="AdvancedSearchInput.date1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="语言检索范围" prop="AdLang">
              <el-select
                v-model="LangValue"
                placeholder="请选择"
                style="width: 150px; margin-left: -58%"
              >
                <el-option label="中文" value="1"></el-option>
                <el-option label="英语" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" size="mini" @click="GoAdvancedSearch()"
            >立即搜索</el-button
          >
          <el-button size="mini" @click="CancelAd()">取消搜索</el-button>
        </el-card>
      </el-col>
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
      PublishSelect: "1",
      PositionValue: 1,
      LangValue: "1",
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
      AdvancedSearchInput: {
        Allselect: "",
        Exectselect: "",
        LeastOneSelect: "",
        NoSelect: "",
        AdAuthor: "",
        AdOrganization: "",
        AdPublish: "",
        AdTime: "",
        AdLang: "",
      },
      Positions: [
        {
          label: "文章任何位置",
          value: 1,
        },
        {
          label: "文章标题",
          value: 2,
        },
      ],
    };
  },
  methods: {
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    GoAdvancedSearch() {
      console.log("GoAdvancedSearch");
      let obj = this.AdvancedSearchInput;
      let flag=false;
      for (let key in obj) {
        if (obj[key] != "") {
          flag=true;
        }
      }
      if(flag){
        this.$router.push({
          path: "/result",
          query: {
            input: this.AdvancedSearchInput.AdAuthor,
            type: 7,
          },
        });
      }
      else{
        this.$message({
          message: "请输入有效信息",
          type: "error",
        });
      }
    },
    CancelAd() {
      this.isAdvanced = false;
      this.resetForm("AdvancedSearchInput");
    },
    AdvancedSearch() {
      this.isAdvanced = this.isAdvanced ? false : true;
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

<style lang="scss" scoped>
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
