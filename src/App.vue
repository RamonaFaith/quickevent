<template>
  <div class="counter">
    <h1 style="color: green">Success : {{ $store.getters.getSuccessPoint }}</h1>
    <h1 style="color: red">Attempt : {{ $store.getters.getAttemptPoint }}</h1>
  </div>
  <QuickTime />
</template>

<script>
import QuickTime from '@/components/QuickTime.vue'

export default {
  name: 'App',
  components: {
    QuickTime
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
