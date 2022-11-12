<template>
  <div>
    <div class="chart-container">
      <Bar v-for="(hmj, idx) in computed_datachart" :key="hmj.logo" :hmj="hmj" :height="chart_percentage[idx]" :max-height="200" />
    </div>
  </div>
</template>

<script>
import Bar from '~/components/Bar.vue'
  export default {
    name: 'BarChart',
    components: {
      Bar,
    },
    data() {
      return {
        data_chart: [],
        chart_percentage: [],
        computed_datachart: []
      }
    },
    async mounted () {
      await this.prepareChartData()
      this.updatePercentage()
      setInterval(() => {
        this.randomizeLikes()
      }, 2000)
    },
    methods: {
      async prepareChartData() {
        const vidRef = this.$fireStore.collection('video')
        let data_video = await this.getDataFromCollection(vidRef)
        data_video.forEach(async hmj => {
          let hmjRef = hmj.himpunan
          let video = hmj.link
          let data_hmj
          await hmjRef.get().then((doc) => {
            data_hmj = doc.data()
          })
          let data_charthmj = {
            video,
            nama: data_hmj.nama,
            logo: data_hmj.image,
            likes: 0
          }
          this.data_chart.push(data_charthmj)
        })
      },
      async getVideoLikes(video){
        let html = await this.$axios.$get('/api/')
        console.log(video)
        console.log(html)
      },
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
      randomizeLikes(){
        this.data_chart.forEach(data => {
          data.likes = Math.round(Math.random()*1000)
        })
        this.updatePercentage()
      },
      updatePercentage(){
        let temp_computed_datachart = [...this.data_chart].sort((a,b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0)).slice(0, 3)
        this.chart_percentage = []
        this.computed_datachart = []
        let maxLikes = -1
        let minLikes = 100000
        temp_computed_datachart.forEach(data => {
          if (data.likes > maxLikes) { maxLikes = data.likes }
          if (data.likes < minLikes) { minLikes = data.likes }
        })
        temp_computed_datachart.forEach((data, idx) => {
          let percentage = ((data.likes - minLikes) / (maxLikes - minLikes))*100
          percentage = (0.75*percentage) + 25
          if (idx != 2){
            this.chart_percentage.push(percentage)
            this.computed_datachart.push(data)
          } else {
            this.chart_percentage.unshift(percentage)
            this.computed_datachart.unshift(data)
          }

        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chart-container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin: 20px;
    height: 250px;
  }
</style>