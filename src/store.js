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
    waterPump: 0
  },
  mutations: {
    SET_GROW_DATA (state, payload) {
      Object.assign(state, payload)
    }
  },
  actions: {
    async getGrowData ({ commit }) {
      let payload = {};
      try {
        let data = await repository.getData()
        console.log(`data fetch >>`, data)
        payload = { ...data }

      } catch (error) {
        payload = {}
        console.error(error)
      } finally {
        commit('SET_TEMPERATURE', payload)
      }
    }
  }
})
