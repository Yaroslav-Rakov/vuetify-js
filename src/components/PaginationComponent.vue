<template lang="">
          <v-container>
            <v-row class="my-4" justify="center">
              <v-col cols="7">
                <!-- <v-container class="max-width"> -->
                  <v-pagination
                    v-model="page"
                    :length="paginationLength"
                    @input="myInput()"
                  ></v-pagination>
                <!-- </v-container> -->
              </v-col>
              <v-col cols="2">
          <v-text-field
            label="Posts on page"
            outlined
            @input="changePostsNumber"
          >
          </v-text-field>
                </v-col>
                <!-- <v-col cols="2">
                       <v-text-field
            label="Go to page"
            outlined
            @input="goTo"
          ></v-text-field>
        </v-col> -->
            </v-row>
          </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "PaginationComponent",

  data() {
    return {
      page: 1,
      postsNumber: 7,
    };
  },

  // watch:{
  //     $route (){
  //         this.$router.push(this.$route.params.page);
  //     }
  // },

  computed: {
    ...mapGetters(["GET_POSTS_PAGE", "GET_ALLPOSTS_SEARCH", "GET_POSTS"]),

    paginationLength() {
      if (this.$store.state.postsModule.search !== null && this.$store.state.postsModule.search.length > 0) {
        return 1;
      } 
        return Math.ceil(this.GET_ALLPOSTS_SEARCH.length / this.postsNumber);
      
      
    },
  },
  methods: {
    myInput() {
      console.log("Current page: " + this.page);
      // this.$store.dispatch("ACTION_POSTS_PAGE", this.page);
      this.$store.dispatch("ACTION_POSTS", this.page);
      this.$router.push({ path: "", query: { page: this.page } });
      console.log("Query: " + this.$route.query.page);
      // console.log("Root data: " + this.$root.params);
    },
    changePostsNumber(val) {
      // this.$store.commit("postsPerPage")
      if (val.length > 0 && val > 0) {
        this.postsNumber = val;
        this.$store.commit("NEW_LIMIT", parseInt(val));
        // this.$store.dispatch("ACTION_POSTS_PAGE", this.page);
        this.$store.dispatch("ACTION_POSTS", this.page);

      }
      console.log(val);
    },
    //     goTo(val) {
    //   // this.$store.commit("postsPerPage")
    //   if (val.length > 0 && val > 0) {

    //    this.$store.dispatch("ACTION_POSTS_PAGE", val)

    //   }
    //   console.log(val);
    // },
  },
};
</script>
<style lang="">
</style>