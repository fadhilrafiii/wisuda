<template>
  <div class="main-container">
    <div class="buttons">
      <button :class="organogram ? 'selected' : ''" @click="toggleOrg">
        Organogram
      </button>
      <button :class="organogram ? '' : 'selected'" @click="toggleVisi">
        Visi & Misi
      </button>
    </div>
    <transition name="fade">
      <div v-show="organogram">
        <div class="title">
          THIS IS US!
        </div>
        <div v-if="loading" class="main-container">
          <Loading />
        </div>
        <div v-else class="container">
          <bodCard
            v-for="people in display"
            :id="people.id"
            :key="people.bidang"
            :name="people.staff.name"
            :position="people.staff.position"
            :src="people.staff.src"
            :instagram="people.staff.instagram"
            :ketua="people.staff.ketua"
            :class="people.bidang"
            class="card"
            @previous="previous"
            @next="next"
          />
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="!organogram" class="visi-container">
        <VisiMisi />
      </div>
    </transition>
  </div>
</template>

<script>
import bodCard from '~/components/Card/bodCard'
import bod from '~/assets/bod.json'

import VisiMisi from '~/components/VisiMisi'

export default {
  components: {
    bodCard,
    VisiMisi
  },
  data () {
    return {
      bod: [],
      display: [],
      loading: true,
      organogram: true,
    }
  },
  async mounted() {
    await this.getData()
    this.loading = false
  },
  methods: {
    getData() {
      Object.values(bod).forEach(bidang => {
        // Untuk mengisi data BoD
        const people = {
          id: bidang[0].id,
          bidang: bidang[0].bidang,
          staff: bidang[0].staff,
        }
        this.bod.push(people)
        // Untuk mengisi data yang akan ditampilkan
        const display = {
          id: bidang[0].id,
          bidang: bidang[0].bidang,
          staff: bidang[0].staff[0]
        }
        this.display.push(display)
      })
    },
    previous(id) {
      let newID
      const maxID = this.bod[id].staff.length - 1
      if (this.display[id].staff.id === 0) {
        newID = maxID
      } else {
        newID = this.display[id].staff.id - 1
      }
      this.display[id].staff = this.bod[id].staff[newID]
    },
    next(id) {
      let newID
      const maxID = this.bod[id].staff.length - 1
      if (this.display[id].staff.id === maxID) {
        newID = 0
      } else {
        newID = this.display[id].staff.id + 1
      }
      this.display[id].staff = this.bod[id].staff[newID]
    },
    toggleOrg() {
      this.organogram = true
    },
    toggleVisi() {
      this.organogram = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-container {
    width:100%;
    margin: 0 auto;
  }

  .buttons {
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: center;
    
    button {
      padding: 5px 10px;
      color: white;
      border: 2px solid white;
      background: transparent;
      border-radius: 20px;
      letter-spacing: 2px;
      font-family: 'Poppins';
      transition: 0.2s ease-out;
      margin: 0 10px;
      margin-bottom: 30px;
      outline: none;
      &:hover {
        cursor: pointer;
        background-color: white;
        color: black;
      }
    }

    .selected {
      background-color: white;
      color: black;
    }
  }

  .fade-enter-active {
    transition: opacity .5s;
  }
  .fade-enter {
    opacity: 0;
  }

  .container {
    width: 90%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 3rem;
  }

  .visi-container {
    width: 87%;
    margin: auto;
  }

  .title {
    width: 100%;
    margin: auto;
    margin-bottom: 4%;
    text-align: center;
    padding: 10px;
    color: #FFFFFF;
    font-size: 50px;
    font-family: 'Because We Connect';
  }

  .card {
    width: 95%;
    height: auto;
    box-shadow: 0px 0px 15px -5px #6199ff;
    color: white;
    animation-name: fade-in;
    animation-duration: 0.3s;
  }

  .ketua {
    order: 0;
  }

  @media (max-width:1000px) {
    .ketua {
      order: -1;
    }

    .card {
      width: 100%;
    }

    .container {
      display: grid;
      width: 70%;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(9, 1fr);
    }
  }
</style>