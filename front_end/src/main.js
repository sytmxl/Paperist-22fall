import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '../src/assets/icon/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css';
import instance from "@/http";
import VueClipboard from 'vue-clipboard2'
import './element-variables.scss'
Vue.prototype.$axios = instance
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueClipboard)

new Vue({
  router,
  store,
  ElementUI,
  render: h => h(App)
}).$mount('#app')
