<template>
  <div class="faculty-name" @click="clicked()">
    <span>{{ faculty.toUpperCase() }}</span>
  </div>
</template>

<script>
export default { 
  props: {
    faculty: {
      type: String,
      required: true
    }
  },
  methods:{
    clicked(){
      this.$emit('facultyClicked', this.faculty)
    },
  }
}
</script>

<style lang="scss" scoped>
  .faculty-name {
    font-family: 'Because We Connect';
    letter-spacing: 2px;
    width: 100%;
    display: flex;
    background-color: #3CB2BA;
    box-shadow: 0px 0px 15px -5px #6199ff;
    border-radius: 50px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
    animation-name: fade-in;
    animation-duration: 0.3s;
    &:hover {
      background-color: #FEC030;
    }
  }

  span {
    padding: 8px 0;
    margin: auto;
    font-size: 120%;
  }

    @media only screen and (max-width: 900px) {
    .faculty-name {
      font-size: 80%;
    }
  }

</style>

