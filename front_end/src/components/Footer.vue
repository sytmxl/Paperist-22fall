<template>
    <div class="footer">
      <el-divider></el-divider>
      <el-row
        type="flex"
        justify="center"
      >
        <el-col :span="18">
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-col
              :span="20"
              class="footer-left"
            >
              <el-row
                type="flex"
                justify="start"
              >
                <el-col :span="10">
                  <el-image
                    :src="logoUrl"
                    fit="fill"
                    class="footer-left-image"
                  ></el-image>
                </el-col>
                <el-col
                  :span="19"
                  class="footer-rows"
                >
                  <div>
                    <h3>关于我们</h3>
                  </div>
                  <div>PapeRist集成海量学术资源，为科研工作者提供全面快捷的学术服务。在这里我们保持学习的态度，不忘初心，砥砺前行。</div>
                </el-col>
              </el-row>
            </el-col>
            <el-col
              :span="8"
              class="footer-right"
            >
              <el-row
                type="flex"
                justify="start"
              >
                <el-col
                  :span="24"
                  class="footer-rows"
                >
                  <div>
                    <h3>联系我们</h3>
                  </div>
                  <div style="margin-left: 40px">
                    <el-popover
                      placement="top-start"
                      trigger="hover"
                    >
                      <img :src="wxUrl" style="width: 200px; height: 200px"/>
                      <span
                        slot="reference"
                        class="icon-size"
                      >
                        <i class="iconfont icon-wechat-fill"></i>
                      </span>
                    </el-popover>
                    <el-popover
                      placement="top-start"
                      trigger="hover"
                    >
                      <el-image :src="qqUrl" style="width: 200px; height: 200px"/>
                      <span
                        slot="reference"
                        class="icon-size"
                      >
                        <i class="iconfont icon-QQ"></i>
                      </span>
                    </el-popover>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-divider />
          <el-row
            type="flex"
            justify="center"
            class="copyright"
          >
            <el-col :span="12">
              <h6> CopyRight © 2022 北京航空航天大学软件学院 - 软工八小组作业</h6>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  
  </template>
  
  <script>
  import logo from '../assets/logo/bar_name_logo.svg'
  import QQ from '../assets/qq.jpg'
  import WX from '../assets/wx.jpg'
  
  export default {
    name: "Footer",
    data() {
      return {
        logoUrl: logo,
        wxUrl: WX,
        qqUrl: QQ,
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .footer {
    // background-color: #ffffff; 
    padding-bottom: 12px;
    min-height: 20vh;
    color: #a4acb7;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(40px) brightness(105%);
  }
  
  .footer-left {
    color: #a4acb7;
    min-height: 10vh;
  }
  
  .footer-left-image {
    height: 80px;
    margin-top: 20px;
    margin-bottom: 10px;
    margin-right: 20px;
  }
  
  .footer-rows > div {
    margin-top: 12px;
  }
  
  .footer-rows > div > i {
    font-size: 40px;
    margin-right: 8px;
    margin-left: 4px;
  }
  
  .footer-right {
    color: #a4acb7;
    min-height: 10vh;
  }
  
  .icon-size > i {
    font-size: 40px;
    margin-right: 8px;
    margin-left: 4px;
  }
  
  .copyright {
    margin-top: 12px;
    margin-bottom: 8px;
    text-align: center;
  }
  </style>
  
  <style>
  .el-divider--horizontal {
    margin: 0 !important;
  }
  </style>