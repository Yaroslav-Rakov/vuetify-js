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
    return {
      urlPage: null
    };
  },

  created() {
    console.log("Current page: " + this.page);
    // this.urlPage = this.$route.query.page;
    // console.log("Url page: "+this.urlPage);
  },

  computed: {
    ...mapGetters(["GET_POSTS"]),
  },

  methods: {
    onSearch(search) {
      this.$store.dispatch("ACTION_SEARCH", search);
      this.$store.dispatch("ACTION_POSTS", search);
    },
    onClear() {
      this.$router.push({ path: "", query: { page: 1 } });
      this.$store.dispatch("ACTION_SEARCH", null);
      this.$store.dispatch("ACTION_POSTS", 1);
      this.$refs.paginationReset.setPage(1);
    },
    changePage(page) {
      console.log("Current page: " + page);
      this.$store.state.postsModule.pageUrl = page;
      this.$store.dispatch("ACTION_POSTS", page);
      this.$router.push({ path: "", query: { page: page } });
      console.log("Query: " + this.$route.query.page);
    },
    changePostsLimit(page, postsLimit) {
      this.$store.state.postsModule.pageUrl = page;
      this.$store.dispatch("ACTION_NEW_POSTS_LIMIT", postsLimit);
      this.$store.dispatch("ACTION_POSTS", page);
    },
    pageFromUrl(){
      this.$refs.pageFromUrl.setPage(this.urlPage);
    }
  },
};
</script>
