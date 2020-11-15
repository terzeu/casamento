<template>
  <div id="header">
    <div class="brev">
      M & B
    </div>
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNavigation',
  computed: {

  }
}
</script>

<style lang="scss">
$margin-page: 150px;

#header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 90px;
  .brev {
    letter-spacing: 4px;
    color: rgb(175, 138, 108);
    font-weight: bold;
    font-size: 26px;
    line-height: normal;
  }
  .nav {
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}

</style>
