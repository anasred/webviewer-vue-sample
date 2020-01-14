import Vue from 'vue'
import App from './App.vue'
window.saveAs = require('file-saver');

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
