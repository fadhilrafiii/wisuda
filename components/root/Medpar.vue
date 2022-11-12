<template>
  <img :src="medpar.medparImg" :alt="medpar.medparName" :class="[medpar.medparType, 'medpar-img']">
</template>

<script>
export default {
  name: 'Medpar',
  props: {
    medpar: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .medpar-img {
    object-fit: contain;
    width: auto;
    height: auto;
    margin: 10px 10px;
    @media only screen and (max-width: 600px) {
      object-fit: contain;
      width: auto;
      height: auto;
      margin: 7px;
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
</style>