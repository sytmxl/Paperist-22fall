<template>
    <el-container class="root">
        <el-header>
            顶部导航栏组件
        </el-header>
        <el-container class="content">
                <el-main>
                 <div class="main">
                    主要内容区域
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
                             <div class="about_concent">
                             相关内容1
                            </div>
                            <div class="about_concent">
                             相关内容2
                            </div>
                            <div class="about_concent">
                             相关内容3
                            </div>
                        </div>
                       
                    </el-container>
                </el-aside>
        </el-container>
    </el-container>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.root{
     height: 100%;
}
.content{
    height: 1000px;
    
}
.main{
   
}
.about{
    margin-left:10px;
}
.content .about .about_content{
   border: 2px solid #333;
   height: 100px;
}
.el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
    border: 1px solid red;
  }
  

</style>