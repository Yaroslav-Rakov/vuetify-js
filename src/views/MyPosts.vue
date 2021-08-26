<template>
  <Posts />
</template>
<script>
import Posts from "@/views/Posts.vue";
import { mapGetters } from "vuex";

export default {
  components: { Posts },
  data() {
    return {};
  },
  created() {
    this.$router.push({
      path: "",
      query: {
        id: this.$route.query.id,
        page: this.$route.query.page,
        perPage: this.$route.query.perPage,
      },
    });
 
    console.log("MY ID: " + this.$route.query.id);
      this.$store.dispatch("ACTION_AUTH_DATA").then(action => { this.$store.dispatch(action) });
    console.log("Router path: " + this.$router.currentRoute.path);
  },
  computed: {
    ...mapGetters(["GET_AUTH_DATA", "GET_POSTS"]),
  },
};
</script>
