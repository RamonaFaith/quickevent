<template>
  <div v-if="$store.state.type == 'keypressing'" class="kb-quick-container">
    <div class="status-bar">
      <div class="progress start"></div>
    </div>
    <div class="key-bar">
      <div class="key" v-for="keypattern in $store.getters.getKeypattern" :key="keypattern">
        <i :id="keypattern.no" :class="keypattern.icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuickTime',
  methods: {
    keyHandler (event) {
      if (this.$store.state.amount === this.$store.getters.getCounter) {
        if (event.key === ' ') {
          document.querySelectorAll('.correct').forEach((key) => key.classList.remove('correct'))
          this.$store.commit('resetCounter')
          window.location.reload()
        }
        return
      }
      if (event.key === this.$store.state.keypattern[this.$store.getters.getCounter].key) {
        document.querySelectorAll('.key')[this.$store.getters.getCounter].classList.add('correct')
        this.$store.commit('incrementCounter')
      } else {
        document.querySelectorAll('.correct').forEach((key) => key.classList.remove('correct'))
        this.$store.commit('resetCounter')
      }
    }
  },
  mounted () {
    window.addEventListener('keyup', this.keyHandler)
    setTimeout(() => {
      document.querySelectorAll('.correct').forEach((key) => key.classList.remove('correct'))
      this.$store.commit('resetCounter')
      document.querySelector('.start').classList.remove('start')
      window.location.reload()
    }, 5500)
  }
}
</script>

<style scoped>
  .kb-quick-container {
    display: grid;
    height: 100px;
    width: auto;
    grid-template-rows: 30% 70%;
    grid-template-columns: 100%;
    background: rgb(40, 40, 50, 0.975);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 85%;
    left: 50%;
    padding: 0 0.5rem;
    border-radius: 8px;
  }

  .kb-quick-container .status-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    grid-row: 1;
    position: relative;
  }

  .status-bar .progress {
    display: block;
    height: 8px;
    width: 0%;
    background: rgb(0, 160, 200);
    border-radius: 1rem;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    position: absolute;
  }

  .kb-quick-container .key-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    grid-row: 2;
    height: 100%;
    width: 100%;
    color: white;
  }

  .kb-quick-container .key-bar .key {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    width: 48px;
    margin: 0 4px;
    background: rgba(80, 80, 90, 1);
    border-radius: 50%;
  }

  .kb-quick-container .key-bar .key svg {
    font-size: 1.5rem;
    margin: 0 0.75rem;
  }

  .correct {
    background: rgba(0, 200, 170, 1) !important;
    transition: ease-in-out 100ms;
  }

  .start {
    animation-name: progress;
    animation-duration: 5000ms;
    animation-delay: 500ms;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  @keyframes progress {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
</style>
