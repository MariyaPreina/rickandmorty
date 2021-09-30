import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: () => ({
    selectedCharacter: {},
    status: '',
    characters: []
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
    loadSelectedSuccess (state, character) {
      state.status = 'success'
      state.selectedCharacter = character
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
        const user = characterData.data
        console.log(user)
        commit('loadSelectedSuccess', user)
      } catch (e) {
        console.log(e)
        commit('error')
      }
    }
  }
})

export default store
