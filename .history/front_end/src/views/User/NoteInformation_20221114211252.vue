<template>
    <el-container class="root">
       <el-main class="left">
        <div class="author">
            <el-card>
              
            </el-card>
        </div>
        <div class="notes">
            <el-card>
             
            </el-card>
        </div>

       </el-main>
        <el-main class="right">
            <div class="content">
                <el-card>
                
                </el-card>
            </div>
            <div class="remark">
                <el-card>
                
                </el-card>
            </div>

       </el-main>
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
.el-card{
    width:100%;
    height: 100%;
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