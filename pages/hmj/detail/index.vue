<template>
  <div class="page-container">
    <transition name="slide-fade">
      <div v-if="alert.display" class="alert-container">
        <Alert :status="alert.status" :message="alert.message" />
      </div>
    </transition>
    <div v-if="loading" class="selected-container">
      <Loading class="loading" />
    </div>
    <div v-else class="selected-container">
      <div class="image-container">
        <img :src="HMJDetails.image">
      </div>

      <div class="title">
        {{ HMJDetails.nama }}
      </div>
      <div class="subtitle">
        Tradisi
      </div>
      <div class="hmj-info">
        {{ tradisi }}
      </div>
      <div v-if="!showSearch" class="wisudawan-info title">
        Wisudawan Surfing Soon!
      </div>
      <div v-if="!showSearch" class="vistok-container">
        <img src="/img/wave_back.png" alt="ombak" class="waveback">
        <img src="/img/wave_front.png" alt="ombak" class="wavefront1">
        <img src="/img/wave_front.png" alt="ombak" class="wavefront2">
      </div>
      <div v-if="showSearch" class="search-container">
        <input v-model="keyword" class="search-bar" type="text" placeholder="Cari Wisudawan...">
        <WisudawanCard v-for="wisudawan in computedWisudawan" :key="wisudawan.id" :wisudawan="wisudawan" @wisudawanClicked="showPostIt($event)" />
      </div>
      <!-- <transition name="fade" appear>
        <div v-if="showModal" class="modal-overlay" />
      </transition>
      <transition name="slide-fade" appear>
        <WisudawanModal v-if="showModal" :wisudawan="onModal" @closeModal="showModal = false" @postItStatus="showAlert($event)" />
      </transition> -->
    </div>
  </div>
</template>

<script>
import WisudawanCard from '~/components/WisudawanCard.vue'
//import WisudawanModal from '~/components/WisudawanModal.vue'
import Alert from '~/components/Alert.vue'
import debounce from 'lodash/debounce'

export default {
  components: {
    WisudawanCard,
    //WisudawanModal,
    Alert
  },
  data(){
    return{
      facultyID: '',
      HMJName: '',
      HMJData: '',
      tradisi: '',
      HMJDetails: {},
      HMJRef: '',
      wisudawanArr: [],
      computedWisudawan: [],
      keyword: '',
      showSearch: true,
      showModal: false,
      onModal: {},
      alert: {
        status: '',
        message: '',
        display: false
      }
    }
  },
  watch: {
    keyword() {
      this.debouncedSearch()
    }
  },
  created(){
    this.debouncedSearch = debounce(() => {
      this.searchWisudawan()
      }, 200)
  },
  async mounted(){
    this.faultyID = this.$route.query.faculty
    this.HMJName = this.$route.query.hmj
    
    // get Data HMJ
    this.loading = true
    try{
      this.HMJRef = this.$fireStore.collection('fakultas').doc(this.faultyID).collection('hmj').doc(this.HMJName)
      await this.HMJRef.get().then((doc) => {
        this.HMJDetails = doc.data()
      })
      this.tradisi = this.HMJDetails.tradisi
    } catch(err){
      this.$router.push({
        path:`/hmj/`
      })
    }

    // get data Wisudawan
    const wisudawanRef = this.HMJRef.collection('wisudawan')
    this.wisudawanArr = await this.getDataFromCollection(wisudawanRef)
    this.computedWisudawan = this.wisudawanArr
    this.loading = false
    if (this.wisudawanArr.length === 0){
      this.showSearch = false
    }
  },
  methods:{
    getDataFromCollection(collection){
      return collection.get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          return data
        })
    },
    searchWisudawan() {
      if (this.keyword === ''){
        this.computedWisudawan = this.wisudawanArr
      } else {
        const isNumeric = /^(\d+)$/
        let listWisudawan = []
        if (isNumeric.test(this.keyword)){
          listWisudawan = this.searchByNim()
        } else {
          listWisudawan = this.searchByName()
        }
        this.computedWisudawan = listWisudawan
      }
    },
    searchByName(){
      return this.wisudawanArr.filter(wisudawan => wisudawan.nama.toLowerCase().includes(this.keyword.toLowerCase()))
    },
    searchByNim(){
      return this.wisudawanArr.filter(wisudawan => wisudawan.id.toString().includes(this.keyword))
    },
    showPostIt(wisudawan) {
      this.onModal = wisudawan
      this.showModal =  true
    },
    showAlert(status) {
      if (status) {
        this.alert.status = 'success'
        this.alert.message = 'Hore! Pesanmu sudah direkam oleh sistem dan akan dikirimkan kepada wisudawan.'
      } else {
        this.alert.status = 'error'
        this.alert.message = 'Ups, terjadi kesalahan dalam mengirim pesanmu. Mohon hubungi staff Maintenance ya!'
      }
      this.alert.display = true
      setTimeout(() => {
        this.alert.display = false
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .titleProto {
    margin: 20px 30px;
    text-align: center;
    font-family: 'Because We Connect';
    letter-spacing: 5px;
    animation-name: fade-in;
    animation-duration: 0.3s;
  }

  .alert-container {
    position: fixed;
    top: 10vh;
    left: 50vw;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    width: 80%;
    @media only screen and (max-width: 600px) {
      width: 100%;
    }
  }

  .image-container{
    height: 200px;
    padding: 10px 20px;
    animation-name: fade-in;
    animation-duration: 0.3s;
  }

  img{
    margin-left: 50%;
    transform: translateX(-50%);
    max-width:100%;
    max-height:100%;
  }

  .title{
    @extend .titleProto;
    font-size: 150%;
  }

  .subtitle {
    @extend .titleProto;
    font-family: 'Poppins';
    font-size: 120%;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .hmj-info{
    font-size: 70%;
    line-height: 23px;
    width: 70%;
    text-align: center;
    margin: 0 auto;
    @media only screen and (max-width: 600px) {
      font-size: 12px;
    }
    animation-name: fade-in;
    animation-duration: 0.3s;
  }

  .wisudawan-info{
    margin-top: 50px;
    animation-name: fade-in;
    animation-duration: 0.3s;
  }

  .vistok-container {
    position: relative;
    width: 650px;
    height: 150px;
    margin: 0 auto;
    animation-name: fade-in;
    animation-duration: 0.3s;
    @media only screen and (max-width: 1000px) {
      width: 450px;
      height: 150px;
    }
    @media only screen and (max-width: 800px) {
      width: 350px;
      height: 150px;
    }
    @media only screen and (max-width: 600px) {
      width: 250px;
      height: 150px;
    }
    .waveback {
      width: 50%;
    }
    .wavefront1 {
      position: absolute;
      width: 55%;
      top: -5px;
      left: -160px;
      @media only screen and (max-width: 1000px) {
        left: -100px;
      }
      @media only screen and (max-width: 800px) {
        left: -80px;
      }
      @media only screen and (max-width: 600px) {
        left: -60px;
      }
    }
    .wavefront2 {
      position: absolute;
      width: 55%;
      top: -5px;
      right: -210px;
      @media only screen and (max-width: 1000px) {
        right: -150px;
      }
      @media only screen and (max-width: 800px) {
        right: -110px;
      }
      @media only screen and (max-width: 600px) {
        right: -75px;
      }
    }
  }
  .search-container {
    margin: 30px auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    animation-name: fade-in;
    animation-duration: 0.3s;
  }
  .search-bar {
    width: 40%;
    height: 40px;
    font-family: 'Poppins';
    margin: 20px 100%;
    min-width: 70%;
    border-radius: 7px;
    outline: none;
    padding-left: 10px;
    transition: border-color 0.3s;
    &:focus {
      border-color: #FEC030;
    }
    @media only screen and (max-width: 600px) {
      min-width: 70%;
    }
  }
  .loading{
    margin-top: 50px;
    margin-bottom: 80vh;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 98;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.5s;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(-50%) translateY(-100vh);
    opacity: 0;
  }
</style>