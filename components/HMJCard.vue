<template>
  <div class="card" @click="clicked()">
    <div class="vistok">
      <img src="/img/fish.png">
    </div>
    <div class="image-container">
      <img :src="detail.image">
    </div>
    <div class="name">
      {{ detail.nama }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: {
      type: Object,
      required: true
    },
  },
  methods: {
    clicked(){
      this.$emit("HMJClicked",this.detail)
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    position: relative;
    background-color: #3CB2BA;
    border-radius: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    box-shadow: 0px 0px 25px -5px #6199ff;
    height: 100%;
    transition: background-color 0.3s, transform 0.3s;
    animation-name: fade-in;
    animation-duration: 0.3s;
    &:hover {
      cursor: pointer;
      background-color: #FEC030;
      transform: scale(1.05)
      }
  }
  .vistok{
    position: absolute;
    width: 40%;
    img{
      transform: translateX(-135%) translateY(-35%);
      max-width: 100%;
      max-height: 100%;
      @media only screen and (max-width: 800px) {
        transform: translateX(-120%) translateY(-40%);
      }
    }
    @media only screen and (max-width: 800px) {
      width: 40%;
    }
  }
  .image-container {
    padding: 20px;
    padding-bottom: 0; 
    width: 100%;
    height: 170px;
    display: flex;
    justify-content: center;
    @media only screen and (max-width: 500px) {
        height: 150px;
      }
  }
  .name {
    font-size: 130%;
    text-align: center;
    padding: 0 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    font-family: 'Because We Connect';
    letter-spacing: 2px;
    @media only screen and (max-width: 500px) {
      font-size: 110%;
    }
  }
  img {
    object-fit: scale-down;
    max-width: 100%;
  }

</style>


