<template>
  <div class="alert" :class="[status]">
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'Alert',
    props: {
      status: {
        type: String,
        default: "success"
      },
      message: {
        type: String,
        default: ""
      }
    },
  }
</script>

<style lang="scss" scoped>
  .alert {
    width: 50%;
    min-height: 50px;
    color: black;
    padding: 20px;
    font-size: 16px;
    border-radius: 50px;
    background-color: white;
    box-shadow: 0px 0px 35px -15px white;
    animation-name: fade-in;
    animation-duration: 0.3s;
    @media only screen and (max-width: 1000px) {
      width: 70%;
    }
    @media only screen and (max-width: 600px) {
      width: 80%;
      font-size: 13px;
    }
  }
  .success {
    background-color: greenyellow;
    box-shadow: 0px 0px 35px -10px greenyellow;
  }
  .error {
    background-color: red;
    color: white;
    font-weight: 400;
    box-shadow: 0px 0px 35px -10px red;
  }
</style>