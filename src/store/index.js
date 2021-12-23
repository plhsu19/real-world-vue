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
    event: {},
    eventsTotal: 0,
  },
  mutations: {
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTSTOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal;
    },
  },
  actions: {
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then((response) => {
          commit('SET_EVENTSTOTAL', parseInt(response.headers['x-total-count'])); // <-- set the total count of events
          commit("SET_EVENTS", response.data); // <--- set the events data using mutation
        })
        .catch((err) => {
          console.log("There was an error: ", err.response);
        });
    },
    fetchEvent({ commit, getters }, id) { // Send in the getters
      const event = getters.getEventById(id); // See if we already have this event in our state's events
      
      if (event) { // If we do, set the event
        commit('SET_EVENT', event);
      } else { //// If not, get it with the API.
        EventService.getEvent(id)
          .then((response) => {
            commit('SET_EVENT', response.data);
          })
          .catch((err) => {
            console.log("There was an error: ", err.response);
          });
      }
    },
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event); // <-- add the event to the state events
      });
    },
  },
  getters: {
    getEventById: state => (id) => {
      return state.events.find(event => event.id === id);
    }
  }
});
