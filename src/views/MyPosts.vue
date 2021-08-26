<template>
  <v-container>
    <v-row class="album p-1">
      <v-col cols="6" md="9" class="mx-auto mt-6">
        <Posts />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Posts from '@/views/Posts.vue';

export default {
    components: {Posts}
}
</script>
<style lang="">
    
</style>