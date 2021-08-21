<template>
  <div v-if="GET_POSTS.length !== 0">
        <v-card
      class="mb-1"
      v-for="(item, index) in GET_POSTS"
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
  <div class="text-h4" v-else>
      Please choose another page
     
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "PostsComponent",

  data() {
    return {

    };
        },
    created() {

        },
 
  computed: {
    ...mapGetters(["GET_SEARCH", "GET_POSTS"]),

    search: {
      get () {
        return this.$store.state.postsModule.search
      }
    },
  
  },
  methods: {
  },
};
</script>

