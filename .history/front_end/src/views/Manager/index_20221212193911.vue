<template>
  <div id="main">
    <!-- <el-row class="tac"> -->
      <el-col :span="3">
        <div id="col">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            
          >
            <el-menu-item class="white" index="1" @click="goTo('/manageScholar')">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>管理学者</span>
              </template>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span class="white">管理审核</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="goTo('/auditLiterature')"
                  >文献申述</el-menu-item
                >
                <el-menu-item index="2-2" @click="goTo('/auditIdentity')"
                  >学者身份认领</el-menu-item
                >
                <el-menu-item index="2-3" @click="goTo('/auditLack')"
                  >文献缺失反馈</el-menu-item
                >
                <el-menu-item index="2-4" @click="goTo('/auditComments')"
                  >评论举报</el-menu-item
                >
                <el-menu-item index="2-5" @click="goTo('/auditNote')"
                  >笔记举报</el-menu-item
                >
                <!-- <el-menu-item index="2-6" @click="goTo('/auditLiterature')"
                  >文献申诉</el-menu-item
                > -->
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item class="white" index="3" @click="goTo('/importLiterature')">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>导入文献</span>
              </template>
            </el-menu-item>
          </el-menu>
        
        </div>
      </el-col>
      <el-col :span="21">
        <el-card>
          <router-view></router-view>
        </el-card>
      </el-col>
    <!-- </el-row> -->
    <!-- <el-row>
      <div style="margin-bottom: 20%"></div>
    </el-row> -->
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import $ from 'jquery';
export default {
  name: "index",
  mounted() {
    $('#topbar').css('display', 'none');
  },
 
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goTo(path) {
      this.$router.replace(path);
    },
  },
};
</script>

<style lang="scss" scoped>
#main {
  min-height: 100vh;
}
.el-col-12 {
  // width: 15%;
}
#col {
  height: 100vh;
}
.el-menu {
  width: calc(100vw / 8 - 20px);
  position: fixed;
  margin: 80px 0 0 30px;
  border-radius: 20px 0px 0px 20px;
  background: #003B55;
  overflow-y: hidden;
  // transition: 0.3s;
  text-align: left;
  .white {
    color: white;
  }
  .el-submenu {
    .el-menu-item, .el-menu-item-group {
      background: #225870 !important;
      color: white;
    }
  }
  .is-active, .el-menu-item:hover, .white:hover {
    background: #002c3f !important;
    color: white;
  }
}
.el-card {
  margin: 30px 30px 0px 0px;
  min-height: calc(90vh);

  border-radius: 20px !important;
	border: none !important;
  box-shadow: 0 0 7px rgba(204, 204, 204, 0.713);
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px) brightness(100%);
}
.el-form {
  .el-table__cell {

    background-color: rgba(255, 255, 255, 0.16) !important;
  }
  border-radius: 15px !important;
}
</style>
