<template>
    <el-container class="root">
        <el-header>
            顶部导航栏组件
        </el-header>
        <el-container class="content">
                <el-main>
                 <div class="main">
                    <el-card class="box-card">
                      <div v-for="o in 4" :key="o" class="text item">
                        {{'列表内容 ' + o }}
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
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 100%;
    text-align: left;
  }
 .el-tabs>>>.el-tabs__nav{
    width:50%;
 }
</style>