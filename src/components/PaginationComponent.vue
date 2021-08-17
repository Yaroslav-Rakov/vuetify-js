<template lang="">
            <div class="text-center">
          <v-container>
            <v-row justify="center">
              <v-col cols="8">
                <v-container class="max-width">
                  <v-pagination
                    v-model="page"
                    class="my-4"
                    :length="paginationLength"
                    @input="myInput()"
                  ></v-pagination>
                </v-container>
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
      page: 1,
      postsNumber: 7,
    };
  },

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
    },
  },
};
</script>
<style lang="">
</style>