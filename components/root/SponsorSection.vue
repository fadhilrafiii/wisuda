<template>
  <div class="sponsor-section">
    <div class="title">
      Sponsored By:
    </div>
    <div class="sponsor-container">
      <Sponsor v-for="sponsor in largeSponsor" :key="sponsor.id" :sponsor="sponsor" />
    </div>
    <div class="sponsor-container">
      <Sponsor v-for="sponsor in middleSponsor" :key="sponsor.id" :sponsor="sponsor" />
    </div>
    <div class="sponsor-container">
      <Sponsor v-for="sponsor in smallSponsor" :key="sponsor.id" :sponsor="sponsor" />
    </div>
  </div>
</template>

<script>
import Sponsor from '~/components/root/Sponsor.vue'
import sponsor_data from '~/assets/sponsor.json'
  export default {
    name: 'SponsorSection',
    components: {
      Sponsor,
    },
    data () {
      return {
        SponsorData: []
      }
    },
    computed: {
      largeSponsor () {
        return this.SponsorData.filter(sponsor => sponsor.sponsorType === 'large')
      },
      middleSponsor () {
        return this.SponsorData.filter(sponsor => sponsor.sponsorType === 'middle')
      },
      smallSponsor () {
        return this.SponsorData.filter(sponsor => sponsor.sponsorType === 'small')
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData() {
        let i = 0
        Object.values(sponsor_data).forEach(sponsor => {
          sponsor.id = i
          this.SponsorData.push(sponsor)
          i++
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .sponsor-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .title {
    font-family: 'Because We Connect';
    font-size: 40px;
    margin-top: 5%;
    margin-left: 15%;
    margin-bottom: 2%;
    @media only screen and (max-width: 600px) {
      font-size: 25px;
      margin: 15px 10% 0 40px;
      font-weight: 500;
    }
  }
  .sponsor-container {
    display: flex;
    justify-content: center;
    margin: 1% 12%;
    flex-wrap: wrap;
  }
</style>