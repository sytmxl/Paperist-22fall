<template>
    <el-container class="root">
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
        <el-header>
            <el-card class="content">
             
            </el-card>
        </el-header>
        <el-main>
            <el-card class="remark">
             
            </el-card>
        </el-main>
       </el-container>
    </el-container>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.left{
    width: 25%;
    margin-left: 100px;
    margin-top: 50px;
    height: 100%;
}
.left .author{
    height: 400px;
    margin-bottom: 50px;
}
.left .notes{
    margin-top:50px;
    height: 600px;
}
.right{
    width: 70%;
    margin-right: 100px;
     margin-top: 50px;
}
</style>