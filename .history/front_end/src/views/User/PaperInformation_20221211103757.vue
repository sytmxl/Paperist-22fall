<template>
    <el-container class="root">
      <el-container class="content">
        <el-main>
          <div class="main">
            <el-card class="box-card" v-if="info_list.length != 0">
              <div style="margin-bottom:20px">
                <span style="font-size:35px;font-weight:700;color: #003B55;">{{info_list.paper_name}}</span>
                <el-divider></el-divider>
                <h4 style="margin-top:20px">来源：{{info_list.origin}} &#12288; 引用次数：{{info_list.cite_number}}</h4>
              </div>
              
              <div  class="text item">
                作者：<span v-for="i in info_list.author_name" :key="i" style="margin-right:20px"> {{i}}</span>
              </div>
              <div  class="text item">
                摘要：{{info_list.abstract}}
              </div>
              <div  class="text item">
                关键词：<span v-for="i in info_list.keyword" :key="i"> {{i}}</span>
              </div>
              <div  class="text item">
                年份：{{info_list.date}}
              </div>
              <div  class="text item">
                DOI：{{info_list.DOI}}
              </div>
              <div class="button">
                  <el-button round icon="el-icon-star-off" v-if="!collect_flag" @click="collect()" title="收藏">收藏</el-button>
                  <el-button round icon="el-icon-star-on" v-else @click="collect()" title="取消收藏">已收藏</el-button>
                  <el-button round icon="el-icon-link" @click="quote()">引用</el-button>
                  <el-button round icon="el-icon-warning-outline" @click="ComplainVisible = true">申诉</el-button>
                  <el-button round icon="el-icon-share" @click="ShareVisible = true">分享</el-button>
              </div>
         
            </el-card>
            <el-card v-else>
              <el-skeleton :rows="10" animated/>
            </el-card>
            <el-card class="box-card2" v-if="info_list.length != 0">
                <span style="font-size:25px;font-weight:bolder">全部来源</span>
                <div class="origion" v-if="info_list.readlist.length != 0">
                    <div class="org" v-for="(i,index) in info_list.readlist" :key="index">
                        <div class="logo">
                             <a :href="i"  target="_blank" >阅读链接{{index+1}}</a>
                        </div>
                         
                    </div>
                </div>
                <div v-else><el-empty description="还没有笔记，发表第一篇笔记吧"></el-empty></div>
            </el-card>
            <el-card style="margin-top: 30px" v-else>
              <el-skeleton :rows="4" animated/>
            </el-card>
          </div>
          <div class="remark">
            <el-card  style="overflow-x: visible !important">
              <el-tabs style="overflow-x: visible !important">
                <el-tab-pane label="相关文献">
                    <div class="about" v-if="about_list.length!=0">
                      <div class="relative" v-for="(i,index) in about_list" :key="index">
                          <aboutCard  :name="i._source.title" :author="i._source.authors" :cite="i._source.n_citation" :origin="i._source.venue" :intro="i._source.abstract" :date="i._source.year" :paper_id="i._source.id"/>
                      </div>
                      <div id="load">
                          <el-button style="width:100%" @click="load()" v-loading = "start">加载更多</el-button>
                      </div>
                  </div>
                  <div v-else><el-empty description="尚无相关文献"></el-empty></div>
                    
                </el-tab-pane>
                <el-tab-pane label="评论">
                    <div class="creat_comment">
                          <el-button @click="CreatCommentVisible =true">我要评论</el-button>
                      </div>
                      <div v-if="Object.keys(remark_list).length!=0">
                        <div class="comment" v-for="i in remark_list" :key="i">
                          <remark :list="i" :paper_id="paper_id"  @throw_remark="react_remark"/>
                      </div>
                      </div>
                      <div v-else><el-empty description="还没有评论，发表第一个评论吧"></el-empty></div>
                    
                </el-tab-pane>
                <el-tab-pane label="笔记">
                      <div class="creat_mark">
                          <el-button @click="CreatMark =true">上传笔记</el-button>
                      </div>
                      <div v-if="Object.keys(mark_list).length!=0">
                        <div class="mark" v-for="i in mark_list" :key="i">
                          <!-- <note :list="i" @reaction_note="aboutNoteInit()"/> -->
                          <note :list="i" />
                        </div>
                      </div>
                      <div v-else><el-empty description="还没有笔记，发表第一篇笔记吧"></el-empty></div>
                      
                </el-tab-pane>
                  
              </el-tabs>
            </el-card>
            
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
                复制链接
              </el-button>
            </div>
          </el-dialog>
          <el-dialog
              :lock-scroll="false"
              title="文章申诉"
              :visible.sync="ComplainVisible"
              width="30%"
                class="complain">
              <div class="describe">
                  问题描述：
                <el-input
                style="margin-top:10px"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入需要申诉的内容"
                  v-model="describe"
                  maxlength="200"
                  show-word-limit
                  >
                </el-input>
              </div>
              <div class="picture">
                相关图片：
              <el-upload
                  class="upload-demo"
                  drag
                  action=""
                  :on-change="loadJsonFromFile"
                  :http-request="submitAvatarHttp"
                  :file-list="uploadFiles"
                  limit="1"
                  list-type="picture">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
              </el-upload>
              </div>
              <div class="contact">
                联系方式：
                <el-input
                style="margin-top:10px"
                  type="text"
                  placeholder="请输入你的联系方式，手机号、微信号、邮箱均可"
                  v-model="contact"
                  maxlength="25"
                  show-word-limit
                >
                </el-input>
              </div>
              <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="submit()">提交申诉</el-button>
              </span>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
          </el-dialog>
          <el-dialog
            title="分享"
            :visible.sync="ShareVisible"
            width="30%"
            :lock-scroll="false"
            >
            <div style="margin-bottom:40px">
              <span>{{path}}</span>
            </div>
            <el-button round icon="el-icon-document-copy" v-clipboard:copy="path" v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</el-button>
            
          </el-dialog>
          <el-dialog
                    title="上传笔记"
                    :visible.sync="CreatMark"
                    width="30%"
                    >
                    <uploadMark :paper_id="paper_id" @finish_upload="CreatMark=false"/>
          </el-dialog>
          <el-dialog
                title="留下你的评论吧~"
                :visible.sync="CreatCommentVisible"
                width="30%"
                >
                <CreateComment :paper_id="paper_id" :receiver_id="receiver_id" :remark_id="remark_id" @finish_remark="close_comment"/>
          </el-dialog>
        </el-main>
        <el-aside>
          <div class="about">
            <el-card class="gap" v-if="info_list.length != 0">
              <div class="about_content" style="width:100%;height: fit-content;">
                来源期刊
                <div class="ogjournal">
                  <a style="text-decoration:none" class="journal_content" @click="goto_search(info_list.origin)">{{info_list.origin}}</a>
                </div> 
              </div>
            </el-card>
            <el-card style="margin-top: 20px" v-else>
              <el-skeleton :rows="3" animated/>
            </el-card>
            <el-card class="gap"  v-if="info_list.length != 0">
              <div class="about_content" style="width:100%; height: fit-content;">
                研究领域
                <div class="domain">
                  <el-tag class="domain_content" v-for="i in info_list.domain" :key="i">{{i}}</el-tag>
                </div>
              </div>
            </el-card>
            <el-card style="margin-top: 30px" v-else>
              <el-skeleton :rows="4" animated/>
            </el-card>
            <el-card class="gap" v-if="info_list.length != 0">
              <div class="about_content">
                <div id="echarts_box" style="width:100%;height:300px"></div>
              </div>
            </el-card>
            <el-card style="margin-top: 30px" v-else>
              <el-skeleton :rows="7" animated/>
            </el-card>
          </div>
        </el-aside>
      </el-container>
    </el-container>
</template>
<script>
import * as echarts from 'echarts/core'
import { Loading, Skeleton } from 'element-ui';
import { init } from 'echarts';
import aboutCard from "../../components/aboutCard.vue"
import remark from "../../components/remark.vue"
import CreateComment from "../../components/CreateComment.vue"
import uploadMark from "../../components/uploadMark.vue"
import note from "../../components/note.vue"
import TopBar from "@/components/TopBar";
import $ from 'jquery';
import axios from "axios";
let formdata = new FormData();
let isclick = true;
export default {
  inject: ['reload'],
    data(){
      return{
        number:4,//后期要改成session
        now_index:1,
        start:false,
        activeName:"aboutPaper",
        ComplainVisible:false,
        QuoteVisible:false,
        ShareVisible:false,
        dialogImageUrl: '',
        dialogVisible: false,
        CreatCommentVisible:false,
        CreatMark:false,
        describe:'',
        contact:'',
        paper_id:this.$route.params.paper_id,
        about_list:{},
        now_list:[],
        info_list:[],
        quote_list:[],
        uploadFiles:[],
        remark_list:[],
        mark_list:[],
        authors:[],
        path:"localhost:8080"+this.$route.path,
        collect_flag:""
      }
    },
   
    methods:{
      load(){
        // this.start = true
        // this.number = this.number+4
        this.aboutListInit(this.authors,this.now_index)
        this.now_index = this.now_index +1
      },
      submitAvatarHttp(val){
       formdata.append('img',val.file)
      },
    loadJsonFromFile(file, fileList) {
      this.uploadFiles = fileList
    },
    onCopy (e) {
 this.$message.success("内容已复制到剪切板！")
},
// 复制失败时的回调函数
onError (e) {
 this.$message.error("抱歉，复制失败！")
},
      handleClick(tab, event){
        if(tab.name="note"){
           /* window.addEventListener("scroll", function() {
              sessionStorage.setItem("scrollTop", window.scrollY);
            });

            // 在页面加载完成后还原用户的滚动位置
            window.addEventListener("load", function() {
              let scrollTop = sessionStorage.getItem("scrollTop");
              window.scrollTo(0, scrollTop);
            });*/
            alert(this.activeName)
        }
        else if(tab.name="remark"){
            alert.log(this.activeName)
        }
        else if(tab.name="aboutPaper"){
            alert.log(this.activeName)
        }
      },
      chart_init(cite_number){
        if(cite_number<10){
          var a=[];
          a.push(0,0,0,0,0,cite_number)
        }
        else{
          var a=[];
          var y6 = cite_number;
          var y5 = parseInt(0.8*y6);
          var y4 = y5 - parseInt(Math.random()*(0.1*y5-1)+0.1*y5+1);
          var y3 = y4 - parseInt(Math.random()*(0.1*y4-1)+0.1*y4+1);
          var y2 = parseInt(0.6*y3);
          var y1 = parseInt(0.4*y2);
          a.push(y1,y2,y3,y4,y5,y6)
        }
        $(document).ready(function(){ var myChart = echarts.init(document.getElementById('echarts_box'))
        myChart.setOption({
        title: {
          text: '引用走势'
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['2017', '2018', '2019', '2020', '2021', '2022']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '引用量',
            type: 'line',
            data: a
          }
        ]
        });})
       
      },
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`最多上传四张图片`);
      },
      react_note(data){
        if(data.flag==1){
          this.aboutNoteInit()
        }
      },

      paperInfoInit(){
        this.$axios({
            url:"http://127.0.0.1:8000/paperInfoInit/",
            method:"post",
            data:{
                paper_id:this.$route.params.paper_id
            }
        }).then(res=>{
          // console.log(res.data.about_list)
            this.info_list = res.data.info_list[0]
            this.collect_flag = res.data.info_list[0].collect_flag
            this.chart_init(res.data.info_list[0].cite_number)
            // this._loadFile(this.pdf_src)
        })
      },
       aboutNoteInit(){
          this.$axios({
            url:"http://127.0.0.1:8000/aboutNoteInit/",
            method:"post",
            data:{
                paper_id:this.$route.params.paper_id
            }
        }).then(res=>{
          this.mark_list = res.data.note_list
        })
       },
       paperRemarkInit(){
          this.$axios({
            url:"http://127.0.0.1:8000/paperRemarkInit/",
            method:"post",
            data:{
                paper_id:this.$route.params.paper_id
            }
        }).then(res=>{
          this.remark_list = res.data.remark_list
        })
       },
      quoteInit(){
        this.$axios({
            url:"http://127.0.0.1:8000/paperQuote/",
            method:"post",
            data:{
                paper_id:this.$route.params.paper_id
            }
        }).then(res=>{
            this.quote_list = res.data.quote
        })
      },
      quote(){
        this.QuoteVisible = true
      },
      collect(){
        if(isclick){
          isclick = false;
          this.collect_flag = !this.collect_flag
           if(this.info_list.collect_flag){
          this.$axios({
            url:"http://127.0.0.1:8000/paperCollection/",
            method:"post",
            data:{
                paper_id:this.$route.params.paper_id,
                note_id:"",
                op:0
            }
          }).then(res=>{
              this.$message.success("已取消收藏")
              this.paperInfoInit()
          })
        }
        else{
          this.$axios({
            url:"http://127.0.0.1:8000/paperCollection/",
            method:"post",
            data:{
                paper_id:this.$route.params.paper_id,
                note_id:"",
                op:1
            }
          }).then(res=>{
            this.$message.success("已收藏")
            this.paperInfoInit()
          })
        }
        setTimeout(()=>{isclick=true},500)
        }
        else{
          this.$message.warning("请勿频繁操作")
        }
       
      },
      react_remark(data){
        if(data.op=="remark"){
             this.CreatCommentVisible = true;
            this.remark_id = data.remark_id
            this.receiver_id = data.sender_id
            console.log(data)
        }
        else if(data.op=="like"){
          //  this.paperRemarkInit()
        }
     },
     close_comment(data){
          this.CreatCommentVisible = false;
          this.paperRemarkInit()
     },

     submit(){
       this.$axios({
                method: "post",
                headers: { "Content-Type": "multipart/form-data" },
                url: "http://127.0.0.1:8000/paperComplain/" ,
                data: {
                  img: formdata.get('img'),
                  contact:this.contact,
                  introduction:this.describe,
                  paper_id:this.$route.params.paper_id
                },

              })
                .then((res) => {
                      this.ComplainVisible = false
                      
                });
     },
     get_authors(){
      let obj = {
        query:{
          bool:{
          must:[],
          filter:{},
        }
        }
      }
      obj.query.bool.must.push({"match_phrase":{"id":this.$route.params.paper_id}})
      obj.query.bool.filter={"match_phrase":{"id":this.$route.params.paper_id}}
      axios({
            headers: {
              'content-type': 'application/json',
            },
            auth: {
              username: 'elastic',
              password: 'BZYvLA-d*pS0EpI7utmJ'
            },
            url: '/es/paper/_search', method: "post",
            data: JSON.stringify(obj)
          }
      ).then(res=>{
        this.authors = res.data.hits.hits[0]._source.authors  
        console.log(res.data.hits.hits[0]._source.authors.length)
        // for(var i=0;i<res.data.hits.hits[0]._source.authors.length;i++){
        //   this.aboutListInit(res.data.hits.hits[0]._source.authors[i])
        // }
        this.aboutListInit(res.data.hits.hits[0]._source.authors,0)
      })
     },
     aboutListInit(authors,index){
      console.log(authors)
      let obj = {
        query:{
          bool:{
          must:[],
          filter:{}
        }
        }
      }
      obj.query.bool.must.push({"match_phrase":{"authors.id":authors[index].id}})
      obj.query.bool.filter={"match_phrase":{"authors.id":authors[index].id}}
      axios({
            headers: {
              'content-type': 'application/json',
            },
            auth: {
              username: 'elastic',
              password: 'BZYvLA-d*pS0EpI7utmJ'
            },
            url: '/es/paper/_search', method: "post",
            data: JSON.stringify(obj)
          }
      ).then(res=>{
        this.about_list.push(res.data.hits.hits)
      })
    },
    },
    components:{
        aboutCard,
        remark,
        CreateComment,
        uploadMark,
        note,
        TopBar,
    },
    created() {
      
    },
    mounted() {
      // this.paper_init();
      this.paperInfoInit()
      // this.aboutListInit()
      this.aboutNoteInit()
      this.paperRemarkInit()
      this.quoteInit()
      this.get_authors()
      // this.chart_init();
      
    }
}
</script>

<style lang="scss" scoped>
@mixin overflow {
  overflow-x: hidden;
  text-overflow:ellipsis;
  max-width: 100%;
}
.root{
  margin: 0 auto;
  height: 100%;
  width: 80%;
}
.content{
  margin-top: 60px;
  // width: 900px;
  height: auto;
  min-height: calc(100vh);
}
.el-main{
  // margin-left: 10vw;
}
.about{
  margin: 0px 5px;
}

.ogjournal{
  margin-top:25px;
  font-size: 15px;
}
.about_content{
  //  margin-top: 20px;
  //  width: 280px;
  height: 260px;
  font-weight: bold;
  text-align: left;
  font-size: 18px;
}
#load{
  margin-top:20px
}
.button{
  margin-top: 20px;
}
.logo{
  float: left;
  margin-right: 20px;
}
.logo a{
  text-decoration: none;
  color: #000;
}
.logo a:hover{
  cursor: pointer;
}
.logo a:after{
  color: #000;
}
.button .el-button{
  margin-right:50px;
}
.relative{
  margin-top: 20px;
}
.domain{
  // margin-top:20px;
}
.domain_content{
  margin-top: 10px;
  // margin-left:10px;
  color: #000;
}
.journal_content:hover{
  color: antiquewhite;
}
.journal_content{
  margin-top: 10px;
  
  // margin-left:10px;
  color: #000;
}
.org{
  margin-top:15px;
  margin-bottom:15px;
  float: left;
  width: 50%;
}
.el-tag{
  background-color:#f5f8f9;
}
.remark{
  margin-top:30px;
  overflow-x: visible !important
}
.el-tabs>>>.el-tabs__content{
  height: 800px;
  overflow-y: scroll;

}
  .text {
    font-size: 14px;
  }

  .item {
    padding: 10px 0;
  }

  .box-card {
    width: 100%;
    text-align: left;
  }
  .box-card2 {
    width: 100%;
    text-align: left;
    margin-top: 25px;
  }
  .el-tabs{
    height: 100%;
  }
 .el-tabs>>>.el-tabs__nav{
    width:100%;
 }
 .el-tabs>>>.el-tabs__item{
    width:33.4%;
 }
.describe{
//  width: 60%;
 padding: 20px;
 text-align: left;
}
.picture{
  padding: 20px;
  text-align: left;
}
.contact{
  // width: 60%;
  padding: 20px;
  text-align: left;
}
.creat_comment{
  width:100%;
}
.creat_comment .el-button{
  width:100%;
  // opacity: 0.6;
}
.creat_mark{
  width:100%;
}
.creat_mark .el-button{
  width:100%;
  // opacity: 0.6;
}
.el-card {
  border-radius: 20px !important;
  background-color: rgba(255, 255, 255, 0.535) !important;
  backdrop-filter: blur(40px) brightness(100%);
}
.relative {
  .el-card {
    border-radius: 10px !important;
    background-color: rgba(255, 255, 255, 0) !important;

  }
}
//tabs
.el-tabs--left {
  color: rgb(164, 170, 183) !important;
  /* background: #000; */
  border: rgba(164, 170, 183, 0.403) solid 1px;
  border-radius: 28px !important;
  // background-color: #ffffff7a;
  padding: 10px 0px;
}
/* 这里的样式应该只能用/deep/改 */
/deep/ .el-tabs__item.is-active {
  color: rgb(2, 2, 2);
}
/deep/ .el-tabs__item:hover {
  color: #75889c;
}
/deep/ .el-tabs__item {
  color: #909399;
  font-size: 14px;
  font-weight: 500;
}
/deep/ .el-tabs__active-bar {
  height: 4px;
  border-radius: 2px;
  background: #003B55;
}
.gap {
  margin-top: 20px;
  height: fit-content;
}
.el-tag {
  border-radius: 50px;
}
a {
  padding: 3px;
  border-radius: 5px;
  transition: 0.2s;
}
a:hover {
  background-color: rgb(219, 219, 219) !important;
  color: rgb(0, 0, 0) !important;
  cursor: pointer;
}

/deep/.el-tag {
  @include overflow();
  background-color: #003B55 !important;
  border: none;
  color: white;
}
</style>