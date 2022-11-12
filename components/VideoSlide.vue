<template>
  <div class="slide-container">
    <fa v-if="showArrow" class="player-arrow" :icon="['fas', 'chevron-left']" @click="switchVideo(-1)" />
    <div class="video-wrapper">
      <div v-if="loading" class="loading-wrapper">
        <Loading />
      </div>
      <youtube :resize-delay="0" :resize="true" :fit-parent="true" :player-vars="playerVars" :video-id="videoId" @ended="switchVideo(1)" @ready="onPlayerReady" />
    </div>
    <fa v-if="showArrow" class="player-arrow" :icon="['fas', 'chevron-right']" @click="switchVideo(1)" />
  </div>
</template>

<script>
import { Youtube } from 'vue-youtube'
import loading from '~/components/Loading.vue'

export default {
  name: 'VideoSlide',
  components: {
    Youtube,
    loading
  },
  data() {
    return {
      videoId: 'UmROZkrcZDs',
      videoList: ['W84Dr80pKKI', 'UmROZkrcZDs'],
      playerVars: {
        autoplay: 0,
        rel: 0
      },
      loading: true
    }
  },
  computed: {
    showArrow() {
      return this.videoList.length > 1
    }
  },
  methods: {
    switchVideo(n) {
      let now_playing = this.videoList.findIndex(x => x === this.videoId)
      let playlist_len = this.videoList.length
      if (now_playing+n === -1) {
        now_playing+=playlist_len
      }
      this.videoId = this.videoList[(now_playing+n) % playlist_len]
    },
    onPlayerReady() {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .slide-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading-wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    height: inherit;
  }

  .video-wrapper {
    width: 640px;
    height: 360px;
    @media only screen and (max-width: 800px) {
      width: 560px;
      height: 315px;
    }
    @media only screen and (max-width: 600px) {
      width: 320px;
      height: 180px;
    }
    @media only screen and (max-width: 450px) {
      width: 240px;
      height: 135px;
    }
  }

  .player-arrow {
    width: 100px;
    height: 100px;
    padding: 0 10px;
    margin: 0 1%;
    @media only screen and (max-width: 800px) {
      width: 85px;
      height: 85px;
    }
    @media only screen and (max-width: 600px) {
      width: 70px;
      height: 70px;
    }
    @media only screen and (max-width: 450px) {
      width: 60px;
      height: 60px;
    }
    &:hover {
      cursor: pointer;
    }
  }
</style>
