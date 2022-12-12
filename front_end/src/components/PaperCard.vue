<template>
  <el-card shadow="hover">
    <h3
      class="PaperTitle"
      style="text-align: left"
      @click="jump2PaperInforMation"
    >
      {{ title }}
    </h3>
    <p style="text-align: left; margin-top: 1%; margin-right: 1%">
      {{ limitWords(content) }}
    </p>

    <el-row>
      <el-col :span="16">
        <span style="margin-top: 2%; float: left">
          <p style="text-align: left; color: #b3c0d1; display: inline">作者:</p>
          <p style="text-align: left; display: inline">
            {{ getAuthorsList() }}&nbsp;&nbsp;
          </p>
        </span>
        <span style="margin-top: 2%; float: left">
          <p style="text-align: left; color: #b3c0d1; display: inline">来源:</p>
          <p style="text-align: left; display: inline">
            {{ source }}&nbsp;&nbsp;
          </p>
        </span>
        <span style="margin-top: 2%; float: left">
          <p style="text-align: left; color: #b3c0d1; display: inline">
            {{ "" }}被引:
          </p>
          <p style="text-align: left; display: inline">
            {{ cite }} &nbsp;&nbsp;
          </p>
        </span>
        <span style="margin-top: 2%; float: left">
          <p style="text-align: left; color: #b3c0d1; display: inline">
            {{ "" }}年份:
          </p>
          <p style="text-align: left; display: inline">
            {{ year }} &nbsp;&nbsp;
          </p>
        </span>
        <span style="margin-top: 2%; float: left">
          <p style="text-align: left; color: #b3c0d1; display: inline">
            {{ "" }}issue:
          </p>
          <p style="text-align: left; display: inline">
            {{ issue }} &nbsp;&nbsp;
          </p>
        </span>
        <span style="margin-top: 2%; float: left">
          <p style="text-align: left; color: #b3c0d1; display: inline">
            {{ "" }}关键词:
          </p>
          <p style="text-align: left; display: inline">
            {{ getKeywordsList() }}
          </p>
        </span>
      </el-col>
      <el-col :span="8">
        <el-button-group style="float: right; margin-bottom: 2%">
          <el-button type="default" @click="clickFavourite">
            <i
              v-if="collect_flag === false"
              class="el-icon-star-off"
              @click="collect()"
              title="收藏"
            ></i>
            <i
              v-else
              class="el-icon-star-on"
              @click="collect()"
              title="取消收藏"
            ></i>
          </el-button>
          <el-button type="primary" @click="quote()">
            <i class="el-icon-paperclip"></i>
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
let isclick = true;
export default {
  name: "PaperCard",
  props: {
    paper_data: { default: {} },
  },
  mounted() {
    let source = this.$props.paper_data._source;
    if (source.title != null) this.title = source.title;
    if (source.authors != null) this.authors = source.authors;
    if (source.n_citation != null) this.cite = source.n_citation;
    if (source.abstract != null) this.content = source.abstract;
    if (source.venue != null && source.venue.raw != null)
      this.source = source.venue.raw;
    if (source.year != null) this.year = source.year;
    if (source.keywords != null) this.keywords = source.keywords;
    if (source.issue != null) this.issue = source.issue;
    if (source.id != null) this.es_id = source.id;
    this.quoteInit();
  },
  data() {
    return {
      QuoteVisible: false,
      collect_flag: false,
      title: "",
      authors: [],
      content: "未收录摘要",
      source: "未知",
      cite: "未知",
      year: "未知",
      keywords: [],
      issue: "未知",
      es_id: "",
      quote_list: [],
    };
  },
  methods: {
    quoteInit() {
      this.$axios({
        url: "http://127.0.0.1:8000/paperQuote/",
        method: "post",
        data: {
          paper_id: this.es_id,
        },
      }).then((res) => {
        this.quote_list = res.data.quote;
      });
    },
    quote() {
      this.$emit("quoteEmit", this.quote_list);
    },
    collect() {
      if (sessionStorage.getItem("token") == null) {
        this.$message.warning("请先登录");
      } else {
        this.collect_flag = !this.collect_flag;
        if (!this.collect_flag) {
          this.$axios({
            url: "http://127.0.0.1:8000/paperCollection/",
            method: "post",
            data: {
              paper_id: this.es_id,
              note_id: "",
              op: 0,
            },
          }).then((res) => {
            this.$message.success("已取消收藏");
          });
        } else {
          this.$axios({
            url: "http://127.0.0.1:8000/paperCollection/",
            method: "post",
            data: {
              paper_id: this.es_id,
              note_id: "",
              op: 1,
            },
          }).then((res) => {
            this.$message.success("已收藏");
          });
        }
        setTimeout(() => {
          isclick = true;
        }, 500);
      }
    },
    limitWords(txt) {
      let str = txt;
      if (str == null) return "";
      if (str.length > 500) str = str.substr(0, 500) + "...";
      return str;
    },
    clickFavourite() {
      this.collect_flag = !this.collect_flag;
    },
    getAuthorsList() {
      let str = "";
      let len = this.authors.length - 1;
      for (let i = 0; i < len; i++) {
        str = str + this.authors[i].name + ",";
      }
      str = this.limitWords(str + this.authors[this.authors.length - 1].name);
      return str;
    },
    getKeywordsList() {
      let str = "";
      let len = this.keywords.length - 1;
      for (let i = 0; i < len; i++) {
        str = str + this.keywords[i] + ",";
      }
      str = this.limitWords(str + this.keywords[this.keywords.length - 1]);
      return str;
    },
    jump2PaperInforMation() {
      let routeData = this.$router.resolve({
        name: "PaperInformation",
        params: { paper_id: this.es_id },
      });
      window.open(routeData.href, "_blank");
      // this.$router.push({
      //   path: "/PaperInformation/" + this.es_id,
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 15px;
  &:hover {
    // background: rgb(235, 235, 235);
  }
}
.el-button {
  // border-radius: 10px !important;
  margin-left: 10px !important;
  // margin-top: 10px;
}
.PaperTitle {
  &:hover {
    cursor: pointer;
  }
}
</style>
