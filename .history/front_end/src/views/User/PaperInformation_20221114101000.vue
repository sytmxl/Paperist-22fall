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
                          <el-button round icon="el-icon-warning-outline">申诉</el-button>
                          <el-button round icon="el-icon-share">分享</el-button>
                      </div>

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
                      <el-tab-pane label="相关文献" @click="reload()">
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
                      </el-tab-pane>
                      <el-tab-pane label="评论" @click="reload()">
                            <div class="comment">
                                <remark/>
                            </div>
                            <div class="creat_comment">
                            </div>
                      </el-tab-pane>
                      <el-tab-pane label="笔记" @click="reload()">

                      </el-tab-pane>
                        <div id="load">
                          <el-button style="width:100%" @click="load()">加载更多</el-button>
                        </div>
                    </el-tabs>
                </div>
                </el-main>
                <el-aside>
                    <el-container>
                        <div class="about">
                                <div class="about_content" style="width:100%;height:80px">
                                    来源期刊
                                    <div class="ogjournal">
                                        <a href="https://book.qq.com/book-detail/34129913" style="text-decoration:none">山海经</a>
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
let loading
export default {
    data(){
      return{
        number:4,//后期要改成session
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
      reload(){
        this.number = 4;
      },
      load(){
        this.number = this.number + 6;
        loading = Loading.service({lock: true,text: '加载中……',background: 'rgba(0, 0, 0, 0.7)'});
        // loading.close();
      }
    },
    components:{
        aboutCard,
        remark,
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
.org{
  margin-top:15px;
  margin-bottom:15px;
  float: left;
  width: 50%;
}
.comment{
  
}
.el-tag{
  background-color:#f5f8f9;
}
.remark{
    margin-top:50px;
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
</style>