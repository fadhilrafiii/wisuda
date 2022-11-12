<template>
  <div class="card" @click="flip()">
    <div :class="{ flip: ucapan.read }" class="card-body">
      <div class="card-front" />
      <div class="card-back">
        <div class="isi">
          {{ ucapan.ucapan }}
        </div>
        <div class="pengirim">
          💌 {{ ucapan.dari }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    ucapan: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods:{
    flip(){
      this.$emit("flip", this.ucapan.id,this.index)
    },
  }
}
</script>

<style lang="scss" scoped>
  .card {
    perspective: 40rem;
    cursor: pointer;
    z-index: -99;
    margin-right: 10px;
  }

  .card-front{
    font-size: 20px;
    text-align: center;
  }

  .card-body{
    padding: 20px;
    background-color: #192744;
    border-radius: 30px;
    font-size: 80%;
    margin-top: 15px;

    position: relative;
    transform-style: preserve-3d;
    transition: 1s transform;
  }

  .flip{
    cursor: default;
    transform: rotateX(-180deg);
  }


  .card-back {
    transform: rotateX(-180deg);
    line-height: 20px;
    @media only screen and (max-width: 600px) {
      font-size: 80%; 
    }
  }

  .card-front, .card-back {
    backface-visibility: hidden;
    min-width: 100%;
  }

  .isi{
    transform: translateY(-15px);
    white-space: pre-line;
    margin-bottom: 20px;
  }

  .pengirim{
    text-align: right;
  }
</style>

