<template lang="">
            <div class="text-center">
          <v-container>
            <v-row justify="center">
              <v-col cols="8">
                <!-- <v-container class="max-width"> -->
                  <v-pagination
                    v-model="page"
                    class="my-4"
                    :length="paginationLength"
                    @input="myInput()"
                  ></v-pagination>
                <!-- </v-container> -->
              </v-col>
              <v-col cols="4">
                          <v-text-field class="my-4"
            label="Posts per page"
            outlined
            @input="changePostsNumber()"
          ></v-text-field>
                </v-col>
            </v-row>
          </v-container>
        </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "PaginationComponent",

  data() {
    return {
      page: this.$store.state.postsPerPage,
      postsNumber: 7,
    };
  },

  // watch:{
  //     $route (){
  //         this.$router.push(this.$route.params.page);
  //     }
  // },

  computed: {
    ...mapGetters(["GET_POSTS_PAGE", "GET_ALLPOSTS_SEARCH"]),

    paginationLength() {
      return Math.ceil(this.GET_ALLPOSTS_SEARCH.length / this.postsNumber);
    },
  },
  methods: {
    myInput() {
      console.log("Current page: " + this.page);
      this.$store.dispatch("ACTION_POSTS_PAGE", this.page);
      this.$router.push({ path: "", params: { page: this.page } });
      console.log("Params: " + this.$route.params.page);
      // console.log("Root data: " + this.$root.params);
    },
    changePostsNumber(){
      this.$store.commit("postsPerPage")
    }
  },
};
</script>
<style lang="">
</style>