import Vue from "vue";
import Vuex from "vuex";
import * as event from "@/store/modules/event.js" // option 1 for export/import module
import * as notification from "@/store/modules/notification.js"
import user from "@/store/modules/user.js"; // option 2 for export/import module

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {  // similar as state, which could be mapped via its name using mapState() within components
    user,
    event,
    notification,
  },
  state: {
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ],
  },
});
