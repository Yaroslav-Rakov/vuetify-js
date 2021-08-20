<template lang="">
          <v-container>
            <v-row class="my-4" justify="center">
              <v-col cols="5">
                  <v-pagination
                    v-model="page"
                    :length="this.$store.state.postsModule.paginationPages"
                    @input="myInput()"
                  ></v-pagination>
              </v-col>
              <v-col cols="2">
    <v-menu
      top
      :offset-y="offset"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="my-1"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Pages
        </v-btn>
      </template>

      <v-list>
        <v-list-item-group>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title @click="changePostsNumber(item.title)">{{ item.title }}</v-list-item-title>
        </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
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
      items: [{ title: 12 }, { title: 9 }, { title: 7 }, { title: 5 }],
      offset: true,
    };
  },
  watch: {
    page: function (val) {
      this.page = val;
    },
  },

  computed: {
    ...mapGetters(["GET_POSTS", "GET_POSTS_LENGTH", "GET_PAGINATION_PAGES"]),

    // page: {
    //   get() {
    //     {
    //         return this.$store.state.postsModule.routePage
    //     }
    //   }

    // }
  },
  methods: {
    setValue: function (value) {
      this.page = value;
    },
    myInput() {
      this.$store.state.postsModule.routePage = this.page;
      console.log("Current page: " + this.page);
      this.$store.dispatch("ACTION_POSTS", this.page);
      this.$router.push({ path: "", query: { page: this.page } });
      console.log("Query: " + this.$route.query.page);
    },
    changePostsNumber(val) {
      if (val > 0) {
        this.$store.state.postsModule.routePage = this.page;
        this.$store.dispatch("ACTION_NEW_POSTS_LIMIT", parseInt(val));
        this.$store.dispatch("ACTION_POSTS", this.page);
      }
      console.log(val);
    },
  },
};
</script>
<style lang="">
</style>