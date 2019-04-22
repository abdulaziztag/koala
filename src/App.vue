<template>
  <v-app :dark="!switcher" :class="{'backgroundContentLight': switcher}">
    <v-navigation-drawer
      v-model="drawer"
      app
      :class="{'backgroundContentLight': switcher}"
      id="drawer"
    >
      <v-layout justify-space-between column fill-height>
        <v-flex xs11>

          <div class="hidden-lg-and-up" style="background: black;height: 200px;width: 100%;display: flex;justify-content: center; align-items: center">
            <p style="color:#fff;" class="headline">Koala</p>
          </div>
          <v-list>
            <div style="margin-top: 65px" class="hidden-md-and-down"></div>
            <v-menu transition="slide-y-transition" offset-y>
              <template v-slot:activator="{ on }">
                <div style="margin-right: 15px" v-on="on">
                  <v-text-field
                    box
                    @keyup.enter="toSearched"
                    color="orange darken-2"
                    style="margin-left: 15px;"
                    v-model="searchModel"
                    label="Найти"
                    append-icon="search"
                  ></v-text-field>
                </div>
              </template>
              <v-list style="background: #303030" class="elevation-18 height">
                <v-list-tile
                  style="background: #303030"
                  class="pt-1 pb-1"
                  :key="item.id"
                  :to="item.type ? `/film/${item.id}` : `/serial/${item.id}/1/1`"
                  ripple
                  v-for="item in filteredFilms.slice(0, 6)">
                  <v-list-tile-action>
                    <v-img :src="item.imageSrc" style="border-radius: 5px; height:40px; width: 40px;"></v-img>
                  </v-list-tile-action>
                  <v-list-tile-content class="pl-2">{{ item.title }}</v-list-tile-content>
                  <v-list-tile-content class="pl-2" style="position: absolute;right: 10px;">{{ item.info.year }}</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-list-tile>
              <p class="text--lighten-1" style="padding-right: 120px; font-size: 17px;">Светлая тема</p>
              <v-spacer></v-spacer>
              <v-switch style="color: red; position: absolute;right: 5px; bottom: 0" color="error" v-model="switcher"></v-switch>
            </v-list-tile>
            <v-list-group
              v-for="item in items"
              :key="item.title"
              v-model="item.active"
              :prepend-icon="item.action"
              no-action
            >
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>

              <v-list-tile
                v-for="subItem in item.items"
                :key="subItem.title"
                @click=""
                ripple
                :to="subItem.url"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-flex>
        <v-flex xs1>
          <v-list>
            <v-layout class="hidden-lg-and-up">
              <v-flex v-for="item in lists" xs6 dark :key="item.id">
                <v-list-tile ripple :to="item.url">
                  <v-list-tile-content>{{ item.text }}</v-list-tile-content>
                </v-list-tile>
              </v-flex>
            </v-layout>
            <v-list-tile ripple @click="">
              <v-list-tile-action><v-icon>forum</v-icon></v-list-tile-action>
              <v-list-tile-content>Поддержка</v-list-tile-content>
            </v-list-tile>
            <v-list-tile ripple @click="">
              <v-list-tile-action><v-icon>supervised_user_circle</v-icon></v-list-tile-action>
              <v-list-tile-content>О нас</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
    <v-toolbar
      dark
      :color="switcher ? 'grey darken-3': 'brown darken-2'"
      fixed
      app
      clipped-left
      style="font-family: 'Baloo Chettan',monospace; z-index: 20;"
    >
      <v-toolbar-side-icon class="hidden-lg-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <router-link class="pointer" to="/">
        <v-toolbar-title style="font-size:30px">
          Koala
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
        <v-btn
          :key="item.id"
          v-for="item in lists"
          :to="item.url"
          flat
          class="hidden-md-and-down"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.text }}
        </v-btn>
    </v-toolbar>
    <v-content>
      <transition name="route-animation" mode="out-in">
        <router-view :key="$route.fullPath"/>
      </transition>
    </v-content>
    <v-footer height="50" class="elevation-24 pa-3 hidden-lg-and-up">
      <span class="headline">Koala &infin;</span>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      switcher: false,
      searchedContent: false,
      searchModel: '',
      lists: [
        {
          url: '/registration',
          text: 'Регистрация',
          icon: 'person'
        },
        {
          url: '/login',
          text: 'Логин',
          icon: 'input'
        }
      ],
      items: [
        {
          action: 'category',
          title: 'Категории',
          items: [
            {
              title: 'Фантастика',
              url: '/category/fantastika'
            },
            {
              title: 'Мультфильмы',
              url: '/category/multfilmy'
            },
            {
              title: 'Драмма',
              url: '/category/dramma'
            },
            {
              title: 'Боевик',
              url: '/category/boevik'
            },
            {
              title: 'Комедия',
              url: '/category/komediya'
            },
            {
              title: 'Приключения',
              url: '/category/priklucheniya'
            },
            {
              title: 'Семейное',
              url: '/category/semeinoe'
            },
            {
              title: 'Историческое',
              url: '/category/istoricheskoe'
            },
            {
              title: 'Ужасы',
              url: '/category/ujasy'
            },
            {
              title: 'Триллер',
              url: '/category/triller'
            }
          ]
        }
      ]
    }),
    methods: {
      toSearched () {
        this.$router.push(this.filteredFilms[0].type ? `/film/${this.filteredFilms[0].id}` : `/serial/${this.filteredFilms[0].serii[0][0].id}`)
        this.searchModel = ''
      }
    },
    computed: {
      arraySearch () {
        let films = this.$store.getters.allFilmsSearch
        let titles = []
        films.forEach(key => titles.push(key.title))
        return titles
      },
      filteredFilms () {
        let filteredFilms = []
        this.arraySearch.forEach((key, id) => {
          if (key.toLowerCase().indexOf(this.searchModel.toLowerCase()) !== -1) {
            filteredFilms.push(this.$store.getters.allFilmsSearch[id])
          }
        })
        return filteredFilms
      }
    },
    mounted () {
      if (window.innerWidth >= 1200) {
        setTimeout(() => { document.getElementById('drawer').style.zIndex = 19 }, 1)
      } else {
        setTimeout(() => { document.getElementById('drawer').style.zIndex = 21 }, 1)
      }
    }
  }
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Baloo+Chettan|Lato|Open+Sans');

  @media (max-width: 960px) {
    .height {
      height: 120px;
    }
  }
  @media (min-width: 960px) {
    .height {
      height: 100%;
    }
  }
  .route-animation-enter-active {
    animation: .3s slide-enter forwards;
  }
  .route-animation-leave-active {
    animation: .3s slide-leave forwards;
  }
  @keyframes slide-leave {
    from{
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes slide-enter {
    from{
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .pointer {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }
  .backgroundContentLight {
    background: gainsboro!important;
  }
</style>
