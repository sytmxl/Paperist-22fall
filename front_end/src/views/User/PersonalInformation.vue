<template>
  <el-card class="mainCard">
    <el-button @click="isScholar = !isScholar"
      >学者转换,去掉该按钮样式即恢复正常</el-button
    >
    <el-button @click="isOthers = !isOthers"
      >视角转换,去掉该按钮样式即恢复正常</el-button
    >
    <el-container>
      <el-main>
        <el-row style="margin-top: 1%; margin-bottom: 5.5%">
          <el-col :span="10">
            <!--:span占据行数-->
            <!--头像-->
            <img class="picture" src="../../assets/mosy.jpg" alt="" />
            <el-upload
              ref="upload"
              class="avatar-uploader"
              accept="JPG, .PNG, .JPEG,.jpg, .png, .jpeg"
              :headers="headers"
              action=""
              :multiple="false"
              :show-file-list="false"
              :http-request="uploadImg"
              :before-upload="beforeAvatarUpload"
              :on-change="handleChange"
            >
              <el-button
                size="mini"
                type="primary"
                round
                style="margin-top: 10px"
                >修改头像</el-button
              >
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png类型的图片,且不超过1MB
              </div>
            </el-upload>
          </el-col>

          <el-col :span="11" style="margin-top: 1.5%">
            <!--column2表示每行两个-->
            <el-descriptions
              :title="realname"
              :column="2"
              v-if="isEditPersonalInformation && !isOthers"
            >
              <template slot="extra">
                <el-button
                  type="primary"
                  size="small"
                  @click="isChangePassword = true"
                  >修改密码</el-button
                >
                <el-button
                  type="info"
                  size="small"
                  @click="isEditPersonalInformation = false"
                  >保存</el-button
                >
              </template>
              <el-descriptions-item label="真实姓名">
                <div style="width: 90%">
                  <el-input
                    v-model="new_realname"
                    :placeholder="realname"
                    size="small"
                  ></el-input>
                </div>
              </el-descriptions-item>
              <el-descriptions-item label="性别">
                <div style="width: 30%">
                  <el-select
                    v-model="new_gender"
                    :placeholder="gender"
                    size="small"
                  >
                    <el-option label="男" value="man"></el-option>
                    <el-option label="女" value="woman"></el-option>
                  </el-select>
                </div>
              </el-descriptions-item>
              <el-descriptions-item label="联系邮箱">
                <div style="width: 90%">
                  <el-input
                    v-model="new_email"
                    :placeholder="email"
                    size="small"
                  ></el-input>
                </div>
              </el-descriptions-item>
              <el-descriptions-item label="国家/地区">
                <div style="width: 60%">
                  <el-select
                    v-model="new_region"
                    :placeholder="region"
                    size="small"
                  >
                    <el-option label="中国大陆" value="region1"></el-option>
                    <el-option label="中国香港" value="region2"></el-option>
                    <el-option label="中国台湾" value="region3"></el-option>
                    <el-option label="美国" value="region4"></el-option>
                    <el-option label="英国" value="region5"></el-option>
                    <el-option label="德国" value="region6"></el-option>
                  </el-select>
                </div>
              </el-descriptions-item>
              <el-descriptions-item label="个性签名">
                <div style="width: 90%">
                  <el-input
                    v-model="new_personalProfile"
                    :placeholder="personalProfile"
                    size="small"
                  ></el-input>
                </div>
              </el-descriptions-item>
            </el-descriptions>

            <el-descriptions
              :title="realname"
              :column="2"
              v-if="!isEditPersonalInformation"
            >
              <template slot="extra">
                <el-button
                  type="primary"
                  size="small"
                  v-if="!isOthers"
                  @click="isChangePassword = true"
                  >修改密码</el-button
                >
                <el-button
                  type="primary"
                  size="small"
                  v-if="!isOthers"
                  @click="isEditPersonalInformation = true"
                  >修改信息</el-button
                >
              </template>
              <el-descriptions-item label="真实姓名">{{
                realname
              }}</el-descriptions-item>
              <el-descriptions-item label="性别">{{
                gender
              }}</el-descriptions-item>
              <el-descriptions-item label="联系邮箱">{{
                email
              }}</el-descriptions-item>
              <el-descriptions-item label="国家/地区">{{
                region
              }}</el-descriptions-item>
              <el-descriptions-item label="个性签名">{{
                personalProfile
              }}</el-descriptions-item>
            </el-descriptions>

            <el-descriptions>
              <el-descriptions-item
                label="研究领域"
                v-if="isScholar && !isEditPersonalInformation"
                >{{ researchField }}</el-descriptions-item
              >
            </el-descriptions>
          </el-col>
        </el-row>
        <el-dialog
          title="更改您的密码"
          :visible.sync="isChangePassword"
          width="30%"
          :before-close="handleClose"
        >
          <el-form>
            <el-form-item prop="" label="请输入旧密码：">
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="在此输入旧密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="" label="请输入新密码：">
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="在此输入新密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="" label="请再输入一遍新密码：">
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="再次输入新密码"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isChangePassword = false">取 消</el-button>
            <el-button type="primary" @click="isChangePassword = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>

        <div style="margin-top: 50px">
          <!--vmodel为打开时默认位置-->
          <el-tabs v-model="DefaultLocation" @tab-click="handleClick"
            ><!--stretch="true"表示平分空间-->
            <el-tab-pane label="作者文献" name="zero" v-if="isScholar">
              <h2 style="text-align: left">
                论文发表情况
                <span>
                  <el-tooltip class="item" effect="dark" placement="right">
                    <div slot="content">
                      论文发表情况展示了该学者在不同年份发表论文的数量情况
                    </div>
                    <i class="el-icon-info" style="font-size: 15px"></i>
                  </el-tooltip>
                </span>
              </h2>
              <el-divider />
              <ScholarLine :data="Linedata"> </ScholarLine>
              <h2 style="text-align: left; margin-top: 20px">
                学者关系网络
                <span>
                  <el-tooltip class="item" effect="dark" placement="right">
                    <div slot="content">
                      学者关系网络以该主页的学者为中心，与其合作过的作者将会和他连线，
                      <br />连线的结点的大小与合作文章数成正比，鼠标悬浮线上会显示合作文章数，
                      <br />点击其他结点时，如果该作者已经已经成为学者，将会跳转到其学者主页，
                      <br />如果没有认证成为学者便会进入搜索页面对这个作者进行搜索
                    </div>
                    <i class="el-icon-info" style="font-size: 15px"></i>
                  </el-tooltip>
                </span>
              </h2>
              <el-divider />
              <RelationShip
                :Mname="this.realname"
                :relations="RelationsData"
                :val="showRelation"
              ></RelationShip>
              <h2 style="text-align: left">论文列表</h2>
              <el-divider />
              111111111111
            </el-tab-pane>
            <el-tab-pane
              label="个人收藏"
              name="first"
              v-if="!isOthers || (isOthers && isCollectionVisible)"
            >
              <div style="margin-left: 1%">
                <div style="margin-top: 15px; width: 30%">
                  <div style="margin-top: 15px">
                    <el-input
                      placeholder="请输入你需要搜索的文献"
                      v-model="selectLiterature"
                      class="input-with-select"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-search"
                      ></el-button>
                    </el-input>
                  </div>
                </div>
                <el-card class="box-card">
                  <el-button
                    style="float: right; margin-left: 5px"
                    icon="el-icon-delete"
                    circle
                    size="small"
                  ></el-button>
                  <el-button
                    style="float: right"
                    icon="el-icon-more-outline"
                    circle
                    size="small"
                  ></el-button>
                  <div style="margin-bottom: 10px; text-align: left">
                    <a href="">文献名：你好你好</a>
                    <br />
                    <p>sssssssssssssssssssssssssssssssss</p>
                    <br />
                    <br />
                    <br />
                    <p>2022 Ma hu</p>
                  </div>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane label="个人订阅" name="second">
              <div style="margin-left: 1%">
                <div style="margin-top: 15px; width: 30%">
                  <el-input
                    placeholder="请输入你需要搜索的订阅"
                    v-model="selectSubscribe"
                    class="input-with-select"
                  >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </div>
                <el-card class="box-card">
                  <el-button
                    style="float: right; margin-left: 5px"
                    icon="el-icon-delete"
                    circle
                    size="small"
                  ></el-button>
                  <el-button
                    style="float: right"
                    icon="el-icon-more-outline"
                    circle
                    size="small"
                  ></el-button>
                  <div style="margin-bottom: 10px; text-align: left">
                    <a href="">文献名：你好你好</a>
                    <br />
                    <p>sssssssssssssssssssssssssssssssss</p>
                    <br />
                    <br />
                    <br />
                    <p>2022 Ma hu</p>
                  </div>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane
              :label="this.noteLabel"
              name="third"
              v-if="!isOthers || (isOthers && isNoteVisible)"
            >
              <div style="margin-left: 1%">
                <div style="margin-top: 15px; width: 30%">
                  <el-input
                    placeholder="请输入你需要搜索的笔记"
                    v-model="selectNote"
                    class="input-with-select"
                  >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </div>
                <el-card class="box-card">
                  <el-button
                    style="float: right; margin-left: 5px"
                    icon="el-icon-delete"
                    circle
                    size="small"
                  ></el-button>
                  <el-button
                    style="float: right"
                    icon="el-icon-more-outline"
                    circle
                    size="small"
                  ></el-button>
                  <div style="margin-bottom: 10px; text-align: left">
                    <a href="">文献名：你好你好</a>
                    <br />
                    <p>sssssssssssssssssssssssssssssssss</p>
                    <br />
                    <br />
                    <br />
                    <p>2022 Ma hu</p>
                  </div>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="我的评论"
              name="fourth"
              v-if="!isScholar && !isOthers"
            >
              <div style="margin-left: 1%">
                <div style="margin-top: 15px; width: 30%">
                  <el-input
                    placeholder="请输入你需要搜索的评论"
                    v-model="selectComment"
                    class="input-with-select"
                  >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </div>
                <el-card class="box-card">
                  <el-button
                    style="float: right; margin-left: 5px"
                    icon="el-icon-delete"
                    circle
                    size="small"
                  ></el-button>
                  <el-button
                    style="float: right"
                    icon="el-icon-more-outline"
                    circle
                    size="small"
                  ></el-button>
                  <div style="margin-bottom: 10px; text-align: left">
                    <a href="">文献名：你好你好</a>
                    <br />
                    <p>sssssssssssssssssssssssssssssssss</p>
                    <br />
                    <br />
                    <br />
                    <p>2022 Ma hu</p>
                  </div>
                </el-card>
              </div>
            </el-tab-pane>

            <el-tab-pane
              label="评论管理"
              name="fourth"
              v-if="isScholar && !isOthers"
            >
              <el-tabs tab-position="left">
                <el-tab-pane>
                  <span slot="label"
                    ><i class="el-icon-message-solid"></i>我给他人的</span
                  >
                  <div style="margin-top: 15px; width: 30%">
                    <el-input
                      placeholder="请输入你需要搜索的评论"
                      v-model="selectComment"
                      class="input-with-select"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-search"
                      ></el-button>
                    </el-input>
                  </div>
                  <el-card class="box-card">
                    <el-button
                      style="float: right; margin-left: 5px"
                      icon="el-icon-delete"
                      circle
                      size="small"
                    ></el-button>
                    <el-button
                      style="float: right"
                      icon="el-icon-more-outline"
                      circle
                      size="small"
                    ></el-button>
                    <div style="margin-bottom: 10px; text-align: left">
                      <a href="">文献名：你好你好</a>
                      <br />
                      <p>sssssssssssssssssssssssssssssssss</p>
                      <br />
                      <br />
                      <br />
                      <p>2022 Ma hu</p>
                    </div>
                  </el-card>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"
                    ><i class="el-icon-message-solid"></i>他人给我的</span
                  >
                  <div style="margin-top: 15px; width: 30%">
                    <el-input
                      placeholder="请输入你需要搜索的评论"
                      v-model="selectComment"
                      class="input-with-select"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-search"
                      ></el-button>
                    </el-input>
                  </div>
                  <el-card class="box-card">
                    <el-button
                      style="float: right; margin-left: 5px"
                      icon="el-icon-delete"
                      circle
                      size="small"
                    ></el-button>
                    <el-button
                      style="float: right"
                      icon="el-icon-more-outline"
                      circle
                      size="small"
                    ></el-button>
                    <div style="margin-bottom: 10px; text-align: left">
                      <a href="">文献名：你好你好</a>
                      <br />
                      <p>sssssssssssssssssssssssssssssssss</p>
                      <br />
                      <br />
                      <br />
                      <p>2022 Ma hu</p>
                    </div>
                  </el-card>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>

            <el-tab-pane label="个人设置" name="fifth" v-if="!isOthers">
              <div style="margin-left: 1%">
                <el-card class="box-card1">
                  <el-form :inline="true">
                    <el-form-item
                      label="笔记是否他人可见"
                      style="margin-left: 10%"
                    >
                      <el-switch v-model="isNoteVisible"></el-switch>
                    </el-form-item>
                    <el-form-item
                      label="系统配色方案"
                      style="margin-left: 100px"
                    >
                      <div style="width: 40%">
                        <el-select placeholder="天蓝">
                          <el-option label="天蓝" value="blue"></el-option>
                          <el-option label="灰色" value="grey"></el-option>
                        </el-select>
                      </div>
                    </el-form-item>
                  </el-form>

                  <el-form :inline="true">
                    <el-form-item
                      label="笔记下是否可评论"
                      style="margin-left: 10%"
                    >
                      <el-switch v-model="isNoteCommentable"></el-switch>
                    </el-form-item>
                    <el-form-item
                      label="系统配置语言"
                      style="margin-left: 100px"
                    >
                      <div style="width: 40%">
                        <el-select placeholder="中文">
                          <el-option label="中文" value="blue"></el-option>
                          <el-option label="英文" value="grey"></el-option>
                        </el-select>
                      </div>
                    </el-form-item>
                  </el-form>

                  <el-form :inline="true">
                    <el-form-item
                      label="文章下是否可评论"
                      style="margin-left: -15%"
                    >
                      <el-switch v-model="isLiteratureCommentable"></el-switch>
                    </el-form-item>
                    <el-form-item
                      label="收藏是否可见"
                      style="margin-left: 100px"
                    >
                      <el-switch v-model="isCollectionVisible"></el-switch>
                    </el-form-item>
                  </el-form>
                </el-card>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </el-card>
</template>

<script>
import RelationShip from "@/components/RelationShip.vue";
import ScholarLine from "@/components/ScholarLine.vue";
export default {
  name: "PersonalInformation",
  components: {
    RelationShip,
    ScholarLine,
  },
  data() {
    return {
      isNoteVisible: true,
      isNoteCommentable: true,
      isLiteratureCommentable: true,
      isCollectionVisible: true,
      isChangePassword: false,
      selectLiterature: "",
      selectLiteratureYear: "",
      selectComment: "",
      selectSubscribe: "",
      selectNote: "",
      username: "高远",
      realname: "高远",
      gender: "男",
      region: "中国大陆",
      email: "3394045013@qq.com",
      personalProfile:
        "你好你好你好你好，我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪",
      isEditPersonalInformation: false,
      new_username: "",
      new_realname: "",
      new_gender: "",
      new_region: "",
      new_email: "",
      new_personalProfile: "",
      DefaultLocation: "",
      noteLabel: "",
      isScholar: true,
      researchField: "打篮球",
      isOthers: false,
      showRelation: true,
      RelationsData: [
        {
          name: "皮蓬",
          value: 3,
          id: 1,
        },
        {
          name: "ss",
          value: 4,
          id: 2,
        },
        {
          name: "ssaw",
          value: 40,
          id: 3,
        },
      ],
      Linedata: [
        {
          count: 1,
          content: "2017",
        },
        {
          count: 2,
          content: "2018",
        },
        {
          count: 1,
          content: "2017",
        },
        {
          count: 2,
          content: "2018",
        },
        {
          count: 1,
          content: "2017",
        },
        {
          count: 2,
          content: "2018",
        },
      ],
    };
  },
  created() {
    if (this.isScholar) this.DefaultLocation = "zero";
    else this.DefaultLocation = "first";
    console.log(this.DefaultLocation);
    this.noteLabel = this.isOthers ? "他的笔记" : "我的笔记";
  },
  mounted() {
    this.noteLabel = this.isOthers ? "他的笔记" : "我的笔记";
  },
  watch: {
    isOthers: function (newVal, oldVal) {
      this.noteLabel = this.isOthers ? "他的笔记" : "我的笔记";
    },
  },
  methods: {},
};
</script>

<style scoped>
.picture {
  height: 150px;
  width: 150px;
  /*百分之50的圆角是圆*/
  border-radius: 50%;
}
.mainCard {
  height: 90%;
  width: 70%;
  margin-top: 5%;
  margin-left: 15%;
}

.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 98%;
  margin-top: 15px;
}
.box-card1 {
  width: 70%;
  margin-top: 15px;
  margin-left: 15%;
}
.changeBefore:hover {
  color: lightskyblue;
}
.changeAfter:hover {
  color: lightskyblue;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
