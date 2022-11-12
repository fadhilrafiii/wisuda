<template>
  <div class="container">
    <div class="title">
      PERAYAAN WISUDA OKTOBER 2020
    </div>
    <VideoSlide />
    <NextEventBanner />
    <IntroductionCard />
    <div class="title">
      COUNTDOWN
    </div>
    <Countdown />
    <div class="subtitle">
      HARI MENUJU <br>
      PERAYAAN WISUDA OKTOBER 2020
    </div>
  </div>
</template>

<script>
import VideoSlide from '~/components/VideoSlide.vue'
import IntroductionCard from '~/components/IntroductionCard.vue'
import Countdown from '~/components/Countdown.vue'
import NextEventBanner from '~/components/NextEventBanner.vue'

export default {
  name: 'Homepage',
  components: {
    VideoSlide,
    IntroductionCard,
    Countdown,
    NextEventBanner
  }
}
</script>

<style lang="scss" scoped>
  .title {
    font-family: 'Because We Connect';
    text-align: center;
    font-size: 50px;
    margin-bottom: 35px;
    letter-spacing: 3px;
  }
  .subtitle {
    font-family: 'Because We Connect';
    font-size: 30px;
    text-align: center;
  }
  @media only screen and (max-width: 1000px) {
    .title {
      font-size: 40px;
    }
  }
  @media only screen and (max-width: 600px) {
    .title {
      font-size: 27px;
      margin: 0 20% 35px;
    }
    .subtitle {
      font-size: 18px;
    }
  }
</style>
