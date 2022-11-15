<template>
    <el-container class="root">
        <el-header>
            header
        </el-header>
        <el-container class="content">
                <el-main>
                    main
                </el-main>
                <el-aside width="300px">
                    right
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
    background-color: #D3DCE6;
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