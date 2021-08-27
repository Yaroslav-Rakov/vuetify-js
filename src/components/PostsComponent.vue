<template>
  <div v-if="GET_POSTS.length !== 0">
    <v-menu left :offset-x="offset">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="my-1" color="primary" dark v-bind="attrs" v-on="on">
          Sort: {{ sortButtonText }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item-group>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title @click="sort(item.title)">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <div class="d-flex flex-wrap">
      <v-card
        max-width="300"
        class="mb-2 mr-2"
        v-for="(item, index) in GET_POSTS"
        :key="index"
      >
        <v-card-title>
          <span class="truncate-title">{{ item.title }}</span>
          <v-icon
            @click="editPost(item.postedBy)"
            class="ml-6"
            aria-hidden="false"
            >mdi-pencil
          </v-icon></v-card-title
        >

        <v-card-text class="truncate">{{ item.description }}</v-card-text>
        <v-card-actions>
          <v-btn
            @click="readMore(item._id)"
            class="ml-2"
            depressed
            medium
            color="indigo"
            dark
          >
            Read more </v-btn
          ><v-card-text class="d-flex justify-end">{{
            item.dateCreated
          }}</v-card-text>
        </v-card-actions>
        <!-- <v-divider class="mt-3"></v-divider> -->
      </v-card>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "PostsComponent",

  data() {
    return {
      items: this.$store.state.postsModule.sort,
      offset: true,
    };
  },
  created() {},

  computed: {
    ...mapGetters(["GET_SEARCH", "GET_POSTS"]),

    search: {
      get() {
        return this.$store.state.postsModule.search;
      },
    },
    sortButtonText() {
      return this.$store.state.postsModule.sortChoice;
    },
  },
  methods: {
    sort(item) {
      console.log("Sort: " + item);
      this.$emit("sort", item);
    },
    readMore(post) {
      this.$emit("readMore", post);
    },
    editPost(post) {
      this.$emit("editPost", post);
    },
  },
};
</script>

<style scoped>
/* .column_wrapper {
  column-count: 2;
} */
.truncate-title {
  width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block !important;
}

.truncate {
  width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block !important;
}
</style>

