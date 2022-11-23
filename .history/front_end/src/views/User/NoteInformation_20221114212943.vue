<template>
    <el-container class="root">
       <el-main class="left">
        <div class="author">
            <el-card>
              <img src="../../assets/Cooper.jpg" alt="">

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
.author img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid black;
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
.right .content{
    height: 1000px;
}
.right .remark{
    height: auto;
}
</style>