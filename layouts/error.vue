<template>
  <div class="container">
    <div class="text">
      Page Not Found
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text{
  text-align: center;
  font-family: 'Because We Connect';
  font-size: 300%;
  letter-spacing: 2px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media only screen and (max-width: 600px) {
    font-size: 200%;
  }
}

.container{
  display: flex;
  margin: auto;
  max-width: 75%;
	font-size: 20px;
	font-weight: 300;
	overflow: hidden;
}
</style>
