<template>
  <div class="number-box">
    <span>{{ number }}</span>
  </div>
</template>

<script>
export default {
  name: 'CountdownCard',
  props: {
    number: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .number-box {
    width: 200px;
    padding: 0 40px;
    margin: 0 10px;
    background-color:#FEC030;
    border: 20px solid #FEC030;
    border-radius: 100px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 800px) {
      width: 175px;
    }
    @media only screen and (max-width: 600px) {
      width: 85px;
      padding: 0 5px;
      margin: 0 5px;
    }
    span {
      font-family: 'Because We Connect';
      font-size: 200px;
      font-weight: 700;
      color: #FFFFFF;
      @media only screen and (max-width: 800px) {
        font-size: 150px;
      }
      @media only screen and (max-width: 600px) {
        font-size: 75px;
      }
    }
  }
</style>
