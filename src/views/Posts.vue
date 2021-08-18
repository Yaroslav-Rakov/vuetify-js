<template>
  <v-container>
    <v-row class="album p-1">
      <v-col cols="6" md="9" class="mx-auto mt-6">
        <SearchComponent />
        <PostsComponent @clicked="onClickChild"/>
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
    return {

    };
  },

  created() {
    console.log("Current page: " + this.page);
    // console.log("Emitted: " + this.onClickChild);

  },

  computed: {
    ...mapGetters(["GET_POSTS_PAGE", "GET_ALLPOSTS_SEARCH"]),
  },

    methods: {
    onClickChild (value) {
      console.log(value) // someValue
    }
  }
};
</script>
