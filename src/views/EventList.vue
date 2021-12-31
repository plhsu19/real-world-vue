<template>
  <div>
    <h1>Events for {{user.user.name}}</h1>
    <EventCard v-for="event in event.events" v-bind:key="event.id" :event="event" />
    <template v-if="page !== 1">
      <router-link
        :to="{
          name: 'event-list',
          query: {
            page: page - 1,
          },
        }"
        rel="prev"
        >Pre Page</router-link
      >
      <template v-if="hasNextPage"> | </template>
    </template>
    <template v-if="hasNextPage">
      <router-link
        :to="{
          name: 'event-list',
          query: {
            page: page + 1,
          },
        }"
      >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";

export default {
  components: {
    EventCard,
  },
  created() {
    this.perPage = 3; // Setting perPage here and not in data means it won't be reactive.
    // We don't need it to be reactive, and this way our component has access to it.
    this.$store.dispatch("event/fetchEvents", {
      perPage: this.perPage,
      page: this.page,
    });
  },
  computed: {
    ...mapState(["user", "event"]), // event here is mapped to our `event` module ...
    // ...the state of the module `event` is also scoped under the event name
    page() {
      return this.$route.query.page || 1;
    },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.perPage;
    },
  },
};
</script>
