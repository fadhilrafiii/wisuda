<template>
  <div>
    <div class="navbar-wrapper">
      <div class="fixed">
        <div class="brand">
          <div class="logo" />
          <div class="title" @click="collapse()">
            <nuxt-link to="/">
              WISOKTO 2020
            </nuxt-link>
          </div>
        </div>
        <div class="toggle-button-wrapper">
          <div class="toggle-button" @click.prevent="toggleExpand()">
            <fa :icon="['fas', 'bars']" :class="{'toggle-icon': true, 'flip': isExpanded}" />
          </div>
        </div>
      </div>
      <div id="linklistWrapper" :class="{'linklist-wrapper': true, 'show-links': isExpanded }">
        <div class="linklist">
          <div class="liner" />
          <div v-for="(text, to) in links" :key="to" @click="collapse()">
            <nuxt-link :to="to" class="link">
              {{ text }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div
      id="navbarOverlay"
      :class="{'navbar-overlay': true, 'navbar-overlay-show': isExpanded}"
      @transitionstart="isAnimating = true"
      @transitionend="isAnimating = false"
      @click.prevent="collapse()"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      links: {
        '/': 'Home',
        '/about/': 'Tentang Kami',
        '/hmj/': 'Galeri HMJ',
        '/video/': 'Video Perform'
      },
      isExpanded: false,
      isAnimating: false
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      // Layout & style fix

      document.getElementById('linklistWrapper').classList.add('no-transition')
      setTimeout(() => {
        document.getElementById('linklistWrapper').classList.remove('no-transition')
      }, 1)

      const overlayStyle = window.getComputedStyle(document.getElementById('navbarOverlay'))

      if (overlayStyle.display !== 'none' && overlayStyle.visibility === 'visible') {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    })
  },
  methods: {
    toggleExpand (value) {
      if (!this.isAnimating) {
        if (value !== undefined) {
          this.isExpanded = !!value
        } else {
          this.isExpanded = !this.isExpanded
        }

        if (this.isExpanded) {
          document.body.classList.add('overflow-hidden')
        } else {
          document.body.classList.remove('overflow-hidden')
        }
      }
    },
    collapse () {
      this.toggleExpand(false)
    }
  }
}
</script>

<style lang="scss" scoped>
$header-color: #1a397d;
$transition-duration: 0.4s;
$transition-timing: ease-in-out;
$fixed-height: 55px;

.navbar-wrapper {
  position: fixed;
  display: flex;
  width: 100vw;
  z-index: 999;

  .fixed {
    display: flex;
    height: $fixed-height;

    .brand {
      display: flex;
      margin : 10px 0; 
      margin-left: 40px;

      .logo {
        width: 35px;
        height: 35px;
        background-image: url("/img/logo.png");
        background-size: cover;
      }

      .title {  
        margin: 0 15px;
        display: flex;
        align-items: center;

        a {
          letter-spacing: 1px;
          font-size: 24px;
          font-family: 'Because We Connect';
          text-decoration: none;
          color: white;
        }
      }
    }
  }

  .linklist-wrapper {
    position: absolute;
    top: 0;
    width: 100vw;
    height: $fixed-height;
    z-index: -1;
    display: block;
    padding: 0 50px 0 0;
    background: $header-color;
    box-shadow: 0px 0px 7px 0.5px black;

    .linklist {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      height: 100%;

      .link {
        font-size: 16px;
        margin-left: 40px;
        text-decoration: none;
        color: white;
      }
    }
  }

  .toggle-button-wrapper {
    display: none;
  }
}

.navbar-overlay {
  display: none;
}

@media only screen and (max-width: 920px) {
  .navbar-wrapper {
    flex-direction: column;

    .fixed {
      background: $header-color;

      .brand { margin-left: 20px; }
    }

    .toggle-button-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-grow: 1;

      .toggle-button {
        display: flex;
        align-items: center;
        padding: 0 20px;
        height: 100%;

        .toggle-icon {
          font-size: 20px;
          cursor: pointer;
          transition: transform $transition-duration $transition-timing;
        }
        .toggle-icon.flip {
          transform: rotate(-180deg);
        }
      }
    }

    .linklist-wrapper {
      height: initial;
      max-height: calc(100vh - #{$fixed-height});
      overflow: auto;
      padding: 0 0 15px 0;
      margin-top: -1px;
      transform: translateY(calc(-100% + #{$fixed-height}));
      transition: transform $transition-duration $transition-timing;

      .linklist {
        flex-direction: column;
        visibility: hidden;
        opacity: 0;
        transition: all $transition-duration $transition-timing;

        .liner {
          border-top: 2px solid #fff;
          width: 90%;
          margin: 10px 0;
        }

        .link {
          display: flex;
          justify-content: center;
          font-size: 20px;
          padding: 10px 0;
          width: 100%;
          margin: 0;
        }
      }
    }

    .linklist-wrapper.show-links {
      transform: translateY(#{$fixed-height});

      .linklist {
        visibility: visible;
        opacity: 1;
      }
    }

    .linklist-wrapper.no-transition {
      transition: none;
      .linklist { transition: none }
    }
  }

  .navbar-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 998;
    height: 100vh;
    background-color: black;
    visibility: hidden;
    opacity: 0;
    transition-property: visibility, opacity;
    transition-duration: $transition-duration;
    transition-timing-function: $transition-timing;
  }

  .navbar-overlay.navbar-overlay-show {
    visibility: visible;
    opacity: 0.5;
  }
}

@media only screen and (max-width: 400px) {
  .navbar-wrapper .fixed {
    .brand {
      margin-left: 15px;
      
      .title { font-size: 20px; }
    }

    .toggle-button-wrapper .toggle-button {
      padding: 0 15px;
    }
  }
}
</style>
