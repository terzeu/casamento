<template>
  <div class="home">
    <div class="first-block">
      <div class="marriage-apresentation">
        <div class="married-couple-name">
          <p>MATHEUS</p>
          <p class="plus-names">&</p>
          <p>BIANCA</p>
        </div>
        <p class="marriage-date">
          23 / 01 / 2021
        </p>
        <countdown class="countdown" deadline="2021-01-23 00:00:00" />
      </div>
    </div>
  </div>
</template>

<script>
import Countdown from '../components/Countdown'

export default {
  components: { Countdown },
  name: 'Home'
}
</script>

<style lang="scss" scoped>
.home {
  .first-block {
    width: 100vw;
    height: 100vh;
    max-height: 56.25vw;
    background-image: url('../assets/background.jpg');
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    .marriage-apresentation {
      color: rgb(175, 138, 108);
      .married-couple-name {
        font-size: 48px;
        letter-spacing: 16px;
        font-weight: bold;
        margin-bottom: 46px;
        p {
          padding-left: 16px;
        }
        .plus-names {
          font-weight: normal;
          margin: 20px;
        }
      }
      .marriage-date {
        font-size: 16px;
        color: #806a59;
        font-weight: 700;
      }
      .countdown {
        margin-top: 72px;
      }
    }
  }
}
</style>
