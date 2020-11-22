<template>
  <div class="page">
    <div id="home-block" class="block">
      <div class="marriage-apresentation">
        <div class="married-couple-name">
          <p>MATHEUS</p>
          <p class="plus-names">&</p>
          <p>BIANCA</p>
        </div>
        <p class="marriage-date">23/01/2021</p>
        <countdown class="countdown" deadline="2021-01-23 00:00:00" />
      </div>
    </div>
    <div id="location-block" class="block">
      <h3>localização</h3>
      <p>O nosso casamento acontecerá no espaço Flamboyant Flora no dia 23 / 01 / 2021 às <span>16:30</span>.</p>
      <div class="mapouter">
        <div class="gmap_canvas">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3841.444090731269!2d-48.102474385146735!3d-15.674563889125764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935bb4dd87634309%3A0xbc8bcdce4c7aeee1!2sEspa%C3%A7o%20Flamboyant%20Flora!5e0!3m2!1spt-BR!2sbr!4v1605961440384!5m2!1spt-BR!2sbr"
            width="100%"
            height="450"
            frameborder="0"
            style="border:0;"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          />
        </div>
      </div>
    </div>
    <div id="inviteds-block" class="block">
      <h3>Confirme sua presença</h3>
      <div class="inviteds-list">
        <div v-for="(invited, index) in convidados" :key="index" class="invited-item" @click="toggleConfirmed(index)">
          <div class="check">
            <icon-done v-if="invited.confirmed" />
            <div v-else class="danger" />
          </div>
          <div class="name">
            {{ invited.nome }}
          </div>
        </div>
      </div>
      <teleport to="body">
        <div v-if="modalOpen" class="modal">
          <div v-if="loading">
            <img src="../assets/loading2.gif">
          </div>
          <div v-else class="card">
            <p>{{ confirmationMsg }}</p>
          </div>
        </div>
      </teleport>
    </div>
    <div id="gifts-block" class="block">
      <h3>Quer nos presentear ?</h3>
      <p>
        Oi, amigx! Diante da situação de pandemia, abrimos mão de uma festa de
        grandes proporções e decidimos fazer uma união beeeeem íntima, então, se
        você é nosso convidado, com certeza você fez parte da nossa história e
        fazemos questão de sua presença :)
      </p>
      <p>
        Como todos sabem, dividimos um teto há um tempo e já temos nossa casinha
        com os "instrumentos" que precisamos, por isso decidimos não fazer uma
        lista de presentes. No entanto, planejamos nos mudar logo depois do
        casamento e, se estiver dentro de suas condições, você pode contribuir
        para nosso novo lar
      </p>
      <p>
        Lembrando que: o mais importante pra gente é dividir nossa alegria e
        celebrarmos nossa união com as pessoas que amamos, então, sua presença é
        o melhor presente que poderíamos ter.
      </p>
      <h5>Para transferências:</h5>
      <div :class="{ 'account-content': true, mobile: isMobile }">
        <div class="bank-info">
          <div class="bank-icon bb">
            <img src="../assets/bb.png" />
          </div>
          <p>Conta Poupança: 48555-1</p>
          <p>Agência: 0941-5</p>
          <p>Nome: Matheus Araujo Soares Rosa</p>
          <p>CPF: 047131031-01</p>
        </div>
        <div class="bank-info">
          <div class="bank-icon nu">
            <img src="../assets/nu.png" />
          </div>
          <p>Conta Corrente: 63238361-0</p>
          <p>Agência: 0001</p>
          <p>Nome: Matheus Araujo Soares Rosa</p>
          <p>CPF: 047131031-01</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Countdown from '../components/Countdown'
import IconDone from '../components/IconDone'
import { db } from '../firebase'

export default {
  components: { Countdown, IconDone },
  name: 'Home',
  data () {
    return {
      convidados: [],
      groupCode: null,
      modalOpen: false,
      loading: false,
      messagesOptions: ['Presença confirmada!', 'Presença não confirmada!'],
      confirmationMsg: 'Presença confirmada!'
    }
  },
  created () {
    this.getConvidadosFromFamily()
  },
  computed: {
    isMobile () {
      return window.innerWidth < 700
    }
  },
  methods: {
    toggleConfirmed (invitedIndex) {
      this.loading = true
      this.modalOpen = true
      const previusConfirmedStatus = this.convidados[invitedIndex].confirmed
      db.collection('convidados').doc(this.convidados[invitedIndex].id)
        .update({ confirmed: !previusConfirmedStatus, updatedDate: new Date() })
        .then(response => {
          this.confirmationMsg = previusConfirmedStatus ? this.messagesOptions[1] : this.messagesOptions[0]
          this.convidados[invitedIndex].confirmed = !previusConfirmedStatus
        })
        .catch(error => {
          console.log('error', error)
        })
        .finally(x => {
          this.loading = false
          setTimeout(() => {
            this.modalOpen = false
          }, 1500)
        })
    },
    getConvidadosFromFamily () {
      this.groupCode = window.location.search ? window.location.search.substr(1) : null
      db.collection('convidados').where('codigo', '==', this.groupCode).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.convidados.push({ id: doc.id, ...doc.data() })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  color: rgb(175, 138, 108);
  h3 {
    font-size: 26px;
    font-weight: normal;
    letter-spacing: 4px;
    text-align: center;
    text-transform: uppercase;
  }
  h5 {
    font-size: 20px;
    font-weight: normal;
    text-align: center;
  }
  p {
    color: rgb(51, 51, 51);
    font-size: 18px;
  }
  .block {
    padding: 110px 30px;
  }
  #home-block {
    height: 100vh;
    padding: 0;
    background-image: url("../assets/background.jpg");
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    .marriage-apresentation {
      .married-couple-name {
        font-weight: bold;
        letter-spacing: 16px;
        p {
          color: rgb(175, 138, 108);
          font-size: 45px;
          margin-bottom: 46px;
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
  #location-block {
    p {
      margin-bottom: 65px;
      font-size: 20px;
      span {
        font-weight: bold;
      }
    }
    .mapouter {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .gmap_canvas {
      width: 100%;
      max-width: 600px;
      overflow: hidden;
      background: none !important;
    }
  }
  #inviteds-block {
    .inviteds-list {
      background-color: rgb(175, 138, 108);
      color: white;
      max-width: 600px;
      margin: auto;
      .invited-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 16px;
        &:not(:last-child) {
          border-bottom: 1px solid white;
        }
        .check {
          margin-right: 25px;
          .success {
            height: 20px;
            width: 20px;
            color: white;
          }
          .danger {
            height: 20px;
            width: 20px;
            border-radius: 10px;
            border: 1px solid white;
          }
        }
        .name {
        }
      }
    }
  }
  #gifts-block {
    p {
      color: rgb(51, 51, 51);
      line-height: 1.7;
      font-size: 18px;
      margin-bottom: 36px;
    }
    .account-content {
      display: flex;
      align-items: stretch;
      justify-content: center;
      flex-wrap: wrap;
      &.mobile {
        .bank-info {
          &:first-child {
            border: none;
          }
        }
      }
      .bank-info {
        width: 345px;
        padding: 0 25px;
        &:first-child {
          border-right: 1px solid #333333;
        }
        .bank-icon {
          margin: 30px;
          text-align: center;
          img {
            height: 56px;
          }
        }
        p {
          margin-bottom: 20px;
        }
      }
    }
  }
  .card {
    background-color: white;
  }
}
</style>
