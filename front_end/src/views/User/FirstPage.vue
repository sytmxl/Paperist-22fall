<template >
  <div id="switch" class="light-mode" style="height:calc(100vh) width:calc(100vh)">
    <el-row class="header_show"> 
      这里是Header组件区 
      <button type="button" name="dark_light" @click="toggleDarkLight" title="Toggle dark/light mode">🌛</button>
    </el-row>
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
            <el-tab-pane label="订阅推送" name="second"
              ><div
                class="SubscribePlaceInfo"
                v-if="isEmptyObject(showSubscribeList)"
              >
                <span>你还没有订阅期刊&nbsp;\&nbsp;会议，快去</span>
                <a href="www.baidu.com">订阅</a>吧！
              </div>
              <aboutCard
                v-else
                v-for="(item, index) in showSubscribeList"
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
              </div></el-tab-pane
            >
          </el-tabs>
        </div>
      </el-col>
      <el-col :offset="1" :span="6"
        ><el-card class="box-card">
          <div class="index_new_paper_rank_meau">
            <div class="meau_title index_bold_font">热门领域</div>
            <div class="meau_params">热度</div>
          </div>
          <div class="index_new_paper_rank_content">
            <div v-for="(value, index) in hot" :key="value">
              <div v-for="(val, key) in value" :key="key">
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
                    <div class="content_item_cite">{{ parseInt(val) }}</div>
                  </a>
                </li>
              </div>
            </div>
          </div></el-card
        >
        <el-button type="primary" style="width: 45%" @click="uploadText()"
          >上传特定文献</el-button
        >
        <el-button type="danger" style="width: 45%" @click="uploadTextMiss()"
          >反馈文献缺失</el-button
        >
      </el-col>
    </el-row>
    <UploadText ref="UploadText"> </UploadText>
    <MissTextComplain ref="MissTextComplain"> </MissTextComplain>
    <!-- <el-dialog
      v-if="UploadDialogVisible"
      :modal="false"
      title="上传文献"
      :visible.sync="UploadDialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      top="10vh"
      center
    >
      <el-steps :active="active" align-center finish-status="success">
        <el-step title="文献基本信息"> </el-step>
        <el-step title="输入文献链接"> </el-step>
      </el-steps>
      <el-form
        v-show="active === 0"
        :model="Text"
        :rules="rules"
        ref="Text"
        label-width="110px"
        class="demo-Text"
        style="margin-top: 30px; padding-bottom: -20px"
        size="mini"
      >
        <el-form-item label="文献名称" prop="name">
          <el-input v-model="Text.name"></el-input>
        </el-form-item>
        <el-form-item label="文献作者" prop="author">
          <el-input v-model="Text.author">
            <el-dropdown slot="suffix" size="mini" placement="top-start">
              <i class="el-icon-warning-outline el-input__icon"> </i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled
                  >文章作者按顺序用顿号隔开</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown></el-input
          >
        </el-form-item>
        <el-form-item label="文献关键词" prop="keyword">
          <el-input v-model="Text.keyword"></el-input>
        </el-form-item>
        <el-form-item label="文献发表日期" prop="date">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="Text.date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="文献DOI" prop="doi">
          <el-input v-model="Text.doi"></el-input>
        </el-form-item>
        <el-form-item label="文献摘要" prop="summary">
          <el-input type="textarea" v-model="Text.summary"></el-input>
        </el-form-item>
      </el-form>
      <el-form
        v-show="active === 1"
        :model="Domains"
        ref="Domains"
        label-width="110px"
        class="demo-Text"
        style="margin-top: 30px; padding-bottom: -20px"
        size="mini"
        :inline="true"
      >
        <el-form-item
          v-for="(url, index) in Domains.urls"
          :label="'域名' + index"
          :key="url.key"
          :prop="'urls.' + index + '.value'"
          :rules="{
            required: true,
            message: '域名不能为空',
            trigger: 'blur',
          }"
          size="mini"
          ><el-col :span="21">
            <el-input v-model="url.value" style="width: 100%"></el-input
            ><el-button @click="addDomain">新增域名</el-button
            ><el-button @click.prevent="removeDomain(url)">删除</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <span v-if="active <= 0" slot="footer" class="dialog-footer">
        <el-button class="forget" @click="CancelUp()">取 消</el-button>
        <el-button @click="submitForm1('Text')">下一步</el-button>
      </span>
      <span v-else slot="footer" class="dialog-footer">
        <el-button class="forget" @click="CancelUp()">取 消</el-button>
        <el-button class="forget" @click="active = 0">上一步</el-button>
        <el-button
          class="forget"
          type="primary"
          @click="ConfirmUploadText('Domains')"
          >上 传
        </el-button>
      </span>
    </el-dialog> -->
    <!-- <el-dialog
      v-if="MissTextDialogVisible"
      :modal="false"
      title="反馈文献缺失"
      :visible.sync="MissTextDialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      top="10vh"
      center
    >
      <el-steps :active="Miss_Active" align-center finish-status="success">
        <el-step title="缺失文献基本信息"> </el-step>
        <el-step title="输入缺失文献链接"> </el-step>
      </el-steps>
      <el-form
        v-show="Miss_Active === 0"
        :model="MissText"
        :rules="rules"
        ref="MissText"
        label-width="110px"
        class="demo-MissText"
        style="margin-top: 30px; padding-bottom: -20px"
        size="mini"
      >
        <el-form-item label="文献名称" prop="name">
          <el-input v-model="MissText.name"></el-input>
        </el-form-item>
        <el-form-item label="文献作者" prop="author">
          <el-input v-model="MissText.author">
            <el-dropdown slot="suffix" size="mini" placement="top-start">
              <i class="el-icon-warning-outline el-input__icon"> </i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled
                  >文章作者按顺序用顿号隔开</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown></el-input
          >
        </el-form-item>
        <el-form-item label="文献关键词" prop="keyword">
          <el-input v-model="MissText.keyword"></el-input>
        </el-form-item>
        <el-form-item label="文献发表日期" prop="date">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="MissText.date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="文献DOI" prop="doi">
          <el-input v-model="MissText.doi"></el-input>
        </el-form-item>
        <el-form-item label="文献摘要" prop="summary">
          <el-input type="textarea" v-model="MissText.summary"></el-input>
        </el-form-item>
      </el-form>
      <el-form
        v-show="Miss_Active === 1"
        :model="MissDomains"
        ref="MissDomains"
        label-width="110px"
        class="demo-MissText"
        style="margin-top: 30px; padding-bottom: -20px"
        size="mini"
        :inline="true"
      >
        <el-form-item
          v-for="(url, index) in MissDomains.urls"
          :label="'域名' + index"
          :key="url.key"
          :prop="'urls.' + index + '.value'"
          :rules="{
            required: true,
            message: '域名不能为空',
            trigger: 'blur',
          }"
          size="mini"
          ><el-col :span="21">
            <el-input v-model="url.value" style="width: 100%"></el-input
            ><el-button @click="addMissDomain">新增域名</el-button
            ><el-button @click.prevent="removeMissDomain(url)">删除</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <span v-if="Miss_Active <= 0" slot="footer" class="dialog-footer">
        <el-button class="forget" @click="CancelUpMiss()">取 消</el-button>
        <el-button @click="submitForm1_Miss('MissText')">下一步</el-button>
      </span>
      <span v-else slot="footer" class="dialog-footer">
        <el-button class="forget" @click="CancelUpMiss()">取 消</el-button>
        <el-button class="forget" @click="Miss_Active = 0">上一步</el-button>
        <el-button
          class="forget"
          type="primary"
          @click="ConfirmUploadMissText('MissDomains')"
          >上 传
        </el-button>
      </span>
    </el-dialog> -->
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
export default {
  inject: ["reload"],
  components: {
    SearchBox,
    aboutCard,
    UploadText,
    MissTextComplain,
    RelationShip,
    ScholarLine,
  },
  created() {
    //获取信息
    // this.getRecommendList();
    // this.getSubscribeList();
  },
  mounted() {
    // 获取一些信息
    // this.getRecommendList();
    // this.getSubscribeList();
  },
  methods: {
    // 获取推荐文章
    // getRecommendList() {
    //   this.$http
    //     .get("/api/recommend")
    //     .then((res) => {
    //       this.recommendList = res.data;
    //       this.showRecommendList = this.recommendList.slice(0, 10);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // 获取订阅文章
    // getSubscribeList()
    // 搜索热门领域
    // search_field(arg) {
    //   this.$router.push({
    //     path: "/result",
    //     query: {
    //       input: arg,
    //       type: 2
    //     }
    //   });
    // },
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.next();
          // alert('submit!');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm1_Miss(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.next_Miss();
          // alert('submit!');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    next() {
      if (this.active++ > 1) this.active = 0;
    },
    next_Miss() {
      if (this.Miss_Active++ > 1) this.Miss_Active = 0;
    },
    search_field(arg) {},
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    uploadText() {
      this.$refs.UploadText.uploadText();
      // this.UploadDialogVisible = true;
    },
    uploadTextMiss() {
      this.$refs.MissTextComplain.uploadTextMiss();
    },
    CancelUp() {
      this.resetForm("Text"),
        this.resetForm("Domains"),
        (this.UploadDialogVisible = false),
        (this.active = 0);
    },
    CancelUpMiss() {
      this.resetForm("MissText"),
        this.resetForm("MissDomains"),
        (this.MissTextDialogVisible = false),
        (this.Miss_active = 0);
    },
    ConfirmUploadText(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发包
          alert("submit!");
          this.resetForm("Text");
          this.resetForm("Domains");
          this.active = 0;
          this.$nextTick(() => {
            this.UploadDialogVisible = false;
          });
          //
        } else {
          console.log("error submit!!");
        }
      });
    },
    ConfirmUploadMissText(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发包
          alert("submit!");
          this.resetForm("MissText");
          this.resetForm("MissDomains");
          this.Miss_Active = 0;
          this.$nextTick(() => {
            this.MissTextDialogVisible = false;
          });
          //
        } else {
          console.log("error submit!!");
        }
      });
    },
    loadRec() {
      this.start = true;
      setTimeout(() => {
        this.start = false;
        // 获取到全部数据，分布给用户展示
        this.showRecommendList = this.showRecommendList.concat(
          this.RecommendList
        );
      }, 2000);
    },
    loadSub() {
      this.start2 = true;
      setTimeout(() => {
        this.start2 = false;
        // 获取到全部数据，分布给用户展示
        this.showSubscribeList = this.showSubscribeList.concat(
          this.SubscribeList
        );
      }, 2000);
    },
    isEmptyObject(obj) {
      for (var key in obj) {
        return false;
      }
      return true;
    },
    removeDomain(item) {
      var index = this.Domains.urls.indexOf(item);
      if (index !== -1) {
        this.Domains.urls.splice(index, 1);
      }
    },
    addDomain() {
      this.Domains.urls.push({
        value: "",
        key: Date.now(),
      });
    },
    removeMissDomain(item) {
      var index = this.MissDomains.urls.indexOf(item);
      if (index !== -1) {
        this.MissDomains.urls.splice(index, 1);
      }
    },
    addMissDomain() {
      this.MissDomains.urls.push({
        value: "",
        key: Date.now(),
      });
    },
    toggleDarkLight() {
      var body = document.getElementById("app");
      var currentClass = body.className;
      body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
    },
  },
  data() {
    return {
      username: "乔丹",
      active: 0,
      Miss_Active: 0,
      input3: "",
      select: "",
      activeName: "first",
      start: false,
      start2: false,
      UploadDialogVisible: false,
      MissTextDialogVisible: false,
      RecommendList: [{}],
      Text: {
        name: "",
        author: "",
        keyword: "",
        date: "",
        doi: "",
        summary: "",
        href: "",
      },
      Domains: {
        urls: [
          {
            value: "",
          },
        ],
      },
      MissText: {
        name: "",
        author: "",
        keyword: "",
        date: "",
        doi: "",
        summary: "",
        href: "",
      },
      MissDomains: {
        urls: [
          {
            value: "",
          },
        ],
      },
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
      SubscribeList: [{}],
      showSubscribeList: [
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
};
</script>

<style lang="scss" scoped>
.home_logo {
  width: 200px;
  height: 70px;
}
.logo_area {
  width: 100%;
  margin: 0 auto;
  padding-top: 60px;
  clear: both;
}
.search_area {
  width: 100%;
  /* min-height: 300px; */
  margin: 0 auto;
  padding-top: 12px;
  clear: both;
}
// .header_show {
//   height: 45px;
//   background-color: #409eff;
//   color: #fff;
//   font-size: 20px;
//   line-height: 45px;
//   text-align: center;
// }

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
/* 给leftone添加阴影 */
.leftone {
  float: left;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 3px 15px 20px 15px;
  box-shadow: 0 0 10px #ccc;
  border-radius: 5px;
  background-color: #fff;
  overflow: hidden;
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
.SubscribePlaceInfo {
  line-height: calc(100vh);
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
</style>
