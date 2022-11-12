<template>
  <div class="modal">
    <transition name="fade">
      <div v-if="db_loading" class="loading-container">
        <Loading class="loading" />
      </div>
    </transition>
    <fa v-if="!db_loading" class="close-button" :icon="['fas', 'times']" @click="closeModal()" />
    <div class="wisudawan-info">
      <div class="image-container">
        <img
          :src="wisudawan.image"
          alt="Foto Profil Wisudawan"
          class="profile-picture"
        >
        <img src="/img/pp-border.png" alt="pp-border" class="pp-border">
      </div>
      <div class="wisudawan-content">
        <div class="title-1">
          {{ namaSingkat }}
        </div>
        <div class="title-2">
          {{ wisudawan.id }}
        </div>
      </div>
    </div>
    <form method="post" @submit.prevent="submitPostIt()">
      <label for="dari">Dari</label>  <span :class="[dariLenStatus, {'error': is_darierror}]">{{ dariLen }}/20</span> <span v-if="is_darierror" class="error-msg">{{ darierror_msg }}</span> <br>
      <input id="dari" v-model="dari" type="text" name="dari" :maxlength="MAX_DARI" placeholder="Penggemar rahasiamu 👉👈🥺" :class="{'error': is_darierror}" @input="disableDariError()"> <br>
      <label for="pesan">Pesan</label> <span :class="[pesanLenStatus, {'error': is_pesanerror}]">{{ pesanLen }}/500</span> <span v-if="is_pesanerror" class="error-msg">{{ pesanerror_msg }}</span> <span v-if="!is_pesanerror" class="info">Shortcut emoji: <strong>Win+.</strong> atau <strong>ctrl+⌘+Space</strong></span> <br>
      <textarea id="pesan" v-model="pesan" name="pesan" cols="50" rows="6" :maxlength="MAX_PESAN" placeholder="Dear wisudawan..." :class="{'error': is_pesanerror}" wrap="" @input="disablePesanError(); checkLine()" />
      <button type="submit" class="btn-post-it">
        Kirim Pesan!
      </button>
    </form>
  </div>
</template>

<script>
import Loading from '~/components/Loading.vue'
  export default {
    name: 'WisudawanModal',
    components: {
      Loading
    },
    props: {
      wisudawan: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        dari: '',
        pesan: '',
        db_loading: false,
        darierror_msg: '',
        is_darierror: false,
        pesanerror_msg: '',
        is_pesanerror: false
      }
    },
    computed: {
      dariLen() {
        return this.dari.length 
      },
      pesanLen(){
        return this.pesan.length
      },
      dariLenStatus(){
        let stat = ''
        if (this.dariLen === this.MAX_DARI) {
          stat = 'max'
        } else if (this.dariLen >= 15) {
          stat = 'reaching-max'
        }
        return stat
      },
      pesanLenStatus(){
        let stat = ''
        if (this.pesanLen === this.MAX_PESAN) {
          stat = 'max'
        } else if (this.pesanLen >= 450) {
          stat = 'reaching-max'
        }
        return stat
      },
      namaSingkat() {
        let computed_name = this.wisudawan.nama.trim()
        // Nama disingkat apabila ada kata kepanjangan
        let nama_arr = this.wisudawan.nama.trim().split(' ')
        console.log(nama_arr)
        nama_arr.forEach((kata, idx) => {
          if (kata.length > 11) {
            nama_arr[idx] = kata[0] + "."
            console.log(nama_arr)
          }
        })
        computed_name = nama_arr.join(' ')
        // Nama disingkat apabila total kepanjangan
        if (computed_name.length > 26) {
          let nama_arr = this.wisudawan.nama.trim().split(' ')
          let i = 1
          let word
          while (nama_arr.join(' ').length > 26 && i < nama_arr.length) {
            word = nama_arr[nama_arr.length - i]
            nama_arr[nama_arr.length - i] = word[0] + "."
            i++
          }
          computed_name = nama_arr.join(' ')
        }
        return computed_name
      }
    },
    created () {
      this.MAX_DARI = 20
      this.MAX_PESAN = 500
      this.MAX_LINE = 10
    },
    methods: {
      closeModal() {
        this.$emit("closeModal")
      },
      async submitPostIt() {
        if (this.dari !== '' && this.pesan !== '') {
          this.db_loading = true
          let isSuccess = await this.addToDatabase()
          this.closeModal()
          this.$emit("postItStatus", isSuccess)
          this.db_loading = false
        } else {
          if (this.dari === '') {
            this.darierror_msg = 'Dari tidak boleh kosong!'
            this.is_darierror = true
          } 
          if (this.pesan === '') {
            this.pesanerror_msg = 'Pesan tidak boleh kosong!'
            this.is_pesanerror = true
          }
        }
      },
      disableDariError() {
        this.darierror_msg = ''
        this.is_darierror = false
      },
      disablePesanError() {
        this.pesanerror_msg = ''
        this.is_pesanerror = false
      },
      addToDatabase() {
        const new_ucapan = {
          dari: this.dari,
          read: false,
          status: 'unauthorized',
          ucapan: this.pesan
        }
        return this.$fireStore.collection('ucapan').doc(this.wisudawan.id).collection('ucapan').add({
          ...new_ucapan
        }).then(() => {
          return true
        }).catch(() => {
          return false
        })
      },
      checkLine() {
        while (this.pesan.split(/\r\n|\r|\n/).length > this.MAX_LINE) {
          this.pesan = this.pesan.slice(0, this.pesan.length - 1)
          this.pesanerror_msg = 'Maksimum 10 baris!'
          this.is_pesanerror = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    z-index: 99;
    width: 100%;
    height: 100%;
    width: 540px;
    height: 600px;
    background: #192744;
    border-radius: 20px;
    display: block;
    padding: 15px 50px;
    animation-name: fade-in;
    animation-duration: 0.3s;
    @media only screen and (max-width: 600px) {
      width: 80%;
      padding: 5px 20px;
      height: 450px;
    }
  }
  .close-button {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(30%, -30%);
    width: 40px;
    height: 40px;
    padding: 5px;
    z-index: 105;
    color: black;
    background-color: white;
    border-radius: 50px;
    transition: background-color .3s;
    &:hover {
      cursor: pointer;
      background-color: red;
    }
  }
  .wisudawan-info {
    display: flex;
    align-items: center;
  }
  .image-container {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 20px;
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
    @media only screen and (max-width: 600px) {
      top: -5px;
      height: 83px;
      transform: translateX(3px);
    }
  }
  .wisudawan-content {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    text-align: left;
    margin-left: 20px;
    letter-spacing: 2px;
    min-height: 225px;
    @media only screen and (max-width: 600px) {
      margin-left: 10px;
      min-height: 130px;
    }
  }
  .title-1 {
    font-size: 40px;
    font-weight: 400;
    text-transform: capitalize;
    @media only screen and (max-width: 600px) {
      text-align: left;
      font-size: 20px;
    }
  }
  .title-2 {
    font-size: 25px;
    text-transform: capitalize;
    @media only screen and (max-width: 600px) {
      text-align: left;
      font-size: 14px;
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
    font-size: 18px;
    bottom: 4%;
    right: 5%;
    transition: background-color 0.3s;
    &:hover {
      cursor: pointer;
      background-color: #FEC030;
    }
    @media only screen and (max-width: 600px) {
      margin-top: 0;
      font-size: 14px;
      bottom: 3%;
      right: 5%;
    }
  }
  form {
    span {
      font-size: 12px;
      float: right;
      margin-top: 10px;
      margin-right: 10px;
      color: white;
      transition: color 0.5s;
    }
    input, textarea {
      border-radius: 20px;
      border: none;
      outline: none;
      padding: 10px;
      margin-bottom: 20px;
      font-family: 'Poppins';
      font-size: 14px;
      width: 100%;
    }
    label {
      font-size: 24px;
    }
    span.error, input.error, textarea.error {
      color: red;
    }
    input.error, textarea.error {
      border: red solid 1px;
    }
    textarea::-webkit-scrollbar {
      display: none;
    }
    textarea {
      resize: none;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      white-space: pre-wrap;
    }
    .max, .error-msg {
      color: red;
      transition: color 0.2s;
      animation: shake 0.2s;
      font-weight: 500;
    }
    .reaching-max {
      color: #ffcc00;
      transition: color 0.2s;
    }
    @media only screen and (max-width: 800px) {
      span.info {
        display: none;
      }
    }
    @media only screen and (max-width: 600px) {
      label {
        font-size: 16px;
      }
      input, textarea {
        font-size: 12px;
      }
      span {
        font-size: 11px;
      }
      .error-msg {
        margin-right: 2px;
      }
    }
  }
  @keyframes shake { 
    0% { 
      transform: translateX(0px) rotate(0deg); 
    } 
    20% { 
      transform: translateX(-4px) rotate(-4deg); 
    } 
    40% { 
      transform: translateX(-2px) rotate(-2deg); 
    } 
    60% { 
      transform: translateX(4px) rotate(4deg); 
    } 
    80% { 
      transform: translateX(2px) rotate(2deg); 
    } 
    100% { 
      transform: translateX(0px) rotate(0deg); 
    }
  }
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>