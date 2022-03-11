import App from './App'
import store from './store'
import uView from "uview-ui";


// #ifndef VUE3
import Vue from 'vue'
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$EventBus = new Vue()
Vue.prototype.$store = store
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(uView)
  return {
    app
  }
}
// #endif