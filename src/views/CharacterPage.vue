<template>
  <div class="container">
    <main class="character" v-if="status === 'success'">
      <div class="character__left">
        <div class="character__avatar avatar">
          <div class="avatar__inner">
            <span class="avatar__img"
                  :style="{ 'background-image': 'url(' + image +')' }">
            </span>
          </div>
        </div>
      </div>
      <div class="character__right">
        <h1 class="character__name">{{ name }}</h1>
        <div class="character__info">
          <h2 class="character__heading">Info</h2>
          <p class="character__info-item"><span>Species:</span> {{ species }}</p>
          <p class="character__info-item"><span>Location:</span> {{ location }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    characterData () {
      return this.$store.getters.character
    },
    status () {
      return this.$store.getters.status
    },
    name () {
      return this.characterData.name
    },
    species () {
      return this.characterData.species
    },
    image () {
      return this.characterData.image
    },
    location () {
      return this.characterData.location.name
    }
  },
  methods: {
    getCharacterData () {
      this.$store.dispatch('getSelectedCharacter', {
        id: this.id
      })
    }
  },
  created () {
    this.getCharacterData()
  }
}
</script>
