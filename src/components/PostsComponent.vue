<template>
  <div>
    <v-card
      class="mb-1"
      v-for="(item, index) in GET_FILTERED_POSTS"
      :key="index"
    >
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-text>{{ item.description }}</v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn class="ml-2" depressed medium color="indigo" dark>
          Read now
        </v-btn>
      </v-card-actions>
      <v-divider class="mt-3"></v-divider>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PostsComponent",

  data() {
    return {


    };
  },
 
  computed: {
    ...mapGetters(["GET_POSTS_PAGE", "GET_ALLPOSTS_SEARCH","GET_SEARCH","GET_FILTERED_POSTS"]),

    search: {
      get () {
        return this.$store.state.search
      }
    },

    // filteredList() {
    //   return this.GET_POSTS_PAGE.filter((post) => {
    //     let checkNull =
    //       this.search === null
    //         ? this.GET_POSTS_PAGE
    //         : post.title.toLowerCase().includes(this.search.toLowerCase());
    //     return checkNull;
    //   });
    // },
    // filteredListSearch() {
    //   if (this.search !== null && this.search.length > 0) {
    //     return this.GET_ALLPOSTS_SEARCH.filter((post) => {
    //       let checkNull =
    //         this.search === null
    //           ? this.filteredList
    //           : post.title.toLowerCase().includes(this.search.toLowerCase());
    //       return checkNull;
    //     });
    //   } else {
    //     return this.filteredList;
    //   }
    // },
  },
  methods: {
    ...mapActions(["ACTION_POSTS_PAGE", "ACTION_ALLPOSTS_SEARCH"]),
  },
};
</script>

