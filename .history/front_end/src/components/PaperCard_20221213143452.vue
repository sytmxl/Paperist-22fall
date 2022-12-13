<template>
  <el-card shadow="hover">
    <h3
      class="PaperTitle title"
      style="text-align: left; color: #003b55;"
      @click="jump2PaperInforMation"
    >
      {{ title }}
    </h3>
    <p v-if="content != '未收录摘要'" style="text-align: left; margin-top: 1%; margin-right: 1%">
      {{ limitWords(content) }}
    </p>

    <el-row>
      <el-col id="infocol" :span="16">
        <div>
                  <span style="margin-top: 2%; float: left">
          <p class="p1">作者:</p>
          <p class="p2">
            {{ getAuthorsList() }}&nbsp;&nbsp;
          </p>
        </span>
        <span style="margin-top: 2%; float: left">
          <p class="p1">来源:</p>
          <p class="p2">
            {{ source }}&nbsp;&nbsp;
          </p>
        </span>
        <span style="margin-top: 2%; float: left">
          <p class="p1">
            {{ "" }}被引:
          </p>
          <p class="p2">
            {{ cite }} &nbsp;&nbsp;
          </p>
        </span>
        <span style="margin-top: 2%; float: left">
          <p class="p1">
            {{ "" }}年份:
          </p>
          <p class="p2">
            {{ year }} &nbsp;&nbsp;
          </p>
        </span>
        <span v-if="issue != ''" style="margin-top: 2%; float: left">
          <p class="p1">
            {{ "" }}issue:
          </p>
          <p class="p2">
            {{ issue }} &nbsp;&nbsp;
          </p>
        </span>
        </div>

        <div>
            <span style="margin-top: 2%; float: left">
          <p class="p1">
            {{ "" }}关键词:
          </p>
          <p class="p2">
            {{ getKeywordsList() }}
          </p>
        </span>
        </div>
      
      </el-col>
      <el-col :span="8">
        <el-button-group style="float: right; margin-bottom: 2%">
          <el-button type="default" title="分享" v-clipboard:copy="'localhost:8080/PaperInformation/'+paper_data._source.id" v-clipboard:success="onCopy" v-clipboard:error="onError">
            <i class="el-icon-share"></i>
          </el-button>
          <el-button type="primary" title="引用" @click="quote(paper_data._source.id)">
            <i class="el-icon-paperclip"></i>
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>
     
  </el-card>
  
</template>

<script>
let isclick = true
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
      token:sessionStorage.getItem("token")
    };
  },
  methods: {
    onCopy (e) {
      this.$message.success("内容已复制到剪切板！")
    },
// 复制失败时的回调函数
    onError (e) {
      this.$message.error("抱歉，复制失败！")
    },
    quote(id){
      let data = {paper_id: id}
      this.$emit('react_quote',data)
    },
    limitWords(txt) {
      let str = txt;
      if (str == null) return "";
      if (str.length > 500) str = str.substr(0, 500) + "...";
      return str;
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
.title {
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    border-radius: 10px;
    background: rgb(226, 226, 226);
    padding: 5px;
    z-index: 99;
    transform: scale(102%);
    // border: solid 2px #003b55;
  }
  &:active {
    transform: scale(95%);
  }
}
span {
  width: fit-content;
  display: flex;
}
.p1 {
  text-align: left; 
  white-space: nowrap;
  color: #003b5596; 
  // display: inline;
  // font-weight: bold;
}
.p2 {
  text-align: left; 
  // display: inline;
}
#infocol {
  
  float: left;
}
</style>
