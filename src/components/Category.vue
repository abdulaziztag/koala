<template>
  <div>
    <v-container grid-list-lg>
      <v-layout wrap fill-height>
        <v-flex v-for="item in category" :key="item.id" xs6 sm4 md4 lg3 xl2>
          <v-card :to="`/film/${item.id}`">
            <v-container>
              <v-img :src="item.imageSrc" aspect-ratio="0.75"></v-img>
              <h1>{{ item.title }}</h1>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      category () {
        const id = this.id
        return this.$store.getters.categoryById(id)
      }
    },
    created () {
      if (this.category.length === 0) {
        this.$router.push('/error')
      }
    }
  }
</script>
<style scoped>

</style>
