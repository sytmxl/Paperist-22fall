import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '../src/assets/icon/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);

axios.defaults.baseURL = ""
axios.defaults.headers ["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8"

new Vue({
  router,
  store,
  ElementUI,
  render: h => h(App)
}).$mount('#app')
