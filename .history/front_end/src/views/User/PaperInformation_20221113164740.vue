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
                        <h5>来自：小马文学 </nbsp> 引用次数：19156</h5>
                      </div>
                       <div  class="text item">
                        作者：马哥
                      </div>
                       <div  class="text item">
                        摘要：主要讲述了杰哥的故事
                      </div>
                       <div  class="text item">
                        关键词：卡戴珊、羊尾油、王域杰
                      </div>
                       <div  class="text item">
                        年份：2022/11/11
                      </div>
                       <div  class="text item">
                        doi：swmrw7
                      </div>
                    </el-card>
                 </div>
                <div class="remark">
                    <el-tabs type="border-card">
                      <el-tab-pane label="评论">评论</el-tab-pane>
                      <el-tab-pane label="笔记">笔记</el-tab-pane>
                    </el-tabs>
                </div>
                </el-main>
                <el-aside>
                    <el-container>
                        <div class="about">
                                <div class="about_content">
                                    <aboutCard/>
                                </div>
                                  <div class="about_content">
                                    <aboutCard/>
                                </div>
                                  <div class="about_content">
                                    <aboutCard/>
                                </div>
                                  <div class="about_content">
                                    <aboutCard/>
                                </div>
                        </div>
                       
                    </el-container>
                </el-aside>
        </el-container>
    </el-container>
</template>


<script>
import aboutCard from "../../components/aboutCard.vue"
export default {
    data:{

    },
    components:{
        aboutCard
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
.about_content{
   margin-top: 20px;
   width: 280px;
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
    height: 800px;
  }
 .el-tabs>>>.el-tabs__nav{
    width:100%;
 }
 .el-tabs>>>.el-tabs__item{
    width:50%;
 }
</style>