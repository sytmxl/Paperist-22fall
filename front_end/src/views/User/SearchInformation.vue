<template>
  <el-container>
<!--    顶栏-->
    <el-header id="topbar">
      <div id="bar-content">
        <img class="logo" src="../../assets/logo/cube_logo.svg" @click="gotoFirstPage">
        <el-button size="mini" type="default" id="switch" name="dark_light" @click="toggleDarkLight" title="Toggle dark/light mode">日/夜</el-button>
        <div class="search_input">
          <el-row :gutter="10">
            <el-col :span="20">
              <el-input
                  placeholder="请输入内容"
                  v-model="common_search_query"
                  class="input-with-select"
                  clearable
              >
                <el-select v-model="common_search_type" slot="prepend" placeholder="请选择">
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
                    @click="common_search()"
                >
                </el-button>
              </el-input>
            </el-col>
            <el-col class="advsearch" :span="4">
              <el-button size="mini" type="primary" round @click="AdvancedSearch()"
              >高级搜索
              </el-button>
            </el-col>
          </el-row>
          <el-row
              v-if="this.showAdvancedInput"
              id="advance"
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
                        style="width: 150px; margin-left: -58%"
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
                        style="width: 150px; margin-left: -58%"
                    >
                      <el-option label="不限" value="1"></el-option>
                      <el-option label="中文" value="2"></el-option>
                      <el-option label="英语" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-button type="primary" size="mini" @click="post_advanced_search(1)"
                >立即搜索</el-button
                >
                <el-button size="mini" @click="CancelAd()">取消搜索</el-button>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div @click="get_avatar">test</div>
        <div class="avatar" @click="gotoPersonalInformation">
          <el-avatar :src=avatar_src ></el-avatar>
        </div>
      </div>
    </el-header>
   
    <el-container id="SearchInformation">
<!--      左侧栏-->
      <el-aside class="left">
        <div>
          <el-card style="margin-bottom: 10px" class="display_zone" shadow="never">
            <!--        复选框组 时间-->
            <p style="text-align: left; color: #B3C0D1">年份</p>
            <el-checkbox-group v-model="secondarySearchFilters_year" size="mini">
              <el-checkbox border v-for="filter in filterGroup_year" :label="filter" :key="filter"
                           style="background: white; margin: 1% ;float: left"/>
            </el-checkbox-group>
          </el-card>
          <el-card style="margin-bottom: 10px" class="display_zone">
            <!--        复选框组 来源-->
            <p style="text-align: left; color: #B3C0D1">来源</p>
            <el-checkbox-group v-model="secondarySearchFilters_venue" size="mini">
              <el-checkbox border v-for="filter in filterGroup_venue" :label="filter" :key="filter"
                           style="background: white; margin: 1% ;float: left"/>
            </el-checkbox-group>
          </el-card>
          <el-card style="margin-bottom: 10px" class="display_zone">
            <!--        复选框组  作者-->
            <p style="text-align: left; color: #B3C0D1">作者</p>
            <el-checkbox-group v-model="secondarySearchFilters_author" size="mini">
              <el-checkbox border v-for="filter in filterGroup_author" :label="filter" :key="filter"
                           style="background: white; margin: 1% ;float: left"/>
            </el-checkbox-group>
          </el-card>
        </div>

      </el-aside>
<!--      搜索结果-->
      <el-main>
        <el-pagination style="margin-top: calc(5vh)"
            @current-change="change_page"
            :current-page="currentPage"
            :page-sizes="[10, 25, 50, 100]"
            :page-size= "page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="resultNum">
        </el-pagination>
        <el-row :gutter="20">
          <el-col :span="16" style="text-align: left; margin-left: 6%; margin-bottom: 3%; color: #B3C0D1">
            找到{{toThousands(resultNum) + (this.resultNum_relation === "gte" ? "+":"")}}
            条相关结果{{this.resultNum_relation === "gte" ? "，您可能需要使用二次检索或高级检索获取更精确的结果":""}}</el-col>
          <el-col :span="4" style="text-align: left; margin-left: 6%; margin-bottom: 3%; color: #B3C0D1">
            <el-dropdown style="display: inline-block">
              <span>
                <span style="cursor: pointer;color: #B3C0D1">
                  {{sortMethod}}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>默认</el-dropdown-item>
                  <el-dropdown-item>引用量</el-dropdown-item>
                  <el-dropdown-item>日期</el-dropdown-item>
                </el-dropdown-menu>
              </span>
            </el-dropdown>
            <i style="display: inline-block; margin-left: 10%" class="el-icon-sort" @click="sortReserve"></i>
          </el-col>
        </el-row>
        <div>
          <!-- <el-card style="min-height: calc(75vh)" class="display_zone" shadow="never"> -->
          <paper-card v-for="paper in papers" :key="card_index"
                      :paper_data = "paper._source"
          />
          <!-- </el-card> -->
        </div>
      </el-main>
<!--右侧栏-->
      <el-aside class="right">
        <el-card  class="display_zone" shadow="never">
          <h3 style="text-align: left; margin-left: 5%; margin-bottom: calc(2vh)">推荐</h3>
          <el-card class="recommend" v-for="recommend in recommends" :key="recommend" v-loading = "true" shadow="never"
                   style = "height: 75px;margin-bottom: 10px">
            <h5 style="margin-left: 10%; text-align: left;">{{recommend}}</h5>
          </el-card>
        </el-card>
      </el-aside>

    </el-container>

  </el-container>
</template>

<script>

import TopBar from "@/components/TopBar";
import PaperCard from "@/components/PaperCard";
import PaperInformation from "@/views/User/PaperInformation";
import {$data} from "../../../static/pdf/build/pdf.worker";
import axios from "axios";
export default {
  name:"SearchInformation",
  components: {PaperInformation, PaperCard, TopBar},
  props :{
  },
  mounted() {
    var body = document.getElementById("topbar");
    body.style.display="none";
    if(this.$route.query.input)  alert(this.$route.query.input)
  },
  data() {
    return{
      //二次搜索标签
      //这些标签在普通或是高级搜索时更新
      filters_updated_once : false,
      filterGroup_venue : [],
      filterGroup_author : [],
      filterGroup_year : [],
      secondarySearchFilters_venue : [],
      secondarySearchFilters_author : [],
      secondarySearchFilters_year : [],
      papers : [],
      //推荐栏，暂时留白
      recommends : [],
      resultNum : 0,
      resultNum_relation : "eql",
      sortMethod : "默认",
      sortReserve : false,
      common_search_query :"",
      common_search_request : {},
      // 用于分页
      page_size : 10,
      currentPage:1,
      card_index:[],
      // 用于搜索框
      PublishSelect: "1",
      LangValue: "1",
      common_search_type: 1,
      showAdvancedInput: false,
      isAdvanced: false,
      searchMods: [
        { label: "篇名", value: 1 },
        { label: "关键词", value: 2 },
        { label: "作者", value: 3 },
        { label: "摘要", value: 4 },
        { label: "机构", value: 5 },
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
        fuzzy_search: null,//默认搜索
        must_contain: null,//包含检索词
        at_least_one: null,//至少一个
        contains_none: null,//不包含
        authors: null,//包含作者
        organization: null,//包含机构
        venue: null,//所在出版物
        year_begin: null,//起始年份
        year_end: null,//终止年份
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
    }
  },
  methods :{
    toThousands(num) {
      var result = [ ], counter = 0;
      num = (num || 0).toString().split('');
      for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i != 0) { result.unshift(','); }
      }
      return result.join('');
    },
    reserveSort(){$data.sortReserve = !$data.sortReserve;},
    // 获取前250条查询结果的作者、机构、年份字段用于生成二次搜索索引
    // 没有采用关键字，关键词可能会有所不同，简单地呈现近义关键词有较大难度
    update_secondary_search_condition(){
      if(this.filters_updated_once) return
      this.filters_updated_once = true
      this.filterGroup_author = []
      this.filterGroup_venue = []
      this.filterGroup_year = []
      //深拷贝
      let condition_filter_query = JSON.parse(JSON.stringify(this.common_search_request))
      condition_filter_query._source = ["authors","year","venue"]
      condition_filter_query.from = 0
      condition_filter_query.size = 50
      axios({
            headers: {
              'content-type': 'application/json',
            },
            auth: {
              username: 'elastic',
              password: 'BZYvLA-d*pS0EpI7utmJ'
            },
            url: 'es/paper/_search', method: "post",
            data: JSON.stringify(condition_filter_query)
          }
      ).then(res=>{
        let result = res.data.hits.hits

        for(let i in result){
          if(result[i]._source.authors.name !== []){
            for(let j in result[i]._source.authors){
              this.filterGroup_author.push(result[i]._source.authors[j].name)

            }
          }
          if(result[i]._source.venue !== undefined) this.filterGroup_venue.push(result[i]._source.venue.raw)

          if(result[i]._source.year !== undefined) this.filterGroup_year.push(result[i]._source.year)
        }
        this.filterGroup_author = Array.from(new Set(this.filterGroup_author))
        this.filterGroup_venue = Array.from(new Set(this.filterGroup_venue))
        this.filterGroup_year = Array.from(new Set(this.filterGroup_year))
      })
    },
    // 点击按钮不仅发包，还更新filter
    common_search(){
      this.filters_updated_once = false;
      this.post_common_search(1);
    },
    post_common_search(page){
      this.isAdvanced = false;
      let es_request_body = {
        "query":{
          "bool":{
            "must":[],
            "should":[],
            //"filter":{}
          }
        },
        "from" : (page-1)*this.page_size,
        "size" : this.page_size
      }
      switch (this.common_search_type){
        case 1:
          es_request_body.query.bool.should.push({"match":{"title":this.common_search_query}})
          es_request_body.query.bool.should.push({"match_phrase":{"title":this.common_search_query}})
          //es_request_body.query.bool.filter={"term":{"title": this.common_search_query}}
          //es_request_body.aggs={"title":{"terms":{"field":"title","execution_hint": "map"}}}
          break;
        case 2:
          es_request_body.query.bool.must.push({"match":{"keywords":this.common_search_query}})
          es_request_body.query.bool.filter={"term":{"keywords": this.common_search_query}}
          //es_request_body.aggs={"keywords":{"terms":{"field":"keywords","execution_hint": "map"}}}
          break;
        case 3:
          es_request_body.query.bool.must.push({"match_phrase":{"authors.name":this.common_search_query}})
          es_request_body.query.bool.filter={"match_phrase":{"authors.name": this.common_search_query}}
          //es_request_body.aggs={"authors.name":{"terms":{"field":"authors.name.raw","execution_hint": "map"}}}
          break;
        case 4:
          es_request_body.query.bool.must.push({"match":{"abstract":this.common_search_query}})
          es_request_body.query.bool.filter={"term":{"abstract": this.common_search_query}}
          break;
        case 5:
          //es_request_body.query.bool.must.push({"match":{"venue.raw":this.common_search_query}})
          es_request_body.query.bool.filter={"match_phrase":{"venue.raw": this.common_search_query}}
          //es_request_body.aggs={"venue":{"terms":{"field":"venue.raw","execution_hint": "map"}}}
          break;
      }
      axios({
            headers: {
              'content-type': 'application/json',
            },
            auth: {
              username: 'elastic',
              password: 'BZYvLA-d*pS0EpI7utmJ'
            },
            url: 'es/paper/_search', method: "post",
            data: JSON.stringify(es_request_body)
          }
      ).then(res=>{
        this.resultNum = res.data.hits.total.value
        this.resultNum_relation = res.data.hits.total.relation
        this.papers = res.data.hits.hits
        this.card_index = []
        for(let i = 0; i < res.data.hits.hits.length; i++){
          this.card_index.push(i+this.currentPage*this.page_size)
        }
        this.common_search_request = es_request_body
        this.update_secondary_search_condition()
      })
    },
    post_advanced_search(page){
      this.isAdvanced = true
      let es_request_body = {
        "query":{
          "bool":{
            "must":[],
            "must_not":[],
            "should":[],
          }
        },
        "from" : (page-1)*this.page_size,
        "size" : this.page_size
      }
      let searchPositionQueue = this.option.searchPositionValue == 1 ? "abstract":"title"
      if(this.advanced_search_query.fuzzy_search) {
        let keylist = this.advanced_search_query.fuzzy_search.split(",")
        for(let key in keylist){
          console.log(keylist[key])
          es_request_body.query.bool.must.push({"match":{[searchPositionQueue]:keylist[key]}})
        }
      }
      if(this.advanced_search_query.must_contain){
        for(let key in this.advanced_search_query.must_contain.split(","))
          es_request_body.query.bool.must.push({"match":{[searchPositionQueue]:key}})
      }
      if(this.advanced_search_query.at_least_one){
        for(let key in this.advanced_search_query.at_least_one.split(","))
          es_request_body.query.bool.should.push({"match":{[searchPositionQueue]:this.advanced_search_query.at_least_one}})
      }
      if(this.advanced_search_query.contains_none){
        for(let key in this.advanced_search_query.contains_none.split(","))
          es_request_body.query.bool.must_not.push({"match":{[searchPositionQueue]:key}})
      }
      if(this.advanced_search_query.authors){
        for(let key in this.advanced_search_query.authors.split(","))
          es_request_body.query.bool.must.push({"match":{"authors.name":key}})
      }
      if(this.advanced_search_query.venue){
        for(let key in this.advanced_search_query.venue.split(","))
          es_request_body.query.bool.must.push({"match":{"venue.raw":this.advanced_search_query.key}})
      }
      if(this.advanced_search_query.year_begin) es_request_body.query.bool.must.push({"range":{"year":{"gte":this.advanced_search_query.year_begin}}})
      if(this.advanced_search_query.year_end) es_request_body.query.bool.must.push({"range":{"year":{"lte":this.advanced_search_query.year_end}}})

      axios({
            headers: {
              'content-type': 'application/json',
            },
            auth: {
              username: 'elastic',
              password: 'BZYvLA-d*pS0EpI7utmJ'
            },
            url: 'es/paper/_search', method: "post",
            data: JSON.stringify(es_request_body)
          }
      ).then(res=>{
        this.resultNum = res.data.hits.total.value
        this.papers = res.data.hits.hits
        this.card_index = []
        for(let i = 0; i < res.data.hits.hits.length; i++){
          this.card_index.push(i+this.currentPage*this.page_size)
        }
      })
    },
    change_page(page){
      if(this.isAdvanced){this.post_advanced_search(page)}
      else this.post_common_search(page);
    },
    //用于搜索框
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    CancelAd() {
      this.showAdvancedInput = false;
      this.resetForm("AdvancedSearchInput");
    },
    AdvancedSearch() {
      this.showAdvancedInput = this.showAdvancedInput ? false : true;
    },
    get_avatar(){
      let tok = sessionStorage.getItem("token")
      if(tok !== "") {
        this.loged = true
        if (this.have_avatar) {
          //TODO 这里获取头像src，但目前后端似乎没有对应接口
        } else {
          this.$axios({
            method: "post", url: "/user/getPersonalInformation/", data: {}
          }).then(res => {
            console.log("res.data");
            console.log(res.data.data);
            sessionStorage.setItem("userInfo", res.data.data)
          })
        }
      }
    },
    gotoFirstPage(){
      location.href = "/FirstPage";
    },
    gotoPersonalInformation(){
      location.href = "/PersonalInformation";
    },
    toggleDarkLight() {
      let body = document.getElementById("app");
      let currentClass = body.className;
      body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
    },
  }
  
}
</script>
<style lang="scss" scoped>
@import "./pagination.scss";
@import "../../components/searchbox.scss";
@import "../../components/topbar.scss";
#SearchInformation {
  // margin-top: 60px;
  width: calc(85vw);
  align-self: center;
}
.el-aside{
  background: none;
  .display_zone {
    border-radius: 20px !important;
    // box-shadow: 0 0 7px rgba(204, 204, 204, 0.713);
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(40px) brightness(95%);
    border: none;
    padding: 10px;
  }
  .recommend {
    border-radius: 10px !important;
    background: none;
    width: 100%;
  }
}
.left {
  .el-card {
    margin: 15px 0px 15px 15px;
  }
}
.right {
  .el-card {
    margin: 15px 15px 15px 0px;
  }
}
.el-main {
  background:none;
  // border-radius: 20px !important;

  .el-card {
    border-radius: 20px !important;
    border: none;
    // box-shadow: 0 0 7px rgba(204, 204, 204, 0.713);
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(40px) brightness(95%);
  }
}
.search_input {
  width: 700px !important;
}

</style>