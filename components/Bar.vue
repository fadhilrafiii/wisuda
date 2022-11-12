<template>
  <div>
    <div class="bar-container">
      <div class="logo-container">
        <img :src="hmj.logo" :alt="hmj.nama" class="logo">
      </div>
      <div class="rect" :style="{'height': computedHeight + 'px'}" />
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
  export default {
    name: 'Bar',
    props: {
      height: {
        type: Number,
        default: 0
      },
      maxHeight: {
        type: Number,
        default: 100
      },
      hmj: {
        type: Object,
        default: () => {}
      },
    },
    data() {
      return {
        computedHeight: 0,
        updateInterval: 500
      }
    },
    watch: {
      height(newHeight) {
        gsap.to(this.$data, this.updateInterval / 1000, { computedHeight: calculateHeight(newHeight, this.maxHeight) })
      }
    },
    mounted () {
      // setTimeout(() => {
        gsap.to(this.$data, this.updateInterval*2 / 1000, { computedHeight: calculateHeight(this.height, this.maxHeight) })
      // }, 1000)
    },
  }
  function calculateHeight(height, maxHeight) {
    return Math.min(Math.max(height, 0) * maxHeight / 100, maxHeight)
  }
</script>

<style lang="scss" scoped>
  .bar-container {
    display: block;
    margin: 0px 10px;
  }

  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .rect {
    width: 60px;
    background-color: greenyellow;
  }

  .logo {
    object-fit: contain;
    max-height: 50px;
    max-width: 50px;
    width: auto;
    height: auto;
    margin: 10px 0px;
    @media only screen and (max-width: 600px) {
      object-fit: contain;
      width: auto;
      height: auto;
    }
  }
</style>