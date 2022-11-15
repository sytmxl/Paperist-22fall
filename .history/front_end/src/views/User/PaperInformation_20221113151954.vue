<template>
    <el-container class="root">
        <el-header>
            header
        </el-header>
        <el-container class="content">
                <el-main>
                    <el-container>
                        <el-header>
                            搜索框
                        </el-header>
                        <el-main>
                            主要内容区域
                            <div class="main">

                            </div>
                        </el-main>

                    </el-container>
                </el-main>
                <el-aside width="300px">
                    <el-container>
                        <el-header>
                        </el-header>
                        <div class="about">
                             <el-main>
                             相关内容1
                            </el-main>
                            <el-main>
                             相关内容2
                            </el-main>
                            <el-main>
                             相关内容3
                            </el-main>
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

<style scoped>
.root{
     height: 100%;
}
.content{
    height: 1000px;
    
}
.main{
   
}
.about{
    margin:10px;
    margin: top 20px;
}
.el-header, .el-footer {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 60px;
    /* border: 1px solid red; */
  }
  
  .el-aside {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 200px;
    /* border: 1px solid red; */
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    border: 1px solid red;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }

</style>