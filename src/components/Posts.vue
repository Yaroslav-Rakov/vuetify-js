<template>
    <v-app id="app">
        <v-flex>
            <v-container fluid grid-list-lg class="mt-5">
                <v-row class="album p-1">
                    <v-col cols="6" md="9" class="mx-auto">
                        <v-card class="mx-auto" v-for="item in allPosts()" :key="item._id">
                            <v-card-title>{{item.title}}</v-card-title>
                            <v-card-text>{{item.description}}</v-card-text>
                            <v-card-actions class="justify-space-between">
                                <v-btn-toggle dense>
                                    <v-btn text>Read now</v-btn>
                                </v-btn-toggle>
                            </v-card-actions>
                            <v-divider class="mt-3"></v-divider>
                        </v-card>
                        <br />
                        <v-btn depressed
                               elevation="2" @click="loadMore" style="margin-bottom: 400px">Load More</v-btn>
                     


                    </v-col>
                </v-row>
            </v-container>
            </v-flex>
</v-app>

</template>

<script>
    import { mapActions, mapGetters } from "vuex"
  //  import store from '../components/Posts.vue'

    export default {
        name: "PostsComponent",

        data() {
            return {

            }
        },

        created() {
            this.ACTION_POSTS_DATA;

        },

        computed: {
            ...mapActions(["ACTION_POSTS_DATA"]),

            allPosts() {
                return this.GET_POSTS_DATA
            }
        },

        methods: {
            ...mapGetters(["GET_POSTS_DATA"]),

            loadMore() {
                console.log(this.allPosts().length)
                this.$store.commit("NEW_LIMIT", 7)
                this.ACTION_POSTS_DATA;
            }
        }


    }

</script>
