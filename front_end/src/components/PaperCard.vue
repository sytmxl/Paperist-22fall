<template>
  <el-card shadow="hover">
    <h3 style="text-align: left" @click="jump2PaperInforMation">{{title}}</h3>
    <p style="text-align: left; margin-top: 1%; margin-right: 1%">{{limitWords(content)}}</p>

    <el-row>
      <el-col :span="16">
        <span style="margin-top: 2%; float: left">
          <p style=" text-align: left;color: #B3C0D1;display: inline;">作者: </p>
          <p style=" text-align: left;display: inline;">{{getAuthorsList()}}&nbsp;&nbsp; </p>
        </span>
        <span style="margin-top: 2%; float: left">
          <p style=" text-align: left;color: #B3C0D1;display: inline;">来源: </p>
          <p style=" text-align: left;display: inline;">{{source}}&nbsp;&nbsp; </p>
        </span>
        <span style="margin-top: 2%; float: left">
          <p style=" text-align: left;color: #B3C0D1;display: inline;">{{""}}被引: </p>
          <p style=" text-align: left;display: inline;">{{cite}} </p>
        </span>
        <span style="margin-top: 2%; float: left">
          <p style=" text-align: left;color: #B3C0D1;display: inline;">{{""}}年份: </p>
          <p style=" text-align: left;display: inline;">{{year}} </p>
        </span>
        <span style="margin-top: 2%; float: left">
          <p style=" text-align: left;color: #B3C0D1;display: inline;">{{""}}issue: </p>
          <p style=" text-align: left;display: inline;">{{issue}} </p>
        </span>
        <span style="margin-top: 2%; float: left">
          <p style=" text-align: left;color: #B3C0D1;display: inline;">{{""}}关键词: </p>
          <p style=" text-align: left;display: inline;">{{getKeywordsList()}} </p>
        </span>
      </el-col>
      <el-col :span="8">
        <el-button-group style="float: right; margin-bottom: 2%">
          <el-button type="default" @click = clickFavourite >
            <i v-if="isFavourite === false" class="el-icon-star-off"></i>
            <i v-else class="el-icon-star-on"></i>
          </el-button>
          <el-button type="primary" @click = clickFavourite>
            <i class="el-icon-paperclip"></i>
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>

export default {
  name: "PaperCard",
  props: {
    paper_data:{default:{}}
  },
  mounted() {

    let source = this.$props.paper_data._source
    if(source.title!=null) this.title = source.title
    if(source.authors!=null) this.authors = source.authors
    if(source.n_citation!=null) this.cite = source.n_citation
    if(source.abstract!=null) this.content = source.abstract
    if(source.venue != null && source.venue.raw!=null) this.source = source.venue.raw
    if(source.year!=null) this.year = source.year
    if(source.keywords!=null) this.keywords = source.keywords
    if(source.issue!=null) this.issue = source.issue
    if(source.id!=null) this.es_id = source.id


  },
  data(){
    return{
      isFavourite : false,
      title: "",
      authors: [],
      content: "未收录摘要",
      source:"未知",
      cite:"未知",
      year:"未知",
      keywords:[],
      issue:"未知",
      es_id : ""
    }
  },
  methods:{
    limitWords(txt){
      let str = txt;
      if(str.length > 500)
        str = str.substr(0,500) + '...';
      return str;
    },
    clickFavourite(){
      this.isFavourite = !this.isFavourite;
    },
    getAuthorsList(){
      let str = "";
      let len = this.authors.length-1
      for(let i = 0;i < len; i++){
        str = str + this.authors[i].name + ",";
      }
      str = this.limitWords(str + this.authors[this.authors.length-1].name)
      return str
    },
    getKeywordsList(){
      let str = "";
      let len = this.keywords.length-1
      for(let i = 0;i < len; i++){
        str = str + this.keywords[i] + ",";
      }
      str = this.limitWords(str + this.keywords[this.keywords.length-1])
      return str
    },
    jump2PaperInforMation(){
      this.$router.push({
        path: "/PaperInformation/" + this.es_id,
      })
    }
  }
}
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
</style>