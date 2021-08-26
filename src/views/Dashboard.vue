<template>

    <v-main>
      <v-container>
        <v-row>
          <v-col class="d-flex justify-center" cols="12">
            <h1>Hello {{ usr }}</h1>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    
</template>

<script>
import store from "../store/store.js";
// import { mapGetters, mapActions } from "vuex";
export default {
  name: "HomeComponent",
  created() {
    store.dispatch("ACTION_AUTH_DATA");
  },
  computed: {
    usr() {
      if (store.state.userModule.token) {
        return store.getters.GET_AUTH_DATA.name;
      } else {
        return ''
      }
    },
  },

  data() {
    return {};
  },
};
</script>
