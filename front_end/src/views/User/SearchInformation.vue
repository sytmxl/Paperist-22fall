<template>
  <el-container>
    <el-container id="SearchInformation">
      <!--      左侧栏-->
      <el-aside class="left">
        <!-- <h3
          style="
            text-align: left;
            margin-left: 5%;
            margin-bottom: calc(2vh);
            margin-top: 20px;
          "
        >
          过滤结果
        </h3>
        <el-button @click="secondary_search">二次搜索</el-button> -->
        <el-collapse v-model="openCollapse" >
          <el-collapse-item
            title="来源"
            style="margin-bottom: 10px"
            class="display_zone"
            name="1"
          >
            <!--        复选框组 来源-->
            <!-- <p style="text-align: left; color: #b3c0d1">来源</p> -->
            <el-checkbox-group
              v-model="secondarySearchFilters_venue"
              size="mini"
            >
              <el-checkbox
                border
                v-for="filter in filterGroup_venue"
                :label="filter"
                :key="filter"
                @change="secondary_search(false)"
              />
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item
            title="作者"
            style="margin-bottom: 10px"
            class="display_zone"
            name="2"
          >
            <!--        复选框组  作者-->
            <!-- <p style="text-align: left; color: #b3c0d1">作者</p> -->
            <el-checkbox-group
              v-model="secondarySearchFilters_author"
              size="mini"
            >
              <el-checkbox
                border
                v-for="filter in filterGroup_author"
                :label="filter"
                :key="filter"
                @change="secondary_search(false)"
              />
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item
            title="时间"
            style="margin-bottom: 10px"
            class="display_zone"
            shadow="never"
            name="3"
          >
            <!--        复选框组 时间-->
            <!-- <el-collapse-item
              title="年份范围"
              style="margin-bottom: 10px"
              class="display_zone"
              shadow="never"
            >
              <p style="text-align: left; color: #b3c0d1">
                注意，该检索模式有严重的性能问题，请谨慎使用
              </p>
              <p>开始年份</p>
              <el-input-number
                v-model="begin_year_secondary"
                @change="secondary_search(true)"
                :min="begin_year"
                :max="end_year_secondary"
              ></el-input-number>
              <p>截止年份</p>
              <el-input-number
                v-model="end_year_secondary"
                @change="secondary_search(true)"
                :min="begin_year_secondary"
                :max="end_year"
              ></el-input-number>
            </el-collapse-item> -->
            
            <!-- <el-collapse-item 
              title="年份标签"
              style="margin-bottom: 10px"
              class="display_zone"
              shadow="never"> -->
            <el-checkbox-group
              v-model="secondarySearchFilters_year"
              size="mini"
            >
              <el-checkbox
                border
                v-for="filter in filterGroup_year"
                :label="filter"
                :key="filter"
                @change="secondary_search(false)"
              />
            </el-checkbox-group>
            <!-- </el-collapse-item> -->
         
          </el-collapse-item>
        </el-collapse>
      </el-aside>
      <!--      搜索结果-->
      <el-main v-loading="loading">
        <el-row :gutter="20" style="margin-top: 50px">
          <el-col
            :span="16"
            style="
              text-align: left;
              margin-left: 20px;
              color: #003B55;
            "
          >
            找到{{
              toThousands(resultNum) +
              (this.resultNum_relation === "gte" ? "+" : "")
            }}
            条相关结果{{
              this.resultNum_relation === "gte"
                ? "，您可能需要使用二次检索或高级检索获取更精确的结果"
                : ""
            }}</el-col
          >
          <el-col
            :span="4"
            style="
              text-align: left;
              margin-left: 6%;
              margin-bottom: 3%;
              color: #b3c0d1;
            "
          >
            <el-dropdown id="sort" style="display: inline-block;color: #003B55;">
              <span>
                <span style="cursor: pointer; color: #003B55;">
                  {{ sortMethod }}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>默认</el-dropdown-item>
                  <el-dropdown-item>引用量</el-dropdown-item>
                  <el-dropdown-item>日期</el-dropdown-item>
                </el-dropdown-menu>
              </span>
            </el-dropdown>
            <i
              style="display: inline-block; margin-left: 10%;color: #003B55;"
              class="el-icon-sort"
              @click="sortReserve"
            ></i>
          </el-col>
        </el-row>
        <!-- <el-pagination
          style="margin-bottom: 20px"
          @current-change="change_page"
          :current-page="currentPage"
          :page-sizes="[10, 25, 50, 100]"
          :page-size="page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="resultNum"
        >
        </el-pagination> -->
        <div>
          <!-- <el-card style="min-height: calc(75vh)" class="display_zone" shadow="never"> -->
          <paper-card v-for="paper in papers" :key="card_index"
                      :paper_data = "paper" @react_quote="react_card"
          />
          <!-- </el-card> -->
          <el-dialog
            :lock-scroll="false"
            title="引用"
            :visible.sync="QuoteVisible"
            width="30%"
          >
            <div v-for="i in quote_list" :key="i" style="margin-bottom: 10px">
              <div
                style="
                  border-radius: 10px;
                  padding: 5px;
                  width: 30%;
                  font-size: medium;
                "
              >
                {{ i.type }}
              </div>
              <div style="border-radius: 10px; padding: 5px; margin: 2px 0">
                {{ i.content }}
              </div>
              <el-button
                size="medium"
                style="width: 100%"
                round
                icon="el-icon-document-copy"
                v-clipboard:copy="i.content"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >
                复制引用
              </el-button>
            </div>
          </el-dialog>
        </div>
         <el-dialog
            :lock-scroll="false"
            title="引用"
            :visible.sync="QuoteVisible"
            width="30%"
            >
            <div v-for="i in quote_list" :key="i" style="margin-bottom:10px">
              <div style="border-radius:10px;padding:5px;width:30%; font-size: medium;">
                {{i.type}} 
              </div>
              <div style="border-radius:10px;padding:5px;margin:2px 0">
                {{i.content}}
              </div>
              <el-button size="medium" style="width: 100%" round icon="el-icon-document-copy" v-clipboard:copy="i.content" v-clipboard:success="onCopy" v-clipboard:error="onError">
                复制引用
              </el-button>
            </div>
          </el-dialog>
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
        <el-card
          class="display_zone"
          shadow="never"
          style="margin-left: 5px;"
          :v-loading="loading_interested"
        >
          <h3 style="text-align: left; margin-left: 20px; margin-bottom: 20px">
            推荐
          </h3>
          <div
            class="recommend"
            v-for="recommend in recommends"
            :key="recommend"
            shadow="never"
          >
            <!-- <el-divider></el-divider> -->
            <h5
              @click="goto_interested(recommend._source.id)"
            >
              {{ recommend._source.title }}
            </h5>
          </div>
        </el-card>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import TopBar from "@/components/TopBar";
import PaperCard from "@/components/PaperCard";
import PaperInformation from "@/views/User/PaperInformation";
import { $data } from "../../../static/pdf/build/pdf.worker";
import axios from "axios";
import SearchBox from "@/components/SearchBox";
import $ from "jquery";
export default {
  name: "SearchInformation",
  components: { SearchBox, PaperInformation, PaperCard, TopBar },
  props: {},
  async mounted() {
    if (this.$route.query.search_params != null) {
      this.es_request_body = JSON.parse(this.$route.query.search_params);
      this.es_request_body_raw = JSON.parse(
        JSON.stringify(this.es_request_body)
      );
      this.es_request_body.from = 0;
      this.es_request_body.size = this.page_size;
    }

    await this.post_es_search();
    await this.update_secondary_search_condition();
    await this.load_interested();
    $("#topbar").css("display", "block");
    this.isAdvanced = false;
  },
  data() {
    return {
      openCollapse: '1',
      es_request_body: null,
      //二次搜索标签
      //这些标签在普通或是高级搜索时更新
      filters_updated_once: false,
      filterGroup_venue: [],
      filterGroup_author: [],
      filterGroup_year: [],
      //二次检索参数
      begin_year: 9999999,
      end_year: 0,
      begin_year_secondary: -1,
      end_year_secondary: -1,
      secondarySearchFilters_venue: [],
      secondarySearchFilters_author: [],
      secondarySearchFilters_year: [],
      papers: [],
      //推荐栏，暂时留白
      recommends: [],
      resultNum: 0,
      resultNum_relation: "eql",
      sortMethod: "默认",
      sortReserve: false,
      // 用于分页
      page_size : 10,
      currentPage:1,
      card_index:[],
      loading:true,
      loading_interested:true,
      QuoteVisible:false,
      quote_list:[]
    }
  },
  methods :{
    async react_card(data){
        this.QuoteVisible=true;
        await this.$axios({
            url:"http://127.0.0.1:8000/paperQuote/",
            method:"post",
            data:{
                paper_id:data.paper_id
            }
        }).then(res=>{
            this.quote_list = res.data.quote
            
        })
    },
    toThousands(num) {
      var result = [],
        counter = 0;
      num = (num || 0).toString().split("");
      for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i != 0) {
          result.unshift(",");
        }
      }
      return result.join("");
    },
    reserveSort() {
      $data.sortReserve = !$data.sortReserve;
    },
    // 获取前250条查询结果的作者、机构、年份字段用于生成二次搜索索引
    // 没有采用关键字，关键词可能会有所不同，简单地呈现近义关键词有较大难度
    update_secondary_search_condition() {
      if (this.filters_updated_once) return;
      this.filters_updated_once = true;
      this.filterGroup_author = [];
      this.filterGroup_venue = [];
      this.filterGroup_year = [];
      //深拷贝
      let condition_filter_query = JSON.parse(
        JSON.stringify(this.es_request_body)
      );
      condition_filter_query._source = ["authors", "year", "venue", "keywords"];
      condition_filter_query.from = 0;
      condition_filter_query.size = 50;
      axios({
        headers: {
          "content-type": "application/json",
        },
        auth: {
          username: "elastic",
          password: "BZYvLA-d*pS0EpI7utmJ",
        },
        url: "/es/paper/_search",
        method: "post",
        data: JSON.stringify(condition_filter_query),
      }).then((res) => {
        let result = res.data.hits.hits;
        let keywords = JSON.parse(localStorage.getItem("interested_keywords"));
        if (keywords == null) keywords = [];
        for (let i in result) {
          if (result[i]._source.authors.name !== []) {
            for (let j in result[i]._source.authors) {
              this.filterGroup_author.push(result[i]._source.authors[j].name);
            }
          }
          if (result[i]._source.keywords !== []) {
            for (let j in result[i]._source.keywords) {
              keywords.push(result[i]._source.keywords[j]);
            }
          }
          if (result[i]._source.venue !== undefined)
            this.filterGroup_venue.push(result[i]._source.venue.raw);

          if (
            result[i]._source.year !== undefined &&
            result[i]._source.year != null
          ) {
            this.begin_year = Math.min(result[i]._source.year, this.begin_year);
            this.end_year = Math.max(result[i]._source.year, this.end_year);
            this.filterGroup_year.push(result[i]._source.year);
          }
          this.end_year_secondary = this.end_year;
          this.begin_year_secondary = Math.max(
            this.begin_year,
            this.end_year - 10
          );
        }
        this.filterGroup_author = Array.from(new Set(this.filterGroup_author));
        this.filterGroup_venue = Array.from(new Set(this.filterGroup_venue));
        this.filterGroup_year = Array.from(new Set(this.filterGroup_year));
        this.filterGroup_year.sort()

        localStorage.setItem(
          "interested_keywords",
          JSON.stringify(Array.from(new Set(keywords)))
        );
      });
    },
    // 给es发包
    post_es_search() {
      this.loading = true;
      axios({
        headers: {
          "content-type": "application/json",
        },
        auth: {
          username: "elastic",
          password: "BZYvLA-d*pS0EpI7utmJ",
        },
        url: "es/paper/_search",
        method: "post",
        data: JSON.stringify(this.es_request_body),
      }).then((res) => {
        this.resultNum = res.data.hits.total.value;
        this.resultNum_relation = res.data.hits.total.relation;
        this.papers = res.data.hits.hits;
        this.card_index = [];
        for (let i = 0; i < res.data.hits.hits.length; i++) {
          this.card_index.push(i + this.currentPage * this.page_size);
        }
        this.loading = false;
      });
    },
    change_page(page) {
      this.es_request_body.from = (page - 1) * this.page_size;
      this.post_es_search();
    },
    // 二次搜索
    secondary_search(use_slow_method) {
      let condition_filter_query = JSON.parse(
        JSON.stringify(this.es_request_body_raw)
      );
      if (condition_filter_query.query.function_score.query.bool.filter == null)
        condition_filter_query.query.function_score.query.bool.filter = [];
      for (let i in this.secondarySearchFilters_author) {
        condition_filter_query.query.function_score.query.bool.must.push({
          match_phrase: {
            "authors.name.raw": this.secondarySearchFilters_author[i],
          },
        });
      }
      for (let i in this.secondarySearchFilters_venue) {
        condition_filter_query.query.function_score.query.bool.filter.push({
          match_phrase: {
            "venue.raw.raw": this.secondarySearchFilters_venue[i],
          },
        });
      }
      for (let i in this.secondarySearchFilters_year) {
        condition_filter_query.query.function_score.query.bool.should.push({
          match_phrase: { year: this.secondarySearchFilters_year[i] },
        });
      }
      if (use_slow_method) {
        condition_filter_query.query.function_score.query.bool.filter.push({
          range: {
            year: {
              gte: this.begin_year_secondary,
              lte: this.end_year_secondary,
            },
          },
        });
      }
      this.es_request_body = condition_filter_query;
      this.currentPage = 1;
      this.change_page(1);
    },
    // 推荐内容
    load_interested() {
      let keywords = JSON.parse(localStorage.getItem("interested_keywords"));
      if (keywords == null) return;
      let interested_search_request_body = {
        _source: ["title", "id"],
        query: {
          bool: {
            should: [],
          },
        },
        from: 0,
        size: 10,
      };
      for (let i = 0; i < 5; i++) {
        let idx = parseInt(Math.random() * keywords.length);
        interested_search_request_body.query.bool.should.push({
          match: { keywords: keywords[idx] },
        });
        keywords.splice(idx, 1);
      }

      this.loading_interested = true;
      axios({
        headers: {
          "content-type": "application/json",
        },
        auth: {
          username: "elastic",
          password: "BZYvLA-d*pS0EpI7utmJ",
        },
        url: "es/paper/_search",
        method: "post",
        data: JSON.stringify(interested_search_request_body),
      }).then((res) => {
        this.recommends = res.data.hits.hits;
        this.loading_interested = false;
      });
    },
    goto_interested(id) {
      let routeData = this.$router.resolve({
        name: "PaperInformation",
        params: { paper_id: id },
      });
      window.open(routeData.href, "_blank");
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
    get_avatar() {
      let tok = sessionStorage.getItem("token");
      if (tok !== "") {
        this.loged = true;
        if (this.have_avatar) {
          //TODO 这里获取头像src，但目前后端似乎没有对应接口
        } else {
          this.$axios({
            method: "post",
            url: "/user/getPersonalInformation/",
            data: {},
          }).then((res) => {
            console.log("res.data");
            console.log(res.data.data);
            sessionStorage.setItem("userInfo", res.data.data);
          });
        }
      }
    },
    gotoFirstPage() {
      location.href = "/FirstPage";
    },
    gotoPersonalInformation() {
      location.href = "/PersonalInformation";
    },
    toggleDarkLight() {
      let body = document.getElementById("app");
      let currentClass = body.className;
      body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
    },
    limitWords(txt) {
      let str = txt;
      if (str == null) return "";
      if (str.length > 100) str = str.substr(0, 100) + "...";
      return str;
    },
  },
};
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
.el-aside {
  // background: none;
  z-index: 1000;
  margin: 20px 0px 15px 15px;
  .display_zone {
    border-radius: 20px !important;
    margin: 5px;
    box-shadow: 0 0 7px rgba(204, 204, 204, 0.713);
    // background-color: rgba(255, 255, 255, 0.501) !important;
    // backdrop-filter: blur(40px) brightness(95%);
    border: none;
    padding: 10px;
    // color: black;
    transition: 0.3s;
  }
}
@mixin overflow {
  // overflow: hidden;
  //不知道为什么溢出就变成只剩一个省略号了，先隐藏好了
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 99%;
}

/deep/.el-checkbox {
  @include overflow();
  border-radius: 10px !important;
  color:#003b55;
  margin: 3px !important;
  float: left;
  background-color: #c6d6dd !important;
  transition: 0.3s;
}
/deep/.el-checkbox__inner {
  //通过动画表现勾选 不可去除背景
    // background-color: #003b5500 !important;
}
/deep/.el-collapse-item__warp {
  background: none !important;
  background-color: none !important;
}
/deep/.el-collapse-item {
  background: none !important;
  background-color: none !important;
}
/deep/ .el-collapse-item__header {
  background: none !important;
  border: none;
  font-size: larger;
  margin-left: 20px;
  color: #003b55;
}

/deep/ .el-collapse{
  border: none;
 
}
.el-aside {
  position: sticky !important;
  top: 0;
}
.left {
  .el-card {
    margin: 15px 0px 15px 15px;
  }
  .display_zone {
    margin: 5px;
    box-shadow: 0 0 7px rgba(204, 204, 204, 0.713);
    background-color: rgb(255, 255, 255) !important;
    &:hover {
      border: solid 2px #003b55;
    }
  }
}
.right {
  margin-right: 20px;
  .el-card__body {
    padding: 5px !important;
  }
  .recommend {
    // border-radius: 10px !important;
    background: none;
    width: 100%;
    max-height: 75px; 
    margin-bottom: 20px;
    transition: 0.3s;
    padding: 2px;
    border-top: solid 1px #003b554d;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      cursor: pointer;
      border-radius: 10px;
      background: rgb(226, 226, 226);
      // padding: 5px;
      transform: scale(105%);
      // border: solid 2px #003b55;
    }
    &:active {
      transform: scale(90%);
    }
    h5 {
      // margin-left: 10%; 
      text-align: left;
    }
  }
}
.el-main {
  background: none;
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
#sort {
  border-radius: 10px;
  padding: 5px;
  background: rgba(228, 228, 228, 0.495);
  transition: 0.3s;
   &:hover {
    transform: scale(110%);
      cursor: pointer;
      // border: #000 solid 2px;
    }
    &:active {
      transform: scale(90%);
    }
}
</style>
