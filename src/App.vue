<template>
  <div class="counter">
    <h1 style="color: green">Success : {{ getSuccess() }}</h1>
    <h1 style="color: red">Attempt : {{ getAttempt() }}</h1>
  </div>
  <QuickTime />
</template>

<script>
import QuickTime from '@/components/QuickTime.vue'

export default {
  name: 'App',
  components: {
    QuickTime
  },
  methods: {
    getSuccess () {
      if (this.$store.state.success === 10) {
        this.$store.dispatch('setSuccessPoint', 0)
        this.$store.dispatch('setAttemptPoint', 0)
        return this.$store.getters.getSuccessPoint
      }
      return this.$store.getters.getSuccessPoint
    },
    getAttempt () {
      if (this.$store.state.attempt > 5) {
        this.$store.dispatch('setSuccessPoint', 0)
        this.$store.dispatch('setAttemptPoint', 0)
        return this.$store.getters.getAttemptPoint
      }
      return this.$store.getters.getAttemptPoint
    }
  }
}
</script>

<style>
* {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  box-sizing: border-box;
  user-select: none;
}

body, html {
  top: 0;
  margin: 0;
  overflow: hidden;
  min-height: 100%;
}

#app {
  display: block;
  position: relative;
  width: 100vw;
  height: 100vh;
  transition: opacity 100ms;
}

.counter {
  display: block;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.counter h1 {
  font-size: 72px;
  line-height: 48px;
}
</style>
