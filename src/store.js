import Vue from 'vue'
import Vuex from 'vuex'

import repository from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    temperature: 50,
    humidity: 50,
    ledState: 0,
    fanState: 0,
    waterPump: 0
  },
  mutations: {
    SET_GROW_DATA (state, payload) {
      state = payload
    }
  },
  actions: {
    async getGrowData ({ commit }) {
      let payload = {} ;
      try {
        let data = await repository.getData()
        console.log(`data fetch >>`, data)
        payload = {
          temperature: data.temp,
          humidity: data.hum,
          ledState: data.ledState,
          fanState: data.fanState,
          waterPump: data.waterPump
        }

      } catch (error) {
        payload = {}
        console.error(error)
      } finally {
        commit('SET_TEMPERATURE', payload)
      }

    }
  }
})
