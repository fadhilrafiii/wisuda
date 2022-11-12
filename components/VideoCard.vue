<template>
  <div class="container">
    <div class="infohmj-container">
      <img :src="detail.logo" alt="logo">
      <div class="title">
        {{ nama }}
      </div>
    </div>
    <a :href="detail.link" target="_blank">
      <img src="/img/youtube.png" class="youtube">
      <img :src="getThumb(detail.link)" class="thumbnail">
    </a>
    <div class="like-container">
      <fa class="like-icon" :icon="['fas', 'thumbs-up']" />
      <div class="like-number">
        {{ detail.likes }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    detail:{
      type: Object,
      required: true
    }
  },
  computed: {
    nama() {
      if(this.detail.nama == "KMM"){
        return "SBM"
      } else {
        return this.detail.nama
      }
    }
  },
  methods:{
    getThumb(url) {
      let video
      if (url.includes("youtu.be")){
        const url_parse = url.split("/")
        video = url_parse[url_parse.length-1]
      }
      else{
        const url_parse = url.match('[\\?&]v=([^&#]*)')
        video = (url_parse === null) ? url : url_parse[1]
      }
      return 'http://img.youtube.com/vi/' + video + '/0.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    width: 100%;
    margin-bottom: 30px;
    animation-name: fade-in;
    animation-duration: 0.5s;
  }

  .like-container {
    display: flex;
    align-items: center;
    .like-icon {
      margin: 0px 10px;
    }
    .like-number {
      margin-right: 20px;
    }
  }
    
  .infohmj-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    margin-bottom: 10px;
    min-height: 70px;
    .title{
      margin-left: 10px;
      text-align: left;
      font-size: 15px;
      font-weight: 500;
      animation-name: fade-in;
      animation-duration: 0.5s;
    }
    img {
      object-fit: contain;
      max-height: 50px;
      max-width: 50px;
      width: 100%;
      height: 100%;
      @media only screen and (max-width: 600px) {
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
    }
  }

  .thumbnail{
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
  }

  .youtube{
    width: 5%;
    position: absolute;
    cursor: pointer;
    z-index: 1;
    transform: translateX(85%) translateY(53%);
    @media only screen and (max-width: 700px) {
      width: 8%;
    }
    @media only screen and (max-width: 500px) {
      width: 16%;
    }
  }
</style>


