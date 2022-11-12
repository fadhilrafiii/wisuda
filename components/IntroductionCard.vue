<template>
  <div class="introduction-box">
    <img class="penyu" src="/img/penyu.png" alt="penyu">
    <div class="ubur-ubur">
      <img class="ubur1" src="/img/ubur2.png" alt="ubur-ubur">
      <img class="ubur2" src="/img/ubur2.png" alt="ubur-ubur">
    </div>
    <h1>Apa itu Parade Wisuda Oktober?</h1>
    <p>
      Sebuah wadah apresiasi bagi wisudawan yang telah berhasil menerjang ganasnya badai dan topan dengan bantuan dari setiap elemen yang ada hingga akhirnya sampai pada destinasi yang dituju. Akhir yang merupakan awal untuk melawan ombak yang tak tahu kedepannya akan lebih keras seperti apa. Dikemas oleh berbagai macam acara menarik dari kami windsurfers yang masih terus mengembangkan layar di dalam kampus ITB! <br><br>
      Layaknya kapal yang tak akan berjalan jika kehilangan satu bagian, begitu pula Wisokto 2020 ini, we may have all come on different ships, but we're in the same boat now!
    </p>
  </div>
</template>

<script>
export default {
  name: 'IntroductionCard'
}
</script>

<style lang="scss" scoped>
  .introduction-box {
    position: relative;
    border: 5px solid #ffffff;
    border-radius: 15px;
    padding: 75px;
    padding-top: 50px;
    margin: 75px 25%;
    @media only screen and (max-width: 1000px) {
      margin: 75px 20%;
      padding: 35px;
    }
    @media only screen and (max-width: 600px) {
      margin: 50px 15%;
      padding: 25px;
      border: 2px solid #ffffff;
    }
    .penyu {
      position: absolute;
      width: 18%;
      transform: rotate(60deg);
      top: -35px;
      left: -10%;
      @media only screen and (max-width: 600px) {
        top: -15px;
      }
    }
    .ubur-ubur {
      position: absolute;
      width: 80px;
      height: 120px;
      bottom: -40px;
      right: -40px;
      @media only screen and (max-width: 1000px) {
        width: 65px;
        height: 105px;
      }
      @media only screen and (max-width: 600px) {
        width: 45px;
        height: 85px;
        right: -25px;
        bottom: -30px;
      }
      .ubur1 {
        position: absolute;
        max-width: 120%;
        max-height: 120%;
        bottom: -20%;
        left: -75%;
      }
      .ubur2 {
        position: absolute;
        max-width: 70%;
        max-height: 70%;
        right: -25%;
        transform: matrix(-1, 0, 0, 1, 0, 0);
      }
    }
    h1 {
      text-align: center;
      font-size: 35px;
      font-family: 'Because We Connect';
      margin-bottom: 40px;
      @media only screen and (max-width: 600px) {
        font-size: 25px;
      }
    }
    p {
      text-align: justify;
      margin: 0 auto;
      font-size: 20px;
      @media only screen and (max-width: 1000px) {
        font-size: 15px;
      }
      @media only screen and (max-width: 800px) {
        font-size: 13px;
      }
      @media only screen and (max-width: 600px) {
        font-size: 12px;
      }
    }
  }
</style>