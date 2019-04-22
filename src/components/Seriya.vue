<template>
  <div>
    <vue-plyr>
      <video :poster="film.imageSrc">
        <source :src="film.serii[unique-1][ident-1]"/>
      </video>
    </vue-plyr>
    <v-container><p class="title">{{ unique }} Сезон {{ ident }} Серия </p></v-container>
  </div>
</template>
<script>
  export default {
    props: ['ident', 'unique'],
    computed: {
      film () {
        return this.$store.getters.filmById(this.$route.fullPath.split('/')[2])
      }
    }
  }
</script>
