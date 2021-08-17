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
      ></v-text-field>
    </v-responsive>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
name: 'SearchComponent',

data() {
    return {
      label: "",
      hint: "",
      placeholder: "",
      shaped: false,
      outlined: true,
      rounded: true,
      solo: false,
      singleLine: false,
      filled: false,
      clearable: true,
      persistentHint: false,
      loading: false,
      flat: false,
      counterEn: false,
      counter: 0,
      dense: false,
    }
},
created() {
    this.ACTION_ALLPOSTS_SEARCH();
    this.ACTION_POSTS_PAGE();
    console.log("Current page: " + this.page);
  },
  computed: {
    ...mapGetters(["GET_POSTS_PAGE", "GET_ALLPOSTS_SEARCH", "GET_SEARCH"]),

    search: {
    get () {
      return this.$store.state.search
    },
    set (value) {
      this.$store.commit('search', value)
    }
  },
   
  },
  methods: {
    ...mapActions(["ACTION_POSTS_PAGE", "ACTION_ALLPOSTS_SEARCH"]),
  },

};
</script>
<style>
</style>