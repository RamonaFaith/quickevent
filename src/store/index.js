import { createStore } from 'vuex'

export default createStore({
  state: {
    timeout: 20000,
    counter: 0,
    amount: 16,
    type: 'keypressing',
    keyCode: [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ],
    keyIcon: [
      'fa-solid fa-arrow-left',
      'fa-solid fa-arrow-right',
      'fa-solid fa-arrow-up',
      'fa-solid fa-arrow-down'
    ],
    keypattern: []
  },
  getters: {
    getKeypattern (state) {
      return state.keypattern.map(value => value)
    },
    getCounter (state) {
      return state.counter
    }
  },
  mutations: {
    setUpKeypattern (state, keypattern) {
      state.keypattern.push(keypattern)
    },
    incrementCounter (state) {
      state.counter++
    },
    decrementCounter (state) {
      state.counter--
    },
    resetCounter (state) {
      state.counter = 0
    },
    randomAmount (state, range) {
      const max = range > 10 ? range : 10
      const rnd = Math.floor((Math.random() * max) + 1)
      const result = rnd < 10 ? rnd + 10 : rnd
      state.amount = result
    }
  },
  actions: {
    setUpKeypattern ({ commit }, keypattern) {
      commit('setUpKeypattern', keypattern)
    },
    randomAmount ({ commit }, range) {
      commit('randomAmount', range)
    }
  }
})
