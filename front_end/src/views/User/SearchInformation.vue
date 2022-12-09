<template>
  <el-container>
<!--    顶栏-->
<!--      <top-bar ref="topBar"/>-->

    <el-container id="SearchInformation">
<!--      左侧栏-->
      <el-aside class="left">
        <h3 style="text-align: left; margin-left: 5%; margin-bottom: calc(2vh); margin-top: calc(10vh)">过滤结果</h3>
        <el-button @click="secondary_search">二次搜索</el-button>
        <el-collapse>
          <el-collapse-item title="时间" style="margin-bottom: 10px" class="display_zone" shadow="never">
            <!--        复选框组 时间-->
            <p style="text-align: left; color: #B3C0D1">年份</p>
            <el-checkbox-group v-model="secondarySearchFilters_year" size="mini">
              <el-checkbox border v-for="filter in filterGroup_year" :label="filter" :key="filter"
                           style="background: white; margin: 1% ;float: left"/>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item title="来源" style="margin-bottom: 10px" class="display_zone">
            <!--        复选框组 来源-->
            <p style="text-align: left; color: #B3C0D1">来源</p>
            <el-checkbox-group v-model="secondarySearchFilters_venue" size="mini">
              <el-checkbox border v-for="filter in filterGroup_venue" :label="filter" :key="filter"
                           style="background: white; margin: 1% ;float: left"/>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item title="作者" style="margin-bottom: 10px" class="display_zone">
            <!--        复选框组  作者-->
            <p style="text-align: left; color: #B3C0D1">作者</p>
            <el-checkbox-group v-model="secondarySearchFilters_author" size="mini">
              <el-checkbox border v-for="filter in filterGroup_author" :label="filter" :key="filter"
                           style="background: white; margin: 1% ;float: left"/>
            </el-checkbox-group>
          </el-collapse-item>
        </el-collapse>

      </el-aside>
<!--      搜索结果-->
      <el-main>
        <el-row :gutter="20" style="margin-top: 60px">
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
        <el-pagination 
        style="margin-bottom: 20px"
            @current-change="change_page"
            :current-page="currentPage"
            :page-sizes="[10, 25, 50, 100]"
            :page-size= "page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="resultNum">
        </el-pagination>
        <div>
          <!-- <el-card style="min-height: calc(75vh)" class="display_zone" shadow="never"> -->
          <paper-card v-for="paper in papers" :key="card_index"
                      :paper_data = "paper._source"
          />
          <!-- </el-card> -->
        </div>
        <el-pagination 
            @current-change="change_page"
            :current-page="currentPage"
            :page-sizes="[10, 25, 50, 100]"
            :page-size= "page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="resultNum">
        </el-pagination>
      </el-main>
<!--右侧栏-->
      <el-aside class="right">
        <el-card  class="display_zone" shadow="never" style="margin-top: calc(10vh)">
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
import SearchBox from "@/components/SearchBox";
import $ from "jquery";
export default {
  name:"SearchInformation",
  components: {SearchBox, PaperInformation, PaperCard, TopBar},
  props :{
  },
  mounted() {
    //document.getElementById("topbar").style.display="none";
    if(this.$route.query.search_params != null){
      this.es_request_body = JSON.parse(this.$route.query.search_params)
      this.es_request_body.from = 0
      this.es_request_body.size = this.page_size
    }
    this.post_es_search();
    this.update_secondary_search_condition();
    $("#topbar").css("display", "none");
  },
  data() {
    return{
      es_request_body : null,
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
      // 用于分页
      page_size : 10,
      currentPage:1,
      card_index:[],
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
      let condition_filter_query = JSON.parse(JSON.stringify(this.es_request_body))
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
    // 给es发包
    post_es_search(){
      axios({
            headers: {
              'content-type': 'application/json',
            },
            auth: {
              username: 'elastic',
              password: 'BZYvLA-d*pS0EpI7utmJ'
            },
            url: 'es/paper/_search', method: "post",
            data: JSON.stringify(this.es_request_body)
          }
      ).then(res=>{
        this.resultNum = res.data.hits.total.value
        this.resultNum_relation = res.data.hits.total.relation
        this.papers = res.data.hits.hits
        this.card_index = []
        for(let i = 0; i < res.data.hits.hits.length; i++){
          this.card_index.push(i+this.currentPage*this.page_size)
        }
      })
    },
    change_page(page){
      this.es_request_body.from = (page - 1) * this.page_size
      this.post_es_search()
    },
    // 二次搜索
    secondary_search(){
      let condition_filter_query = JSON.parse(JSON.stringify(this.es_request_body))
      condition_filter_query.from = 0
      // TODO 给condition加东西，应该使用filter
    },
    // 搜索框的一些动作函数
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    CancelAd() {
      this.showAdvancedInput = false;
      this.resetForm("AdvancedSearchInput");
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
  min-width: 100vh !important;
  align-self: center;
  min-height: calc(100vh) !important;
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
.el-select-dropdown__item.selected {
  color: #003b55;
}
</style>