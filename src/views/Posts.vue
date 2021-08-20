<template>
  <v-container>
    <v-row class="album p-1">
      <v-col cols="6" md="9" class="mx-auto mt-6">
        <SearchComponent @search="onSearch" @clear="onClear" />
        <PostsComponent />
        <v-spacer></v-spacer>
        <PaginationComponent
          ref="paginationReset"
          @changePage="changePage"
          @changePostsLimit="changePostsLimit"
        />
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
    ...mapGetters(["GET_POSTS"]),
  },

  methods: {
    onSearch(value) {
      this.$store.dispatch("ACTION_SEARCH", value);
      this.$store.dispatch("ACTION_POSTS", value);
    },
    onClear() {
      this.$router.push({ path: "", query: { page: 1 } });
      this.$store.dispatch("ACTION_SEARCH", null);
      this.$store.dispatch("ACTION_POSTS", 1);
      this.$refs.paginationReset.setValue(1);
    },
    changePage(page) {
      console.log("Current page: " + page);
      this.$store.dispatch("ACTION_POSTS", page);
      this.$router.push({ path: "", query: { page: page } });
      console.log("Query: " + this.$route.query.page);
    },
    changePostsLimit(page, val) {
      this.$store.dispatch("ACTION_NEW_POSTS_LIMIT", val);
      this.$store.dispatch("ACTION_POSTS", page);
    },
  },
};
</script>
