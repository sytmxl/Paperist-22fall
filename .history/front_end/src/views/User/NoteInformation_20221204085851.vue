<template>
    
    <el-container class="root">
        <!-- <TopBar/>  -->
       <el-main class="left base">
        <div class="author">
            <el-card>
              <div class="author_img">
                  <img :src="imgUrl" alt="">
                  <span>{{author.name}}</span>
              </div>
              <div class="author_info">
                <span>所属机构：<div v-for="i in author.institution" :key="i">{{i}}</div></span>
                <span>发表论文数：{{author.paper_num}}</span>
                <span>发表笔记数：{{author.note_num}}</span>
              </div>
            </el-card>
            <el-card style="margin-top:10px">
                <div class="note_info">
                <span @click="goto_paper()" title="了解此论文" style="cursor:pointer; ">原论文：{{note.paper_name}}</span>
                <span>获赞：{{note.likes}}</span>
                <span>评论：{{note.remarks}}</span>
                <span>收藏：{{note.collections}}</span>
              </div>
              <div class="response">
                <el-button type="primary" @click="likeit()" v-if="note.like_flag">已赞</el-button>
                <el-button type="primary" @click="likeit()" v-else>点赞</el-button>
                <el-button type="primary" @click="collect()" v-if="note.collect_flag" title="取消收藏">已收藏</el-button>
                <el-button type="primary" @click="collect()" v-else title="收藏">收藏</el-button>
                <el-button v-if="author.subscribe_flag" title="取消关注" @click="subscribe()">已关注</el-button>
                <el-button v-else title="关注" @click="subscribe()">关注</el-button>
              </div>
            </el-card>
        </div>
        <div class="notes">
            <!-- <el-card> -->
                <div class="notes_title">
                    <span>作者其他笔记</span>
                </div>
                <div v-for="i in list" :key="i">
                    <noteCard :note="i"/>
                </div>

            <!-- </el-card> -->
        </div>

       </el-main>
        <el-main class="right base">
            <div class="content">
                <el-card>
                    <!-- <iframe :src="url"></iframe> -->
                     <div class="home_wrap">
                          <!-- <div class="pdf_down" >
                              <div class="pdf_set_left"  @click="scaleD()">放大</div>
                              <div class="pdf_set_middle" @click="scaleX()">缩小</div>
                          </div> -->

                            <!-- <pdf 
                              ref="pdf"
                              :src="pdf_src">
                            </pdf> -->
							<div :style="{width:pdf_div_width,margin:'0 auto'}" >
									<canvas v-for="page in pdf_pages" :id="'the_canvas'+page" :key="page"></canvas>
							</div>
							</div>
						</el-card>
					</div>
					<div class="remark">
						<el-card>
							<div class="creat_comment">
								<el-button id="comment" @click="CreatCommentVisible =true">我要评论</el-button>
							</div>
							<div v-if="remark_list.length!=0">
								<div class="comment" v-for="i in remark_list" :key="i">
									<remark :list="i.remark" :note_id="note.note_id" @throw_remark="open_comment"/>
								</div>
							</div>
							<div v-else><el-empty description="还没有评论，发表第一个评论吧"></el-empty></div>
				
						</el-card>
            		
					</div>
          
       </el-main>
       	<el-dialog
								title="留下你的评论吧~"
								:visible.sync="CreatCommentVisible"
								width="30%"
								>
								<CreateComment :note_id="note.note_id" :receiver_id="this.receiver_id" :remark_id="this.remark_id" @finish_remark="close_comment"/>
				</el-dialog>
    </el-container>
</template>

<script>
import pdf from 'vue-pdf'
let PDFJS = require('pdfjs-dist');
PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry.js");
import remark from "../../components/remark.vue"
import CreateComment from "../../components/CreateComment.vue"
import TopBar from "@/components/TopBar";
import noteCard from "../../components/noteCard.vue";
export default {
    components:{
        remark,
        CreateComment,
        TopBar,
        noteCard,
        pdf
    },
    data(){
        return{
            // list:{1:{paper_name:"论杰哥",introduction:"介绍奇人杰哥",likes:8,collections:10,remarks:9},
            // 2:{paper_name:"论杰哥",introduction:"介绍奇人杰哥",likes:8,collections:10,remarks:9},
            // 3:{paper_name:"论杰哥",introduction:"介绍奇人杰哥",likes:8,collections:10,remarks:9},
            // 4:{paper_name:"论杰哥",introduction:"介绍奇人杰哥",likes:8,collections:10,remarks:9},
            // 5:{paper_name:"论杰哥",introduction:"介绍奇人杰哥",likes:8,collections:10,remarks:9}},
            list:[],
            imgUrl:"https://obs-0dcd.obs.cn-north-4.myhuaweicloud.com/1.png",
            author:{},
            note:{},
            pdf_scale:1.2,//pdf放大系数
  	 	    pdf_pages:[],
  	 	    pdf_div_width:'',
  	 	    pdf_src:null,
            CreatCommentVisible:false,
            remark_id:-1,
            receiver_id:-1,
        // remark_list:{1:{1:{flag:0,name:'胡博轩',image:require("../../assets/Cooper.jpg"),comment:"马哥太尴尬了哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"},2:{flag:1,name:'李阳',image:require("../../assets/mosy.jpg"),res_name:'胡博轩',comment:"确实，怎么可以这么尬"},3:{flag:1,name:'朱康乐',image:require("../../assets/le.jpg"),res_name:'李阳',comment:"你是懂尴尬的"},4:{flag:1,name:'马泽远',image:require("../../assets/ma.jpg"),res_name:'胡博轩',comment:"基操勿6"}},
        // 2:{1:{flag:0,name:'马泽远',image:require("../../assets/ma.jpg"),comment:"感谢大家支持"}},
        // 3:{1:{flag:0,name:'王域杰',image:require("../../assets/jie.jpg"),comment:"苏珊，小心我告你"},2:{flag:1,name:'王域杰',image:require("../../assets/jie.jpg"),res_name:'王域杰',comment:"别来沾边"},3:{flag:1,name:'朱康乐',image:require("../../assets/le.jpg"),res_name:'王域杰',comment:"支持杰哥维权"},4:{flag:1,name:'马泽远',image:require("../../assets/ma.jpg"),res_name:'王域杰',comment:"我错了杰哥，我苏珊"}},
        // 4:{1:{flag:0,name:'马泽远',image:require("../../assets/ma.jpg"),comment:"感谢大家支持"}},
        // 5:{1:{flag:0,name:'王域杰',image:require("../../assets/jie.jpg"),comment:"苏珊，小心我告你"},2:{flag:1,name:'王域杰',image:require("../../assets/jie.jpg"),res_name:'王域杰',comment:"别来沾边"},3:{flag:1,name:'朱康乐',image:require("../../assets/le.jpg"),res_name:'王域杰',comment:"支持杰哥维权"},4:{flag:1,name:'马泽远',image:require("../../assets/ma.jpg"),res_name:'王域杰',comment:"我错了杰哥，我苏珊"}},},
        remark_list:[],
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
        //  this.pdf_src = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
     
        // this.pdf_src = 'adminapi/blogs/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95/4%E3%80%81%E7%AC%AC%E5%9B%9B%E9%83%A8%E5%88%86%EF%BC%9A%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80%2814%E9%A2%98%29.pdf'
        // this.pdf_src = encodeURIComponent('../../../assets/test.pdf');
        //  this._loadFile(this.pdf_src)
     	//    return


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
        console.log(loadingTask)
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
     goto_paper(){
        this.$router.push({
          name:'PaperInformation',
          params:{
           paper_id:this.note.paper_id
          }
        })
     },
     open_comment(data){
        this.CreatCommentVisible = true;
        this.remark_id = data.remark_id
        this.receiver_id = data.sender_id
     },
     close_comment(data){
           this.CreatCommentVisible = false;
  
     },
     likeit(){
        if(this.note.like_flag){
          this.$axios({
            url:"http://127.0.0.1:8000/likeIt/",
            method:"post",
            data:{
               comment_id:"",
                note_id:this.note.note_id,
                op:0
            }
          }).then(res=>{
              
          })
        }
        else{
          this.$axios({
            url:"http://127.0.0.1:8000/likeIt/",
            method:"post",
            data:{
               comment_id:"",
                note_id:this.note.note_id,
                op:1
            }
          }).then(res=>{
            
          })
        }
    },
     collect(){
        if(this.note.collect_flag){
          this.$axios({
            url:"http://127.0.0.1:8000/paperCollection/",
            method:"post",
            data:{
                paper_id:"",
                note_id:this.note.note_id,
                op:0
            }
          }).then(res=>{
              this.$message.success("已取消收藏")
          })
        }
        else{
          this.$axios({
            url:"http://127.0.0.1:8000/paperCollection/",
            method:"post",
            data:{
                paper_id:"",
                note_id:this.note.note_id,
                op:1
            }
          }).then(res=>{
            this.$message.success("已收藏")
          })
        }
     },
     subcribe(){
         if(this.author.subscribe_flag){
          this.$axios({
            url:"http://127.0.0.1:8000/subScribe/",
            method:"post",
            data:{
                author_id:author.id,
                op:0
            }
          }).then(res=>{
              this.$message.success("已取消关注")
          })
        }
        else{
          this.$axios({
            url:"http://127.0.0.1:8000/subScribe/",
            method:"post",
            data:{
                author_id:author.id,
                op:1
            }
          }).then(res=>{
            this.$message.success("已关注")
          })
        }
     },
     note_init(){
        this.$axios({
            url:"http://127.0.0.1:8000/noteInit/",
            method:"post",
            data:{
                note_id:this.$route.params.note_id
            }
        }).then(res=>{
            this.pdf_src = res.data.note_info[0].note_url
            this.list = res.data.other_note
            this.author = res.data.author_info[0]
            this.note = res.data.note_info[0]
            this.remark_list = res.data.note_info[0].remark_list
            // this._loadFile(this.pdf_src)
        })
     },
     noteInfoInit(){
       this.$axios({
            url:"http://127.0.0.1:8000/noteInfoInit/",
            method:"post",
            data:{
                note_id:this.$route.params.note_id
            }
        }).then(res=>{
            this.pdf_src = res.data.note_info[0].note_url
            this.note = res.data.note_info[0]
        })
     },
     authorInit(){
      this.$axios({
            url:"http://127.0.0.1:8000/authorInit/",
            method:"post",
            data:{
                note_id:this.$route.params.note_id
            }
        }).then(res=>{
            this.author = res.data.author_info[0]
        })
     },
     otherNoteInit(){
      this.$axios({
            url:"http://127.0.0.1:8000/otherNoteInit/",
            method:"post",
            data:{
                note_id:this.$route.params.note_id
            }
        }).then(res=>{
            this.list = res.data.other_note
        })
     },
     noteRemarkInit(){
      this.$axios({
            url:"http://127.0.0.1:8000/noteRemarkInit/",
            method:"post",
            data:{
                note_id:this.$route.params.note_id
            }
        }).then(res=>{
            this.remark_list = res.data.note_info[0].remark_list
        })
     }
  },
     mounted () {
        //   this.get_pdfurl()
        this.note_init();
    }
}
</script>

<style lang="scss" scoped>
.left{
    width: 25%;
		margin: 30px 30px 0px 100px;
    height: auto;
}
.left .author{
    height: 500px;
    margin-bottom: 80px;
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
.note_info span{
    display: block;
    margin-top: 15px;
    text-align: left;
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
.left {
	height: fit-content;
	.el-card{
    height: auto;
	}
	.notes{
    margin-top:50px;
    // height: 550px;
    // overflow-y:scroll;
    // overflow-x:hidden;
	}
}
.right{
	width: 70%;
	margin-right: 100px;
		margin-top: 30px;
	 overflow: hidden;
	.content{
    height: calc(100vh);
		.el-card{
			height: 100%;
			overflow-y: scroll;
		}
	}
	.remark{
    // height: 600px;
    margin-top: 30px;
	}

}
.creat_comment{
  width:100%;
	.el-button{
		width:100%;
		// opacity: 0.6;
	}
	position: sticky;
	position: -webkit-sticky;
	top: 0;
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
.response{
    margin-top:20px;
    
}
.response .el-button{
    width: 30%;
    text-align: center;
}
.base {
  border-radius: 20px !important;
	border: none !important;
  box-shadow: 0 0 7px rgba(204, 204, 204, 0.713);
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px) brightness(100%);
	.el-card {
		background-color: rgba(255, 255, 255, 0.101) !important;
		border-radius: 15px !important;
		border: none !important;
	}
}

</style>
