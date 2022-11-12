<template>
  <div class="card">
    <div class="image-container">
      <div v-show="loading" class="profile-picture">
        <Loading />
      </div>
      <img
        v-show="!loading"
        :src="wisudawan.image"
        alt="Foto Profil Wisudawan"
        class="profile-picture"
        @load="loading = false"
        @error="setDefaultImage"
      >
      <img v-show="!loading" src="/img/pp-border.png" alt="pp-border" class="pp-border">
    </div>
    <div class="wisudawan-content">
      <div class="title">
        {{ namaSingkat }}
      </div>
      <div class="title">
        {{ wisudawan.id }}
      </div>
      <div :class="['subtitle', {'cut-off': iscutoff}]">
        {{ wisudawan.ta }}
      </div>
      <!-- <button class="btn-post-it" @click="showPostIt()">
        Kirim Pesan!
      </button> -->
    </div>
  </div>
</template>

<script>
import loading from '~/components/Loading.vue'
export default {
  name: "WisudawanCard",
  components: {
    loading
  },
  props: {
    wisudawan: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: true,
      iscutoff: false
    }
  },
  computed: {
    namaSingkat() {
      let computed_name = this.wisudawan.nama
      if (this.wisudawan.nama.length > 35) {
        let nama_arr = this.wisudawan.nama.split(' ')
        let i = 1
        let word
        while (nama_arr.join(' ').length > 35 && i < nama_arr.length) {
          word = nama_arr[nama_arr.length - i]
          nama_arr[nama_arr.length - i] = word[0] + "."
          i++
        }
        computed_name = nama_arr.join(' ')
      }
      return computed_name
    }
  },
  mounted () {
    if (typeof this.wisudawan.image === 'undefined') {
      this.loading = false
      this.wisudawan.image = "/img/placeholder-wisudawan.png"
    }
    if (this.wisudawan.ta.length > 230) {
      this.iscutoff = true
    }
  },
  methods: {
    showPostIt() {
      this.$emit("wisudawanClicked", this.wisudawan)
    },
    setDefaultImage() {
      this.loading = false
      this.wisudawan.image = "/img/placeholder-wisudawan.png"
    }
  },
}
</script>

<style lang="scss" scoped>
  .card {
    position: relative;
    background-color: #3CB2BA;
    border-radius: 30px;
    display: block;
    margin: 2%;
    padding: 30px 15px;
    width: 315px;
    min-height: 350px;
    padding-bottom: 60px;
    box-shadow: 0px 0px 35px -15px white;
    animation-name: fade-in;
    animation-duration: 0.3s;
    @media only screen and (max-width: 800px) {
      width: 250px;
      padding: 30px 15px;
      padding-bottom: 60px;
    }
    @media only screen and (max-width: 600px) {
      margin: 5%;
      margin-right: 2%;
      display: flex;
      width: 315px;
      min-height: 150px;
      padding: 0 10px 40px;
      box-shadow: 0px 0px 25px -15px white;
    }
  }
  .image-container {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 5px 20px;
    @media only screen and (max-width: 800px) {
      margin-top: 0px;
    }
    @media only screen and (max-width: 600px) {
      margin: 10px;
      margin-left: 5px;
      align-items: center;
    }
  }
  .profile-picture {
    border-radius: 50%;
    max-width: 100px;
    max-height: 100px;
    animation-name: fade-in;
    animation-duration: 0.3s;
    @media only screen and (max-width: 600px) {
      max-width: 70px;
      max-height: 70px;
    }
  }
  .pp-border {
    position: absolute;
    height: 125px;
    top: -10px;
    margin: 0 auto;
    transform: translateX(6px);
    animation-name: fade-in;
    animation-duration: 0.3s;
    @media only screen and (max-width: 600px) {
      top: -5px;
      height: 83px;
      transform: translateX(3px) translateY(68px);
    }
  }
  .wisudawan-content {
    text-align: center;
    margin-left: 10px;
    padding-top: 10px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    height: 265px;
    @media only screen and (max-width: 600px) {
      flex-flow: column nowrap;
      justify-content: space-evenly;
      height: 230px;
    }
  }
  .title {
    font-size: 20px;
    font-weight: 400;
    text-transform: capitalize;
    @media only screen and (max-width: 800px) {
      font-size: 18px;
    }
    @media only screen and (max-width: 600px) {
      text-align: left;
      font-size: 15px;
    }
  }
  .subtitle {
    margin-top: 10px;
    font-size: 14px;
    @media only screen and (max-width: 800px) {
      font-size: 13px;
    }
    @media only screen and (max-width: 600px) {
      margin-top: 0;
      text-align: left;
      font-size: 10px;
    }
  }
  .btn-post-it {
    position: absolute;
    background: #3C62C1;
    color: #ffffff;
    border-radius: 20px;
    border: none;
    outline: none;
    padding: 10px 20px;
    margin-top: 10px;
    letter-spacing: 1px;
    transition: background-color 0.3s;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    @media only screen and (max-width: 800px) {
      font-size: 13px;
    }
    @media only screen and (max-width: 600px) {
      font-size: 15px;
      padding: 5px 10px;
      bottom: 12px;
    }
    &:hover {
      cursor: pointer;
      background-color: #FEC030;
    }
  }
  .cut-off {
    font-size: 13px;
    @media only screen and (max-width: 800px) {
      font-size: 11px;
    }
    @media only screen and (max-width: 600px) {
      font-size: 8px;
    }
  }
</style>