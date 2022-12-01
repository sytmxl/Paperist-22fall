<template>
  <el-card class="mainCard">
    <!-- <el-button @click="isScholar = !isScholar"
      >学者转换,去掉该按钮样式即恢复正常</el-button
    >
    <el-button @click="isOthers = !isOthers"
      >视角转换,去掉该按钮样式即恢复正常</el-button
    > -->
    <el-container>
      <el-main>
        <el-row id="info" style="margin-top: 20px; margin-bottom: 20px;">
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

          <el-col class="des" :span="11" style="margin-top: 1.5%">
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
                    @click="savePersonalInformation"
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
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
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
                    <el-option label="中国大陆" value="中国大陆"></el-option>
                    <el-option label="中国香港" value="中国香港"></el-option>
                    <el-option label="中国台湾" value="中国台湾"></el-option>
                    <el-option label="美国" value="美国"></el-option>
                    <el-option label="英国" value="英国"></el-option>
                    <el-option label="德国" value="德国"></el-option>
                    <el-option label="日本" value="日本"></el-option>
                    <el-option label="法国" value="法国"></el-option>
                    <el-option label="意大利" value="意大利"></el-option>
                    <el-option label="加拿大" value="加拿大"></el-option>
                    <el-option label="韩国" value="韩国"></el-option>
                    <el-option label="以色列" value="以色列"></el-option>
                    <el-option label="西班牙" value="西班牙"></el-option>
                    <el-option label="波兰" value="波兰"></el-option>
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
              <el-descriptions-item label="研究领域" v-if="isScholar">
                <div style="width: 100%">
                  <el-input
                      v-model="new_researchField"
                      :placeholder="researchField"
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
        <el-button @click="isScholar = !isScholar"
        >学者转换,去掉该按钮样式即恢复正常</el-button
        >
        <el-button @click="isOthers = !isOthers"
        >视角转换,去掉该按钮样式即恢复正常</el-button
        >
        <el-dialog
            title="更改您的密码"
            :visible.sync="isChangePassword"
            width="30%"
        >
          <el-form>
            <el-form-item prop="" label="请输入旧密码：">
              <el-input
                  prefix-icon="el-icon-lock"
                  placeholder="在此输入旧密码"
                  v-model="oldPassword"
              ></el-input>
            </el-form-item>
            <el-form-item prop="" label="请输入新密码：">
              <el-input
                  prefix-icon="el-icon-lock"
                  placeholder="在此输入新密码"
                  v-model="newPassword"
                  @keyup.enter.native="changePassword"
              ></el-input>
            </el-form-item>
            <el-form-item prop="" label="请再输入一遍新密码：">
              <el-input
                  prefix-icon="el-icon-lock"
                  placeholder="再次输入新密码"
                  v-model="confirmNewPassword"
                  @keyup.enter.native="changePassword"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isChangePassword = false">取 消</el-button>
            <el-button type="primary" @click="changePassword"
            >确 定</el-button
            >
          </span>
        </el-dialog>

        <div style="margin-top: 50px">
          <!--vmodel为打开时默认位置-->
          <el-tabs v-model="DefaultLocation" @tab-click="handleClickAll"><!--stretch="true"表示平分空间-->
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
              <el-tabs v-model="collectionDefaultLocation" tab-position="left" @tab-click="handleClickCollection">
                <el-tab-pane name="collectionFirst">
                  <span slot="label"
                  ><i class="el-icon-message-solid"></i>论文收藏</span
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
                          @click="searchPaperCollection"
                      ></el-button>
                    </el-input>
                  </div>
                </div>
                <div v-for="item in this.paperCollection">
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
                      <a href="">{{item.name}}</a>
                      <br />
                      <p>{{item.abstract}}</p>
                      <br />
                      <br />
                      <br />
                      <p>{{item.time}}</p>
                    </div>
                  </el-card>
                </div>

              </div>
                </el-tab-pane>
                <el-tab-pane name="collectionSecond">
                  <span slot="label">
                    <i class="el-icon-message-solid"></i>笔记收藏</span>
                  <div style="margin-left: 1%">
                    <div style="margin-top: 15px; width: 30%">
                      <div style="margin-top: 15px">
                        <el-input
                            placeholder="请输入你需要搜索的笔记"
                            v-model="selectCollectionNote"
                            class="input-with-select"
                        >
                          <el-button
                              slot="append"
                              icon="el-icon-search"
                          ></el-button>
                        </el-input>
                      </div>
                    </div>
                    <div v-for="item in this.noteCollection">
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
                          <a href="">{{item.id}}</a>
                          <br />
                          <p>{{ item.introduction }}</p>
                          <br />
                          <br />
                          <br />
                          <p>{{item.time}}</p>
                        </div>
                      </el-card>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
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
                <div v-for="item in this.notes">
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
                      <a href="">{{item.id}}</a>
                      <br />
                      <p>{{item.introduction}}</p>
                      <br />
                      <br />
                      <br />
                      <p>{{item.time}}</p>
                    </div>
                  </el-card>
                </div>

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
                <div v-for="item in this.myComment">
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
                      <a href="">{{item.paper_name}}</a>
                      <br />
                      <p>{{item.content}}</p>
                      <br />
                      <br />
                      <br />
                      <p>{{item.time}}</p>
                    </div>
                  </el-card>
                </div>

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
import TopBar from "@/components/TopBar";
import axios from "axios";
// import CryptoJS from "_crypto-js@4.1.1@crypto-js";
export default {
  name: "PersonalInformation",
  components: {
    RelationShip,
    ScholarLine,
    TopBar,
  },
  data() {
    return {
      isNoteVisible: true,
      isNoteCommentable: true,
      isLiteratureCommentable: true,
      isCollectionVisible: true,
      isChangePassword: false,
      selectLiterature: "",
      selectCollectionNote:"",
      selectLiteratureYear: "",
      selectComment: "",
      selectSubscribe: "",
      selectNote: "",
      username: "",
      realname: "",
      gender: "",
      region: "",
      email: "",
      personalProfile:
          "",
      isEditPersonalInformation: false,
      new_username: "",
      new_realname: "",
      new_gender: "",
      new_region: "",
      new_email: "",
      new_researchField:"",
      new_personalProfile: "",
      DefaultLocation: "",
      collectionDefaultLocation:"collectionFirst",
      commentDefaultLocation:"commentFirst",
      noteLabel: "",
      isScholar: true,
      researchField: "打篮球",
      isOthers: false,
      showRelation: true,
      oldPassword:"",
      newPassword:"",
      confirmNewPassword:"",

      paperCollection:[],
      noteCollection:[],
      notes:[],
      myComment:[],

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
    //个人信息
    this.getPersonalInformation();
    this.getPaperCollection();
    // if (this.isScholar) this.DefaultLocation = "zero";
    // else this.DefaultLocation = "first";
    this.DefaultLocation = "first";
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
  methods: {
    //获取个人信息
    getPersonalInformation() {
      this.$axios(
          {
            url: '/user/getPersonalInformation/', method: "post",
            data: {'token':sessionStorage.getItem('token')}
          }
      ).then(res => {
        console.log(res.data.data)
        this.realname=res.data.data[0].realname;
        this.email=res.data.data[0].email;
        this.gender=res.data.data[0].sex;
        this.username=res.data.data[0].username;
        this.personalProfile=res.data.data[0].sign;
        this.region=res.data.data[0].country;

        this.researchField=res.data.data[0].field;
        //异步访问，created结束还未执行完
        if(res.data.data[0].isScholar!=null){
          this.isScholar=true;
        } else {
          this.isScholar=false;
        }
      })
    },
    //编辑个人信息
    editPersonalInformation(){
      this.$axios(
          {
            url: '/user/editPersonalInformation/', method: "post",
            data: { 'token':sessionStorage.getItem('token'),
              'realname':this.new_realname,
              'sex':this.new_gender,
              'email':this.new_email,
              'sign':this.new_personalProfile,
              'country':this.new_region,
              'field':this.new_researchField}
          }
      ).then(res => {
        if(res.data.isSuccess){
          this.$message.success("修改成功")
        } else {
          this.$message.error(res.data.errormsg)
        }
        this.getPersonalInformation()
        this.new_email="";
        this.new_realname="";
        this.new_gender="";
        this.new_region="";
        this.new_personalProfile="";
        this.new_researchField="";
      })
    },
    //个人收藏、个人订阅、我的笔记等初始化栏
    handleClickAll(tab, event){
      if(tab.name=='first'){
        this.getPaperCollection();
      } else if(tab.name=='third'){
        this.getNote();
      } else if(tab.name=='fourth'){
        this.getPaperComment();
      } else if(tab.name=='fifth'){
        this.geteditSet();
      }

    },
    //收藏部分初始化栏
    handleClickCollection(tab, event){
      if(tab.name=='collectionFirst'){
        this.getPaperCollection();
      } else if(tab.name=='collectionSecond'){
        this.getNoteCollection();
      }

    },
    //评论部分初始化栏
    handleClickComment(tab, event){
      if(tab.name=='commentFirst'){
        this.getPaperCollection();
      } else if(tab.name=='commentSecond'){
        this.getNoteCollection();
      }

    },
    //获取个人论文收藏
    getPaperCollection(){
      this.$axios(
          {
            url: '/user/getPaperCollection/', method: "post",
            data: { 'token':sessionStorage.getItem('token')}
          }
      ).then(res => {
        this.paperCollection=res.data.data;
      })
    },
    //获取笔记论文收藏
    getNoteCollection(){
      this.$axios(
          {
            url: '/user/getNoteCollection/', method: "post",
            data: { 'token':sessionStorage.getItem('token')}
          }
      ).then(res => {
        this.notes=res.data.data;
      })
    },
    //获取我的笔记
    getNote(){
      this.$axios(
          {
            url: '/user/getNote/', method: "post",
            data: { 'token':sessionStorage.getItem('token')}
          }
      ).then(res => {
        console.log(res.data.data)
        this.notes=res.data.data;
      })
    },
    //获取我的评论
    getPaperComment(){
      this.$axios(
          {
            url: '/user/getPaperComment/', method: "post",
            data: { 'token':sessionStorage.getItem('token')}
          }
      ).then(res => {
        this.myComment=res.data.data;
      })
    },
    //获取个人设置
    getSet(){
      this.$axios(
          {
            url: '/user/getSet/', method: "post",
            data: { 'token':sessionStorage.getItem('token')}
          }
      ).then(res => {
        this.isNoteCommentable=res.data.data.isNoteCommentable;
        this.isNoteVisible=res.data.data.isNoteVisible;
        this.isLiteratureCommentable=res.data.data.isLiteratureCommentable;
        this.isCollectionVisible=res.data.data.isCollectionVisible;
        this.color=res.data.data.color;
        this.language=res.data.data.language;
      })
    },
    //修改个人设置
    geteditSet(){
      this.$axios(
          {
            url: '/user/editSet/', method: "post",
            data: { 'token':sessionStorage.getItem('token'),
                    'isNoteCommentable':this.isNoteCommentable,
                    'isNoteVisible':this.isNoteVisible,
                    'isLiteratureCommentable':this.isLiteratureCommentable,
                    'isCollectionVisible':this.isCollectionVisible,
                    'color':this.color,
                    'language':this.language}
          }
      ).then(res => {
        this.$message.success("修改成功")
      })
    },
    //搜索个人论文收藏
    searchPaperCollection(){
      this.$axios(
          {
            url: '/user/searchPaperCollection/', method: "post",
            data: { 'token':sessionStorage.getItem('token'),
                    'content':this.selectLiterature}
          }
      ).then(res => {
        this.paperCollection=res.data.data;

        this.selectLiterature="";
      })
    },




    //保存个人信息按钮
    savePersonalInformation(){
      this.isEditPersonalInformation = false;
      this.editPersonalInformation();
    },
    //修改密码
    changePassword(){
      if (!/^\w+$/.exec(this.newPassword) || this.newPassword.length > 16 || this.newPassword.length < 8) {
        console.log(1)
        this.$message.warning("密码仅能由数字、26个英文字母或者下划线组成，长度为8-16位，请检查您的密码");
        return;
      } else if(this.newPassword!=this.confirmNewPassword){
        this.$message.warning("两次输入密码不一致，请检查");
        return;
      }
      this.isChangePassword = false;
      this.$axios(
          {
            url: '/user/editPassword', method: "post",
            data: {'token':sessionStorage.getItem('token'),
              'oldPassword':this.oldPassword,
              'newPassword':this.newPassword }
          }
      ).then(res => {
        console.log(res.data)
      })
    },

  }
};
</script>

<style lang="scss" scoped>
.picture {
  height: 150px;
  width: 150px;
  /*百分之50的圆角是圆*/
  border-radius: 50%;
}
.mainCard {
  border-radius: 20px !important;
  box-shadow: 0 0 7px rgba(204, 204, 204, 0.713);
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px) brightness(105%);
  // height: 90%;
  width: 70%;
  // margin-top: 20px;
  margin-bottom: 60px;
  min-height: calc(100vh);
  margin-left: 15%;
  transform: translate(0, 30px);//不知道为什么用margin顶栏也会受影响，用移动替代
  .el-card {
    background-color: rgba(255, 255, 255, 0.277) !important;
    border-radius: 20px !important;

  }
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
/deep/.el-input-group__append {
  border-radius: 0 10px 10px 0;
  // color: #fff;
  border: 0px;
  background-color: #40a0ff00;
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
  background: #003B55;
}
</style>