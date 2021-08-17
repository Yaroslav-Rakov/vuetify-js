<template>
<div>
        <v-card
          class="mx-auto"
          v-for="(item, index) in filteredListSearch"
          :key="index"
        >
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text>{{ item.description }}</v-card-text>
          <v-card-actions class="justify-space-between">
            <v-btn class="ml-2" depressed medium color="indigo" dark>
              Read now
            </v-btn>
          </v-card-actions>
          <v-divider class="mt-3"></v-divider>
        </v-card>
</div>
</template>
<script>


export default {
    name: 'PostsComponent',

    data() {
        return {

        }
    }

}
</script>

