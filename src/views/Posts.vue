<template>
  <v-container>
    <v-row class="album p-1">
      <v-col cols="6" md="9" class="mx-auto mt-6">
        <SearchComponent @clicked="onSearchChild" @cleared="onClearChild"/>
        <PostsComponent />
        <v-spacer></v-spacer>
        <PaginationComponent />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import PostsComponent from "@/components/PostsComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";

export default {
  name: "PostsView",
  components: { PostsComponent, SearchComponent, PaginationComponent },

  data() {
    return {};
  },

  created() {
    console.log("Current page: " + this.page);
  },

  computed: {
    ...mapGetters(["GET_POSTS_PAGE", "GET_ALLPOSTS_SEARCH"]),
  },

  methods: {
    onSearchChild(value) {
      // this.$store.commit("SEARCH", value);
      this.$store.dispatch("ACTION_SEARCH", value);
    },
    onClearChild() {
      this.$store.commit("SEARCH", null);
    },
  },
};
</script>
