<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col class="d-flex justify-center" cols="12">
            <h1>Hello {{ this.userName }}</h1>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import store from "../store/store.js";
import { mapGetters } from "vuex";
export default {
  name: "HomeComponent",

  created() {

  },

  computed: {
    ...mapGetters(["GET_LOGIN"]),
 
  },

  data() {
    return {
      userName: localStorage.name + '!',
    };
  },
};
</script>
