<template>
  <div class="page-container">
    <div class="title">
      Video Perform HMJ
    </div>
    <div v-show="loadingCard">
      <Loading />
    </div>
    <!-- <BarChart /> -->
    <div v-show="!loadingCard" class="video-container">
      <div v-for="(HMJ, idx) in HMJArr" :key="idx" class="hmj-content">
        <div v-if="HMJ.link != '-'">
          <video-card
            :detail="HMJ"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoCard from '~/components/VideoCard'
// import BarChart from '~/components/BarChart.vue'
import axios from 'axios'
export default {
  components:{
    VideoCard,
    // BarChart
  },
  data(){
    return {
      HMJArr: [],
      loadingCard: true
    }
  },
  async mounted(){
    this.loadingCard = true
    const vidRef = this.$fireStore.collection('video')
    // const ytRef = this.$fireStore.collection('youtube')
    // let api = await this.getDataFromCollection(ytRef)
    let tempHMJArr = await this.getDataFromCollection(vidRef)
    tempHMJArr = tempHMJArr.filter(hmj => {
      return hmj.link != "-" && hmj.id != "imk"
    })
    // Fetch hmj data + video likes
    tempHMJArr.forEach(async hmj => {
      let hmjRef = hmj.himpunan
      let data_hmj
      await hmjRef.get().then((doc) => {
        data_hmj = doc.data()
      })
      let video
      if (hmj.link.includes("youtu.be")){
        const url_parse = hmj.link.split("/")
        video = url_parse[url_parse.length-1]
      }
      else{
        const url_parse = hmj.link.match('[\\?&]v=([^&#]*)')
        video = (url_parse === null) ? hmj.link : url_parse[1]
      }
      const resp = await axios.get(
        // 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id='+video+'&key='+api[0].api
        'https://www.googleapis.com/youtube/v3/videos?part=statistics&id='+video+'&key='+process.env.youtubeApiKey
      )
      hmj.likes = resp.data.items[0].statistics.likeCount
      hmj.nama = data_hmj.nama
      hmj.logo = data_hmj.image
      this.HMJArr.push(hmj)
    })
    this.loadingCard = false
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
    }
  }
}
</script>


<style lang="scss" scoped>
  .title{
    font-size: 180%;
    text-align: center;
    margin-bottom: 40px;
    font-family: 'Because We Connect';
    letter-spacing: 3px
  }

  .video-container{
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .hmj-content{
    width: 18%;
    margin: 0 3%;
    margin-bottom: 20px;
  }

  @media only screen and (max-width: 700px) {
    .hmj-content{
      width: 30%;
    }
  }

  @media only screen and (max-width: 500px) {
    .hmj-content{
      width: 60%;
      margin: 0 3%;
      margin-bottom: 20px;
    }
  }
</style>

