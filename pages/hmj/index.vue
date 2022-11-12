<template>
  <div>
    <div class="page-container">
      <div class="title">
        Himpunan Mahasiswa
      </div>
      <div v-if="loading" class="faculty-container loading-card">
        <Loading />
      </div>
      <div v-else class="faculty-container">
        <div v-for="(faculty, idx) in facultyData" :key="idx" class="faculty-content">
          <FacultyName
            :id="faculty"
            :faculty="faculty"
            @facultyClicked="selectFaculty($event)"
          />
        </div>
      </div>

      <div v-if="loading">
        <loading class="loading-dropdown" />
      </div>
      <div v-else class="dropdown">
        <select :value="selectedFaculty" name="HMJ" class="select" @change="selectFaculty($event.target.value)">
          <option value="" disabled selected>
            Pilih Fakultas
          </option>
          <option v-for="(faculty, idx) in facultyData" :key="idx" :value="faculty">
            {{ faculty.toUpperCase() }}
          </option>
        </select>
      </div>

      <div v-if="loadingCard" class="card-container">
        <Loading class="loading-card" />
      </div>
      <div v-else class="card-container">
        <div v-for="(HMJ, idx) in HMJArr" :key="idx" class="hmj-content">
          <HMJCard 
            :detail="HMJ"
            @HMJClicked="selectHMJ($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FacultyName from '~/components/FacultyName'
import HMJCard from '~/components/HMJCard'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    FacultyName,
    HMJCard,
  },
  data(){
    return {
      facultyData: [
        "fitb", "fmipa", "fsrd", "fti", "ftmd", "ftsl", "fttm", "sappk", "sbm", "sf", "sith", "stei"
      ],
      selectedHMJ: '',
      HMJArr:[],
      loadingCard: false,
    }
  },
  computed: {
     ...mapGetters({selectedFaculty: 'fakultas/getFaculty'}),
  },
  watch:{
    selectedFaculty(newFaculty, oldFaculty){
      if(oldFaculty){
        document.getElementById(oldFaculty).classList.remove('faculty-selected')
      }
      document.getElementById(newFaculty).classList.add('faculty-selected')
    }
  },
  mounted(){
    if(this.selectedFaculty){
      document.getElementById(this.selectedFaculty).classList.add('faculty-selected')
      document.getElementById(this.selectedFaculty).click()
    }
  },
  methods:{
     ...mapActions({
        setFaculty : "fakultas/setFaculty"
    }),
    async selectFaculty(eventData){
      this.loadingCard = true
      if(this.selectedFaculty !== eventData){
        this.setFaculty(eventData)
      }
      const HMJOfFaculty = this.$fireStore.collection('fakultas').doc(eventData).collection('hmj')
      this.HMJArr = await this.getDataFromCollection(HMJOfFaculty)
      this.loadingCard = false
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
    async selectHMJ(HMJData){
      HMJData.faculty = this.selectedFaculty
      this.$router.push({
        path:`/hmj/detail/`,
        query: {
          faculty: HMJData.faculty,
          hmj: HMJData.id
        }
      })
    }
  },
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
  .faculty-container {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 35px;
	justify-content: center;
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .faculty-content {
    width: 12%;
    margin: 10px 2%; 
  }
  .hmj-content {
    width: 20%;
    margin: 50px 4%;
  }
  select {
    border-radius: 50px;
    border: none;
    margin-left: 50%;
    transform: translateX(-50%);
    background-color: #FEC030;
    box-shadow: 0px 0px 15px -5px #ffae5b;
    color: white;
    font-family: 'Because We Connect';
    letter-spacing: 3px;
    width: 80%;
    font-size: 20px;
    font-weight: 300;
    padding: 5px;
    padding-left: 20px; 
    margin-bottom: 50px;
    display: none;

    &:focus{
      outline: none;
    }
  }
  option {
    background-color: white;
    color: black;
    font-size: 50%;
    font-weight: 300;
    line-height: 3px;
  }
  .loading-dropdown{
    display: none;
  }
  .faculty-selected {
    background-color: #FEC030;
  }
  .dropdown{
    animation-name: fade-in;
    animation-duration: 0.3s;
  }
  .loading-card{
    margin-top: 40px;
    margin-bottom: 80vh;
  }
  @media only screen and (max-width: 1000px) {
    .hmj-content {
      width: 30%;
      margin: 40px 4%;
    }
  }

  @media only screen and (max-width: 800px) {
    .faculty-content {
      width: 15%;
    }
    .hmj-content {
      width: 40%;
    }
  }

  @media only screen and (max-width: 600px) {
    .hmj-content {
      width: 60%;
    }
    .faculty-container {
      display: none;
    }
    select {
      display: block;
    }
    .loading-dropdown{
      display: block;
    }
  }

</style>
