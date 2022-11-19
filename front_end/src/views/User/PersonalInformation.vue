<template>
  <el-container>
    <el-main>
      <el-row style="margin-top: 3.0%; margin-bottom: 5.5%">
        <el-col :span="10"> <!--:span占据行数-->
          <!--页头-->
          <el-page-header @back="goBack" content="个人信息">
          </el-page-header>
          <!--头像-->
          <img class="picture" src="../../assets/mosy.jpg" alt="" />
          <el-upload ref="upload" class="avatar-uploader" accept="JPG, .PNG, .JPEG,.jpg, .png, .jpeg" :headers="headers"
                     action="" :multiple="false" :show-file-list="false" :http-request="uploadImg"
                     :before-upload="beforeAvatarUpload" :on-change="handleChange">
            <el-button size="mini" type="primary" round style="margin-top: 10px">修改头像</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png类型的图片,且不超过1MB
            </div>
          </el-upload>
        </el-col>


        <el-col :span="11" style="margin-top: 1.5%">
          <el-descriptions title="个人信息" direction="vertical" :column="4" border>
            <template slot="extra">
              <el-button type="primary" size="small" @click="isChangePassword=true" round>修改密码</el-button>
            </template>
            <el-descriptions-item label="用户名">
              <!--slot="label"可以将图标插入-->
              <template slot="label">
                <i class="el-icon-user-solid"></i>
                用户名
              </template>
              <!--class一致来确保if和else链接,flex即后面参数体现可以伸缩-->
              <div class="username" v-if="isEditUserName" style="display: flex;align-items: center;justify-content: space-between;">
                {{ username }}
                <div class="changeBefore" style="font-size:15px"><i class="el-icon-edit" @click="isEditUserName=false"></i></div>
              </div>
              <div class="username" v-else>
                <el-input v-model="new_username" placeholder="请输入新用户名" size="mini">
                  <div class="changeAfter" slot="suffix" style="font-size:15px"><i class="el-icon-check  el-input__icon" @click="isEditUserName=true"></i></div>
                </el-input>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="真实姓名">
              <template slot="label">
                <i class="el-icon-s-custom"></i>
                真实姓名
              </template>
              <div class="realname" v-if="isEditRealName" style="display: flex;align-items: center;justify-content: space-between;">
                {{ realname }}
                <div class="changeBefore" style="font-size:15px"><i class="el-icon-edit" @click="isEditRealName=false"></i></div>
              </div>
              <div class="realname" v-else>
                <el-input v-model="new_realname" placeholder="请输入新真实姓名" size="mini">
                  <div class="changeAfter" slot="suffix" style="font-size:15px"><i class="el-icon-check  el-input__icon" @click="isEditRealName=true"></i></div>
                </el-input>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="邮箱" :span="2">
              <template slot="label">
                <i class="el-icon-message"></i>
                联系邮箱
              </template>
              3394045013@qq.com
            </el-descriptions-item>
            <el-descriptions-item label="个人简介">
              <template slot="label">
                <i class="el-icon-star-on"></i>
                个人简介
              </template>
              <div class="personalProfile" v-if="isEditpersonalProfile" style="display: flex;align-items: center;justify-content: space-between;">
                {{ personalProfile }}
                <div class="changeBefore" style="font-size:15px"><i class="el-icon-edit" @click="isEditpersonalProfile=false"></i></div>
              </div>
              <div class="personalProfile" v-else>
                <el-input v-model="new_username" placeholder="请输入新的个人简介" size="mini">
                  <div class="changeAfter" slot="suffix" style="font-size:15px"><i class="el-icon-check  el-input__icon" @click="isEditpersonalProfile=true"></i></div>
                </el-input>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>
      <el-dialog
          title="更改您的密码"
          :visible.sync="isChangePassword"
          width="30%"
          :before-close="handleClose">
        <el-form>
          <el-form-item prop="" label="请输入旧密码：">
            <el-input prefix-icon="el-icon-lock" placeholder="在此输入旧密码"></el-input>
          </el-form-item>
          <el-form-item prop="" label="请输入新密码：">
            <el-input prefix-icon="el-icon-lock" placeholder="在此输入新密码"></el-input>
          </el-form-item>
          <el-form-item prop="" label="请再输入一遍新密码：">
            <el-input prefix-icon="el-icon-lock" placeholder="再次输入新密码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isChangePassword = false">取 消</el-button>
          <el-button type="primary" @click="isChangePassword = false">确 定</el-button>
        </span>
      </el-dialog>

      <div style="margin-top: 50px">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" stretch="true"><!--stretch="true"表示平分空间-->
          <el-tab-pane label="个人收藏" name="first">
            <div style="margin-left:1%">
              <div style="margin-top: 15px;width: 30%">
                <el-input placeholder="请输入你需要搜索的文献" v-model="selectLiterature" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span style="font-size: 25px">文献名</span>
                  <el-button style="float: right;margin-left: 5px" type="danger" icon="el-icon-delete" circle></el-button>
                  <el-button style="float: right" type="primary" icon="el-icon-more-outline" circle></el-button>
                </div>
                <div>
                  文献名：你好你好
                  <br>
                  文献概要：你好你好
                  <br>
                  文献作者：你好你好
                  <br>
                  收藏时间：2000.10.1
                </div>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="个人订阅" name="second">
            <div style="margin-left:1%">
              <div style="margin-top: 15px;width: 30%">
                <el-input placeholder="请输入你需要搜索的订阅" v-model="selectSubscribe" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span style="font-size: 25px">订阅名</span>
                  <el-button style="float: right;margin-left: 5px" type="danger" icon="el-icon-delete" circle></el-button>
                  <el-button style="float: right" type="primary" icon="el-icon-more-outline" circle></el-button>
                </div>
                <div>
                  订阅名：你好你好
                  <br>
                  订阅概要：你好你好
                  <br>
                  订阅作者：你好你好
                  <br>
                  订阅时间：2000.10.1
                </div>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的笔记" name="third">
            <div style="margin-left:1%">
              <div style="margin-top: 15px;width: 30%">
                <el-input placeholder="请输入你需要搜索的笔记" v-model="selectNote" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span style="font-size: 25px">笔记名</span>
                  <el-button style="float: right;margin-left: 5px" type="danger" icon="el-icon-delete" circle></el-button>
                  <el-button style="float: right" type="primary" icon="el-icon-more-outline" circle></el-button>
                </div>
                <div>
                  笔记名：你好你好
                  <br>
                  笔记概要：你好你好
                  <br>
                  笔记作者：你好你好
                  <br>
                  笔记时间：2000.10.1
                </div>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的评论" name="fourth">
            <div style="margin-left:1%">
              <div style="margin-top: 15px;width: 30%">
                <el-input placeholder="请输入你需要搜索的评论" v-model="selectComment" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span style="font-size: 25px">评论名</span>
                  <el-button style="float: right;margin-left: 5px" type="danger" icon="el-icon-delete" circle></el-button>
                  <el-button style="float: right" type="primary" icon="el-icon-more-outline" circle></el-button>
                </div>
                <div>
                  评论名：你好你好
                  <br>
                  评论文献：你好你好
                  <br>
                  评论作者：你好你好
                  <br>
                  评论时间：2000.10.1
                </div>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="个人设置" name="fifth">
            <div style="margin-left:1%">
              <el-card class="box-card">
                <el-switch
                    v-model="value1"
                    inactive-text="笔记是否他人可见"
                    style="float: left;margin-left: 400px">
                </el-switch>
                <el-switch
                    v-model="value2"
                    inactive-text="笔记下是否可评论">
                </el-switch>
                <br>
                <br>
                <br>
                <br>
                <el-switch
                    v-model="value3"
                    inactive-text="文章下是否可评论"
                    style="float: left;margin-left: 400px">
                </el-switch>
                <el-switch
                    v-model="value4"
                    inactive-text="收藏是否可见">
                </el-switch>
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "PersonalInformation",
  data() {
    return {
      value1: true,
      value2: true,
      value3: true,
      value4: true,
      isChangePassword:false,
      selectLiterature:"",
      selectComment:"",
      selectSubscribe:"",
      selectNote:"",
      username:"gaoyuan",
      realname:"高远",
      email:"3394045013@qq.com",
      personalProfile:"你好你好你好你好",
      isEditUserName:true,
      isEditRealName:true,
      isEditEmail:true,
      isEditpersonalProfile:true,
      new_username: "",
      new_realname: "",
      new_email: "",
      new_personalProfile: "",

    };
  },
  methods:{
    goBack() {
      //返回上一路由
      this.$router.go(-1);
    },


  }
}
</script>

<style scoped>
.picture {
  height: 200px;
  width: 200px;
  /*百分之50的圆角是圆*/
  border-radius: 50%;
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
  clear: both
}

.box-card {
  width: 98%;
  margin-top: 15px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.changeBefore:hover {
  color: lightskyblue
}
.changeAfter:hover {
  color: lightskyblue
}
</style>