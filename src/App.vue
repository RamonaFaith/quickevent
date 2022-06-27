<template>
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
    generatePattern () {
      this.$store.dispatch('randomAmount', 12)

      const amount = this.$store.state.amount
      const keyCode = this.$store.state.keyCode
      const keyIcon = this.$store.state.keyIcon
      for (let i = 0; i < amount; i++) {
        const rnd = Math.floor((Math.random() * keyCode.length))
        this.$store.dispatch('setUpKeypattern', { no: i, key: keyCode[rnd], icon: keyIcon[rnd] })
      }
    }
  },
  mounted () {
    window.addEventListener('DOMContentLoaded', this.generatePattern)
  }
}
</script>

<style>
* {
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
</style>
