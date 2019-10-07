import Vue from 'vue'
import Vuex from 'vuex'

import repository from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    temperature: 50,
    humidity: 50
  },
  mutations: {
    SET_TEMPERATURE (state, payload) {
      state.temperature = payload
    },
    SET_HUMIDITY (state, payload) {
      state.humidity = payload
    }
  },
  actions: {
    async getGrowData ({ commit }) {
      let temp, hum;
      try {
        let data = await repository.getData()
        console.log(`data fetch >>`, data)
        temp = data.temp
        hum  = data.hum
      } catch (error) {
        temp, hum = 0
        console.error(error)
      } finally {
        commit('SET_TEMPERATURE', temp)
        commit('SET_HUMIDITY', hum)
      }
      
    }
  }
})
