<template>
    <el-container class="root">
       <el-container class="left">
            <el-card class="author">
              
            </el-card>
            <el-card class="notes">
             
            </el-card>
       </el-container>
        <el-container class="right">
            <el-card class="content">
             
            </el-card>
            <el-card class="remark">
             
            </el-card>
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