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
