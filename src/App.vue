<template lang="pug">
  #app
    img(src='https://ingbetanzos.github.io/betzmusic/dist/logo.png')
    h1 betzmusic
    select(v-model="selectCountry") 
      option(v-for="country in countries" v-bind:value="country.value") {{country.name}}
    spinner(v-show="loading")
    ul
      artist(v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid")
      //li(v-for="artist in artists") {{artist.name}}
</template>

<script>
  import Artist from './components/Artist.vue'
  import Spinner from './components/Spinner.vue'
  import getArtists from './api' //Importa el directorio
  export default {
    name: 'app',
    data () {
      return {
        artists: [],
        countries: [
          { name: 'Argentina', value: 'argentina' },
          { name: 'Colombia', value: 'colombia' },
          { name: 'España', value: 'spain'},
          { name: 'mexico', value: 'mexico'}
        ],
        selectCountry: 'mexico',
        loading: true
      }
    }, 
    components: {
      Artist: Artist,
      Spinner: Spinner
    },
    methods: {
      refreshArtists() {
        const self = this //self hace referencia al elemento del componente de lo controlario lo haria al elemento global
        this.loading = true //Hace referencia ala vista por estar dentro de la función
        this.artists = []
        getArtists(this.selectCountry)
          .then(function(artists) {
            self.loading = false //se coloca selft para que haga referencia ala vista
            self.artists = artists
          })
      }
    },
    mounted: function() { //Cuando el elemento fue Montado.(Cargado)
      this.refreshArtists()
    },
    watch: { //Atributo que permite estar observando los cambios que suceden en la app
      selectCountry() {
        this.refreshArtists()
      }
    }
  }
</script>

<style lang="stylus">
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    margin-top 60px

  h1, h2
    font-weight normal
    color red

  ul
    list-style-type none
    padding 0

  li
    display inline-block
    margin 0 10px

  a
    color #42b983
</style>
