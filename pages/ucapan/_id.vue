<template>
  <div class="main-container">
    <div v-show="showUcapan" class="back" @click="hideCard">
      <img src="/img/back.png">
    </div>
    <div v-if="loadingPage" class="loadingPage">
      <Loading />
    </div>
    <div v-else>
      <div class="wisudawan-info">
        <div class="image-container">
          <img
            v-show="!loadingPage"
            :src="imageWisudawan"
            class="profile-picture"
            @error="setDefaultImage"
            @load="showContent = true"
          >
          <img v-show="!loadingPage" src="/img/pp-border.png" alt="pp-border" class="pp-border">
        </div>
      </div>
      <div v-show="!showContent">
        <Loading />
      </div>
      <div v-if="showContent" class="content">
        <div class="wisudawan-name">
          Halo, {{ namaWisudawan }}!
        </div>
        <div v-if="!showUcapan">
          <div class="message-container">
            <ucapan-pembuka />
            <div v-show="!isHide">
              Selain ucapan selamat dari kami, ada ucapan dari teman-temanmu juga, lho! Ucapan dari mereka yang ikut berbahagia karena prestasimu.
              <div class="button-container">
                <div class="button" @click="showCard">
                  Yuk, Dibuka
                </div>
              </div>
            </div>
            <div v-show="isHide">
              <ucapan-penutup />
              <div class="vistok-zero">
                <div class="vistok-zero-ucapan">
                  <img src="/img/penyu.png">
                </div>
                <div class="vistok-zero-ucapan">
                  <img src="/img/kapalselam.png">
                </div>
                <div class="vistok-zero-ucapan">
                  <img src="/img/lobster.png">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="ucapan">
          <div class="vistok-container">
            <div class="vistok penyu">
              <img src="/img/penyu.png">
            </div>
            <div class="vistok gurita">
              <img src="/img/gurita.png">
            </div>
          </div>
          <div class="ucapan-container">
            <div class="click">
              KLIK!
            </div>
            <div v-for="(ucapan, idx) in arrUcapan" :key="idx">
              <div class="ucapan-card">
                <ucapan-card 
                  :ucapan="ucapan"
                  :index="idx"
                  @flip="updateRead"
                />
              </div>
            </div>
          </div>
          <div class="message-container">
            Haii, keren banget, ‘kan, tadi ucapan dan pesan dari teman-temanmu! Kami ikut terharu :”) !
            <br><br>
            <ucapan-penutup />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ucapanCard from '~/components/Card/ucapanCard'
import UcapanPenutup from '~/components/UcapanPenutup.vue'
import UcapanPembuka from '~/components/UcapanPembuka.vue'
export default {
  components:{
    ucapanCard,
    UcapanPenutup,
    UcapanPembuka
  },
  data(){
    return {
      NIM: '',
      namaWisudawan: '',
      imageWisudawan: '',
      ucapanPageClicked: false,
      loadingPage: true,
      arrUcapan: [],
      showContent: false,
      showUcapan: false,
      isHide: false,
    }
  },
  async mounted(){
    this.loading = false
    this.loadingPage = true
    const wisudawanHash = this.$route.params.id
    const outerUcapanRef = this.$fireStore.collection("ucapan").where("hash", "==", wisudawanHash)

    // Get data outer ucapan di collection ucapan
    let outerData
    try {
      outerData = await outerUcapanRef.get()
      .then((snapshot) => {
        const doc = snapshot.docs[0]
        return {
          nim : doc.id,
          clicked : doc.data().clicked,
          wisudawan : doc.data().wisudawan
        }
      })
    } catch(e) {
      this.$router.replace({path: "/notfound"})
      return
    }
    
    this.NIM = outerData.nim
    this.ucapanPageClicked = outerData.clicked
    const wisudawanRef = outerData.wisudawan

    //Get data Wisudawan
    const wisudawanData = await wisudawanRef.get()
      .then((doc) => {
        const data = doc.data()
        return {
          nama : data.nama,
          image : data.image
        }
      })
    
    this.namaWisudawan = wisudawanData.nama
    this.imageWisudawan = wisudawanData.image ? wisudawanData.image : "/img/placeholder-wisudawan.png"

    // Get data ucapan
    const ucapanRef = this.$fireStore.collection("ucapan").doc(this.NIM).collection("ucapan")
    this.arrUcapan = await this.getDataFromCollection(ucapanRef)
    this.isHide = this.isEmptyMessage()

    if (this.isHide && this.ucapanPageClicked){
      await this.$fireStore.collection("ucapan").doc(this.NIM).set({
        clicked : false
      }, { merge: true })
      this.showUcapan = false
    }

    if (!this.isHide){
      this.arrUcapan.sort((a,b) => {
        if (a.read < b.read) {return -1}
        if (a.read > b.read) {return 1}
        return 0
      })
    }
   
    if(this.ucapanPageClicked){
      this.showCard()
    }

    this.loadingPage = false
  },
  methods:{
    getDataFromCollection(collection){
      return collection
        .where("status", "==", "authorized")
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          return data
        })
    },
    setDefaultImage() {
      this.imageWisudawan = "/img/placeholder-wisudawan.png"
    },
    showCard(){
      this.showUcapan = true
      if(!this.ucapanPageClicked){
        this.$fireStore.collection("ucapan").doc(this.NIM).update({
          clicked: true 
        })
      }
      this.intervalId = setInterval(() => {
        if (window.pageYOffset === 0) {
          clearInterval(this.intervalId)
        }
        window.scroll(0, window.pageYOffset - 50)
      }, 20)
    },
    hideCard(){
      this.showUcapan = false
    },
    isEmptyMessage(){
      return !this.arrUcapan.length
    },
    updateRead(id,index){
      this.$fireStore.collection("ucapan").doc(this.NIM).collection("ucapan").doc(id).update({
        read: true 
      })
      .then(() => {
        this.arrUcapan[index].read = true
      })
    }
  }
}
</script>


<style lang="scss" scoped>
  .back{
    z-index: 1;
    position: absolute;
    cursor: pointer;
    img{
      width: 50px;
      @media only screen and (max-width: 800px) {
        width: 30px;
      }
    }
  }


  .vistok-zero{
    margin-top: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    .vistok-zero-ucapan{
      max-width: 30%;
      img{
        max-width: 60%;
      }
    }
  }

  .vistok-container{
    width: 100%;
  }

  .vistok{
    position: absolute;
    width: 62%;
    z-index: 1;
  }

  .penyu img{
    transform: translateX(-30px) translateY(-30%);
    max-width: 100px;
    max-height: 100px;
    @media only screen and (max-width: 800px) {
      max-width: 80px;
      max-height: 80px;
    }
    @media only screen and (max-width: 600px) {
      transform: translateX(-20px) translateY(-30%);
      max-width: 60px;
      max-height: 60px;
    }
  }

  .gurita img{
    float: right;
    transform: translateY(-30%);
    max-width: 100px;
    max-height: 100px;
    @media only screen and (max-width: 800px) {
      max-width: 80px;
      max-height: 80px;
    }
    @media only screen and (max-width: 600px) {
      max-width: 60px;
      max-height: 60px;
    }
  }

  .main-container {
    max-width: 60%;
    margin: 0 auto;
    font-size: 20px;
    font-weight: 300;
    overflow: hidden;
  }

  .click{
    text-align: center;
    margin: 20px;
    font-size: 30px;
    font-family: "Because We Connect"
  }

  // Card flip
  .ucapan-container{
    z-index: -99;
    background-color: #00A5BB;
    border: 20px solid #00A5BB;
    border-radius: 40px;
    margin-bottom: 50px;
    max-height: 500px;
    overflow: auto;
    -ms-overflow-style: none;

    &::-webkit-scrollbar-button:start{height: 70px; width:10%;}

    &::-webkit-scrollbar{
      width: 8px;
    }

    &::-webkit-scrollbar-track-piece{
      background-color: rgba(255, 255, 255, 0.315);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb{
      background-color: #cbcbcbe1;
      border-radius: 20px;
    }

    overflow-x: hidden;
    scrollbar-width: thin;
  }

  .wisudawan-name{
    text-align: center;
    font-weight: 500;
    font-size: 180%; 
    margin-bottom: 50px;
    @media only screen and (max-width: 600px) {
      font-size: 120%; 
    }
  }

  .message-container{
    text-align: center;
    font-size: 90%;
    margin-bottom: 50px;
    line-height: 35px;
    @media only screen and (max-width: 600px) {
      font-size: 70%; 
      line-height: 30px;
    }
  }

  .button-container{
    margin-top: 40px;
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }

  .button{
    width: 150px;
    cursor: pointer;
    background-color: #00A5BB;
    text-align: center;
    padding: 10px;
    border-radius: 100px;
    transition: background-color 0.3s;
    animation-name: fade-in;
    animation-duration: 0.3s;
    &:hover {
      background-color: #FEC030;
    }
  }

  // Photo
  .image-container {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 20px;
    margin-bottom: 50px;
    @media only screen and (max-width: 600px) {
      margin: 10px;
      margin-left: 5px;
      margin-bottom: 50px;
      align-items: center;
    }
  }
  .profile-picture {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    animation-name: fade-in;
    animation-duration: 0.3s;
    @media only screen and (max-width: 600px) {
      max-width: 150px;
      max-height: 150px;
    }
  }
  .pp-border {
    position: absolute;
    height: 230px;
    top: -10px;
    margin: 0 auto;
    transform: translateX(6px);
    animation-name: fade-in;
    animation-duration: 0.3s;
    @media only screen and (max-width: 600px) {
      top: 0;
      height: 180px;
      transform: translateY(-10px);
    }
  }

  .loadingPage{
    margin-top: 30px;
  }

  .content{
    animation-name: fade-in;
    animation-duration: 0.5s;
  }
</style>