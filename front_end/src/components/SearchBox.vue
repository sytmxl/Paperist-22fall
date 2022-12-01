<template>
  <div class="search_input">
    <el-row :gutter="10">
      <el-col :span="20">
        <el-input
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
            id="search-button"
            type="default"
            slot="append"
            icon="el-icon-search"
            @click="SimpletoResult"
          >
            <!-- 开始搜索 -->
          </el-button>
        </el-input>
      </el-col>
      <el-col class="advsearch" :span="4">
        <el-button type="primary" round @click="AdvancedSearch()"
          >高级搜索
        </el-button>
      </el-col>
    </el-row>
    <el-row
      id="advance"
      v-if="this.isAdvanced"
      style="z-index: 99"
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
              <el-input v-model="AdvancedSearchInput.Allselect"></el-input>
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
                v-model="option.PositionValue"
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
                  v-model="option.PublishSelect"
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
                class="date-picker"
                v-model="AdvancedSearchInput.date1"
                type="year"
                placeholder="起始年份"
                format="yyyy 年"
                value-format="yyyy"
              >
              </el-date-picker>
              <div style="float: left">&nbsp;-&nbsp;</div>
              <el-date-picker
                class="date-picker"
                v-model="AdvancedSearchInput.date2"
                type="year"
                placeholder="终止年份"
                format="yyyy 年"
                value-format="yyyy"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="语言检索范围" prop="AdLang">
              <el-select
                v-model="option.LangValue"
                placeholder="请选择"
                style="width: 150px; margin-left: -58%"
              >
                <el-option label="不限" value="1"></el-option>
                <el-option label="中文" value="2"></el-option>
                <el-option label="英语" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="but"  @click="GoAdvancedSearch()"
            >立即搜索</el-button
          >
          <el-button class="but" @click="CancelAd()">取消搜索</el-button>
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
      option: {
        // 1：摘要 2：标题
        PositionValue: 1,
        // 1：不限 2：中文 3：英语
        LangValue: "1",
        // 1：期刊 2：会议
        PublishSelect: "1",
      },
      AdvancedSearchInput: {
        Allselect: "",//默认搜索
        Exectselect: "",//包含检索词
        LeastOneSelect: "",//至少一个
        NoSelect: "",//不包含
        AdAuthor: "",//包含作者
        AdOrganization: "",//包含机构
        AdPublish: "",//所在出版物
        date1: "",//起始年份
        date2: "",//终止年份
      },
      Positions: [
        {
          label: "文章摘要",
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
      let flag = false;
      let others = false;
      for (let key in obj) {
        if (key != "date1" && key != "date2" && obj[key] != "") {
          others = true;
        }
      }
      for (let key in obj) {
        if (obj[key] != "") {
          flag = true;
        }
      }
      if (!flag) {
        this.$message({
          message: "请输入有效信息",
          type: "error",
        });
      } else if (
        (obj["date1"] != "" || obj["date2"] != "") &&
        others == false
      ) {
        this.$message({
          message: "不能仅输入日期信息，请至少再填入另一个信息",
          type: "error",
        });
      } else {
        sessionStorage.setItem(
          "AdvancedSearchInput",
          JSON.stringify(this.AdvancedSearchInput)
        );
        sessionStorage.setItem(
          "AdvancedSearchOptions",
          JSON.stringify(this.option)
        );
        this.$router.push({
          path: "/result",
          // query: {
          //   input: this.AdvancedSearchInput.AdAuthor,
          //   type: 7,
          // },
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
.date-picker {
  float: left;

  width: 47% !important;
}
.search_input {
  // width: 55%;
  // margin: 20px auto;
  // padding: auto;
}

.el-select {
  // width: 100px;
}
.input-with-select .el-input-group__prepend {
  // background-color: #fff;
}

/deep/.el-input-group__prepend {
  border-radius: 10px;
  // border: 1px solid #647c90 ;
  width: 50px;
  border: 0px;
  color: white;
  background-color: #647c90;
}
/deep/.el-input-group__append {
  border-radius: 0 10px 10px 0;
  // color: #fff;
  border: 0px;
  background-color: #40a0ff00;
}
#search-button {
  border: 1px solid white;
}
/deep/.el-select-dropdown__list {
  border: 10px !important;
}
.el-select-dropdown__item.selected {
  color: #003b55;
}
#advance {
  position: absolute;
  // width: 800px;
  margin-top: 20px;
  .el-card {
    border-radius: 20px !important;
    border: none !important;
    box-shadow: 0 0 7px rgba(204, 204, 204, 0.713);
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(40px) brightness(100%);
  }
  animation: test 0.3s cubic-bezier(.23,1.38,.65,.99);
}
@keyframes test {
  0% {
    opacity: 0%;
    top:20px;
  }
  100% {
    opacity: 100%;
    top:50px;
  }
}
.but {
  width: 48%;
  border: none;
}
</style>
