<template>
  <el-row class="tac">
    <TopBar/>
    <el-col :span="12">
      <h5>嘎嘎</h5>
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
      >
        <el-menu-item index="1" @click="goTo('/manageScholar')">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>管理学者</span>
          </template>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>管理审核</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="goTo('/auditRepresentation')">文献申述</el-menu-item>
            <el-menu-item index="2-2" @click="goTo('/auditIdentity')">学者身份申述</el-menu-item>
            <el-menu-item index="2-3" @click="goTo('/auditLack')">文献缺失反馈</el-menu-item>
            <el-menu-item index="2-4" @click="goTo('/auditComments')">评论举报</el-menu-item>
            <el-menu-item index="2-5" @click="goTo('/auditNote')">笔记</el-menu-item>
            <el-menu-item index="2-6" @click="goTo('/auditLiterature')">文献</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="3" @click="goTo('/importLiterature')">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>导入文献</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-col>
    <router-view></router-view>
  </el-row>
</template>

<script>
import TopBar from "@/components/TopBar";
export default {
  name: "index",
  components: {
    TopBar,
  },
  data(){
    return {};
  },
  methods: {
    handleOpen(key, keyPath){
      console.log(key, keyPath);
    },
    handleClose(key, keyPath){
      console.log(key, keyPath);
    },
    goTo(path){
      this.$router.replace(path);
    }
  },
}
</script>

<style lang="scss" scoped>
.el-col-12{
  width: 15%;
}
</style>
