<template>
  <main class="episode" v-if="status === 'success'">
    <div class="container">
      <div class="episode__info">
        <h1 class="episode__name">{{ name }}</h1>
        <p class="episode__date">Premiere date: <span>{{ date }}</span></p>
      </div>
      <div class="episode__photo-box">
        <character-image
          v-for="character in characters"
          :key="character"
          :id="character.split('/').slice(-1).join()"
        ></character-image>
      </div>
    </div>
  </main>
</template>

<script>
import CharacterImage from '../components/CharacterImage'

export default {
  props: ['id'],
  components: {
    CharacterImage
  },
  computed: {
    status () {
      return this.$store.state.status
    },
    episodeData () {
      return this.$store.state.selectedEpisode
    },
    name () {
      return this.episodeData.name
    },
    date () {
      return this.episodeData.air_date
    },
    characters () {
      return this.episodeData.characters
    }
  },
  methods: {
    getEpisodeData () {
      this.$store.dispatch('getSelectedEpisode', {
        id: this.id
      })
    }
  },
  mounted () {
    this.getEpisodeData()
  }
}
</script>
