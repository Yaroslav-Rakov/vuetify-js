<template>
  <v-app id="#app">
    <v-app-bar app color="indigo" depressed>
        <v-container class="py-0">
            <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>
            <v-btn color="white" v-if="this.$store.state.userModule.token" to="/" text><v-icon class="mr-2" aria-hidden="false"
            >mdi-view-dashboard
          </v-icon>Dashboard</v-btn>
            <v-btn color="white" v-if="this.$store.state.userModule.token && this.$store.state.postsModule.search && this.$store.state.postsModule.search.length > 0" :to="{path: '/posts', query: { page: pageQuery, perPage: perPage, search: search }}" text> <v-icon class="mr-2" aria-hidden="false"
            >mdi-note-multiple-outline
          </v-icon>Posts</v-btn>
            <v-btn color="white" v-else-if="this.$store.state.userModule.token" :to="{path: '/posts', query: { page: pageQuery, perPage: perPage }}" text>          <v-icon class="mr-2" aria-hidden="false"
            >mdi-note-multiple-outline
          </v-icon>Posts</v-btn>

                   <div class="float-right">
    <v-menu 
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="white"
          v-bind="attrs"
          v-on="on"
          text
        >
          <v-icon class="mr-2" aria-hidden="false"
            >mdi-account
          </v-icon>
          Account
        </v-btn>
      </template>

      <v-list>
          <v-list-item v-if="!this.$store.state.userModule.token">
              <v-list-item-title><v-btn to="/login" text><v-icon class="mr-2" aria-hidden="false"
            >mdi-login
          </v-icon>Login</v-btn> </v-list-item-title>
          </v-list-item>
          <v-list-item v-else-if="this.$store.state.userModule.token">
              <v-list-item-title>
                  <v-btn @click.native="resetToken"
                         to="/login"
                         text><v-icon class="mr-2" aria-hidden="false"
            >mdi-logout
          </v-icon>Log Out</v-btn>
              </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!this.$store.state.userModule.token">
              <v-list-item-title><v-btn to="/register" text><v-icon class="mr-2" aria-hidden="false"
            >mdi-account-plus
          </v-icon>Register</v-btn></v-list-item-title>
          </v-list-item>
          <v-list-item v-if="this.$store.state.userModule.token">
              <v-list-item-title><v-btn to="/profile" text><v-icon class="mr-2" aria-hidden="false"
            >mdi-card-account-details
          </v-icon>Profile</v-btn></v-list-item-title>
          </v-list-item>
          <v-list-item v-if="this.$store.state.userModule.token">
              <v-list-item-title><v-btn to="/" text><v-icon class="mr-2" aria-hidden="false"
            >mdi-view-dashboard
          </v-icon>Dashboard</v-btn></v-list-item-title>
          </v-list-item>
          <v-list-item v-if="this.$store.state.userModule.token && this.$store.state.postsModule.search && this.$store.state.postsModule.search.length > 0">
              <v-list-item-title>
                  <v-btn :to="{path: '/my-posts', query: { page: pageQuery, perPage: perPage, search: search }}" text>My posts</v-btn>
              </v-list-item-title>
          </v-list-item>
          <v-list-item v-else-if="this.$store.state.userModule.token">
              <v-list-item-title>
                  <v-btn :to="{path: '/my-posts', query: { page: pageQuery, perPage: perPage }}" text>          <v-icon class="mr-2" aria-hidden="false"
            >mdi-note-multiple-outline
          </v-icon>My posts</v-btn>
              </v-list-item-title>
          </v-list-item>
      </v-list>
    </v-menu>
</div>
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
import {mapGetters} from 'vuex'

export default {

  data() {
    return {
      page: this.$route.query.page
    };
  },
  computed: {
    ...mapGetters(['GET_AUTH_DATA']),

      perPage() {
          return this.$store.state.postsModule.postsLimit
      },
      pageQuery() {
        return this.$store.state.postsModule.pageUrl ? this.$store.state.postsModule.pageUrl : 1
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
.m-auto {
  margin-left: auto;
}
</style>