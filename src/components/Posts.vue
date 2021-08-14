<template>
            <v-container>
                <v-row class="album p-1">
                    <v-col cols="6" md="9" class="mx-auto mt-16">
                        <v-card class="mx-auto" v-for="(item, index) in allPosts()" :key="index">
                            <v-card-title>{{item.title}}</v-card-title>
                            <v-card-text>{{item.description}}</v-card-text>
                            <v-card-actions class="justify-space-between">
                                <v-btn class="ml-2" depressed medium color="indigo" dark> Read now
                                </v-btn>
                            </v-card-actions>
                            <v-divider class="mt-3"></v-divider>
                        </v-card>
                        <br />
                        <!--             <v-btn depressed
                        elevation="2" @click="loadMore" style="margin-bottom: 400px">Load More</v-btn>-->
                        <div class="text-center">
                            <v-container>
                                <v-row justify="center">
                                    <v-col cols="8">
                                        <v-container class="max-width">
                                            <v-pagination v-model="page"
                                                          class="my-4"
                                                          :length="this.$store.state.allPostsLength" @next="next()" @previous="previous()" @input="myInput()" ></v-pagination>
                                        </v-container>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </div>


                    </v-col>
                </v-row>
            </v-container>

</template>

<script>
    import { mapActions, mapGetters } from "vuex"
    import store from '../store/store.js'

    export default {
        name: "PostsComponent",

        data() {
            return {
                page: store.state.currentPage,
                lim: 7
            }
        },

        created() {
            this.ACTION_POSTS_DATA;
            this.ACTION_POSTS_DATA_LENGTH;
            console.log('Current page: ' + this.page);

        },

        computed: {
            ...mapActions(["ACTION_POSTS_DATA","ACTION_POSTS_DATA_LENGTH"]),

            allPosts() {
                return this.GET_POSTS_DATA
            },
  //          len() {
  //              return this.$store.state.AllPostsLength
  //          }
        },

        methods: {
            ...mapGetters(["GET_POSTS_DATA"]),

    //        loadMore() {
    //            console.log(this.allPosts().length)
    //            this.$store.commit("NEW_LIMIT", this.lim)
    //            this.ACTION_POSTS_DATA;
    //         },

            next() {
                console.log(this.$store.state.skip)
                this.ACTION_POSTS_DATA;
            },
            previous() {
                console.log(this.$store.state.skip)
                this.ACTION_POSTS_DATA;
            },
            myInput() {
                console.log('Current page: ' + this.page);
                this.$store.commit("CURRENT_PAGE_LIM", this.lim);
                this.$store.commit("CURRENT_PAGE_SKIP", (this.page-1)*7)
                this.ACTION_POSTS_DATA;

            }
        }


    }

</script>
