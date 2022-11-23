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
                <div v-for="i in list" :key="i">
                    <div class="other_note">
                        <el-card>
                            <span>论文名称：{{i.name}}</span>
                            <span>笔记简介：{{i.intro}}</span>
                            <i class="el-icon-thumb">{{i.likes}}</i>
                            <i class="el-icon-star-off">{{i.collections}}</i>
                            <i class="el-icon-chat-round">{{i.remarks}}</i>
                        </el-card>
                    </div>
                </div>

            </el-card>
        </div>

       </el-main>
        <el-main class="right">
            <div class="content">
                <el-card>
                    <iframe :src="'../../assets/pdf/web/viewer.html?file='+url"></iframe>
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

    data(){
        return{
            list:{1:{name:"论杰哥",intro:"介绍奇人杰哥",likes:8,collections:10,remarks:9},
            2:{name:"论杰哥",intro:"介绍奇人杰哥",likes:8,collections:10,remarks:9},
            3:{name:"论杰哥",intro:"介绍奇人杰哥",likes:8,collections:10,remarks:9},
            4:{name:"论杰哥",intro:"介绍奇人杰哥",likes:8,collections:10,remarks:9},
            5:{name:"论杰哥",intro:"介绍奇人杰哥",likes:8,collections:10,remarks:9}},
            imgUrl:"",
            author:{},
            url:"../../assets/test.pdf"
        }
    }
}
</script>

<style lang="scss" scoped>
.left{
    width: 25%;
    margin-left: 100px;
    margin-top: 50px;
    height: auto;
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
.other_note{
    margin-top: 15px;
}
.other_note span{
    display: block;
    text-align: left;
    margin-bottom: 15px;
}
.other_note i{
    display: block;
    float: left;
    margin-bottom: 15px;
    margin-right: 40px;
}
.notes_title span{
    display: block;
    text-align: left;
    font-weight: bolder;
    font-size: 15px;
}
.el-card{
    width:100%;
    height: 100%;
}
.left .el-card{
    height: auto;
}
.left .notes{
    margin-top:50px;
    height: 650px;
    overflow-y:scroll;
    overflow-x:hidden;
}
.right{
    width: 70%;
    margin-right: 100px;
     margin-top: 50px;
}
.right .content{
    height: 1000px;
}
.right .content .el-card{
    height: 100%;
}
.right .content iframe{
    width: 100%;
    height: 100%;
}
.right .remark{
    height: auto;
    margin-top: 50px;
}
</style>