<template>
  <div class="light-mode" style="height:calc(100vh) width:calc(100vh)">
    <el-row class="logo_area">
      <div id="logo1" class="home_logo"></div>
    </el-row>
    <el-row class="search_area">
      <SearchBox />
    </el-row>
    <el-row :gutter="10" class="display_zone">
      <el-col :offset="3" :span="12">
        <div class="leftone">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="推荐文章" name="first">
              <aboutCard
                v-for="(item, index) in showRecommendList"
                :key="index"
                :name="item.name"
                :author="item.author"
                :cite="item.cite"
                :origin="item.origin"
                :intro="item.intro"
                :date="item.date"
              />
              <div id="load">
                <el-button
                  style="width: 100%"
                  @click="loadRec()"
                  v-loading="start"
                  >加载更多</el-button
                >
              </div>
            </el-tab-pane>
            <el-tab-pane label="关注笔记" name="second">
              <div v-if="!isLogin()" class="SubscribeNotePlaceInfo">
                <el-empty
                  description="你还没有登录，快去登录吧！"
                  :image-size="120"
                >
                  <el-button type="primary" @click="tologin()"
                    >立即登录</el-button
                  >
                </el-empty>
              </div>
              <div
                class="SubscribeNotePlaceInfo"
                v-else-if="isEmptyObject(showSubscribePeopleList)"
              >
                <el-empty
                  description="你还没有关注别人，快去逛逛吧！"
                  :image="require('@/assets/followuser.svg')"
                  :image-size="100"
                >
                </el-empty>
              </div>
              <div
                class="SubscribeNotePlaceInfo"
                v-else-if="isEmptyObject(showSubscribeNoteList)"
              >
                <el-empty
                  description="你关注的人，并没有笔记更新，快去逛逛吧！"
                  :image="require('@/assets/followNote.svg')"
                  :image-size="100"
                >
                </el-empty>
              </div>
              <div v-else>
                <aboutCard
                  v-for="(item, index) in showSubscribeNoteList"
                  :key="index"
                  :name="item.name"
                  :author="item.author"
                  :cite="item.cite"
                  :origin="item.origin"
                  :intro="item.intro"
                  :date="item.date"
                />
                <div id="load">
                  <el-button
                    style="width: 100%"
                    @click="loadSub()"
                    v-loading="start2"
                    >加载更多</el-button
                  >
                </div>
              </div></el-tab-pane
            >
            <el-tab-pane label="订阅文章" name="third">
              <div v-if="!isLogin()" class="SubscribeNotePlaceInfo">
                <el-empty
                  description="你还没有登录，快去登录吧！"
                  :image-size="120"
                >
                  <el-button type="primary" @click="tologin()"
                    >立即登录</el-button
                  >
                </el-empty>
              </div>
              <div
                class="SubscribeNotePlaceInfo"
                v-else-if="isEmptyObject(showSubscribePeopleList)"
              >
                <el-empty
                  description="你还没有关注别人，快去逛逛吧！"
                  :image="require('@/assets/followuser.svg')"
                  :image-size="100"
                >
                </el-empty>
              </div>
              <div
                class="SubscribeNotePlaceInfo"
                v-else-if="isEmptyObject(showSubscribeTextList)"
              >
                <el-empty
                  description="你关注的人，并没有文章更新，快去逛逛吧！"
                  :image="require('@/assets/followText.svg')"
                  :image-size="100"
                >
                </el-empty>
              </div>
              <div v-else>
                <aboutCard
                  v-for="(item, index) in showSubscribeTextList"
                  :key="index"
                  :name="item.name"
                  :author="item.author"
                  :cite="item.cite"
                  :origin="item.origin"
                  :intro="item.intro"
                  :date="item.date"
                />
                <div id="load">
                  <el-button
                    style="width: 100%"
                    @click="loadSub2()"
                    v-loading="start3"
                    >加载更多</el-button
                  >
                </div>
              </div></el-tab-pane
            >
          </el-tabs>
        </div>
      </el-col>
      <el-col :offset="1" :span="6">
        <el-card class="hot">
          <div class="index_new_paper_rank_meau">
            <div class="meau_title index_bold_font">热门领域</div>
            <div class="meau_params">热度</div>
          </div>
          <div class="index_new_paper_rank_content">
            <!-- 遍历列表 -->
            <div v-for="(item, index) in hot" :key="item">
              <!-- 遍历对象属性 -->
              <div v-for="(value, key) in item" :key="key">
                <li style="list-style: none">
                  <a>
                    <div class="content_item_id">
                      <span v-if="index === 0">
                        <i style="color: #fe2d46">{{ index + 1 }}</i>
                      </span>
                      <span v-else-if="index === 1">
                        <i style="color: #f60">{{ index + 1 }}</i>
                      </span>
                      <span v-else-if="index === 2">
                        <i style="color: #faa90e">{{ index + 1 }}</i>
                      </span>
                      <span v-else>
                        <i style="color: #9195a3">{{ index + 1 }}</i>
                      </span>
                    </div>
                    <div class="content_item_title" @click="search_field(key)">
                      {{ key }}
                    </div>
                    <div class="content_item_cite">{{ parseInt(value) }}</div>
                  </a>
                </li>
              </div>
            </div>
          </div></el-card
        >
        <!-- <el-button type="primary" style="width: 45%" @click="uploadText()"
          >上传特定文献</el-button
        > -->
        <el-button type="danger" style="width: 70%" @click="uploadTextMiss()"
          >反馈文献缺失</el-button
        >
      </el-col>
    </el-row>
    <!-- <UploadText ref="UploadText"> </UploadText> -->
    <MissTextComplain ref="MissTextComplain"> </MissTextComplain>
  </div>
</template>

<script>
import SearchBox from "../../components/SearchBox.vue";
import aboutCard from "@/components/aboutCard.vue";
import UploadText from "@/components/UploadText.vue";
import MissTextComplain from "@/components/MissTextComplain.vue";
import RelationShip from "@/components/RelationShip.vue";
import ScholarLine from "@/components/ScholarLine.vue";
import toggleDarkLight from "../../App.vue";
import TopBar from "@/components/TopBar";
export default {
  inject: ["reload"],
  components: {
    SearchBox,
    aboutCard,
    UploadText,
    MissTextComplain,
    RelationShip,
    ScholarLine,
    TopBar,
  },
  data() {
    return {
      username: "乔丹",
      input3: "",
      select: "",
      activeName: "first",
      start: false,
      start2: false,
      start3: false,
      recPage: 3,
      followNotePage: 3,
      followTextPage: 3,
      RecommendList: [{}],
      showRecommendList: [
        {
          name: "论杰哥",
          author: "马哥",
          cite: "100",
          origin: "中国科学院",
          intro: "杰哥是个大帅哥",
          date: "2020-10-10",
        },
        {
          name: "论杰哥",
          author: "马哥",
          cite: "100",
          origin: "中国科学院",
          intro: "杰哥是个大帅哥",
          date: "2020-10-10",
        },
        {
          name: "论杰哥",
          author: "马哥",
          cite: "100",
          origin: "中国科学院",
          intro: "杰哥是个大帅哥",
          date: "2020-10-10",
        },
      ],
      SubscribeNoteList: [{}],
      showSubscribeNoteList: [
        {
          name: "论杰哥",
          author: "马哥",
          cite: "100",
          origin: "中国科学院",
          intro: "杰哥是个大帅哥",
          date: "2020-10-10",
        },
        {
          name: "论杰哥",
          author: "马哥",
          cite: "100",
          origin: "中国科学院",
          intro: "杰哥是个大帅哥",
          date: "2020-10-10",
        },
        {
          name: "论杰哥",
          author: "马哥",
          cite: "100",
          origin: "中国科学院",
          intro: "杰哥是个大帅哥",
          date: "2020-10-10",
        },
      ],
      SubscribeTextList: [{}],
      showSubscribeTextList: [
        {
          name: "论杰哥",
          author: "马哥",
          cite: "100",
          origin: "中国科学院",
          intro: "杰哥是个大帅哥",
          date: "2020-10-10",
        },
        {
          name: "论杰哥",
          author: "马哥",
          cite: "100",
          origin: "中国科学院",
          intro: "杰哥是个大帅哥",
          date: "2020-10-10",
        },
        {
          name: "论杰哥",
          author: "马哥",
          cite: "100",
          origin: "中国科学院",
          intro: "杰哥是个大帅哥",
          date: "2020-10-10",
        },
      ],
      showSubscribePeopleList: [
        {
          name: "马哥",
          id: "32",
        },
      ],
      hot: [
        {
          人工智能: 100,
        },
        {
          人工智能: 100,
        },
        {
          人工智能: 100,
        },
        {
          人工智能: 100,
        },
      ],
      rules: {
        name: [
          { required: true, message: "请输入文献名称", trigger: "blur" },
          {
            min: 8,
            max: 20,
            message: "长度在 8 到 20 个字符",
            trigger: "blur",
          },
        ],
        author: [
          { required: true, message: "请输入作者名称", trigger: "blur" },
        ],
        keyword: [{ required: true, message: "请输入关键词", trigger: "blur" }],
        date: [
          { required: true, message: "请输入日期", trigger: "blur" },
          { type: "date", message: "请输入正确的日期格式", trigger: "change" },
        ],
        doi: [{ required: true, message: "请输入DOI", trigger: "blur" }],
        summary: [{ required: true, message: "请输入摘要", trigger: "blur" }],
      },
    };
  },
  created() {
    //获取信息
    // this.getRecommendList();
    // this.getSubscribeList();
    // this.getFollowTextList();
    // this.getHot();
  },
  mounted() {
    // 获取一些信息
    // this.getRecommendList();
    // this.getSubscribeList();
    // this.getFollowTextList();
    // this.getHot();
  },
  methods: {
    // 获取推荐文章
    // getRecommendList() {
    //   this.$axios({
    //     method: "get",
    //     url: "/api/recommend",
    //     params: {
    //       token:sessionStorage.getItem("token")===null?"":sessionStorage.getItem("token")
    //     },
    //   })
    //     .then((res) => {
    //       this.recommendList = res.data.data;
    //       this.showRecommendList = this.recommendList.slice(0, 3);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // 获取关注用户的笔记
    // getFollowNoteList() {
    //   this.$axios({
    //     method: "get",
    //     url: "/api/recommend",
    //     params: {
    //       token:sessionStorage.getItem("token")===null?"":sessionStorage.getItem("token")
    //     },
    //   })
    //     .then((res) => {
    //       this.showSubscribePeopleList=res.data.data;
    //       this.SubscribeNoteList= res.data.data;
    //       this.showSubscribeNoteList = this.SubscribeNoteList.slice(0, 3);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // 获取关注用户的文献
    // getFollowTextList() {
    //   this.$axios({
    //     method: "get",
    //     url: "/api/recommend",
    //     params: {
    //       token:sessionStorage.getItem("token")===null?"":sessionStorage.getItem("token")  //     },
    //   })
    //     .then((res) => {
    //       this.SubscribeTextList = res.data.data;
    //       this.showSubscribeTextList = this.SubscribeTextList.slice(0, 3);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // 获取热门领域
    // getHot() {
    //   this.$axios({
    //     method: "get",
    //     url: "/api/recommend",
    //     params: {}
    //   })
    //     .then((res) => {
    //       this.hot = res.data.data;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // 搜索热门领域
    // search_field(arg) {
    //   this.$router.push({
    //     path: "/result",
    //     query: {
    //       input: arg,
    //       type: 2,
    //     },
    //   });
    // },
    isLogin() {
      if (sessionStorage.getItem("token")) {
        return true;
      } else {
        return false;
      }
    },
    tologin() {
      this.$router.push({
        path: "/login",
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    loadRec() {
      this.start = true;
      setTimeout(() => {
        this.start = false;
        // 获取到全部数据，分布给用户展示
        this.showRecommendList = this.showRecommendList.concat(
          this.RecommendList.slice(this.recPage, this.recPage + 3)
        );
      }, 2000);
      this.recPage += 3;
    },
    loadSub() {
      this.start2 = true;
      setTimeout(() => {
        this.start2 = false;
        // 获取到全部数据，分布给用户展示
        this.showSubscribeNoteList = this.showSubscribeNoteList.concat(
          this.SubscribeNoteList.slice(
            this.followNotePage,
            this.followNotePage + 3
          )
        );
      }, 2000);
    },
    loadSub2() {
      this.start3 = true;
      setTimeout(() => {
        this.start3 = false;
        // 获取到全部数据，分布给用户展示
        this.showSubscribeTextList = this.showSubscribeTextList.concat(
          this.SubscribeTextList.slice(
            this.followTextPage,
            this.followTextPage + 3
          )
        );
      }, 2000);
    },
    isEmptyObject(obj) {
      for (var key in obj) {
        return false;
      }
      return true;
    },
    uploadTextMiss() {
      this.$refs.MissTextComplain.uploadTextMiss();
    },
    toggleDarkLight() {
      var body = document.getElementById("app");
      var currentClass = body.className;
      body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 800px) {
  .header_show {
    height: 45px;
    background-color: #6cdc93 !important;
    color: #fff;
    font-size: 20px;
    line-height: 45px;
    text-align: center;
  }
}
.search_input {
  margin: 10px auto;
  width: 800px;
  transition: 0.3s;
  // padding: auto;
  // overflow: hidden;
}
.home_logo {
  width: 300px;
  height: 200px;
  margin: 50px auto 0px;
}
.logo_area {
  width: 100%;
  margin: 0 auto;
  padding-top: 60px;
  clear: both;
}
.search_area {
  width: 100%;
  min-height: calc(10vh);
  margin: 0 auto;
  // padding-top: calc(5vh);
  clear: both;
}
.display_zone {
  width: 100%;
  min-height: 400px;
  margin: 0 auto;
  padding-top: 20px;
  clear: both;
}
.clearfix {
  float: left;
  font-size: 20px;
  clear: both;
}
.leftone {
  float: left;
  width: 100%;
  height: 100%;
  padding: 3px 15px 15px 15px;
  margin-bottom: 20px;

  border-radius: 20px !important;
  box-shadow: 0 0 7px rgba(204, 204, 204, 0.713);
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px) brightness(105%);

  overflow: hidden;
}
.hot {
  border-radius: 20px !important;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px) brightness(105%);
  margin-bottom: 15px !important;
  border: none;
}
.dark-mode {
  .leftone {
    background-color: rgba(143, 155, 167, 0.49);
    box-shadow: 0 0 0px #ccc;
  }
  .hot {
    background-color: rgba(143, 155, 167, 0.49);
    box-shadow: 0 0 0px #ccc;
    color: rgb(245, 245, 245) !important;
    .content_item_title,
    .content_item_cite,
    .meau_params {
      color: rgb(245, 245, 245) !important;
    }
  }
}

.index_new_paper_rank_meau {
  height: 22px;
  line-height: 22px;
  overflow: hidden;
}

.index_new_paper_rank_meau .meau_title {
  font-size: 22px;
  float: left;
}
.index_new_paper_rank_meau .meau_params {
  font-size: 14px;
  float: right;
  color: #666;
}
.index_new_paper_rank_content {
  margin-top: 20px;
}

.index_new_paper_rank_content li {
  height: 21px;
  margin-bottom: 13px;
  line-height: 21px;
  position: relative;
  cursor: pointer;
}

.index_new_paper_rank_content li a {
  width: 100%;
  display: inline-block;
}

.index_new_paper_rank_content li i {
  display: inline-block;
  height: 21px;
  width: 22px;
  line-height: 21px;
  font-size: 14px;
  font-style: normal;
}

.index_new_paper_rank_content li .content_item_title {
  max-width: 70%;
  margin-left: 4px;
  float: left;
  font-size: 14px;
  height: 21px;
  color: #000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.index_new_paper_rank_content li .content_item_id {
  width: 22px;
  height: 21px;
  float: left;
}

.index_new_paper_rank_content li .content_item_cite {
  width: 50px;
  float: right;
  font-size: 14px;
  color: #afafaf;
  height: 21px;
  text-align: right;
}
.SubscribeNotePlaceInfo {
  line-height: calc(10vh);
  font-size: 20px;
  font-weight: bold;
}
.index_bold_font {
  font-weight: 700;
}
.el-tabs >>> .el-tabs__nav {
  width: 100%;
}
.el-tabs >>> .el-tabs__item {
  width: 50%;
}
.el-tabs >>> .el-tabs__content {
  height: calc(100vh);
  overflow-y: auto;
}
.box-card {
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
}
.el-dialog >>> .el-dialog__body {
  border-top: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  max-height: 500px !important;
  min-height: 100px;
  overflow-y: auto;
}
#switch {
  padding: 5px;
  background-color: #fff !important;
  color: #003b55 !important;
  border: 2px solid #003b55 !important;
}
//tabs
.el-tabs--left {
  color: rgb(164, 170, 183) !important;
  /* background: #000; */
  border: rgba(164, 170, 183, 0.403) solid 1px;
  border-radius: 28px !important;
  // background-color: #ffffff7a;
  padding: 10px 0px;
}
/* 这里的样式应该只能用/deep/改 */
/deep/ .el-tabs__item.is-active {
  color: rgb(2, 2, 2);
}
/deep/ .el-tabs__item:hover {
  color: #75889c;
}
/deep/ .el-tabs__item {
  color: #909399;
  font-size: 14px;
  font-weight: 500;
}
/deep/ .el-tabs__active-bar {
  height: 4px;
  border-radius: 2px;
  background: #003b55;
}
/deep/.el-input-group {

}
</style>
