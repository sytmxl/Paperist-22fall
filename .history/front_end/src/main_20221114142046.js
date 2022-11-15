import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import jvuewheel from '@jyeontu/jvuewheel'
import '@jyeontu/jvuewheel/lib/jvuewhell.css'
Vue.use(jvuewheel);
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  ElementUI,
  render: h => h(App)
}).$mount('#app')