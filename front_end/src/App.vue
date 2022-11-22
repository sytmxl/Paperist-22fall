<template>
  <div id="app" class="light-mode">
    <div class="main"><router-view /></div>
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
$light-color: #eee;
$dark-theme: #001C2A;
$theme: #003B55;

#app.dark-mode {
  background-image: url('./assets/bg_dark.svg');
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
  button {
    background-color: $light-color;
    color: $dark-theme;
  }
  button:hover {
    background-color: $theme;
    color: $light-color;
  }
}

#app.light-mode {
  background-image: url('./assets/bg.svg');
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
  button {
    background-color: $theme;
    color: $light-color;
  }
  button:hover {
    background-color: $light-color;
    color: $dark-theme;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  button {
    border: 0px;
    border-radius: 10px;
    transition: 0.3s;
  }
  el-card {
    border-radius: 10px !important;
  }
}
* {
  margin: 0;
  padding: 0;
  
}
.main {
  // background-image: url(./assets/bg.svg);
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
  margin-bottom: 20px;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
