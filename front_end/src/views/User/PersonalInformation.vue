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
        <el-row id="info" style="margin-top: 20px; margin-bottom: 20px">
          <el-col :span="10">
            <!--:span占据行数-->
            <!--头像-->
            <img
              v-if="!profile"
              class="picture"
              src="../../assets/mosy.jpg"
              alt=""
            />
            <img v-else class="picture" :src="profile" alt="" />
            <el-upload
              ref="upload"
              class="avatar-uploader"
              accept="JPG, .PNG, .JPEG,.jpg, .png, .jpeg"
              :http-request="uploadProfile"
              :headers="headers"
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
                  @click="
                    isChangePassword = true;
                    newPassword = '';
                    oldPassword = '';
                    confirmNewPassword = '';
                  "
                  >修改密码</el-button
                >
                <el-button
                  type="primary"
                  size="small"
                  v-if="!isOthers"
                  @click="isEditPersonalInformation = true"
                  >修改信息</el-button
                >
                <el-button
                  type="primary"
                  size="small"
                  v-if="!isOthers && !isScholar"
                  @click="$refs.claimScholar.initclaimScholar();"
                  >学者认证</el-button
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
                show-password
                type="password"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="" label="请输入新密码：">
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="在此输入新密码"
                v-model="newPassword"
                show-password
                type="password"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="" label="请再输入一遍新密码：">
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="再次输入新密码"
                v-model="confirmNewPassword"
                show-password
                type="password"
                clearable
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isChangePassword = false">取 消</el-button>
            <el-button type="primary" @click="changePassword">确 定</el-button>
          </span>
        </el-dialog>

        <div style="margin-top: 50px">
          <!--vmodel为打开时默认位置-->
          <el-tabs v-model="DefaultLocation" @tab-click="handleClickAll"
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
              <h2
                style="text-align: left; margin-top: 20px; margin-bottom: 10px"
              >
                论文列表
              </h2>
              <el-divider />
              <div style="margin-top: 15px; margin-bottom: 15px; width: 30%">
                <div style="margin-top: 15px">
                  <el-input
                    placeholder="请输入你需要搜索的文献"
                    v-model="selectScholarLiterature"
                    class="input-with-select"
                  >
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      @click="searchPaperCollection"
                    ></el-button>
                  </el-input>
                  <el-select
                    v-model="ScholarLiteratureSort"
                    placeholder="请选择排序方式"
                    @change="changeScholarLiteratureSort"
                  >
                    <el-option
                      v-for="item in ScholarLiteratureOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <!-- 用v-if代替slice，解决v-for，slice不敏感 -->
              <!-- 同时利用flag解决排序更新问题 -->
              <div v-for="(paper, index) in papers" :key="paper.id">
                <paper-card
                  v-if="
                    index >= (currentPage - 1) * pageSize &&
                    index < currentPage * pageSize &&
                    flag
                  "
                  :paper_data="paper"
                />
              </div>
              <el-pagination
                :current-page.sync="currentPage"
                :page-size="pageSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                layout="prev, pager, next, jumper"
                :total="papers.length > 0 ? papers.length : null"
                style="margin-top: 40px"
              >
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane
              label="个人收藏"
              name="first"
              v-if="!isOthers || (isOthers && isCollectionVisible)"
            >
              <el-tabs
                v-model="collectionDefaultLocation"
                tab-position="left"
                @tab-click="handleClickCollection"
              >
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
                    <div
                      v-for="(item, index) in this.paperCollection"
                      :key="index"
                    >
                      <el-card class="box-card">
                        <el-button
                          style="float: right; margin-left: 5px"
                          icon="el-icon-delete"
                          circle
                          size="small"
                          @click="delPaperCollection(item.id)"
                        ></el-button>
                        <el-button
                          style="float: right"
                          icon="el-icon-more-outline"
                          circle
                          size="small"
                        ></el-button>
                        <div style="margin-bottom: 10px; text-align: left">
                          <a href="">{{ item.name }}</a>
                          <br />
                          <p>{{ item.abstract }}</p>
                          <br />
                          <br />
                          <br />
                          <p>{{ item.time }}</p>
                        </div>
                      </el-card>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane name="collectionSecond">
                  <span slot="label">
                    <i class="el-icon-message-solid"></i>笔记收藏</span
                  >
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
                            @click="searchNoteCollection"
                          ></el-button>
                        </el-input>
                      </div>
                    </div>
                    <div
                      v-for="(item, index) in this.noteCollection"
                      :key="index"
                    >
                      <el-card class="box-card">
                        <el-button
                          style="float: right; margin-left: 5px"
                          icon="el-icon-delete"
                          circle
                          size="small"
                          @click="delNoteCollection(item.id)"
                        ></el-button>
                        <el-button
                          style="float: right"
                          icon="el-icon-more-outline"
                          circle
                          size="small"
                        ></el-button>
                        <div style="margin-bottom: 10px; text-align: left">
                          <a href="">{{ item.id }}</a>
                          <br />
                          <p>{{ item.introduction }}</p>
                          <br />
                          <br />
                          <br />
                          <p>{{ item.time }}</p>
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
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      @click="searchNote"
                    ></el-button>
                  </el-input>
                </div>
                <div v-for="(item, index) in this.notes" :key="index">
                  <el-card class="box-card">
                    <el-button
                      style="float: right; margin-left: 5px"
                      icon="el-icon-delete"
                      circle
                      size="small"
                      @click="delNotes(item.id)"
                    ></el-button>
                    <el-button
                      style="float: right"
                      icon="el-icon-more-outline"
                      circle
                      size="small"
                    ></el-button>
                    <div style="margin-bottom: 10px; text-align: left">
                      <a href="">{{ item.id }}</a>
                      <br />
                      <p>{{ item.introduction }}</p>
                      <br />
                      <br />
                      <br />
                      <p>{{ item.time }}</p>
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
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      @click="searchPaperComment"
                    ></el-button>
                  </el-input>
                </div>
                <div v-for="(item, index) in this.myComment" :key="index">
                  <el-card class="box-card">
                    <el-button
                      style="float: right; margin-left: 5px"
                      icon="el-icon-delete"
                      circle
                      size="small"
                      @click="delComment(item.comment_id)"
                    ></el-button>
                    <el-button
                      style="float: right"
                      icon="el-icon-more-outline"
                      circle
                      size="small"
                    ></el-button>
                    <div style="margin-bottom: 10px; text-align: left">
                      <a href="">{{ item.paper_name }}</a>
                      <br />
                      <p>{{ item.content }}</p>
                      <br />
                      <br />
                      <br />
                      <p>{{ item.time }}</p>
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
                      <el-switch
                        v-model="isNoteVisible"
                        @change="geteditSet"
                      ></el-switch>
                    </el-form-item>
                    <el-form-item
                      label="系统配色方案"
                      style="margin-left: 100px"
                    >
                      <div style="width: 40%">
                        <el-select
                          :placeholder="color"
                          v-model="color"
                          @change="geteditSet"
                        >
                          <el-option label="天蓝" value="天蓝"></el-option>
                          <el-option label="灰色" value="灰色"></el-option>
                        </el-select>
                      </div>
                    </el-form-item>
                  </el-form>

                  <el-form :inline="true">
                    <el-form-item
                      label="笔记下是否可评论"
                      style="margin-left: 10%"
                    >
                      <el-switch
                        v-model="isNoteCommentable"
                        @change="geteditSet"
                      ></el-switch>
                    </el-form-item>
                    <el-form-item
                      label="系统配置语言"
                      style="margin-left: 100px"
                    >
                      <div style="width: 40%">
                        <el-select
                          :placeholder="language"
                          v-model="language"
                          @change="geteditSet"
                        >
                          <el-option label="中文" value="中文"></el-option>
                          <el-option label="英文" value="英文"></el-option>
                        </el-select>
                      </div>
                    </el-form-item>
                  </el-form>

                  <el-form :inline="true">
                    <el-form-item
                      label="文章下是否可评论"
                      style="margin-left: -15%"
                    >
                      <el-switch
                        v-model="isLiteratureCommentable"
                        @change="geteditSet"
                      ></el-switch>
                    </el-form-item>
                    <el-form-item
                      label="收藏是否可见"
                      style="margin-left: 100px"
                    >
                      <el-switch
                        v-model="isCollectionVisible"
                        @change="geteditSet"
                      ></el-switch>
                    </el-form-item>
                  </el-form>
                </el-card>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
      <claimScholar ref="claimScholar"></claimScholar>
    </el-container>
  </el-card>
</template>

<script>
import qs from "qs";
import RelationShip from "@/components/RelationShip.vue";
import ScholarLine from "@/components/ScholarLine.vue";
import TopBar from "@/components/TopBar";
import PaperCard from "@/components/PaperCard.vue";
import claimScholar from "@/components/claimScholar.vue";
import axios from "axios";
import CryptoJS from "crypto-js";
// import CryptoJS from "_crypto-js@4.1.1@crypto-js";
export default {
  name: "PersonalInformation",
  components: {
    RelationShip,
    ScholarLine,
    TopBar,
    PaperCard,
    claimScholar
  },
  data() {
    return {
      isNoteVisible: true,
      isNoteCommentable: true,
      isLiteratureCommentable: true,
      isCollectionVisible: true,
      isChangePassword: false,
      selectLiterature: "",
      selectCollectionNote: "",
      selectLiteratureYear: "",
      selectComment: "",
      selectSubscribe: "",
      selectNote: "",
      username: "",
      realname: "",
      gender: "",
      region: "",
      email: "",
      personalProfile: "",
      isEditPersonalInformation: false,
      new_username: "",
      new_realname: "",
      new_gender: "",
      new_region: "",
      new_email: "",
      new_researchField: "",
      new_personalProfile: "",
      DefaultLocation: "",
      collectionDefaultLocation: "collectionFirst",
      commentDefaultLocation: "commentFirst",
      noteLabel: "",
      isScholar: true,
      researchField: "打篮球",
      isOthers: false,
      showRelation: true,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      color: "",
      language: "",
      selectScholarLiterature: "",
      currentPage: 1,
      pageSize: 5,
      papers: [
        {
          authors: [
            {
              name: "杰哥",
            },
          ],
          id: "56d850c8dabfae2eee0100f0",
          issue: "是多少",
          lang: "en",
          n_citation: 12,
          page_end: "",
          page_start: "",
          title: "动态式12数学课堂中“交流”艺术的探寻",
          volume: "",
          year: 2019,
        },
        {
          authors: [
            {
              name: "杰哥",
            },
          ],
          id: "56d850c8dabfae2eee0100f0",
          issue: "是多少",
          lang: "en",
          n_citation: 13,
          page_end: "",
          page_start: "",
          title: "动态式23数学课堂中“交流”艺术的探寻",
          volume: "",
          year: 2001,
        },
        {
          authors: [
            {
              name: "杰哥",
            },
          ],
          id: "56d850c8dabfae2eee0100f0",
          issue: "是多少",
          lang: "en",
          n_citation: 11,
          page_end: "",
          page_start: "",
          title: "动态式数学232课堂中“交流”艺术的探寻",
          volume: "",
          year: 2011,
        },
        {
          authors: [
            {
              name: "杰哥",
            },
          ],
          id: "56d850c8dabfae2eee0100f0",
          issue: "是多少",
          lang: "en",
          n_citation: 18,
          page_end: "",
          page_start: "",
          title: "动态式数学课堂1中“交流”艺术的探寻",
          volume: "",
          year: 2009,
        },
        {
          authors: [
            {
              name: "杰哥",
            },
          ],
          id: "56d850c8dabfae2eee0100f0",
          issue: "是多少",
          lang: "en",
          n_citation: 12,
          page_end: "",
          page_start: "",
          title: "动态式数学课堂2中“交流”艺术的探寻",
          volume: "",
          year: 2012,
        },
        {
          authors: [
            {
              name: "杰哥",
            },
          ],
          id: "56d850c8dabfae2eee0100f0",
          issue: "是多少",
          lang: "en",
          n_citation: 12,
          page_end: "",
          page_start: "",
          title: "动态式数学课3堂中“交流”艺术的探寻",
          volume: "",
          year: 2013,
        },
        {
          authors: [
            {
              name: "杰哥",
            },
          ],
          id: "56d850c8dabfae2eee0100f0",
          issue: "是多少",
          lang: "en",
          n_citation: 12,
          page_end: "",
          page_start: "",
          title: "4动态式数学课堂中“交流”艺术的探寻",
          volume: "",
          year: 2011,
        },
        {
          authors: [
            {
              name: "杰哥",
            },
          ],
          id: "56d850c8dabfae2eee0100f0",
          issue: "是多少",
          lang: "en",
          n_citation: 13,
          page_end: "",
          page_start: "",
          title: "5动态式数学课堂中“交流”艺术的探寻",
          volume: "",
          year: 2011,
        },
        {
          authors: [
            {
              name: "杰哥",
            },
          ],
          id: "56d850c8dabfae2eee0100f0",
          issue: "是多少",
          lang: "en",
          n_citation: 14,
          page_end: "",
          page_start: "",
          title: "6动态式数学课堂中“交流”艺术的探寻",
          volume: "",
          year: 2010,
        },
      ],
      paperCollection: [],
      noteCollection: [],
      notes: [],
      myComment: [],

      //图片
      profile: "",
      headers: {
        Authorization: "JWT " + sessionStorage.getItem("token"),
      },

      RelationsData: [
        // {
        //   name: "皮蓬",
        //   value: 3,
        //   id: 1,
        // },
        // {
        //   name: "ss",
        //   value: 4,
        //   id: 2,
        // },
        // {
        //   name: "ssaw",
        //   value: 40,
        //   id: 3,
        // },
      ],
      Linedata: [],
      ScholarLiteratureSort: "",
      ScholarLiteratureOptions: [
        {
          value: "1",
          label: "发表时间从新到旧",
        },
        {
          value: "2",
          label: "发表时间从旧到新",
        },
        {
          value: "3",
          label: "引用量从高到低",
        },
        {
          value: "4",
          label: "引用量从低到高",
        },
      ],
      flag: true,
    };
  },
  created() {
    //个人信息
    this.getPersonalInformation();
    this.getPaperCollection();
    this.getSet();
    // if (this.isScholar) this.DefaultLocation = "zero";
    // else this.DefaultLocation = "first";
    if (this.isScholar) {
      this.DefaultLocation = "zero";
    } else {
      this.DefaultLocation = "first";
    }
    this.noteLabel = this.isOthers ? "他的笔记" : "我的笔记";
  },
  mounted() {
    this.initRelations();
    this.initLine();
    // this.initSort();
    // this.initScholarPaper();
    this.noteLabel = this.isOthers ? "他的笔记" : "我的笔记";
  },
  watch: {
    isOthers: function (newVal, oldVal) {
      this.noteLabel = this.isOthers ? "他的笔记" : "我的笔记";
    },
    isScholar: function (newVal, oldVal) {
      this.DefaultLocation = this.isScholar ? "zero" : "first";
    },
  },
  methods: {
    initRelations() {
      console.log("initRelations");
      this.$axios({
        method: "post",
        url: "/app/get_scholar_relation/",
      }).then((res) => {
        console.log("initRelations", res.data);
        this.RelationsData = res.data.data;
      });
    },
    initLine() {
      this.$axios({
        method: "get",
        url: "/app/get_scholar_paper_list/",
      }).then((res) => {
        var count = new Array(2500).fill(0);
        res.data.data.forEach((item, index) => {
          count[item.year]++;
        });
        count.forEach((item, index) => {
          if (item != 0) {
            this.Linedata.push({
              count: item,
              content: index,
            });
          }
        });
        // this.Linedata = res.data;
        console.log("initLine");
        console.log(res.data);
        console.log(count);
        console.log(this.Linedata);
      });
    },
    // 获取学者文献
    // initScholarPaper() {
    //   this.$axios({
    //     method: "get",
    //     url: "/app/get_scholar_paper_list/",
    //   }).then((res) => {
    //     this.papers = res.data.data;
    //     this.papars.sort(this.compareDown("year"));
    //     console.log("initScholarPaper");
    //     console.log(res.data);
    //   });
    // },
    // 搜索学者指定标题文献
    searchPaperCollection() {
      this.$axios({
        url: "/user/searchPaperCollection/",
        method: "post",
        data: {
          token: sessionStorage.getItem("token"),
          content: this.selectLiterature,
        },
      }).then((res) => {
        this.paperCollection = res.data.data;
        this.selectLiterature = "";
      });
    },
    //获取个人信息
    getPersonalInformation() {
      this.$axios({
        url: "/user/getPersonalInformation/",
        method: "post",
        data: { token: sessionStorage.getItem("token") },
      }).then((res) => {
        console.log(res.data.data);
        this.realname = res.data.data[0].realname;
        this.email = res.data.data[0].email;
        this.gender = res.data.data[0].sex;
        this.username = res.data.data[0].username;
        this.personalProfile = res.data.data[0].sign;
        this.region = res.data.data[0].country;
        this.profile = res.data.data[0].profile;

        this.researchField = res.data.data[0].field;
        //异步访问，created结束还未执行完
        if (res.data.data[0].isScholar != null) {
          this.isScholar = true;
        } else {
          this.isScholar = false;
        }
      });
    },
    //编辑个人信息
    editPersonalInformation() {
      this.$axios({
        url: "/user/editPersonalInformation/",
        method: "post",
        data: {
          token: sessionStorage.getItem("token"),
          realname: this.new_realname,
          sex: this.new_gender,
          email: this.new_email,
          sign: this.new_personalProfile,
          country: this.new_region,
          field: this.new_researchField,
        },
      }).then((res) => {
        if (res.data.isSuccess) {
          this.$message.success("修改成功");
        } else {
          this.$message.error(res.data.errormsg);
        }
        this.getPersonalInformation();
        this.new_email = "";
        this.new_realname = "";
        this.new_gender = "";
        this.new_region = "";
        this.new_personalProfile = "";
        this.new_researchField = "";
      });
    },
    //个人收藏、个人订阅、我的笔记等初始化栏
    handleClickAll(tab, event) {
      if (tab.name == "zero") {
        this.initRelations();
        // this.initLine();
      } else if (tab.name == "first") {
        this.getPaperCollection();
      } else if (tab.name == "third") {
        this.getNote();
      } else if (tab.name == "fourth") {
        this.getPaperComment();
      } else if (tab.name == "fifth") {
        this.getSet();
      }
    },
    //收藏部分初始化栏
    handleClickCollection(tab, event) {
      if (tab.name == "collectionFirst") {
        this.getPaperCollection();
      } else if (tab.name == "collectionSecond") {
        this.getNoteCollection();
      }
    },
    //评论部分初始化栏
    handleClickComment(tab, event) {
      if (tab.name == "commentFirst") {
        this.getPaperCollection();
      } else if (tab.name == "commentSecond") {
        this.getNoteCollection();
      }
    },
    //获取个人论文收藏
    getPaperCollection() {
      this.$axios({
        url: "/user/getPaperCollection/",
        method: "post",
        data: { token: sessionStorage.getItem("token") },
      }).then((res) => {
        this.paperCollection = res.data.data;
      });
    },
    //获取笔记收藏
    getNoteCollection() {
      this.$axios({
        url: "/user/getNoteCollection/",
        method: "post",
        data: { token: sessionStorage.getItem("token") },
      }).then((res) => {
        this.noteCollection = res.data.data;
      });
    },
    //获取我的笔记
    getNote() {
      this.$axios({
        url: "/user/getNote/",
        method: "post",
        data: { token: sessionStorage.getItem("token") },
      }).then((res) => {
        this.notes = res.data.data;
      });
    },
    //获取我的评论
    getPaperComment() {
      this.$axios({
        url: "/user/getPaperComment/",
        method: "post",
        data: { token: sessionStorage.getItem("token") },
      }).then((res) => {
        this.myComment = res.data.data;
      });
    },
    //获取个人设置
    getSet() {
      this.$axios({
        url: "/user/getSet/",
        method: "post",
        data: { token: sessionStorage.getItem("token") },
      }).then((res) => {
        this.isNoteCommentable = res.data.isNoteCommentable;
        this.isNoteVisible = res.data.isNoteVisible;
        this.isLiteratureCommentable = res.data.isLiteratureCommentable;
        this.isCollectionVisible = res.data.isCollectionVisible;
        this.color = res.data.color;
        this.language = res.data.language;
      });
    },
    //修改个人设置
    geteditSet() {
      this.$axios({
        url: "/user/editSet/",
        method: "post",
        data: {
          token: sessionStorage.getItem("token"),
          isNoteCommentable: this.isNoteCommentable,
          isNoteVisible: this.isNoteVisible,
          isLiteratureCommentable: this.isLiteratureCommentable,
          isCollectionVisible: this.isCollectionVisible,
          color: this.color,
          language: this.language,
        },
      }).then((res) => {
        this.$message.success("修改成功");
      });
    },
    //搜索个人论文收藏
    searchPaperCollection() {
      this.$axios({
        url: "/user/searchPaperCollection/",
        method: "post",
        data: {
          token: sessionStorage.getItem("token"),
          content: this.selectLiterature,
        },
      }).then((res) => {
        this.paperCollection = res.data.data;

        this.selectLiterature = "";
      });
    },
    //搜索个人笔记收藏
    searchNoteCollection() {
      this.$axios({
        url: "/user/searchNoteCollection/",
        method: "post",
        data: {
          token: sessionStorage.getItem("token"),
          content: this.selectCollectionNote,
        },
      }).then((res) => {
        this.noteCollection = res.data.data;

        this.selectCollectionNote = "";
      });
    },
    //搜索我的笔记
    searchNote() {
      this.$axios({
        url: "/user/searchNote/",
        method: "post",
        data: {
          token: sessionStorage.getItem("token"),
          content: this.selectNote,
        },
      }).then((res) => {
        this.notes = res.data.data;

        this.selectNote = "";
      });
    },
    //搜索我的评论
    searchPaperComment() {
      this.$axios({
        url: "user/searchPaperComment/",
        method: "post",
        data: {
          token: sessionStorage.getItem("token"),
          content: this.selectComment,
        },
      }).then((res) => {
        this.myComment = res.data.data;
        this.selectComment = "";
      });
    },
    //删除我的评论
    async delComment(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该评论, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
      if (confirmResult !== "confirm") {
        return;
      }
      this.$axios({
        url: "/user/delComment/",
        method: "post",
        data: { token: sessionStorage.getItem("token"), comment_id: id },
      }).then((res) => {
        this.$message.success("删除用户成功！");
        this.getPaperComment();
      });
    },
    //删除我的笔记
    async delNotes(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该评论, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
      if (confirmResult !== "confirm") {
        return;
      }
      this.$axios({
        url: "/user/delNote/",
        method: "post",
        data: { token: sessionStorage.getItem("token"), note_id: id },
      }).then((res) => {
        this.$message.success("删除用户成功！");
        this.getNote();
      });
    },
    //删除论文收藏
    async delPaperCollection(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该评论, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
      if (confirmResult !== "confirm") {
        return;
      }
      this.$axios({
        url: "/user/delPaperCollection/",
        method: "post",
        data: { token: sessionStorage.getItem("token"), paper_id: id },
      }).then((res) => {
        this.$message.success("删除用户成功！");
        this.getPaperCollection();
      });
    },
    //删除笔记收藏
    async delNoteCollection(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该评论, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
      if (confirmResult !== "confirm") {
        return;
      }
      this.$axios({
        url: "/user/delNoteCollection/",
        method: "post",
        data: { token: sessionStorage.getItem("token"), note_id: id },
      }).then((res) => {
        this.$message.success("删除用户成功！");
        this.getNoteCollection();
      });
    },

    //保存个人信息按钮
    savePersonalInformation() {
      this.isEditPersonalInformation = false;
      this.editPersonalInformation();
    },
    //修改密码
    changePassword() {
      if (
        !/^\w+$/.exec(this.newPassword) ||
        this.newPassword.length > 16 ||
        this.newPassword.length < 8
      ) {
        this.$message.warning(
          "密码仅能由数字、26个英文字母或者下划线组成，长度为8-16位，请检查您的密码"
        );
        this.newPassword = "";
        this.oldPassword = "";
        yhis.confirmNewPassword = "";
        return;
      } else if (this.newPassword != this.confirmNewPassword) {
        this.$message.warning("两次输入密码不一致，请检查");
        this.newPassword = "";
        this.oldPassword = "";
        yhis.confirmNewPassword = "";
        return;
      }
      this.isChangePassword = false;
      this.$axios({
        url: "/user/editPassword/",
        method: "post",
        data: {
          token: sessionStorage.getItem("token"),
          oldPassword: CryptoJS.MD5(this.oldPassword).toString(),
          newPassword: CryptoJS.MD5(this.newPassword).toString(),
        },
      }).then((res) => {
        if (res.data.isSuccess == -1) {
          this.$message.error("旧密码错误");
        } else {
          this.$message.success("修改密码成功");
        }
      });
    },
    //修改头像
    uploadProfile(file) {
      let formData = new FormData();
      formData.append("profile", file.file);
      this.$axios
        .post("/user/upload_profile/", formData)
        .then((res) => {
          this.$message.success("上传成功");
          window.location.reload();
        })
        .catch((err) => {
          this.$message.error("上传失败");
        });
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      console.log(currentPage);
      console.log(this.papers);
      console.log(
        this.papers.slice(
          (currentPage - 1) * this.pageSize,
          currentPage * this.pageSize
        )
      );
      this.currentPage = currentPage;
    },
    // 封装升序排序规则
    compareUp(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
    // 封装降序排序规则
    compareDown(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      };
    },
    // 利用flag解决了排序以后v-fo不更新的问题
    changeScholarLiteratureSort(value) {
      // window.alert(value);
      if (value == "1") {
        this.flag = false;
        this.papers.sort(this.compareDown("year"));
        console.log(this.papers.sort(this.compareDown("year")));
        this.$nextTick(() => {
          this.flag = true;
        });
      }
      if (value == "2") {
        this.flag = false;
        this.papers.sort(this.compareUp("year"));
        this.$nextTick(() => {
          this.flag = true;
        });
      }
      if (value == "3") {
        this.flag = false;
        this.papers.sort(this.compareDown("n_citation"));
        console.log("3", this.papers.sort(this.compareDown("n_citation")));
        this.$nextTick(() => {
          this.flag = true;
        });
      }
      if (value == "4") {
        this.flag = false;
        this.papers.sort(this.compareUp("n_citation"));
        this.$nextTick(() => {
          this.flag = true;
        });
      }
    },
  },
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
  transform: translate(
    0,
    30px
  ); //不知道为什么用margin顶栏也会受影响，用移动替代
  .el-card {
    background-color: rgba(255, 255, 255, 0.587) !important;
    border-radius: 20px !important;
    box-shadow: none !important;
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
  background: #003b55;
}
.el-switch__label {
  // background-color: #003b55 !important;
}
.el-tab-pane {
  padding-bottom: 10px;
}
//似乎必须要用deep、选择全部子标签、颜色用全透明才行
/deep/.el-descriptions *:not(button) {
  background-color: #003b5500 !important;
}
</style>
