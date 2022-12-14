<template>
  <div id="app" class="light-mode">
    <div class="main"><router-view :key="$route.fullPath"/></div>
    <Footer v-show="!this.$route.path.includes('login')"></Footer>
  </div>
</template>
<script>
import footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Footer: footer,
  },

  methods: {

    toggleDarkLight() {
      var body = document.getElementById("app");
      var currentClass = body.className;
      body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
    },
  },
  data() {
    return {
      msg: "Hello Vue.js!",
    };
  },
};
</script>

<style lang="scss">
  $dark-color: #111;
  $light-color: rgb(217, 219, 222);
  $dark-theme: #001C2A;
  $theme: #003B55;

#app.dark-mode {
  background-image: url('./assets/bg_dark.svg');
  background-attachment: fixed;
  background-size: 100%;
  color: $light-color;
  .header_show {
    height: 45px;
    background-color: $light-color;
    color: $theme;
    font-size: 20px;
    line-height: 45px;
    text-align: center;
  }
  #logo1 {
    background-image: url("./assets/logo_for_dark/bar_name_logo.svg");
    background-repeat: no-repeat;
  }
  .el-button {
    background-color: $light-color;
    color: $dark-theme;
  }
  .el-button:hover {
    background-color: $theme;
    color: $light-color;
  }
  .el-button--primary {
    background-color: #9aadbd;
  }
  .el-card {
    // background: rgb(220, 223, 229);
    background-color: rgba(143, 155, 167, 0.648);
    border: none;
    box-shadow: none;
  }
  .el-dialog {
    background: rgb(220, 223, 229);
  }
}

#app.light-mode {
  background-image: url('./assets/bg.svg');
  background-attachment: fixed;
  background-size: 100%;
  color: $dark-color;
  .header_show {
    height: 45px;
    background-color: $theme;
    color: $light-color;
    font-size: 20px;
    line-height: 45px;
    text-align: center;
  }
  #logo1 {
    background-image: url("./assets/logo/bar_name_logo.svg");
    background-repeat: no-repeat;
  }
  .el-button {
    background-color: $theme;
    color: $light-color;
  }
  .el-button:hover {
    background-color: $light-color;
    color: $dark-theme;
  }
  .el-button--primary {
    background-color: #647c90 ;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
  .el-button {
    border: 0px;
    border-radius: 10px;
    transition: 0.2s;
    &:hover {
    transform: scale(105%);
      cursor: pointer;
      // border: #000 solid 2px;
    }
    &:active {
      transform: scale(90%);
    }
  }
  el-card {
    border-radius: 10px !important;
  }
}
* {
  margin: 0;
  padding: 0;
  
  // transition: 0.3s;
  // animation-name: enter_blur;
  // animation-iteration-count: 1;
  // animation-duration: 0.3s;
  // animation: enter_blur 0.4s cubic-bezier(.23,1.38,.65,.99);
}
.main {
  background-repeat: no-repeat;
  // background-position: 50% 0;
  // background-size: cover;
  // margin-bottom: 20px;
}
.el-message {
  margin-top: 60px;
}
/* 动画库 */
@keyframes enter_label {
  0% {
    margin-left: 0px;
    filter: blur(20px);
    opacity: 0%;
  }
  100% {
    margin-left: 50px;
    filter: blur(0px);
    opacity: 100%;
  }
}
@keyframes enter_aside {
  0% {
    left:-80px;
    filter: blur(20px);
    opacity: 0%;
  }
  100% {
    left:0px;
    filter: blur(0px);
    opacity: 100%;
  }
}
@keyframes enter_blur {
  0% {
    filter: blur(20px);
    opacity: 0%;
  }
  100% {
    filter: blur(0px);
    opacity: 100%;
  }
}
@keyframes exit_blur {
  0% {
    filter: blur(0px);
    opacity: 100%;
  }
  100% {
    filter: blur(20px);
    opacity: 0%;
  }
}
@keyframes shift_down {
  0% {
    opacity: 0%;
    top:-60px;
  }
  100% {
    opacity: 100%;
    top:0;
  }
}
//custom
// .el-card {
//   border-radius: 10px !important;
//   box-shadow: 0 0 7px rgba(204, 204, 204, 0.713);
//   background-color: rgba(255, 255, 255, 0.5);
//   backdrop-filter: blur(40px) brightness(105%);
// }
// .dark-mode {
//   .el-card {
//     background-color: rgba(143, 155, 167, 0.49);
//     box-shadow: 0 0 0px #ccc;
//   }
// }
el-icon:hover, el-icon-close:hover {
    color:  #748391 !important;
}
.el-input__inner,.el-textarea__inner {
  border-radius: 10px !important;
}
.el-input__inner:focus,.el-textarea__inner:focus {
  border-color: #748391 !important;
  /* background-color: #edeff071 !important; */
  /* background-color: #c8d3dd !important; */
}
.el-dialog, .el-message-box {
  width: 80%;
  // padding: 10px 10px 25px 10px !important;

  border-radius: 20px !important;
  box-shadow: 0 0 20px rgba(204, 204, 204, 0.768);
  // 动态+模糊加载效果不是很好
  // background-color: rgba(255, 255, 255, 0.649) !important;
  // backdrop-filter: blur(40px) brightness(100%);
  font-family: 微软雅黑;
  animation: shift_down 0.3s cubic-bezier(.23,1.38,.65,.99);
}
.el-dialog__close {
  &:hover {
    color: $theme !important;
  }
}
.v-modal {
  display: none;
}
/deep/.el-dialog {
  animation: none !important;
}
.el-dialog__wrapper, .el-message-box__wrapper {
  overflow: hidden;
  // position: relative;
  // width: fit-content;
}

.el-popper, 
.el-dropdown-menu__item {
  color: #35424e !important;
  font-family: 微软雅黑 !important;
  border-radius: 10px !important;
}
.el-dropdown-menu__item:hover {
  color: #35424e !important;
  background: rgba(191, 202, 217, 0.495) !important;
  border-radius: 10px !important;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(#101F1C, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144,147,153,.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color .3s;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144,147,153,.3);
}

.el-tooltip:focus, .el-tooltip:active, .el-tooltip, .el-tooltip:hover {
  color: #b0c3d1 !important;
}
.contextmenu_menu {
  border-radius: 15px !important;
  font-family: 微软雅黑 !important;
}
.contextmenu_menu_item:hover, .contextmenu_menu_item:focus, .contextmenu_menu_item:active{
  color: #35424e !important;
  background: rgba(191, 202, 217, 0.495) !important;
}
 /deep/ .contextmenu_menu_item:visited {
  color: #35424e !important;
  background: rgba(191, 202, 217, 0.495) !important;
}
.el-tooltip:focus, .el-tooltip:active, .el-tooltip, .el-tooltip:hover {
  color: #b0c3d1 !important;
}
iframe {
  border: none;
}

/* 右键 */
/* custom */
.custom-class .menu_item__available:hover,
.custom-class .menu_item_expand {
  background: #ebebef !important;
  color: #404042 !important;
}
/* antd */
.antd-theme.menu {
  border-radius: 2px !important;
}
.antd-theme .menu_item {
  color: #000000d9 !important;
}
.antd-theme .menu_item__available:hover {
  background: #f5f5f5 !important;
}
.antd-theme .menu_item_expand {
  font-weight: 600 !important;
  background-color: #9badb6 !important;
}
/* material */
.material-theme.menu {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12) !important;
}
.material-theme .menu_item {
  color: #000000de !important;
}
.material-theme .menu_item__available:hover,
.material-theme .menu_item_expand {
  background: rgba(0, 0, 0, 0.04) !important;
}
@media (max-width: 800px) {
  #app {
    background-image: none !important;
    background-color: rgb(243, 246, 249);
  }
  #app.dark-mode {
    background-image: none !important;
    background-color: #001C2A;
  }
  .abandon {
    display: none !important;
  }
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
