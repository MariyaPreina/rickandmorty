import { createStore } from 'vuex'
import apiClient from '../api/apiClient'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: (state) => ({
    characters: state.characters,
    nameFilter: state.nameFilter,
    statusFilter: state.statusFilter,
    currentPage: state.currentPage
  })
})

const store = createStore({
  plugins: [vuexLocal.plugin],
  state: () => ({
    status: '',
    characters: window.sessionStorage.getItem('characters') || [],
    selectedCharacter: {},
    selectedEpisode: {},
    nameFilter: window.sessionStorage.getItem('nameFilter') || '',
    statusFilter: window.sessionStorage.getItem('statusFilter') || '',
    numberOfPages: '',
    currentPage: window.sessionStorage.getItem('currentPage') || 1
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
    },
    currentPage (state) {
      state.currentPage++
    },
    clearCurrentPage (state) {
      state.currentPage = 1
    }
  },
  actions: {
    async getListOfCharacters ({ commit }, payload) {
      const charactersData = await apiClient.get(`/character/?${payload?.page}${payload?.filter}`)
      const characters = charactersData.data.results
      const pages = charactersData.data.info.pages
      commit('loadCharactersSuccess', { characters, pages })
    },
    async getSelectedCharacter ({ commit }, payload) {
      const characterData = await apiClient.get(`/character/${payload.id}`)
      const character = characterData.data
      commit('loadSelectedCharacterSuccess', character)
    },
    async getSelectedEpisode ({ commit }, payload) {
      const episodeData = await apiClient.get(`/episode/${payload.id}`)
      const episode = episodeData.data
      commit('loadSelectedEpisodeSuccess', episode)
    }
  }
})

export default store
