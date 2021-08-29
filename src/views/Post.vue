<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" class="mx-auto mt-6">
        <v-card elevation="2" outlined shaped tile><v-icon v-if="GET_POST_DATA.postedBy === GET_AUTH_DATA._id"
            @click="editPost(item._id)"
            class="float-right ma-4"
            aria-hidden="false"
            >mdi-pencil
          </v-icon>
          <v-card-title>{{ GET_POST_DATA.title }}</v-card-title>
          <v-card-text>{{ GET_POST_DATA.description }}</v-card-text>
          <v-card-text>{{ GET_POST_DATA.fullText }}</v-card-text>
          <v-card-text>Likes: {{ GET_POST_DATA.likes.length }}</v-card-text>
          <v-card-text>Posted by {{ GET_POST_DATA.postedBy }} </v-card-text>
          <v-card-text>{{ date }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  created() {
     this.$store.dispatch("ACTION_POST_DATA", this.$route.query.id);
     this.$store.dispatch("ACTION_AUTH_DATA").then(post => { this.$store.dispatch(post, this.$route.query.id) });
     console.log('Router query from Post.vue: '+this.$route.query.id);
  },

  computed: {
    ...mapGetters(["GET_POST_DATA", "GET_AUTH_DATA"]),

    date() {
      const date = new Date(this.GET_POST_DATA.dateCreated);
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
  methods: {

  },
};
</script>