<template>
    <el-container class="root">
        <el-header>
            顶部导航栏组件
        </el-header>
        <el-container class="content">
                <el-main>
                 <div class="main">
                    <el-card class="box-card">
                      <div>
                        <span style="font-size:25px;font-weight:bolder">杰尾油</span>
                        <h5>来源：小马文学 &#12288; 引用次数：19156</h5>
                      </div>
                       <div  class="text item">
                        作者：马哥
                      </div>
                       <div  class="text item">
                        摘要：主要讲述了杰哥的故事
                      </div>
                       <div  class="text item">
                        关键词：卡戴珊、羊尾油、杰哥
                      </div>
                       <div  class="text item">
                        年份：2022/11/11
                      </div>
                       <div  class="text item">
                        doi：swmrw7
                      </div>
                      <div class="button">
                          <el-button round icon="el-icon-star-off">收藏</el-button>
                          <el-button round icon="el-icon-link">引用</el-button>
                          <el-button round icon="el-icon-warning-outline" @click="ComplainVisible = true">申诉</el-button>
                          <el-button round icon="el-icon-share">分享</el-button>
                      </div>
                                       <el-dialog
                                            title="文章申诉"
                                            :visible.sync="ComplainVisible"
                                            width="60%"
                                            :before-close="handleClose" class="complain">
                                            <div class="describe">
                                                问题描述：
                                              <el-input
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
                                                  action="#"
                                                  list-type="picture-card"
                                                  :auto-upload="false"
                                                  :accept="jpg"
                                                  :limit="4"
                                                  :on-exceed="handleExceed">
                                                    <i slot="default" class="el-icon-plus"></i>
                                                    <div slot="file" slot-scope="{file}">
                                                      <img
                                                        class="el-upload-list__item-thumbnail"
                                                        :src="file.url" alt=""
                                                      >
                                                      <span class="el-upload-list__item-actions">
                                                        <span
                                                          class="el-upload-list__item-preview"
                                                          @click="handlePictureCardPreview(file)"
                                                        >
                                                          <i class="el-icon-zoom-in"></i>
                                                        </span>
                                                        <span
                                                          v-if="!disabled"
                                                          class="el-upload-list__item-delete"
                                                          @click="handleDownload(file)"
                                                        >
                                                          <i class="el-icon-download"></i>
                                                        </span>
                                                        <span
                                                          v-if="!disabled"
                                                          class="el-upload-list__item-delete"
                                                          @click="handleRemove(file)"
                                                        >
                                                          <i class="el-icon-delete"></i>
                                                        </span>
                                                      </span>
                                                    </div>
                                                </el-upload>
                                                <el-dialog :visible.sync="dialogVisible">
                                                  <img width="100%" :src="dialogImageUrl" alt="">
                                                </el-dialog>
                                            </div>
                                            <div class="contact">
                                              联系方式：
                                              <el-input
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
                                              <el-button type="primary" @click="dialogVisible = false">提交申诉</el-button>
                                            </span>
                                       </el-dialog>

                    </el-card>
                    <el-card class="box-card2">
                       <span style="font-size:25px;font-weight:bolder">全部来源</span>
                       <div class="origion">
                            <div class="org">
                                <div class="logo">
                                    <img src="../../assets/Aminer.png" alt="" width="20px" height="20px">
                                </div>
                                 Aminer
                            </div>
                            <div class="org">
                                <div class="logo">
                                    <img src="../../assets/Aminer.png" alt="" width="20px" height="20px">
                                </div>
                                 Aminer
                            </div>
                            <div class="org">
                              <div class="logo">
                                  <img src="../../assets/Aminer.png" alt="" width="20px" height="20px">
                              </div>
                               Aminer
                            </div>
                       </div>
                    </el-card>
                 </div>
                <div class="remark">
                    <el-tabs type="border-card">
                      <el-tab-pane label="相关文献" @click="refresh()">
                          <div class="about">
                                <div class="relative">
                                    <aboutCard name="论杰哥" author="马哥" cite="12345" origin="小马文学" intro="这是一本介绍传奇男子swmrw7的故事，全文毫无尿点" date="2018"/>
                                </div>
                                  <div class="relative">
                                    <aboutCard name="论杰哥" author="马哥" cite="12345" origin="小马文学" intro="这是一本介绍传奇男子swmrw7的故事，全文毫无尿点" date="2018"/>
                                </div>
                                  <div class="relative">
                                    <aboutCard name="论杰哥" author="马哥" cite="12345" origin="小马文学" intro="这是一本介绍传奇男子swmrw7的故事，全文毫无尿点" date="2018"/>
                                </div>
                                  <div class="relative">
                                    <aboutCard name="论杰哥" author="马哥" cite="12345" origin="小马文学" intro="这是一本介绍传奇男子swmrw7的故事，全文毫无尿点" date="2018"/>
                                </div>
                        </div>
                         <div id="load">
                          <el-button style="width:100%" @click="load()" v-loading = "start">加载更多</el-button>
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="评论" @click="refresh()">
                            <div class="comment" v-for="i in remark_list" :key="i">
                                <remark :list="i"/>
                            </div>
                            <div class="creat_comment">
                                <el-button @click="CreatCommentVisible =true">我要评论</el-button>
                            </div>
                            <el-dialog
                                title="留下你的评论吧~"
                                :visible.sync="CreatCommentVisible"
                                width="30%"
                                :before-close="handleClose">
                                <CreateComment/>
                              </el-dialog>
                      </el-tab-pane>
                      <el-tab-pane label="笔记" @click="refresh()">

                      </el-tab-pane>
                       
                    </el-tabs>
                </div>
                </el-main>
                <el-aside>
                    <el-container>
                        <div class="about">
                                <div class="about_content" style="width:100%;height:80px">
                                    来源期刊
                                    <div class="ogjournal">
                                        <a href="https://book.qq.com/book-detail/34129913" style="text-decoration:none" class="journal_content">山海经</a>
                                    </div>
                                    
                                </div>
                                <div class="about_content" style="width:100%;height:200px">
                                    研究领域
                                    <div class="domain">
                                      <el-tag class="domain_content">人类学</el-tag>
                                      <el-tag class="domain_content">兽医</el-tag>
                                      <el-tag class="domain_content">抽象派文学</el-tag>
                                      <el-tag class="domain_content">后现代艺术</el-tag>
                                    </div>
                                </div>
                                <div class="about_content">
                                    <div id="echarts_box" style="width:100%;height:300px"></div>
                                </div>
                        </div>
                       
                    </el-container>
                </el-aside>
        </el-container>
    </el-container>
</template>


<script>
import * as echarts from 'echarts/core'
import { Loading } from 'element-ui';
import { init } from 'echarts';
import aboutCard from "../../components/aboutCard.vue"
import remark from "../../components/remark.vue"
import CreateComment from "../../components/CreateComment.vue"
let loading
export default {
  inject: ['reload'],
    data(){
      return{
        number:4,//后期要改成session
        start:false,
        ComplainVisible:false,
        dialogImageUrl: '',
        dialogVisible: false,
        CreatCommentVisible:false,
        describe:'',
        contact:'',
        remark_list:{1:{1:{flag:0,name:'胡博轩',image:"../assets/Cooper.jpg",comment:"马哥太尴尬了哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"},2:{flag:1,name:'李阳',image:"../assets/Cooper.jpg",res_name:'胡博轩',comment:"确实，怎么可以这么尬"},3:{flag:1,name:'朱康乐',image:"../assets/le.jpg",res_name:'李阳',comment:"你是懂尴尬的"},4:{flag:1,name:'马泽远',image:"../assets/ma.jpg",res_name:'胡博轩',comment:"基操勿6"}},
        2:{1:{flag:0,name:'马泽远',image:"../assets/ma.jpg",comment:"感谢大家支持"}},
        3:{1:{flag:0,name:'王域杰',image:"../assets/jie.jpg",comment:"苏珊，小心我告你"},2:{flag:1,name:'王域杰',image:"../assets/jie.jpg",res_name:'王域杰',comment:"别来沾边"},3:{flag:1,name:'朱康乐',image:"../assets/le.jpg",res_name:'王域杰',comment:"支持杰哥维权"},4:{flag:1,name:'马泽远',image:"../assets/ma.jpg",res_name:'王域杰',comment:"我错了杰哥，我苏珊"}},
        4:{1:{flag:0,name:'马泽远',image:"../assets/ma.jpg",comment:"感谢大家支持"}},
        5:{1:{flag:0,name:'王域杰',image:"../assets/jie.jpg",comment:"苏珊，小心我告你"},2:{flag:1,name:'王域杰',image:"../assets/jie.jpg",res_name:'王域杰',comment:"别来沾边"},3:{flag:1,name:'朱康乐',image:"../assets/le.jpg",res_name:'王域杰',comment:"支持杰哥维权"},4:{flag:1,name:'马泽远',image:"../assets/ma.jpg",res_name:'王域杰',comment:"我错了杰哥，我苏珊"}},}
      }
    },
    methods:{
      chart_init(){
        var myChart = echarts.init(document.getElementById('echarts_box'))
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
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
        });
      },
      refresh(){
        this.number = 4;
      },
      load(){
        this.number = this.number + 6;
        this.start = true;
        setTimeout(this.reload(), 1500 )
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
        this.$message.warning(`当前限制选择 4 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
    },
    components:{
        aboutCard,
        remark,
        CreateComment
    },
    created() {},
    mounted() {
      this.chart_init();
  
    }
}
</script>

<style scoped>
.root{
     height: 100%;
}
.content{
    height: auto;
    
}
.main{
   
}
.about{
    margin-left:10px;
}
.el-side{
  width:600px;
}
.ogjournal{
  margin-top:25px;
  font-size: 15px;
}
.about_content{
   margin-top: 20px;
   width: 280px;
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
.button .el-button{
  margin-right:50px;
}
.relative{
  margin-top: 20px;
}
.domain{
  margin-top:20px;
}
.domain_content{
  margin-top: 10px;
  margin-left:10px;
  color: #000;
}
.journal_content:hover{
  color: antiquewhite;
}
.journal_content{
  margin-top: 10px;
  margin-left:10px;
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
    margin-top:50px;
    
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
 width: 60%;
 padding: 20px;
}
.picture{
  padding: 20px;
}
.contact{
  width: 60%;
  padding: 20px;
}
.creat_comment{
  width:100%;
  
}
.creat_comment .el-button{
  width:100%;
  opacity: 0.6;
}
</style>