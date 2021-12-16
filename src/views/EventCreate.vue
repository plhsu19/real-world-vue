<template>
  <div>
    <h1>Create Event, {{ user.name }}</h1>
    <p>The event is created by user ID: {{ user.id }}</p>
    <p>{{ getTodo(3) }}</p>
    <p>{{ catCount }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user", "categories"]),
    ...mapGetters({
      catCount: "catLength",
      getTodo: "getTodoById",
    }),
  },
};
</script>
