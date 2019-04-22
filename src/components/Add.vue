<template>
  <v-container>
    <v-card>
      <v-container>
        <p style="font-size: 40px">Добавить фильм</p>
        <h2>Название фильма</h2>
        <br>
        <v-text-field
          v-model="title"
          label="Название фильма"
          color="yellow"
          outline
        ></v-text-field>
        <h2>О фильме</h2>
        <br>
        <v-textarea
          label="О фильме"
          color="yellow"
          v-model="description"
          outline
        ></v-textarea>
        <br><br><br><br><br><br>
        <h1 style="font-size: 40px; text-align: center">Рисунок</h1>
        <br>
        <v-text-field
          label="Ссылка на фото"
          color="yellow"
          outline
          v-model="imageSrc"
        ></v-text-field>
        <h2 style="font-weight: lighter">Или</h2>
        <v-btn color="error">Загрузить</v-btn>
        <br><br><br><br><br><br>
        <h1 style="font-size: 40px; text-align: center">Видео</h1>
        <v-text-field
          label="Ссылка на видео"
          color="yellow"
          outline
          v-model="videoSrc"
        ></v-text-field>
        <h2 style="font-weight: lighter">Или</h2>
        <v-btn color="error">Загрузить</v-btn>
        <br><br><br><br><br><br>
        <h2 style="font-size: 40px; text-align: center;">Информация о фильме: </h2>
        <v-text-field
          v-model="year"
          label="Год выхода"
          color="yellow"
          outline
        ></v-text-field>
        <v-text-field
          label="Актёры"
          v-model="actors"
          color="yellow"
          outline
        ></v-text-field>

        <v-text-field
          label="Режиссеры"
          v-model="regissor"
          color="yellow"
          outline
        ></v-text-field>
        <v-btn color="error">Загрузить скриншоты</v-btn>
        <br><br><br><br>
        <h2 style="font-size: 40px; text-align: center;">Добавление категории</h2>
        <v-combobox
          v-model="selected"
          :items="items"
          label="Choose"
          multiple
          chips
        >
          <template v-slot:selection="data">
            <v-chip
              :key="JSON.stringify(data.item)"
              :selected="data.selected"
              :disabled="data.disabled"
              class="v-chip--select-multi"
              @input="data.parent.selectItem(data.item)"
            >
              <v-avatar
                class="accent white--text"
                v-text="data.item.slice(0, 1).toUpperCase()"
              ></v-avatar>
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>
        <v-btn @click="addFilm" block color="success">Загрузить фильм</v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      title: '',
      description: '',
      year: '',
      imageSrc: '',
      videoSrc: '',
      actors: '',
      category: '',
      regissor: '',
      selected: [],
      items: [
        'Фантастика',
        'Мультфильмы',
        'Драмма',
        'Боевик',
        'Комедия',
        'Приключения',
        'Семейное',
        'Историческое',
        'Ужасы',
        'Триллер',
      ]
    }),
    methods: {
      addFilm() {
        const category = []
        this.selected.forEach(key => {
          category.push({
            title: key,
            id: this.rus_to_latin(key).toLowerCase()
          })
        })
        const film = {
          title: this.title,
          description: this.description,
          id: Math.random() + '',
          rate: 0,
          imageSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
          category: category,
          info: {
            year: this.year,
            actors: this.actors.split(','),
            regissor: this.regissor.split(',')
          },
          ratedUsers: []
        }
        this.$store.dispatch('createFilm', film)
      },
      rus_to_latin(str) {

        const ru = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
          'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
          'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
          'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
          'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
          'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
        }, n_str = [];

        str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');

        for (let i = 0; i < str.length; ++i) {
          n_str.push(
            ru[str[i]]
            || ru[str[i].toLowerCase()] == undefined && str[i]
            || ru[str[i].toLowerCase()].replace(/^(.)/, function (match) {
              return match.toUpperCase()
            })
          );
        }

        return n_str.join('');
      }
    },
    created() {
      let question = prompt('Code')
      if (question === '123') {
        return true
      } else {
        this.$router.push('/goFuckYourself')
      }
    }
  }
</script>
<style scoped>

</style>
