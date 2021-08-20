<template lang="">
          <v-container>
            <v-row class="my-4" justify="center">
              <v-col cols="7">
                  <v-pagination
                    v-model="page"
                    :length="this.$store.state.postsModule.paginationPages"
                    @input="myInput()"
                  ></v-pagination>
              </v-col>
              <v-col cols="2">
          <v-text-field
            label="Posts on page"
            outlined
            @input="changePostsNumber"
          >
          </v-text-field>
                </v-col>

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

  computed: {
    ...mapGetters(["GET_POSTS","GET_POSTS_LENGTH","GET_PAGINATION_PAGES"]),

    // paginationLength() {
    //     return Math.ceil(this.GET_PAGINATION_PAGES / this.postsNumber);
    // },
  },
  methods: {
    myInput() {
      console.log("Current page: " + this.page);
      this.$store.dispatch("ACTION_POSTS", this.page);
      this.$router.push({ path: "", query: { page: this.page } });
      console.log("Query: " + this.$route.query.page);
    },
    changePostsNumber(val) {
      if (val.length > 0 && val > 0) {
        this.postsNumber = val;
        this.$store.commit("NEW_LIMIT", parseInt(val));
        this.$store.dispatch("ACTION_POSTS", this.page);
        this.$store.dispatch("ACTION_PAGINATION_PAGES", this.page);

      }
      console.log(val);
    },
  },
};
</script>
<style lang="">
</style>