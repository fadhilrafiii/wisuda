<template>
  <img :src="sponsor.sponsorImg" :alt="sponsor.sponsorName" :class="['sponsor-img', isParagon ? 'paragon' : sponsor.sponsorType]">
</template>

<script>
export default {
  name: 'Sponsor',
  props: {
    sponsor: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isParagon() {
      return (this.sponsor.sponsorName === 'Paragon')
    }
  }
}
</script>

<style lang="scss" scoped>
  .sponsor-img {
    object-fit: contain;
    width: auto;
    height: auto;
    margin: 10px 10px;
    @media only screen and (max-width: 600px) {
      object-fit: contain;
      width: auto;
      height: auto;
      margin: 10px;
    }
  }
  .large {
    max-width: 300px;
    max-height: 200px;
    @media only screen and (max-width: 800px) {
      max-width: 200px;
      max-height: 130px;
    }
    @media only screen and (max-width: 600px) {
      max-width: 150px;
      max-height: 100px;
    }
  }
  .middle {
    max-width: 225px;
    max-height: 150px;
    @media only screen and (max-width: 800px) {
      max-width: 150px;
      max-height: 100px;
    }
    @media only screen and (max-width: 600px) {
      max-width: 115px;
      max-height: 75px;
    }
  }
  .small {
    max-width: 150px;
    max-height: 100px;
    @media only screen and (max-width: 800px) {
      max-width: 100px;
      max-height: 70px;
    }
    @media only screen and (max-width: 600px) {
      max-width: 75px;
      max-height: 50px;
    }
  }
  .paragon {
    max-width: 350px;
    max-height: 200px;
    margin: 10px 30px;
    @media only screen and (max-width: 800px) {
      max-width: 250px;
      max-height: 130px;
    }
    @media only screen and (max-width: 600px) {
      margin: 10px;
      max-width: 200px;
      max-height: 100px;
    }
  }
</style>