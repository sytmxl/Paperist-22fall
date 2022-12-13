<template>
  <div class="search_input">
    <el-row :gutter="10">
      <el-col :span="20">
        <el-input
          placeholder="请输入内容"
          v-model="common_search_query"
          class="input-with-select"
          clearable
        >
          <el-select
            v-model="common_search_type"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in searchMods"
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
            @click="common_search_jump()"
          >
            <!-- 开始搜索 -->
          </el-button>
        </el-input>
      </el-col>
      <el-col class="advsearch" :span="4">
        <el-button
          type="primary"
          size="mini"
          round
          @click="isAdvanced = !isAdvanced"
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
            :model="advanced_search_query"
            :rules="rules"
            ref="AdvancedSearchInput"
            label-width="150px"
            label-position="left"
            class="demo-AdvancedSearchInput"
            style="margin-top: 10px; padding-bottom: -20px"
            size="mini"
          >
            <el-form-item label="包含全部检索词" prop="Allselect">
              <el-input v-model="advanced_search_query.fuzzy_search"></el-input>
            </el-form-item>
            <el-form-item label="包含精确检索词" prop="Exectselect">
              <el-input
                v-model="advanced_search_query.must_contain"
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
                v-model="advanced_search_query.at_least_one"
                placeholder="多个检索词以逗号,分隔"
              ></el-input>
            </el-form-item>
            <el-form-item label="不包含检索词" prop="NoSelect">
              <el-input
                v-model="advanced_search_query.contains_none"
                placeholder="多个检索词以逗号,分隔"
              ></el-input>
            </el-form-item>
            <el-form-item label="出现检索词的位置" prop="Position">
              <el-select
                v-model="option.searchPositionValue"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in searchPosition"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作者" prop="AdAuthor">
              <el-input
                v-model="advanced_search_query.authors"
                placeholder="多个作者间以顿号、分隔"
              ></el-input>
            </el-form-item>
            <el-form-item label="机构" prop="AdOrganization">
              <el-input v-model="advanced_search_query.organization"></el-input>
            </el-form-item>
            <el-form-item label="出版物" prop="AdPublish">
              <el-input
                v-model="advanced_search_query.venue"
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
                v-model="advanced_search_query.year_begin"
                type="year"
                placeholder="起始年份"
                format="yyyy 年"
                value-format="yyyy"
              >
              </el-date-picker>
              <div style="float: left">&nbsp;-&nbsp;</div>
              <el-date-picker
                class="date-picker"
                v-model="advanced_search_query.year_end"
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
                style="width: 100%"
              >
                <el-option label="不限" value="1"></el-option>
                <el-option label="中文" value="2"></el-option>
                <el-option label="英语" value="3"></el-option>
              </el-select>
            </el-form-item>
            <!-- <p>检索权重</p> -->
            <el-form-item label="关键词权重" prop="AdLang">
              <el-input-number
                v-model="weight_default"
                :precision="2"
                :step="0.1"
                :max="10"
              ></el-input-number>
              <p></p>
            </el-form-item>
            <el-form-item label="年份权重" prop="AdLang">
              <el-input-number
                v-model="weight_year"
                :precision="2"
                :step="0.1"
                :max="10"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="引用权重" prop="AdLang">
              <el-input-number
                v-model="weight_n_citation"
                :precision="2"
                :step="0.1"
                :max="10"
              ></el-input-number>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="but" @click="advanced_search_jump"
            >立即搜索</el-button
          >
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data() {
    return {
      common_search_query: "",
      PublishSelect: "1",
      LangValue: "1",
      common_search_type: 1,
      isAdvanced: false,
      searchMods: [
        { label: "篇名", value: 1 },
        { label: "关键词", value: 2 },
        { label: "作者", value: 3 },
        { label: "摘要", value: 4 },
        { label: "机构", value: 5 },
        { label: "学者", value: 6 },
      ],
      option: {
        // 1：摘要 2：标题
        searchPositionValue: 1,
        // 1：不限 2：中文 3：英语
        LangValue: "1",
        // 1：期刊 2：会议
        PublishSelect: "1",
      },
      advanced_search_query: {
        fuzzy_search: null, //默认搜索
        must_contain: null, //包含检索词
        at_least_one: null, //至少一个
        contains_none: null, //不包含
        authors: null, //包含作者
        organization: null, //包含机构
        venue: null, //所在出版物
        year_begin: null, //起始年份
        year_end: null, //终止年份
      },
      searchPosition: [
        {
          label: "文章摘要",
          value: 1,
        },
        {
          label: "文章标题",
          value: 2,
        },
      ],
      weight_default: 1,
      weight_year: 1,
      weight_n_citation: 1,
    };
  },
  mounted() {
    let last_search = JSON.parse(sessionStorage.getItem("last_search"));
    console.log(this.$router.history.current);
    if (this.$router.history.current.name === "SearchInformation") {
      if (last_search !== null) {
        if (last_search.common_search_query !== null)
          this.common_search_query = last_search.common_search_query;
        if (last_search.PublishSelect !== null)
          this.PublishSelect = last_search.PublishSelect;
        if (last_search.LangValue !== null)
          this.LangValue = last_search.LangValue;
        if (last_search.common_search_type !== null)
          this.common_search_type = last_search.common_search_type;
        if (last_search.isAdvanced !== null)
          this.isAdvanced = last_search.isAdvanced;
        if (last_search.advanced_search_query !== null)
          this.advanced_search_query = last_search.advanced_search_query;
      }
    }
  },
  methods: {
    toSearchScholar() {
      this.$router.push("/SearchAuthor");
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    common_search_jump() {
      let es_request_body = {
        query: {
          bool: {
            must: [],
            should: [],
            filter:[]
          },
        },
      };
      switch (this.common_search_type) {
        case 1:
          es_request_body.query.bool.should.push({
            match: { title: this.common_search_query },
          });
          es_request_body.query.bool.should.push({
            match_phrase: { title: this.common_search_query },
          });
          //es_request_body.query.bool.filter={"term":{"title": this.common_search_query}}
          //es_request_body.aggs={"title":{"terms":{"field":"title","execution_hint": "map"}}}
          break;
        case 2:
          es_request_body.query.bool.must.push({
            match: { keywords: this.common_search_query },
          });
          es_request_body.query.bool.filter.push({
            term: { keywords: this.common_search_query },
          }) 
          //es_request_body.aggs={"keywords":{"terms":{"field":"keywords","execution_hint": "map"}}}
          break;
        case 3:
          es_request_body.query.bool.must.push({
            match_phrase: { "authors.name": this.common_search_query },
          });
          es_request_body.query.bool.filter.push( {
            match_phrase: { "authors.name": this.common_search_query },
          });
          //es_request_body.aggs={"authors.name":{"terms":{"field":"authors.name.raw","execution_hint": "map"}}}
          break;
        case 4:
          es_request_body.query.bool.must.push({
            match: { abstract: this.common_search_query },
          });
          es_request_body.query.bool.filter.push({
            term: { abstract: this.common_search_query },
          });
          break;
        case 5:
          //es_request_body.query.bool.must.push({"match":{"venue.raw":this.common_search_query}})
          es_request_body.query.bool.filter.push({
            match_phrase: { "venue.raw": this.common_search_query },
          });
          //es_request_body.aggs={"venue":{"terms":{"field":"venue.raw","execution_hint": "map"}}}
          break;
        case 6:
          this.$router.push({
            path: "/SearchAuthor",
            query: {
              search_query: this.common_search_query,
            },
          });
          return;
      }
      // console.log(es_request_body)
      // console.log(8888)
      // this.$router.push({
      //   path: "/SearchInformation",
      //   query: {
      //     search_type: "common",
      //     search_params: JSON.stringify(es_request_body),
      //   },
      // });
      let es_request_body_function_score = {};
      es_request_body_function_score.query = {
        function_score: { query: es_request_body.query },
      };
      es_request_body_function_score.query.function_score.functions = [
        {
          field_value_factor: {
            field: "n_citation",
            modifier: "sqrt",
            factor: 0.1,
            missing: 1,
          },
        },
        {
          script_score: {
            script: {
              source:
                "if(!doc['year'].empty && doc['year'].value>1990) { " +
                1 +
                "* 0.1 *(doc['year'].value - 1990)} else {0}",
            },
          },
        },
      ];
      es_request_body_function_score.query.function_score.boost_mode = "sum";
      this.route_push_params("common", es_request_body_function_score);
    },
    advanced_search_jump() {
      let es_request_body = {
        query: {
          bool: {
            must: [],
            must_not: [],
            should: [],
          },
        },
      };
      let searchPositionQueue =
        this.option.searchPositionValue == 1 ? "abstract" : "title";
      if (this.advanced_search_query.fuzzy_search) {
        let keylist = this.advanced_search_query.fuzzy_search.split(",");
        for (let key in keylist) {
          console.log(keylist[key]);
          es_request_body.query.bool.must.push({
            match: { [searchPositionQueue]: keylist[key] },
          });
        }
      }
      if (this.advanced_search_query.must_contain) {
        for (let key in this.advanced_search_query.must_contain.split(","))
          es_request_body.query.bool.must.push({
            match: { [searchPositionQueue]: key },
          });
      }
      if (this.advanced_search_query.at_least_one) {
        for (let key in this.advanced_search_query.at_least_one.split(","))
          es_request_body.query.bool.should.push({
            match: {
              [searchPositionQueue]: this.advanced_search_query.at_least_one,
            },
          });
      }
      if (this.advanced_search_query.contains_none) {
        for (let key in this.advanced_search_query.contains_none.split(","))
          es_request_body.query.bool.must_not.push({
            match: { [searchPositionQueue]: key },
          });
      }
      if (this.advanced_search_query.authors) {
        for (let key in this.advanced_search_query.authors.split(","))
          es_request_body.query.bool.must.push({
            match: { "authors.name": key },
          });
      }
      if (this.advanced_search_query.venue) {
        for (let key in this.advanced_search_query.venue.split(","))
          es_request_body.query.bool.must.push({
            match: { "venue.raw": this.advanced_search_query.key },
          });
      }
      if (this.advanced_search_query.year_begin)
        es_request_body.query.bool.must.push({
          range: { year: { gte: this.advanced_search_query.year_begin } },
        });
      if (this.advanced_search_query.year_end)
        es_request_body.query.bool.must.push({
          range: { year: { lte: this.advanced_search_query.year_end } },
        });
      let es_request_body_function_score = {};
      es_request_body_function_score.query = {
        function_score: { query: es_request_body.query },
      };
      es_request_body_function_score.query.function_score.functions = [
        {
          field_value_factor: {
            field: "n_citation",
            modifier: "sqrt",
            factor: 0.1,
            missing: 1,
          },
        },
        {
          script_score: {
            script: {
              source:
                "if(!doc['year'].empty && doc['year'].value>1990) { " +
                this.weight_year / this.weight_default +
                "* 0.5 *(doc['year'].value - 1990)} else {0}",
            },
          },
        },
      ];
      es_request_body_function_score.query.function_score.boost_mode = "sum";
      this.route_push_params("advanced", es_request_body_function_score);
    },
    route_push_params(search_type, es_request_body) {
      sessionStorage.setItem(
        "last_search",
        JSON.stringify({
          common_search_query: this.common_search_query,
          PublishSelect: this.PublishSelect,
          LangValue: this.LangValue,
          common_search_type: this.common_search_type,
          isAdvanced: this.isAdvanced,
          advanced_search_query: this.advanced_search_query,
        })
      );
      if (this.$route.path !== "/SearchInformation") {
        this.$router.push({
          path: "/SearchInformation",
          query: {
            search_type: search_type,
            search_params: JSON.stringify(es_request_body),
          },
        });
      } else {
        this.$router.replace({
          path: "/SearchInformation",
          query: {
            search_type: search_type,
            search_params: JSON.stringify(es_request_body),
          },
        });
        // location.reload();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./searchbox.scss";
</style>
