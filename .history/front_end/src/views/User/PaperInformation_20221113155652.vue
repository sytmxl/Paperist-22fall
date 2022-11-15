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
                    评论/笔记区
                </div>
                </el-main>
                <el-aside width="300px">
                    <el-container>
                        <el-header height="0px">
                        </el-header>
                        <div class="about">
                             <!-- <div class="about_concent">
                             相关内容1
                            </div>
                            <div class="about_concent" style="margin-top:50px">
                             相关内容2
                            </div>
                            <div class="about_concent" style="margin-top:50px">
                             相关内容3
                            </div>
                            <div class="about_concent" style="margin-top:50px">
                             相关内容4
                            </div> -->
                            <div class="about_content" style="margin-top:50px">
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
.content .about .about_content{
   border: 2px solid #333;
   margin-top: 50px;
   height: 100px;
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

</style>