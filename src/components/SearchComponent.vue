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
        @input="debounceSearch"
      >
        <template v-slot:append>
          <v-icon class="ml-3" aria-hidden="false" @click="clear"
            >mdi-close
          </v-icon>
          <v-icon class="ml-3" aria-hidden="false"
            >mdi-text-search
          </v-icon>
        </template>
      </v-text-field>
    </v-responsive>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import debounce from 'lodash/debounce';

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
    this.ACTION_POSTS();

    console.log("Current page: " + this.page);
  },
  computed: {
    ...mapGetters(["GET_SEARCH", "GET_POSTS"]),
  },
  methods: {
    ...mapActions(["ACTION_POSTS", "ACTION_SEARCH"]),

    onSearch() {
      this.$emit("search", this.search);
      console.log("searched");
    },

    debounceSearch() {
      return debounce(this.onSearch, 2000)
    },

    clear() {
      this.search = null;
      this.$emit("clear", this.search);
      console.log("cleared");
    },
  },
};
</script>
<style>
</style>