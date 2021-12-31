import Vue from "vue";
import Vuex from "vuex";
import * as event from "./modules/event" // option 1 for export/import module
import user from "./modules/user"; // option 2 for export/import module

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {  // similar as state, which could be mapped via its name using mapState() within components
    user,
    event,
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
