import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: () => ({
    status: '',
    characters: [],
    selectedCharacter: {},
    selectedEpisode: {}
  }),
  mutations: {
    request (state) {
      state.status = 'loading'
    },
    error (state) {
      state.status = 'error'
    },
    loadCharactersSuccess (state, characters) {
      state.status = 'success'
      state.characters = characters
    },
    loadSelectedCharacterSuccess (state, character) {
      state.status = 'success'
      state.selectedCharacter = character
    },
    loadSelectedEpisodeSuccess (state, episode) {
      state.status = 'success'
      state.selectedEpisode = episode
    }
  },
  getters: {
    status (state) {
      return state.status
    },
    characters (state) {
      return state.characters
    },
    character (state) {
      return state.selectedCharacter
    },
    episode (state) {
      return state.selectedEpisode
    }
  },
  actions: {
    async getListOfCharacters ({ commit }) {
      try {
        commit('request')
        const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/character`)
        const characters = res.data.results
        commit('loadCharactersSuccess', characters)
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
