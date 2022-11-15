<template>
    <el-container class="root">
       <el-main class="left">
        <div class="author">
            <el-card>
              <div class="author_img">
                  <img src="../../assets/Cooper.jpg" alt="">
                  <span>胡博轩</span>
              </div>
              <div class="author_info">
                <span>所属机构：北京航空航天大学</span>
                <span>发表论文数：0</span>
                <span>发表笔记数：10</span>
                <span>获赞：99</span>
                <span>评论：15</span>
                <span>收藏：20</span>
              </div>
            </el-card>
        </div>
        <div class="notes">
            <el-card>
                <div class="notes_title">
                    <span>作者其他笔记</span>
                </div>
             

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

<style scoped>
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
    border: 1px solid grey;
    float: left;
}
.author_img{
    width:100%;
    height:120px;
}
.author_img span{
    margin-top:50px;
    float: right;
    margin-right: 100px;
}
.author_info span{
    display: block;
    margin-top: 15px;
    text-align: left;
}
.notes_title span{
    display: block;
    text-align: left;
    size: 15px;
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