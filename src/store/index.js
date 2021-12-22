import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: "abc123",
      name: "Adam Jahr",
    },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ],
    events: [],
  },
  mutations: {
    SET_EVENT(state, events) {
      state.events = events;
    },
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
  },
  actions: {
    fetchEvents({ commit }, {perPage, page}) {
      EventService.getEvents(perPage, page)
        .then((response) => {
          commit("SET_EVENT", response.data); // <--- set the events data using mutation
        })
        .catch((err) => {
          console.log("There was an error: ", err.response);
        });
    },
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event); // <-- add the event to the state events
      });
    },
  },
});
