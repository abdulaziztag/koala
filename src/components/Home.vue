<template>
  <div>
    <v-layout justify-center align-center>
      <v-flex shrink style="width: 100%;" id="slider">
        <vue-flux
          class="swiper-slide"
          :options="fluxOptions"
          :images="fluxImages"
          :transitions="fluxTransitions"
          ref="slider"
        >
          <button style="background: red; position: absolute;top:50%; left: 50%" @click="$refs.slider.showImage('next')">NEXT</button>

        </vue-flux>
      </v-flex>
    </v-layout>
    <v-container grid-list-lg>
      <v-layout>
        <v-flex>
          <p class="headline">New films</p>
          <hr style="border: .7px solid">
        </v-flex>
      </v-layout>
      <v-layout>
        <app-slider :films="dataForNew"></app-slider>
      </v-layout>
      <v-layout style="margin-top: 40px">
        <v-flex>
          <p class="headline">Popular</p>
          <hr style="border: .7px solid">
        </v-flex>
      </v-layout>
      <v-layout>
        <app-slider :films="dataForPopular"></app-slider>
      </v-layout>
      <v-layout style="margin-top: 40px">
        <v-flex>
          <p class="headline">Serials</p>
          <hr style="border: .7px solid">
        </v-flex>
      </v-layout>
      <v-layout>
        <app-slider :films="dataForSerials"></app-slider>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { VueFlux, Transitions, FluxControls } from 'vue-flux'
import HomeSlider from './HomeSlider'

export default {
  data () {
    return {
      fluxOptions: {
        autoplay: true
      },
      fluxImages: [
        'https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg',
        'https://www.ctvnews.ca/polopoly_fs/1.4037876!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg',
        'https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg'
      ],
      fluxTransitions: {
        transitionBook: Transitions.transitionSwipe
      }
    }
  },
  computed: {
    dataForNew () {
      return this.$store.getters.dataNews
    },
    dataForPopular () {
      return this.$store.getters.dataPop
    },
    dataForSerials () {
      return this.$store.getters.dataSerials
    }
  },
  components: {
    appSlider: HomeSlider,
    VueFlux,
    FluxControls
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .swiper-slide {
    height: 550px;
    width: 100%
  }
  .slide-1 {
    background-image: url('https://www.ctvnews.ca/polopoly_fs/1.4037876!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg')
  }
  .slide-2 {
    background-image: url('https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg')
  }
  .slide-3 {
    background-image: url('https://www.ctvnews.ca/polopoly_fs/1.4037876!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg')
  }
  .slide-4 {
    background-image: url('https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg')
  }
</style>
