<template>
  <div v-if="show" class="next-event">
    <div class="next-event-header">
      Next Event:
    </div>
    <div class="next-event-card">
      <div v-if="loading">
        <Loading />
      </div>
      <div v-else-if="noImg" class="next-event-noimg">
        Stay tuned terus untuk info selanjutnya, ya!
      </div>
      <div v-else>
        <img :src="imgSrc" @error="noImg = true">
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '~/components/Loading'

export default {
  name: 'NextEventBanner',
  components: {
    Loading
  },
  data: () => ({
    imgSrc: '',
    loading: true,
    noImg: false,
    show: false
  }),
  async mounted() {
    const docId = 'eventInfo'
    const doc = await this.$fireStore.collection('event').doc(docId).get()

    if(doc.exists) {
      this.imgSrc = doc.data().image
      this.show = doc.data().show
    } else {
      this.noImg = true
    }

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
  .next-event {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 60px;
    padding: 10px 0;
    font-family: 'Because We Connect';
    font-size: 30px;

    @media only screen and (max-width: 600px) {
      margin-top: 50px;
      font-size: 20px;
    }

    .next-event-header {
      text-align: center;
      margin-bottom: 25px;
      font-size: 1.4em;
    }

    .next-event-card {
      width: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #00A5BB;
      border-radius: 40px;
      padding: 30px;
      box-shadow: 0px 0px 15px -5px #6199ff;

      @media only screen and (max-width: 1000px) {
        width: 45%;
        padding: 20px;
        border-radius: 30px;
      }

      @media only screen and (max-width: 600px) {
        width: 50%;
        padding: 15px;
        border-radius: 20px;
      }

      img {
        width: 100%;
      }

      .next-event-noimg {
        font-size: 0.8em;
        text-align: center;
      }
    }
  }
</style>
