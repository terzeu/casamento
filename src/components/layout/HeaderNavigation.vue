<template>
  <div id="header" :class="{ scrolled: scrollPosition > 100 }">
    <div v-show="!isMobile" class="brev">
      M & B
    </div>
    <div class="nav">
      <span
        v-for="(route, index) in routesSession"
        :key="index"
        :class="{ class: true, active: scrollPosition >= route.scrollStart && scrollPosition < route.scrollEnd}"
        @click="handlerRouteChange(route.scrollStart)" class="route">
        {{ route.name }}
      </span>
    </div>
  </div>
</template>

<script>
const windowHeight = window.innerHeight
export default {
  name: 'HeaderNavigation',
  data () {
    return {
      routesSession: [
        {
          name: 'Início',
          scrollStart: 0,
          scrollEnd: windowHeight
        },
        {
          name: 'Localização',
          scrollStart: windowHeight,
          scrollEnd: windowHeight * 2
        },
        {
          name: 'Confirmar presença',
          scrollStart: windowHeight * 2,
          scrollEnd: windowHeight * 3
        },
        {
          name: 'Presentes',
          scrollStart: windowHeight * 3,
          scrollEnd: windowHeight * 4
        }
      ]
    }
  },
  props: {
    scrollPosition: { type: Number, required: true }
  },
  computed: {
    isMobile () {
      return window.innerWidth < 700
    }
  },
  mounted () {
    const invitedsHeight = document.getElementById('inviteds-block').clientHeight
    const giftsHeight = document.getElementById('gifts-block').clientHeight
    const locationHeight = document.getElementById('location-block').clientHeight
    this.routesSession[1].scrollEnd = this.routesSession[0].scrollEnd + locationHeight
    this.routesSession[2].scrollStart = this.routesSession[1].scrollEnd
    this.routesSession[2].scrollEnd = this.routesSession[1].scrollEnd + invitedsHeight
    this.routesSession[3].scrollStart = this.routesSession[2].scrollEnd
    this.routesSession[3].scrollEnd = this.routesSession[2].scrollEnd + giftsHeight
  },
  methods: {
    handlerRouteChange (scroll) {
      console.log('to:', scroll)
      window.scrollTo(0, scroll + 1)
    }
  }
}
</script>

<style lang="scss">
$margin-page: 150px;

#header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 110px;
  z-index: 3;
  &.scrolled {
    background-color: white;
    border-bottom: 1px solid rgba(51, 51, 51, 0.15);
    transition: background 0.5s ease 0s;
  }
  .brev {
    letter-spacing: 4px;
    color: rgb(175, 138, 108);
    font-weight: bold;
    font-size: 26px;
    line-height: normal;
  }
  .nav {
    .route {
      margin-right: 18px;
      line-height: 24px;
      font-weight: bold;
      color: #2c3e50;
      cursor: pointer;
      &.active {
        color: #af8a6c;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

</style>
