import { createStore } from 'vuex'

export default createStore({
  state: {
    timeout: 20000,
    attempt: 0,
    success: 0,
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
    },
    getSuccessPoint (state) {
      return state.success
    },
    getAttemptPoint (state) {
      return state.attempt
    },
    getAmount (state) {
      return state.amount
    }
  },
  mutations: {
    setSuccessPoint (state, point) {
      state.success = point
    },
    setAttemptPoint (state, point) {
      state.attempt = point
    },
    successKey (state) {
      state.success++
    },
    attemptKey (state) {
      state.attempt++
    },
    clearKeypattern (state) {
      state.keypattern = []
    },
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
    clearKeypattern ({ commit }) {
      commit('clearKeypattern')
    },
    setUpKeypattern ({ commit }, keypattern) {
      commit('setUpKeypattern', keypattern)
    },
    randomAmount ({ commit }, range) {
      commit('randomAmount', range)
    },
    setSuccessPoint ({ commit }, point) {
      commit('setSuccessPoint', point)
    },
    setAttemptPoint ({ commit }, point) {
      commit('setAttemptPoint', point)
    }
  }
})
