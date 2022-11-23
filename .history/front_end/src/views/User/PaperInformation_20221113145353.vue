<template>
    <el-container>
        <el-header>

        </el-header>
            <el-container>
                <el-aside width="300px">
                        left
                </el-aside>
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

<style lang="scss" scoped>
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