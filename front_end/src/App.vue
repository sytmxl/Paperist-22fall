<template>
  <div id="app">
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
  data() {
    return {
      msg: "Hello Vue.js!",
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  margin: 0;
  padding: 0;
}
.main {
  background-image: url(./assets/homebg.png);
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
