<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
        <v-container class="py-0 fill-height">
            <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>
            <v-btn to="/" text>Home</v-btn>
            <v-btn to="/posts" text>Posts</v-btn>
            <v-btn v-if="!this.$store.state.token" to="/login" text>Login</v-btn>
            <v-btn v-if="!this.$store.state.token" to="/register" text>Register</v-btn>
            <v-btn v-else-if="this.$store.state.token"
                   @click.native="resetToken"
                   to="/login"
                   text>Log Out</v-btn>

            <v-spacer></v-spacer>

            <v-responsive max-width="260">
                <v-text-field dense
                              flat
                              hide-details
                              rounded
                              solo-inverted></v-text-field>
            </v-responsive>
        </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
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
                  <div v-if="this.$route.path == '/posts'">
                      <PostsComponent />
                  </div>
              </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import PostsComponent from "./components/Posts.vue";
import RegisterComponent from "./components/Register.vue";
import LoginComponent from "./components/Login.vue";
import HomeComponent from "./components/Home.vue";
import store from "./store/store.js";

export default {
  components: { LoginComponent, HomeComponent, RegisterComponent, PostsComponent
      },
  data() {
    return {
      
    };
  },
  methods: {
    resetToken() {
      this.$store.state.token = "",
      localStorage.token = "";
      store.getters.GET_AUTH_DATA.name = '';
    },
    created(){

    store.dispatch('ACTION_AUTH_DATA');

},

  },
};
</script>