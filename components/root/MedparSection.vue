<template>
  <div class="medpar-section">
    <div class="title">
      Media Partner:
    </div>
    <div class="medpar-container">
      <Medpar v-for="medpar in largeMedpar" :key="medpar.id" :medpar="medpar" />
    </div>
    <div class="medpar-container">
      <Medpar v-for="medpar in middleMedpar" :key="medpar.id" :medpar="medpar" />
    </div>
    <div class="medpar-container">
      <Medpar v-for="medpar in smallMedpar" :key="medpar.id" :medpar="medpar" />
    </div>
  </div>
</template>

<script>
import Medpar from '~/components/root/Medpar.vue'
import medpar_data from '~/assets/medpar.json'
  export default {
    name: 'MedparSection',
    components: {
      Medpar,
    },
    data () {
      return {
        MedparData: []
      }
    },
    computed: {
      largeMedpar () {
        return this.MedparData.filter(medpar => medpar.medparType === 'large')
      },
      middleMedpar () {
        return this.MedparData.filter(medpar => medpar.medparType === 'middle')
      },
      smallMedpar () {
        return this.MedparData.filter(medpar => medpar.medparType === 'small')
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData() {
        let i = 0
        Object.values(medpar_data).forEach(medpar => {
          medpar.id = i
          this.MedparData.push(medpar)
          i++
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .medpar-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .title {
    font-family: 'Because We Connect';
    font-size: 40px;
    margin-top: 5%;
    margin-left: 15%;
    margin-bottom: 2%;
    @media only screen and (max-width: 600px) {
      font-size: 25px;
      margin: 15px 10% 0 40px;
      font-weight: 500;
    }
  }
  .medpar-container {
    display: flex;
    justify-content: center;
    margin: 2% 12%;
    flex-wrap: wrap;
  }
</style>