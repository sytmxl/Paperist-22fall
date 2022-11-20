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
                    <!-- <iframe :src="url"></iframe> -->
                     <div class="home_wrap">
                          <div class="pdf_down" >
                              <div class="pdf_set_left"  @click="scaleD()">放大</div>
                              <div class="pdf_set_middle" @click="scaleX()">缩小</div>
                          </div>


                          <div :style="{width:pdf_div_width,margin:'0 auto'}" >
                              <canvas v-for="page in pdf_pages" :id="'the_canvas'+page" :key="page"></canvas>
                          </div>
                     </div>
                </el-card>
            </div>
            <div class="remark">
                <el-card>
                     <div class="creat_comment">
                                <el-button @click="CreatCommentVisible =true">我要评论</el-button>
                    </div>
                                <div v-if="Object.keys(remark_list).length!=0">
                              <div class="comment" v-for="i in remark_list" :key="i">
                                <remark :list="i"/>
                            </div>
                            </div>
                            <div v-else><el-empty description="还没有评论，发表第一个评论吧"></el-empty></div>
                            <el-dialog
                                title="留下你的评论吧~"
                                :visible.sync="CreatCommentVisible"
                                width="30%"
                                :before-close="handleClose">
                                <CreateComment/>
                              </el-dialog>
                </el-card>
            </div>

       </el-main>
    </el-container>
</template>

<script>
let PDFJS = require('pdfjs-dist');
PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry.js");
import remark from "../../components/remark.vue"
import CreateComment from "../../components/CreateComment.vue"
export default {
    components:{
        remark,
        CreateComment,

    },
    data(){
        return{
            list:{1:{name:"论杰哥",intro:"介绍奇人杰哥",likes:8,collections:10,remarks:9},
            2:{name:"论杰哥",intro:"介绍奇人杰哥",likes:8,collections:10,remarks:9},
            3:{name:"论杰哥",intro:"介绍奇人杰哥",likes:8,collections:10,remarks:9},
            4:{name:"论杰哥",intro:"介绍奇人杰哥",likes:8,collections:10,remarks:9},
            5:{name:"论杰哥",intro:"介绍奇人杰哥",likes:8,collections:10,remarks:9}},
            imgUrl:"",
            author:{},
            pdf_scale:1.0,//pdf放大系数
  	 	    pdf_pages:[],
  	 	    pdf_div_width:'',
  	 	    pdf_src:null,
            CreatCommentVisible:false,
            remark_list:{1:{1:{flag:0,name:'胡博轩',image:require("../assets/Cooper.jpg"),comment:"马哥太尴尬了哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"},2:{flag:1,name:'李阳',image:"../assets/Cooper.jpg",res_name:'胡博轩',comment:"确实，怎么可以这么尬"},3:{flag:1,name:'朱康乐',image:"../assets/le.jpg",res_name:'李阳',comment:"你是懂尴尬的"},4:{flag:1,name:'马泽远',image:"../assets/ma.jpg",res_name:'胡博轩',comment:"基操勿6"}},
        2:{1:{flag:0,name:'马泽远',image:"../assets/ma.jpg",comment:"感谢大家支持"}},
        3:{1:{flag:0,name:'王域杰',image:"../assets/jie.jpg",comment:"苏珊，小心我告你"},2:{flag:1,name:'王域杰',image:"../assets/jie.jpg",res_name:'王域杰',comment:"别来沾边"},3:{flag:1,name:'朱康乐',image:"../assets/le.jpg",res_name:'王域杰',comment:"支持杰哥维权"},4:{flag:1,name:'马泽远',image:"../assets/ma.jpg",res_name:'王域杰',comment:"我错了杰哥，我苏珊"}},
        4:{1:{flag:0,name:'马泽远',image:"../assets/ma.jpg",comment:"感谢大家支持"}},
        5:{1:{flag:0,name:'王域杰',image:"../assets/jie.jpg",comment:"苏珊，小心我告你"},2:{flag:1,name:'王域杰',image:"../assets/jie.jpg",res_name:'王域杰',comment:"别来沾边"},3:{flag:1,name:'朱康乐',image:"../assets/le.jpg",res_name:'王域杰',comment:"支持杰哥维权"},4:{flag:1,name:'马泽远',image:"../assets/ma.jpg",res_name:'王域杰',comment:"我错了杰哥，我苏珊"}},},
        textarea:''
        }
    },
      methods:{
     scaleD() {  //放大
         let max = 0
         if (window.screen.width > 1440) {
             max = 1.4
         }else{
           max = 1.2
         }
         if(this.pdf_scale >= max){
           return
         }
         this.pdf_scale = this.pdf_scale+0.1
         this._loadFile(this.pdf_src)
     },
     scaleX() {  //缩小
         let min = 1.0
         if(this.pdf_scale <= min){
           return
         }
         this.pdf_scale = this.pdf_scale - 0.1
         this._loadFile(this.pdf_src)
     },
     get_pdfurl(){  //获得pdf教案

     	   //加载本地
         this.pdf_src = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
     
        // this.pdf_src = 'adminapi/blogs/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95/4%E3%80%81%E7%AC%AC%E5%9B%9B%E9%83%A8%E5%88%86%EF%BC%9A%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80%2814%E9%A2%98%29.pdf'
        // this.pdf_src = encodeURIComponent('../../assets/test.pdf');
         this._loadFile(this.pdf_src)
     	   return


     	   //线上请求
        //  this.$axios.get('')
        //  .then((res)=>{
        //  	this.pdf_src = res.url
        //  	this._loadFile(this.pdf_src)
        //  })
     },
     _loadFile (url) {  //初始化pdf
     console.log(url);
        let loadingTask = PDFJS.getDocument(url)
        loadingTask.promise
        .then((pdf) => {
          this.pdfDoc = pdf
          this.pdf_pages = this.pdfDoc.numPages
          //debugger
          this.$nextTick(() => {
            this._renderPage(1)
          })
        })
     },
     _renderPage (num) {  //渲染pdf页
          const that = this
          this.pdfDoc.getPage(num)
          .then((page) => {
            let canvas = document.getElementById('the_canvas' + num)
            let ctx = canvas.getContext('2d')
            let dpr = window.devicePixelRatio || 1
            let bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1
            let ratio = dpr / bsr
            let viewport = page.getViewport({ scale: this.pdf_scale })

            canvas.width = viewport.width * ratio
            canvas.height = viewport.height * ratio

            canvas.style.width = viewport.width + 'px'

            that.pdf_div_width = viewport.width + 'px'

            canvas.style.height = viewport.height + 'px'

            ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
            let renderContext = {
              canvasContext: ctx,
              viewport: viewport
            }
            page.render(renderContext)
            if (this.pdf_pages > num) {
              this._renderPage(num + 1)
            }
          })
     },
  },
     mounted () {
          this.get_pdfurl()
    }
}
</script>

<style scoped>
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
    /* border: 1px solid grey; */
}
.left .el-card{
    height: auto;
}
.left .notes{
    margin-top:50px;
    height: 550px;
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
    overflow-y: scroll;
}
.right .remark{
    height: 600px;
    margin-top: 50px;

}
.right .remark .el-card{
      overflow-y: scroll;
    overflow-x:hidden;
}
.creat_comment{
  width:100%;

}
.creat_comment .el-button{
  width:100%;
  opacity: 0.6;

}
.home_wrap{
   width: 100%;
   height: 100%;
}
.pdf_down{
 position:fixed;
 display: flex;
 z-index: 20;
 right:26px;
 bottom:7%;
}
 .pdf_set_left{
      width: 30px;
      height: 40px;
      color: #408FFF;
      font-size: 11px;
      padding-top:25px;
      text-align: center;
      margin-right: 5px;
      cursor: pointer;
 }
 .pdf_set_middle{
      width: 30px;
      height: 40px;
      color: #408FFF;
      font-size: 11px;
      padding-top:25px;
      text-align: center;
      margin-right: 5px;
      cursor: pointer;
 }

</style>
