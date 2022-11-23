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
                        <h2>杰尾油</h2>
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
                      

                    </el-card>
                 </div>
                <div class="remark">
                    <el-tabs type="border-card">
                      <el-tab-pane label="相关文献">
                          <div class="about">
                                <div class="relative">
                                    <aboutCard name="论杰哥" author="马哥" cite="12345" origin="小马文学" intro="这是一本介绍传奇男子swmrw7的故事，全文毫无尿点"/>
                                </div>
                                  <div class="relative">
                                    <aboutCard/>
                                </div>
                                  <div class="relative">
                                    <aboutCard/>
                                </div>
                                  <div class="relative">
                                    <aboutCard/>
                                </div>
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="评论">评论</el-tab-pane>
                      <el-tab-pane label="笔记">笔记</el-tab-pane>
                    </el-tabs>
                </div>
                </el-main>
                <el-aside>
                    <el-container>
                        <div class="about">
                                <div class="about_content" style="width:100%;height:150px">
                                    来源期刊

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
import { init } from 'echarts';
import aboutCard from "../../components/aboutCard.vue"
export default {
    data(){
      return{

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
      }
    },
    components:{
        aboutCard
    },
    created() {},
    mounted() {
      this.chart_init();
  
    }
}
</script>

<style lang="scss" scoped>
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
.about_content{
   margin-top: 20px;
   width: 280px;
   font-weight: bold;
   text-align: left;
   font-size: 18px;
}
.button{
  margin-top: 20px;
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