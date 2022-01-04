import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
    events: [],
    event: {},
    eventsTotal: 0,
};

export const mutations = {
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
}

export const actions = {
    fetchEvents({ commit, dispatch }, { perPage, page }) {
        EventService.getEvents(perPage, page)
            .then((response) => {
                commit('SET_EVENTSTOTAL', parseInt(response.headers['x-total-count'])); // <-- set the total count of events
                commit("SET_EVENTS", response.data); // <--- set the events data using mutation
            })
            .catch((err) => {
                const notification = {
                    type: 'error',
                    message: 'there was a problem fetching events: ' + err.message
                }
                dispatch('notification/add', notification, { root: true });
            });
    },
    fetchEvent({ commit, getters, dispatch }, id) { // Send in the getters
        const event = getters.getEventById(id); // See if we already have this event in our state's events

        if (event) { // If we do, set the event
            commit('SET_EVENT', event);
        } else { //// If not, get it with the API.
            EventService.getEvent(id)
                .then((response) => {
                    commit('SET_EVENT', response.data);
                })
                .catch((err) => {
                    const notification = {
                        type: 'error',
                        message: 'there was a problem fetching event: ' + err.message
                    }
                    dispatch('notification/add', notification, { root: true });
                });
        }
    },
    createEvent({ commit, rootState, dispatch }, event) {

        console.log('User creating event is:' + rootState.user.user.name);
        // dispatch('moduleName/actionToCall', null, { root: true }); 
        // dispatch('actionToCall')
        // call actions in this module and all other non-nameSpaced modules by directly calling dispatch('actionName')
        // call actions in other nameSpaced modules by calling dispatch('moduleName/actionToCall', null, { root: true })

        return EventService.postEvent(event).then(() => {
            commit("ADD_EVENT", event); // <-- add the event to the state events
            const notification = {
                type: 'success',
                message: 'Your event has been created!'
            }
            dispatch('notification/add', notification, { root: true });
        }).catch(err => {
            const notification = {
                type: 'error',
                message: 'there was a problem creating your event: ' + err.message
            }
            dispatch('notification/add', notification, { root: true });
            throw err;
        });
    },
};

export const getters = {
    getEventById: state => (id) => {
        return state.events.find(event => event.id === id);
    }
};