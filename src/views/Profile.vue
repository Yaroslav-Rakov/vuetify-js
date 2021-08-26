<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" class="mx-auto mt-6">
        <v-card elevation="2" outlined shaped tile>
          <v-card-title>{{ GET_AUTH_DATA.name }}</v-card-title>
          <v-card-text>Email: {{ GET_AUTH_DATA.email }}</v-card-text>
          <v-card-text>Registration date: {{ date }}</v-card-text>
      
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import store from '@/store/store.js'
import { mapGetters } from 'vuex';
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(['GET_AUTH_DATA']),
    date() {
      const date = new Date(this.GET_AUTH_DATA.dateCreated);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      console.log(date);
      return date.toLocaleDateString("en-EN", options);
    },
    },
    created() {
    store.dispatch("ACTION_AUTH_DATA");
    }
}
</script>
<style lang="">
    
</style>