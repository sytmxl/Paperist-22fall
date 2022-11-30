<template>
  <el-card shadow="hover">
    <h3 style="text-align: left">{{$props.title}}</h3>
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
          <p v-for="keyword in keywords" style=" text-align: left;display: inline;">{{keyword}} </p>
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
import {$data} from "../../static/pdf/build/pdf.worker";

export default {
  name: "PaperCard",
  props: {
    title: {default :"关于ZCH费了半天劲也不知道该在这填点啥的研究"},
    authors: {default:[{
        "name": "Carmen Sandoval C",
        "id": "53f31f52dabfae9a8444c921"
      },{
        "name": "ZCH233",
        "id": "666666666666666"
      }]},
    content: {default: ""},
    source:{default:"自动废话集"},
    cite:{default:"N/A"},
    year:{default:null},
    keywords:[],
    issue:""
  },
  data(){
    return{
      isFavourite : false
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
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 15px;
}
.el-button {
  // border-radius: 10px !important;
  margin-left: 10px !important;
  // margin-top: 10px;
}
</style>