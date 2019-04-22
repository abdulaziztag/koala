<!--suppress ALL -->
<template>
  <div>
    <router-view></router-view>
    <v-container>
      <v-card>
        <v-container grid-list-lg>
          <p class="display-2">{{ film.title }}</p>
          <v-layout fill-height wrap justify-space-between>
            <v-flex xs12 sm4 md3>
              <v-card>
                <v-img class="elevation-10" aspect-ratio="0.8" :src="film.imageSrc"></v-img>
              </v-card>
            </v-flex>
            <v-flex class="mt-3" xs12 sm8 md9>
              <v-data-table
                :items="info"
                hide-actions
                hide-headers
              >
                <template v-slot:items="props">
                  <td class="info-text">{{ props.item.header }}</td>
                  <td style="font-size: 18px; padding: 10px" class="text-xs-left font-weight-light">{{ props.item.text }}
                  </td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
          <p class="title mt-4" style="text-indent: 20px">{{ film.description[0].toUpperCase() }}{{ film.description.slice(1) }}</p>
          <p color="error" class="headline font-weight-light
">Rate</p>
          <v-btn
            color="success"
            flat
            :disabled="!rated"
            icon
          >
            <v-icon>thumb_up</v-icon>
          </v-btn>
          {{ film.rate }}
          <v-btn
            flat
            color="error"
            :disabled="!rated"
            icon
          >
            <v-icon>thumb_down</v-icon>
          </v-btn>
          <p class="headline">Категории</p>
          <v-btn
            round
            style="color: white;"
            color="yellow darken-4"
            :to="`/category/${item.id}`"
            :key="item.id"
            v-for="item in film.category">
            {{ item.title }}
          </v-btn>
        </v-container>
      </v-card>
    </v-container>
    <v-container v-if="comments.length === 0">
      <h1>No comment</h1>
    </v-container>
    <v-container grid-list-lg v-else>
      <h1>Комментарии</h1>
      <br>
      <v-layout wrap>
        <v-flex class="mb-1" :key="comment.id" v-for="comment in comments" lg6 xs12>
          <v-card class="elevation-8">
            <v-container grid-list-lg>
              <v-layout wrap>
                <v-flex xs4 width="50%" class="elevation-6">
                  <v-img :src="comment.userImg"></v-img>
                </v-flex>
                <v-flex xs6 style="margin-left: 20px">
                  <h1>{{ comment.userName }}</h1>
                  <p>{{ comment.text }}</p>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-textarea v-model="comment" outline color="red darken-2" label="Комментарий"></v-textarea>
      <v-btn @click="addComment">Добавить</v-btn>
    </v-container>
    <v-container>
      <p class="display-1">Похожие фильмы</p>
      <film-slider :films="randomFilms"></film-slider>
    </v-container>
  </div>
</template>
<script>
  import HomeSlider from './HomeSlider'

  export default {
    props: ['id'],
    data () {
      return {
        comment: ''
      }
    },
    methods: {
      addComment () {
        const comment = {
          filmId: this.film.id,
          text: this.comment,
          userName: 'Kimdur',
          userImg: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
        }
        this.$store.dispatch('addComment', comment)
        this.comment = ''
      }
    },
    computed: {
      film () {
        const id = this.id
        return this.$store.getters.filmById(id)
      },
      comments () {
        const id = this.id
        return this.$store.getters.comment(id)
      },
      randomFilms () {
        return this.$store.getters.randomFilms(this.film)
      },
      info () {
        return [
          {
            header: 'Год',
            text: this.film.info.year
          },
          {
            header: 'Актеры',
            text: this.film.info.actors.join(', ')
          },
          {
            header: 'Режисерры',
            text: this.film.info.regissor.join(', ')
          }
        ]
      },
      rated () {
        const ff = 'man'
        const finded = this.film.ratedUsers.find(key => key === ff)
        if (finded === undefined) {
          return true
        } else {
          return false
        }
      }
    },
    created () {
      if (this.film === undefined) {
        this.$router.push('/error')
      }
      this.$store.dispatch('addView', this.film.id)
      console.log(this.film.views)
    },
    components: {
      filmSlider: HomeSlider
    }
  }
</script>
<style scoped>
  .info-text {
    font-size: 18px;
  }
</style>
