<template> 
    <el-container class="root">
        <!-- <TopBar/>  -->
       <el-main class="left base" v-if="author.length != 0">
        <div class="author" >
            <el-card v-if="author.length != 0">
              <div class="author_img" @click="goto_person()">
                  <img :src="author.image" alt=""  >
                  <span class="title">{{author.name}}</span>
              </div>
              <div class="author_info">
                <span v-if="author.institution.length!=0">所属机构：<div v-for="i in author.institution" :key="i">{{i}}</div></span>
                <span v-else>所属机构：暂无数据</span>
                <span>发表论文数：{{author.paper_num}}</span>
                <span>发表笔记数：{{author.note_num}}</span>
              </div>
            </el-card>
            <el-card style="margin-top:10px" v-if="note.length != 0">
              <!-- <div class="note_info">
                <span>获赞：{{note.likes}}</span>
                <span>评论：{{note.remarks}}</span>
                <span>收藏：{{note.collections}}</span>
                <span>发表日期：{{note.time.split("T")[0]}}</span>
              </div> -->
              <div class="note_info">
                <span @click="goto_paper()" title="了解此论文" style="cursor:pointer; ">原论文：{{note.paper_name}}</span>
              </div>
              <div class="info">
                <div class="thumb">{{ note.likes }}</div>
                <i class="el-icon-star-off" title="收藏"
                  >&nbsp;{{ note.collections }}</i
                >
                <i class="el-icon-chat-round">&nbsp;{{ note.remarks }}</i>
              </div>
            </el-card>
            <div class="response">
              <el-button type="primary" @click="likeit()" v-if="note.like_flag">已赞</el-button>
              <el-button type="primary" @click="likeit()" v-else>点赞</el-button>
              <el-button type="primary" @click="collect()" v-if="note.collect_flag" title="取消收藏">已收藏</el-button>
              <el-button type="primary" @click="collect()" v-else title="收藏">收藏</el-button>
              <el-button v-if="author.subscribe_flag" title="取消关注" @click="subscribe(author)">已关注</el-button>
              <el-button v-else title="关注" @click="subscribe(author)">关注</el-button>
            </div>
        </div>
        <div class="notes">
          <div class="notes_title">
            <span>作者其他笔记</span>
          </div>
          <div v-for="i in list" :key="i">
              <noteCard :note="i"/>
          </div>
        </div>

       </el-main>
        <el-main class="right base" v-if="author.length != 0">
            <div class="content">
              <iframe style="width: 100%; height: 100%" :src="'/pdfjs-2.14.305-legacy-dist/web/viewer.html?file='+pdf_src" title="myFrame"></iframe>
                <!-- <el-card> 
                    
                     <div class="home_wrap">
                          <div class="pdf_down" >
                              <div class="pdf_set_left"  @click="scaleD()">放大</div>
                              <div class="pdf_set_middle" @click="scaleX()">缩小</div>
                          </div>

                            <pdf 
                              ref="pdf"
                              :src="pdf_src">
                            </pdf>
							<div :style="{width:pdf_div_width,margin:'0 auto'}" >
									<canvas v-for="page in pdf_pages" :id="'the_canvas'+page" :key="page"></canvas>
							</div>
							</div>
						</el-card> -->
					</div>
					<div class="remark">
						<el-card>
							<div class="creat_comment">
								<el-button id="comment" @click="CreatCommentVisible =true">我要评论</el-button>
							</div>
							<div v-if="remark_list.length != 0">
								<div class="comment" v-for="i in remark_list" :key="i">
									<remark :list="i" :note_id="note.note_id" @throw_remark="react_remark"/>
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
let isclick = true
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
         token:sessionStorage.getItem("token")
        }
    },
      methods:{
    
     goto_person(){
      let routeData = this.$router.resolve({
        name: 'PersonalInformation',
        params: { id: this.author.id }
      })
      window.open(routeData.href, '_blank')
     },
     goto_paper(){
        // this.$router.push({
        //   name:'PaperInformation',
        //   params:{
        //    paper_id:this.note.paper_id
        //   }
        // })
         let routeData = this.$router.resolve({
        name: 'PaperInformation',
        params: { paper_id:this.note.paper_id }
      })
      window.open(routeData.href, '_blank')
     },
      react_remark(data){
    
        if(data.op=="remark"){
             this.CreatCommentVisible = true;
            this.remark_id = data.remark_id
            this.receiver_id = data.sender_id
        }
        else if(data.op=="like"){
          //  this.noteRemarkInit()
        }
     },
     close_comment(data){
           this.CreatCommentVisible = false;
          this.noteRemarkInit()
     },
     likeit(){
        if(this.token){
          if(this.note.like_flag){
          this.$axios({
            url:"http://127.0.0.1:8000/paper/likeIt/",
            method:"post",
            data:{
               comment_id:"",
                note_id:this.note.note_id,
                op:0
            }
          }).then(res=>{
              this.noteInfoInit()
          })
        }
        else{
          this.$axios({
            url:"http://127.0.0.1:8000/paper/likeIt/",
            method:"post",
            data:{
               comment_id:"",
                note_id:this.note.note_id,
                op:1
            }
          }).then(res=>{
            this.noteInfoInit()
          })
        }
        }else{
        this.$message.warning("请先登录")
        setTimeout(()=>{this.$router.push({
        name: 'login',
      })},1000)
      //   setTimeout(()=>{let routeData = this.$router.resolve({
      //   name: 'login',
      // })
      // window.open(routeData.href, '_blank')},1000)
      }
        
    },
     collect(){
        if(this.token){
           if(this.note.collect_flag){
          this.$axios({
            url:"http://127.0.0.1:8000/paper/paperCollection/",
            method:"post",
            data:{
                paper_id:"",
                note_id:this.note.note_id,
                op:0
            }
          }).then(res=>{
              this.$message.success("已取消收藏")
              this.noteInfoInit()
          })
        }
        else{
          this.$axios({
            url:"http://127.0.0.1:8000/paper/paperCollection/",
            method:"post",
            data:{
                paper_id:"",
                note_id:this.note.note_id,
                op:1
            }
          }).then(res=>{
            this.$message.success("已收藏")
            this.noteInfoInit()
          })
        }
        }else{
        this.$message.warning("请先登录")
        setTimeout(()=>{this.$router.push({
        name: 'login',
      })},1000)
      //   setTimeout(()=>{let routeData = this.$router.resolve({
      //   name: 'login',
      // })
      // window.open(routeData.href, '_blank')},1000)
      }

       
     },
     subscribe(author){
        if(this.token){
           if(author.subscribe_flag){
          this.$axios({
            url:"http://127.0.0.1:8000/paper/subscribe/",
            method:"post",
            data:{
                author_id:author.id,
                op:0
            }
          }).then(res=>{
              this.$message.success("已取消关注")
              this.authorInit()
          })
        }
        else{
          this.$axios({
            url:"http://127.0.0.1:8000/paper/subscribe/",
            method:"post",
            data:{
                author_id:author.id,
                op:1
            }
          }).then(res=>{
            this.$message.success("已关注")
            this.authorInit()
          })
        }
        }else{
           this.$message.warning("请先登录")
          setTimeout(()=>{this.$router.push({
        name: 'login',
      })},1000)
      //  
      //   setTimeout(()=>{let routeData = this.$router.resolve({
      //   name: 'login',
      // })
      // window.open(routeData.href, '_blank')},1000)
      }

        
     },

     noteInfoInit(){
       this.$axios({
            url:"http://127.0.0.1:8000/paper/noteInfoInitNoToken/",
            method:"post",
            data:{
                note_id:this.$route.params.note_id
            }
        }).then(res=>{
            // this.pdf_src = res.data.note_info[0].note_url
            this.pdf_src = encodeURIComponent(res.data.note_info[0].note_url)
            this.note = res.data.note_info[0]
        })
     },
     authorInit(){
      this.$axios({
            url:"http://127.0.0.1:8000/paper/authorInitNoToken/",
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
            url:"http://127.0.0.1:8000/paper/otherNoteInitNoToken/",
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
            url:"http://127.0.0.1:8000/paper/noteRemarkInitNoToken/",
            method:"post",
            data:{
                note_id:this.$route.params.note_id
            }
        }).then(res=>{
            this.remark_list = res.data.remark_list
        })
     }
  },
    mounted () {
        //   this.get_pdfurl()
        // this.note_init();
        this.noteInfoInit();
        this.authorInit();
        this.noteRemarkInit();
        this.otherNoteInit();
    }
}
</script>

<style lang="scss" scoped>
@import "../../components/3infos.scss";
.thumb {
  @include thumb-base;
  background-image: url("../../assets/icon/like.svg");
}
.thumb-filled {
  @include thumb-base;
  background-image: url("../../assets/icon/like-filled.svg");
}
.root{
  margin: 0 auto;
  height: 100%;
  width: 100%;
}
.left{
    width: 25%;
		margin: 30px 30px 0px 100px;
    height: auto;
}
.left .author{
    // height: 500px;
    height: fit-content;
    margin-bottom: 20px;
}
.title {
  font-size: 20px;
  font-weight: 700;
  color: #003b55;
  transition: 0.3s;
 
  &:hover {
    cursor: pointer;
    border-radius: 10px;
    background: rgb(226, 226, 226);
    padding: 5px;
    transform: scale(110%);
    // border: solid 2px #003b55;
  }
  &:active {
    transform: scale(90%);
  }
}
$size: 60px;
.author img{
    width: $size;
    height: $size;
    border-radius: 50%;
    border: 1px solid grey;
    float: left;
}
.author_img{
  width:100%;
  height:$size + 5px;
  &:hover {
    cursor: pointer;
  }
  span {
    float: left;
    margin: 20px 0px 0px 10px;
  }
}

.author_info span{
    display: block;
    margin-top: 15px;
    text-align: left;
}
.note_info span{
    display: block;
    // margin-top: 15px;
    margin-bottom: 10px;
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
    // height: 100%;
    /* border: 1px solid grey; */
}
.left {
	height: fit-content;
	.el-card{
    // height: auto;
	}
	.notes{
    // width: 100%;
    // display: block;
    // margin-top:50px;
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
  height: fit-content;
.content{
    // min-height: calc(100vh);
    // height: fit-content;
    height: 800px;
    overflow-y: hidden;
		// .el-card{
		// 	height: 100%;
		// 	overflow-y: scroll;
		// }
	}
	.remark{
    // height: 600px;
    margin-top: 30px;
	}

}
.creat_comment{
  width:100%;
  margin-top: 10px;
	.el-button{
		width:90%;
		// opacity: 0.6;
	}
	// position: sticky;
	// position: -webkit-sticky;
	// top: 0;
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
  margin-top: 80px;
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
