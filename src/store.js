import Vue from 'vue'
import Vuex from 'vuex'

import repository from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    temperature: 0,
    humidity: 0,
    ledState: 0,
    fanState: 0,
    soilHumidity: 0,
    currentDate: new Date().toLocaleString(),
    loading: true,
    appLoading: false
  },
  mutations: {
    SET_GROW_DATA (state, payload) {
      if (payload.temperature > 100) payload.temperature = 100
      else if (payload.temperature < 4) payload.temperature = 0
      if (payload.humidity > 100) payload.humidity = 100
      else if (payload.humidity < 4) payload.humidity = 0
      if (payload.soilHumidity > 100) payload.soilHumidity = 100
      else if (payload.soilHumidity < 4) payload.soilHumidity = 0

      Object.assign(state, payload)
      state.currentDate = new Date().toLocaleString()
    },
    TOGGLE_LOADING (state) {
      state.loading = !state.loading
    },
    TOGGLE_APP_LOADING (state) {
      state.appLoading = !state.appLoading
    }
  },
  actions: {
    async getGrowData ({ commit }) {
      let payload = {};
      try {
        let data = await repository.getData()
        // console.log(`data fetch >>`, data)
        payload = data
      } catch (error) {
        payload = {
          temperature: 0,
          humidity: 0,
          ledState: 0,
          fanState: 0,
          soilHumidity: 0
        }
        console.error(error)
      } finally {
        commit('SET_GROW_DATA', payload)
      }
    }
  }
})
