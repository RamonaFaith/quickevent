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
import { Howl } from 'howler'
import pathFx from '../assets/pop.mp3'
import successFx from '../assets/success.mp3'

export default {
  name: 'QuickTime',
  data () {
    return {
      timeout: null
    }
  },
  methods: {
    loop () {
      // document.querySelectorAll('.correct').forEach((key) => key.classList.remove('correct'))
      if (this.$store.getters.getAmount !== this.$store.getters.getCounter) {
        this.$store.commit('attemptKey')
      }
      this.$store.commit('resetCounter')
      this.$store.dispatch('clearKeypattern')
      this.generatePattern()
      document.querySelector('.progress').classList.remove('start')
      // eslint-disable-next-line no-void
      void document.querySelector('.progress').offsetWidth
      document.querySelector('.progress').classList.add('start')
      this.timeout = setTimeout(this.loop, 5500)
    },
    generatePattern () {
      this.$store.dispatch('clearKeypattern')
      this.$store.dispatch('randomAmount', 12)

      const amount = this.$store.state.amount
      const keyCode = this.$store.state.keyCode
      const keyIcon = this.$store.state.keyIcon
      for (let i = 0; i < amount; i++) {
        const rnd = Math.floor((Math.random() * keyCode.length))
        this.$store.dispatch('setUpKeypattern', { no: i, key: keyCode[rnd], icon: keyIcon[rnd] })
      }
    },
    keyHandler (event) {
      if (this.$store.getters.getAmount === this.$store.getters.getCounter) {
        if (event.key === ' ') {
          document.querySelector('.kb-quick-container').style.opacity = 0
          const sound = new Howl({
            src: [successFx],
            volume: 0.2,
            sprite: {
              success: [300, 1500]
            }
          })
          sound.play('success')
          this.$store.commit('successKey')
          document.querySelectorAll('.correct').forEach((key) => key.classList.remove('correct'))
          document.querySelector('.progress').classList.remove('start')
          // eslint-disable-next-line no-void
          void document.querySelector('.progress').offsetWidth

          clearTimeout(this.timeout)
          this.$store.commit('resetCounter')
          this.timeout = setTimeout(() => {
            clearTimeout(this.timeout)
            this.$store.dispatch('clearKeypattern')
            this.generatePattern()
            document.querySelector('.kb-quick-container').style.opacity = 1
            document.querySelector('.progress').classList.add('start')
            this.timeout = setTimeout(this.loop, 5500)
          }, 5000)
        }
      }
      if (event.key === this.$store.state.keypattern[this.$store.getters.getCounter].key) {
        const sound = new Howl({
          src: [pathFx],
          volume: 0.2,
          sprite: {
            pop: [300, 800]
          }
        })
        sound.play('pop')
        document.querySelectorAll('.key')[this.$store.getters.getCounter].classList.add('correct')
        this.$store.commit('incrementCounter')
      } else if (event.key !== ' ') {
        this.$store.commit('attemptKey')
        document.querySelectorAll('.correct').forEach((key) => key.classList.remove('correct'))
        document.querySelector('.progress').classList.remove('start')
        // eslint-disable-next-line no-void
        void document.querySelector('.progress').offsetWidth
        clearTimeout(this.timeout)
        this.$store.commit('resetCounter')
        this.$store.dispatch('clearKeypattern')
        this.generatePattern()
        document.querySelector('.kb-quick-container').style.opacity = 1
        document.querySelector('.progress').classList.add('start')
        this.timeout = setTimeout(this.loop, 5500)
      }
    }
  },
  mounted () {
    window.addEventListener('DOMContentLoaded', this.generatePattern)
    window.addEventListener('keydown', this.keyHandler)
    this.timeout = setTimeout(this.loop, 5500)
  },
  unmounted () {
    window.removeEventListener('DOMContentLoaded', this.generatePattern)
    window.removeEventListener('keydown', this.keyHandler)
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
    opacity: 1;
    transition: opacity 200ms;
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
