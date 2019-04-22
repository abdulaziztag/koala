<template style="box-shadow: inset 10px 0 white">
  <swiper :options="swiperOption2">
    <swiper-slide v-for="film in films" :key="film.id" class="a">
      <v-card aspect-ratio="2.75" class="grid" :to=" film.type ? `/film/${film.id}` : `/serial/${film.id}/1/1`" style="position: relative; color: white">
        <v-img
          class="white--text image"
          height="250px"
          :src="film.imageSrc"
        >
          <v-container fill-height fluid style="opacity: 0">
            <v-layout fill-height>
              <v-flex xs12 flexbox>
                <span class="headline">{{ film.title }}</span>
                <v-layout fill-height>
                  <v-flex xs12><p class="description">{{ film.description[0].toUpperCase() }}{{ film.description.slice(1) }}</p></v-flex></v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <div>
          <span class="headline swiper-card">{{ film.title }}</span>
          <p class="description swiper-card" style="top: 50px;">{{ film.description[0].toUpperCase() }}{{ film.description.slice(1) }}</p>
          <p class="view"><v-icon class="view-icon">remove_red_eye</v-icon>{{ film.views }}</p>
          <p class="rate"><v-icon class="rate-icon">star_rate</v-icon>{{ film.rate }}</p>
        </div>
      </v-card>
    </swiper-slide>
  </swiper>
</template>
<script>
  export default {
    props: ['films'],
    data () {
      return {
        swiperOption2: {
          slidesPerView: 4.5,
          spaceBetween: 10,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        innerW: 0
      }
    },
    created () {
      this.innerW = window.innerWidth
      if (this.innerW <= 330) {
        this.swiperOption2.slidesPerView = 1.5
      } else if (this.innerW <= 490) {
        this.swiperOption2.slidesPerView = 1.8
      } else if (this.innerW <= 540) {
        this.swiperOption2.slidesPerView = 2.5
      } else if (this.innerW <= 720) {
        this.swiperOption2.slidesPerView = 3.2
      } else if (this.innerW <= 1020) {
        this.swiperOption2.slidesPerView = 3.5
      }
    }
  }
</script>
<style scoped>
  .grid {
    overflow: hidden;
  }
  .grid:hover .image {
    transform: scale(1.1) translateX(5px);
    transition: .3s all;
    filter: blur(3px);
  }
  .grid:hover .headline {
    transition: .3s all;
    opacity: 1;
    font-size: 10px;
  }
  .swiper-card {
    position: absolute;
    top: 20px;
    left: 15px;
  }
  .grid:hover .description {
    opacity: 1;
    transition: all .3s;
  }
  .headline {
    opacity: .4;
    transition: .3s all;
  }
  .image {
    transition: .3s all;
  }
  .description {
    font-size: 22px;
    font-family: Calibri,serif;
    font-weight: lighter;
    opacity: 0;
    width: 85%;
    overflow: fragments;
    transition: all .3s;
  }
  .view {
    transition: .3s all;
    opacity: .7;
    position: absolute;
    bottom: 0;
    left: 45px
  }
  .grid:hover .view {
    transition: .3s all;
    opacity: 0;
  }
  .rate {
    transition: .3s all;
    opacity: .7;
    position: absolute;
    bottom: 0;
    right: 45px
  }
  .grid:hover .rate {
    transition: .3s all;
    opacity: 0;
  }
  .view-icon {
    position: absolute;
    right:15px;
    bottom:0
  }
  .rate-icon {
    position: absolute;
    left:30px;
    bottom:0
  }
</style>
