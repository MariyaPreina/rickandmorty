import store from '../store'
import axios from 'axios'

const apiClient = {
  get: async function get (path) {
    try {
      store.commit('request')
      return await axios.get(`${process.env.VUE_APP_BASE_URL + path}`)
    } catch (e) {
      console.log(e)
      store.commit('error')
      throw e
    }
  }
}

export default apiClient
