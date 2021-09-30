<template>
  <div class="container" v-if="status === 'success'">
    <main class="characters">
      <div class="characters__filters"></div>
      <div class="characters__cards">
        <character-card
          v-for="character in characters"
          :key="character.id"
          :id="character.id"
          :name="character.name"
          :status="character.status"
          :species="character.species"
          :image="character.image"
          :episodes="character.episode.slice(0, 5)"
        ></character-card>
      </div>
    </main>
  </div>
</template>

<script>

import CharacterCard from '../components/ChatacterCard'

export default {
  components: {
    CharacterCard
  },
  computed: {
    status () {
      return this.$store.getters.status
    },
    characters () {
      return this.$store.getters.characters
    }
  },
  mounted () {
    this.$store.dispatch('getListOfCharacters')
  }
}
</script>
