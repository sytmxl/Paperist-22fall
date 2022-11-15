<template>
    <el-container>
       <el-container class="left">
        <el-header>
            <el-card class="author">
              
            </el-card>
        </el-header>
        <el-main>
            <el-card class="notes">
             
            </el-card>
        </el-main>
       </el-container>
        <el-container class="right">
        <el-main>
            <el-card class="content">
             
            </el-card>
        </el-main>
        <el-footer>
            <el-card class="remark">
             
            </el-card>
        </el-footer>
       </el-container>
    </el-container>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.left{
    width: 30%;
    margin-left: 100px;
}
.right{
    width: 60%;
    margin-right: 100px;
}
</style>