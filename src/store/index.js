import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: () => ({
    status: '',
    characters: [],
    selectedCharacter: {},
    selectedEpisode: {},
    nameFilter: '',
    statusFilter: '',
    numberOfPages: ''
  }),
  mutations: {
    request (state) {
      state.status = 'loading'
    },
    error (state) {
      state.status = 'error'
    },
    loadCharactersSuccess (state, data) {
      state.status = 'success'
      state.characters = [...state.characters, ...data.characters]
      state.numberOfPages = data.pages
    },
    clearCharactersData (state) {
      state.characters = []
    },
    loadSelectedCharacterSuccess (state, character) {
      state.status = 'success'
      state.selectedCharacter = character
    },
    loadSelectedEpisodeSuccess (state, episode) {
      state.status = 'success'
      state.selectedEpisode = episode
    },
    updateNameFilter (state, payload) {
      state.nameFilter = payload
    },
    updateStatusFilter (state, payload) {
      state.statusFilter = payload
    }
  },
  actions: {
    async getListOfCharacters ({ commit }, payload) {
      try {
        commit('request')
        const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/character/?${payload?.page}${payload?.filter}`)
        const characters = res.data.results
        const pages = res.data.info.pages
        console.log(characters)
        console.log(pages)
        commit('loadCharactersSuccess', { characters, pages })
      } catch (e) {
        console.log(e)
        commit('error')
      }
    },
    async getSelectedCharacter ({ commit }, payload) {
      try {
        commit('request')
        const characterData = await axios.get(`${process.env.VUE_APP_BASE_URL}/character/${payload.id}`)
        const character = characterData.data
        console.log(character)
        commit('loadSelectedCharacterSuccess', character)
      } catch (e) {
        console.log(e)
        commit('error')
      }
    },
    async getSelectedEpisode ({ commit }, payload) {
      try {
        commit('request')
        const episodeData = await axios.get(`${process.env.VUE_APP_BASE_URL}/episode/${payload.id}`)
        const episode = episodeData.data
        console.log(episode)
        commit('loadSelectedEpisodeSuccess', episode)
      } catch (e) {
        console.log(e)
        commit('error')
      }
    }
  }
})

export default store
