<template>
  <div>
    <Header />
    <div class="content-container">
      <Nuxt />
    </div>
    <SponsorSection />
    <MedparSection />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/root/Header'
import Footer from '~/components/root/Footer'
import SponsorSection from '~/components/root/SponsorSection.vue'
import MedparSection from '~/components/root/MedparSection.vue'
export default {
  components: {
    Header,
    Footer,
    SponsorSection,
    MedparSection
  }
}
</script>

<style lang="scss" scoped>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.content-container{
  padding-top: 90px;
  height: auto;
  min-height: calc(100vh - 182px);
  @media only screen and (max-width: 600px) {
    min-height: calc(100vh - 249px);
    padding-top: 85px;
  }
}
</style>
