<template>
  <div class="container">
    <main class="characters">
      <div class="characters__filters">
        <p class="characters__filters-heading">Filters</p>
        <div class="filters">
          <input type="text" id="name" placeholder="Write a name" class="filters__input" autocomplete="off"
                 :value="nameFilter" @input="updateNameFilter">
          <select name="status" id="status" class="filters__select" :value="statusFilter" @input="updateStatusFilter">
            <option value="">Select status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <button @click="applyFilters" class="filters__apply">Apply</button>
        </div>
      </div>
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
        <p class="characters__no-result" v-if="characters.length === 0 && status === 'error'">No results</p>
      </div>
    </main>
  </div>
  <app-observer @intersect="onIntersect" v-if="status === 'success'"></app-observer>
</template>

<script>

import CharacterCard from '../components/ChatacterCard'
import AppObserver from '../components/AppObserver'

export default {
  components: {
    CharacterCard,
    AppObserver
  },
  computed: {
    status () {
      return this.$store.state.status
    },
    characters () {
      return this.$store.state.characters
    },
    nameFilter () {
      return this.$store.state.nameFilter
    },
    statusFilter () {
      return this.$store.state.statusFilter
    },
    numberOfPages () {
      return this.$store.state.numberOfPages
    },
    currentPage () {
      return this.$store.state.currentPage
    }
  },
  methods: {
    updateNameFilter (event) {
      this.$store.commit('updateNameFilter', event.target.value)
    },
    updateStatusFilter (event) {
      this.$store.commit('updateStatusFilter', event.target.value)
    },
    addFilter (name, value, params) {
      if (value.length !== 0) {
        params.push(`${name}=${value}`)
      }
    },
    filterQuery () {
      const params = []
      this.addFilter('name', this.nameFilter, params)
      this.addFilter('status', this.statusFilter, params)
      if (params.length === 0) {
        return ''
      }
      return params.join('&')
    },
    loadCharacters () {
      this.$store.dispatch('getListOfCharacters', {
        filter: this.filterQuery(),
        page: `page=${this.currentPage}&`
      })
    },
    applyFilters () {
      this.$store.commit('clearCharactersData')
      this.$store.commit('clearCurrentPage')
      this.loadCharacters()
    },
    onIntersect () {
      if (this.currentPage < this.numberOfPages) {
        this.$store.commit('currentPage')
        this.loadCharacters()
      }
    }
  },
  mounted () {
    if (this.characters.length === 0) {
      this.loadCharacters()
    }
  }
}
</script>
