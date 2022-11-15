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
                        </el-main>

                    </el-container>
                </el-main>
                <el-aside width="300px">
                    <el-container>
                        <el-header>
                        </el-header>
                       <el-main>
                        相关内容1
                       </el-main>
                       <el-main>
                        相关内容2
                       </el-main>
                       <el-main>
                        相关内容3
                       </el-main>
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
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }

</style>