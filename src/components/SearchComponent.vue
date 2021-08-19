<template>
  <div>
    <v-responsive max-width="350">
      <v-text-field
        v-model="search"
        :label="label"
        :hint="hint"
        :placeholder="placeholder"
        :shaped="shaped"
        :outlined="outlined"
        :rounded="rounded"
        :solo="solo"
        :single-line="singleLine"
        :filled="filled"
        :clearable="clearable"
        :persistent-hint="persistentHint"
        :loading="loading"
        :flat="flat"
        :counter="counterEn ? counter : false"
        :dense="dense"
      >
        <template v-slot:append>
          <v-icon class="ml-3" aria-hidden="false" @click="clear"
            >mdi-close
          </v-icon>
          <v-icon class="ml-3" aria-hidden="false" @click="clickSearch"
            >mdi-text-search
          </v-icon>
        </template>
      </v-text-field>
    </v-responsive>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SearchComponent",

  data() {
    return {
      search: null,
      label: "",
      hint: "",
      placeholder: "",
      shaped: false,
      outlined: true,
      rounded: true,
      solo: false,
      singleLine: false,
      filled: false,
      clearable: false,
      persistentHint: false,
      loading: false,
      flat: false,
      counterEn: false,
      counter: 0,
      dense: false,
    };
  },
  created() {
    this.ACTION_ALLPOSTS_SEARCH();
    this.ACTION_POSTS_PAGE();
    this.ACTION_POSTS();

    console.log("Current page: " + this.page);
  },
  computed: {
    ...mapGetters(["GET_POSTS_PAGE", "GET_ALLPOSTS_SEARCH", "GET_SEARCH", "GET_POSTS"]),

    //   search: {
    //   get () {
    //     return this.$store.state.search
    //   },
    //   set (value) {
    //     this.$store.commit('search', value)
    //   }
    // },

  },
  methods: {
    ...mapActions(["ACTION_POSTS_PAGE", "ACTION_ALLPOSTS_SEARCH", "ACTION_POSTS", "ACTION_SEARCH"]),
    clickSearch() {
      this.$emit("clicked", this.search);
      console.log("searched");
    },

    clear() {
      this.search = null;
      this.$emit("cleared", this.search);
      console.log("cleared");
    },
  },
};
</script>
<style>
</style>