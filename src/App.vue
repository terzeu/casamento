<template>
  <header-navigation class="freeze-header"
    :scroll-position="scrollPosition"
  />
  <home />
</template>

<script>
import HeaderNavigation from './components/layout/HeaderNavigation.vue'
import Home from './views/Home.vue'

export default {
  components: { HeaderNavigation, Home },
  name: 'App',
  data: () => ({
    windowSize: window.innerHeight,
    scrollPosition: 0
  }),
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.scrollPosition = window.scrollY
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

body{
  margin: 0;

  p {
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  .modal {
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    background-color: rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      padding: 5px;
      &.card {
        background-color: white;
        width: 90%;
        max-width: 600px;
        height: 100px;
        text-align: center;
        p {
          color: rgb(175, 138, 108);
          font-size: 25px;
          font-weight: bold;
        }
      }
    }
  }

  #app {
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    .freeze-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
}
</style>
