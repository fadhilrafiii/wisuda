<template>
  <div class="countdown-container">
    <div class="vistok-wrapper">
      <img class="lobster" src="/img/lobster.png" alt="lobster">
    </div>
    <div class="vistok-wrapper">
      <img class="gurita" src="/img/gurita.png" alt="gurita">
    </div>
    <CountdownCard :number="hariPuluhan" />
    <CountdownCard :number="hariSatuan" />
  </div>
</template>

<script>
import CountdownCard from '~/components/CountdownCard.vue'
const wisoktoDate = new Date(2020, 9, 24)

export default {
  name: 'Countdown',
  components: {
    CountdownCard
  },
  data () {
    return {
      timerInterval: null,
      hariPuluhan: 0,
      hariSatuan: 0
    }
  },
  mounted () {
    this.updateTimer()
    this.startCountdown()
  },
  methods: {
    updateTimer () {
      const now = new Date().setHours(0, 0, 0, 0)
      const remainingDay = Math.floor((wisoktoDate - now) / 1000 / 60 / 60 / 24)
      this.hariPuluhan = Math.max(Math.floor(remainingDay / 10), 0)
      this.hariSatuan = Math.max(remainingDay % 10, 0)
    },
    startCountdown () {
      this.timerInterval = setInterval(() => this.updateTimer(), 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .countdown-container {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 50px;
    @media only screen and (max-width: 600px) {
      margin: 25px;
    }
  }
  .vistok-wrapper {
    position: absolute;
    width: 450px;
    height: 280px;
    @media only screen and (max-width: 800px) {
      width: 400px;
      height: 220px;
    }
    @media only screen and (max-width: 600px) {
      width: 200px;
      height: 130px;
    }
  }
  .gurita {
    position: absolute;
    max-width: 65%;
    max-height: 65%;
    transform: rotate(19.78deg);
    top: -30%;
    right: -2%;
  }
  .lobster {
    position: absolute;
    max-width: 35%;
    max-height: 35%;
    transform: matrix(-1, 0, 0, 1, 0, 0);
    bottom: -8%;
    left: -8%;
  }
</style>
