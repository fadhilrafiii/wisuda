<template>
  <div class="main-container">
    <div class="image">
      <transition name="fade">
        <div v-if="!loading" class="container-instagram">
          <a target="_blank" :href="instagram" class="instagram">
            <fa class="instagram-icon" :icon="['fab', 'instagram']" />
          </a>
        </div>
      </transition>
      <div class="main-image">
        <div class="arrow-left" :style="[ketua ? {'visibility': 'hidden'} : {'visibility': 'visible'}]">
          <fa :icon="['fas', 'chevron-left']" class="arrow-right" @click="previous(id)" />
        </div>
        <div v-if="loading" class="loading-container loading">
          <Loading />
        </div>
        <div v-show="!loading" class="main-image">
          <div class="photo-container">
            <img v-loadedifcomplete :src="src" :class="imageType" @load="imageLoaded">
          </div>
        </div>
        <div class="arrow-right" :style="[ketua ? {'visibility': 'hidden'} : {'visibility': 'visible'}]">
          <fa :icon="['fas', 'chevron-right']" class="arrow-right" @click="next(id)" />
        </div>
      </div>
      <transition name="fade">
        <div v-if="!loading" class="description">
          <div class="content name">
            {{ name }}
          </div>
          <div class="content position">
            {{ position }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BodCard',
  directives: {
    loadedifcomplete: {
      componentUpdated: function(el, binding, vnode){
        if (el.completed){
          vnode.context.loading = false
        }
      }
    }
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: 'Name'
    },
    position: {
      type: String,
      default: 'Position'
    },
    src: {
      type: String,
      default: ''
    },
    instagram: {
      type: String,
      default: 'https://instagram.com/paradewisudaitb'
    },
    ketua: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    imageType(){
      const str = this.src.slice(16,21)
      let className= ""
      switch(str) {
        case('Ketua') :
          className = 'ketua-photo'
          break
        case('Kabid') :
          className = 'kabid'
          break
        case('Kadiv') :
          className = 'kadiv'
          break
        default :
          if(this.src === '/img/organogram/Sekretaris_Jendral.png') {
            className = 'kabid'
          } else {
            className = 'kadiv'
          }
      }
      return className
    }
  },
  methods: {
    imageLoaded() {
      this.loading = false
    },
    previous(e) {
      this.loading = true 
      this.$emit('previous', e)
    },
    next(e) {
      this.loading = true
      this.$emit('next', e) 
    },
  }
}
</script>

<style lang="scss" scoped>
  * {
    font-family: "Because We Connect";
  }

  .main-container {
    background-color: #57c2be;
    display: block;
    padding: 25px;
    height: 100%;
    border-radius: 35px;
    position: relative;
    width: 100%;
    padding-top: 100%;
  }

  .container-instagram{
    display: flex;
    margin: auto;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 5%;
    right: 8%;
    border-radius: 8px;
    &::before{
      background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);
      opacity: 0;
      position:absolute;
      content: "";
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transition: opacity 0.25s linear;
      border-radius: 7.5px;
    }
    &:hover::before{
      cursor: pointer;
      opacity: 1
    }
  }

  .instagram-icon{
    transform: translateX(2.75px) translateY(-2.3px);
  }

  .instagram {
    font-size: 1.75rem;
    color: white;
  }

  .content {
    text-align: center;
    color: white;
    font-weight: bold;
  }

  .loading-container {
    align-self: center;
    justify-self: center;
    width: 100%;
    padding-top: 100%;
    position: relative;
  }

  .loading{
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 auto;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  
  .photo-container {
    height: 100%;
    animation-name: fade-in;
    animation-duration: 0.5s;
  }

  .photo {
    width: 70%;
    box-sizing: border-box;
    padding-top: 10px;
    flex-direction: row;
    position: absolute;
    bottom: 15%;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;

  }

  .arrow-left {
    width: 20px;
    height: 20px;
    margin: auto 0;
    margin-left: 10px;
    fill: white;
    position: absolute;
    left: 20px;
    &:hover {
      cursor: pointer;
      height: 25px;
    }
  }

  .arrow-right {
    width: 20px;
    height: 20px;
    margin: auto 0;
    margin-right: 10px;
    position: absolute;
    right: 0;
    &:hover {
      cursor: pointer;
      height: 25px;
    }
  }

  .description {
    align-self: flex-end;
    position: absolute;
    bottom: 8%;
    left: 0;
    right: 0;
    text-align: center;
  }

  .name {
    font-size: 20px;
    font-weight: 100;
    padding-bottom: 8px;
  }

  .position {
    font-size: 15px;
    font-weight: 100;
  }

  .icon {
    text-align: right;
    margin: auto;
    position: absolute;
    width: 22%;
    margin-left: -10px;
    margin-top: 5px;
  }

  .image {
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .kabid {
    width: 70%;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 22%;
    margin: auto;
  }

  .kadiv {
    width: 80%;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 22%;
    margin: auto;
  }

  .ketua-photo {
    position: absolute;
    right: 0;
    left: 0;
    margin: auto;
    bottom : 22%;
    width: 80%;
  }

  .main-image {
    margin: auto;
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  @media (max-width: 1023px) {
    .photo {
      width: 70%;
      max-width: 1000px;
    }
    .main-image{
      margin-bottom: 0;
      margin-top: 10px;
    }
    .photo-container{
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .name {
      font-size: 35px;
    }
    .position {
      font-size: 25px;
    }
  }
  @media (min-width: 461px) and (max-width: 540px) {
    .name {
      font-size: 20px;
    }
    .position {
      font-size: 15px;
    }
  }

  @media (max-width: 460px) {
    .name {
      font-size: 100%;
    }

    .position {
      font-size: 80%;
    }
  }
    
</style>