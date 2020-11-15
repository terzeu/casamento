<template>
  <header-navigation class="freeze-header" />
  <router-view />
</template>

<script>
import HeaderNavigation from './components/layout/HeaderNavigation.vue'

export default {
  components: { HeaderNavigation },
  name: 'App'
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
