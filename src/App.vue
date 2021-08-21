<template>
  <v-app id="#app">
    <v-app-bar app color="indigo" depressed>
        <v-container class="py-0 fill-height my-class">
            <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>
            <v-btn color="white" to="/" text>Home</v-btn>
            <v-btn color="white" v-if="this.$store.state.userModule.token && this.$store.state.postsModule.search !== null && this.$store.state.postsModule.search.length > 0" :to="{path: '/posts', query: { page: this.$store.state.postsModule.pageUrl, perPage: perPage, search: search }}" text>Posts</v-btn>
            <v-btn color="white" v-else :to="{path: '/posts', query: { page: this.$store.state.postsModule.pageUrl, perPage: perPage }}" text>Posts</v-btn>
            <v-btn color="white" v-if="!this.$store.state.userModule.token" to="/login" text>Login</v-btn>
            <v-btn color="white" v-if="!this.$store.state.userModule.token" to="/register" text>Register</v-btn>
            <v-btn color="white"
                   v-else-if="this.$store.state.userModule.token"
                   @click.native="resetToken"
                   to="/login"
                   text>Log Out</v-btn>

            <v-spacer></v-spacer>

            <!--            <v-responsive max-width="260">
            <v-text-field dense
                          flat
                          hide-details
                          rounded
                          solo-inverted></v-text-field>
        </v-responsive>-->
        </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
       <v-sheet min-height="70vh" rounded="lg">
        <router-view></router-view>
       </v-sheet>
        <!-- <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item v-for="n in 5" :key="n" link>
                  <v-list-item-content>
                    <v-list-item-title> List Item {{ n }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> Refresh </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <div v-if="this.$route.path == '/login'">
                <LoginComponent />
              </div>
              <div v-if="this.$route.path == '/register'">
                <RegisterComponent />
              </div>
              <div v-if="this.$route.path == '/'">
                <HomeComponent />
              </div>
              <div v-if="this.$route.name == 'Posts'">
                <PostsView />
              </div>
            </v-sheet>
          </v-col>
        </v-row> -->
      </v-container>
    </v-main>
  </v-app>
</template>


<script>

import store from "./store/store.js";
import { clearAccessToken } from "./store/auth.js";

export default {

  data() {
    return {
      page: this.$route.query.page
    };
  },
  computed: {

      perPage() {
          return this.$store.state.postsModule.postsLimit
      },

      search() {
          if (this.$store.state.postsModule.search.length > 0) {
              return this.$store.state.postsModule.search
          } else {
              return ''
          }
      }


  },
  methods: {
    resetToken() {
      (this.$store.state.userModule.token = ""), clearAccessToken();
    },
    created() {
      store.dispatch("ACTION_AUTH_DATA");
    },
  },
};
</script>

<style scoped>
</style>