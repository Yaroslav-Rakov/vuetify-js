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
   //   urlPage: null
    };
        },
        mounted() {

          //  let savePage = this.$store.state.postsModule.postsLimit ? this.$store.state.postsModule.postsLimit : 7
          //  this.$store.commit("SET_NEW_POSTS_LIMIT", savePage);
        },

        created() {
   
             this.page = parseInt(this.$route.query.page);
       //     this.page = parseInt(this.$store.state.postsModule.pageUrl);
    this.perPage = parseInt(this.$route.query.perPage);
    this.$store.dispatch("ACTION_PAGE_URL", this.page);
    this.$store.dispatch("ACTION_NEW_POSTS_LIMIT", this.perPage);
    this.$store.dispatch("ACTION_POSTS");
    this.$store.dispatch("ACTION_TOTAL_POSTS");

  },

  computed: {
    ...mapGetters(["GET_POSTS", "GET_TOTAL_POSTS", "GET_PAGINATION_PAGES"]),
  },

  methods: {
    onSearch(search) {
      this.$store.dispatch("ACTION_SEARCH", search);
      this.$store.dispatch("ACTION_POSTS", search);
      this.$router.push({ path: "", query: { page: this.$route.query.page, perPage: this.$route.query.perPage, search: this.$store.state.postsModule.search } });
    },
    onClear() {
      this.$router.push({ path: "", query: { page: this.$route.query.page, perPage: this.$route.query.perPage } });
      this.$store.dispatch("ACTION_SEARCH", null);
      this.$store.dispatch("ACTION_POSTS", 1);
      this.$refs.paginationReset.setPage(1);
    },
    changePage(page) {
      console.log("Current page: " + page);
      this.$store.state.postsModule.pageUrl = page;
      this.$store.dispatch("ACTION_POSTS", page);
      this.$router.push({ path: "", query: { page: page, perPage: this.$route.query.perPage } });
      console.log("Query: " + this.$route.query.page);
    },
    changePostsLimit(page, postsLimit) {
      this.$store.state.postsModule.pageUrl = page;
        this.$store.dispatch("ACTION_NEW_POSTS_LIMIT", postsLimit);
        this.$store.dispatch("ACTION_POSTS", page);
        console.log(this.GET_POSTS.length + 'LENGTH');
        this.$router.push({ path: "", query: { page: this.$store.state.postsModule.pageUrl, perPage: postsLimit } });
    
       
    },
    // pageFromUrl(){
    //   this.$refs.pageFromUrl.setPage(this.urlPage);
    // }
  },
};
</script>
