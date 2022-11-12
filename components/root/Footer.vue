<template>
  <div class="container">
    <div class="top-container">
      <div class="left-cont">
        <div class="header">
          <div class="logo" />
          <div class="title">
            Wisokto 2020
          </div>
        </div>
        <div class="motto">
          Small Steps, Everlasting Moves
        </div>
        <div class="copyright">
          © 2020 Perayaan Wisuda Oktober 2020
        </div>
      </div>
      <div class="right-cont">
        <div class="title">
          Find Us on Social Media
        </div>
        <div class="link">
          <span class="link-container">
            <a class="link-item twitter" target="_blank" href="https://twitter.com/paradewisudaitb?s=20"><fa :icon="['fab', 'twitter']" /></a>
          </span>
          <span class="link-container">
            <a class="link-item container-instagram" target="_blank" href="https://www.instagram.com/paradewisudaitb/"><fa class="instagram" :icon="['fab', 'instagram']" /></a>
          </span>
          <span class="link-container">
            <a class="link-item youtube" target="_blank" href="https://www.youtube.com/channel/UCPWflerCf3yT4eItbxg7xJA"><fa :icon="['fab', 'youtube']" /></a>
          </span>
          <span class="link-container">
            <a class="link-item facebook" target="_blank" href="https://www.facebook.com/Perayaan-Wisuda-Oktober-ITB-2020-101040871733321"><fa :icon="['fab', 'facebook']" /></a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  components: {
  }
}
</script>

<style lang="scss" scoped>
$footer-color: #1a397d;
.mt-2 {
  margin-top: 7px;
}
.container {
  margin-top: 50px;
  bottom: 0;
  width: 100%;
  background-color: $footer-color;
  padding: 15px 10vw;
  font-family: 'Poppins', sans-serif;

  .top-container {
    display: flex;
    justify-content: space-between;

    .left-cont {
      margin-bottom: auto;

      .header {
        display: flex;

        .logo {
          width: 40px;
          height: 40px;
          background-image: url("/img/logo.png");
          background-size: cover;
        }

        .title {
          margin: auto 0;
          margin-left: 15px;
          font-size: 25px;
          font-family: 'Because We Connect';
          letter-spacing: 2px;
        }
      }

      .motto {
        font-weight: 300;
        margin-top: 10px;
        @extend .mt-2;
      }

      .copyright {
      @extend .mt-2;
      margin-top: 10px;
      font-weight: 300;
      font-size: 12px;
      color: white;
  }
    }

    .right-cont {
      margin: auto 0;
      font-size: 1.1rem;

      .title{
        font-weight: 600;
      }

      .link {
        margin-top: 10px;

        .link-item {
          color: white;
          cursor: pointer;
          font-size: 1.5rem;
          transition: color 0.3s;
          display: flex;
        }

        .twitter{
          &:hover{
            color: #1DA1F2;
          }
        }

        .youtube{
          &:hover{
            color: #FF0000;
          }
        }

        .facebook{
          &:hover{
            color: #4267B2;
          }
        }
      }
    }
  }
}

.link-container{
  width: 23px;
  height: 21px;
  margin-right: 20px;
  display: inline-block;
  transition: all 0.3s ease-in-out;
}

.container-instagram{
  background: $footer-color;
  position: relative;
  &::before {
    background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);
    opacity: 0;
    position:absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 6px; 
    padding: 0;
    z-index: -1;
  }
  &:hover::before{
    opacity:1;
    z-index:1;
  }
}

.instagram{
  margin: 0 auto;
  z-index: 2;
}

@media only screen and (max-width:600px){
  .mlr-auto{
    margin-left: auto;
    margin-right: auto;
  }

  .container{
    display: flex;
    flex-direction: column;

    .top-container{
      display: flex;
      flex-direction: column;

      .left-cont {
        @extend .mlr-auto;
        .header{
          justify-content: center;
          padding-left: 5px;
          padding-right: 5px;
        }
      }
      .right-cont{
        @extend .mlr-auto;
        margin-top: 10px;

        .link{
          display: flex;
          justify-content: space-evenly;
        }
      }
    }

    .copyright{
      @extend .mlr-auto;
    }
  }
}
</style>
