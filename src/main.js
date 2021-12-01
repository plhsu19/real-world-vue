import Vue from "vue";
import App from "./App.vue"; //root component
import router from "./router"; // for vue router
import store from "./store"; // for vuex

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App), // render the root component App
}).$mount("#app"); // mount it to the DOM where id: app is, ie, the component with the id: app
