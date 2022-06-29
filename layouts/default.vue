<template>
  <div>
    <Loading />
    <Nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less">
* {
  padding: 0px;
  margin: 0px;
}
ul,
li {
  list-style: none;
  margin: 0px;
  padding: 0px;
}
p {
  padding: 0px;
  margin: 0px;
}
html,
body {
  background: url("~/assets/back/back.png") no-repeat;
  width: 100%;
  background-size: 100% 100%;
  background-position: center bottom;
  background-attachment: fixed;
  position: relative;
  height: 100vh;
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

@media (min-width: 1440px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1900px) {
  .container {
    max-width: 1500px;
  }
}
@media (min-width: 2000px) {
  .container {
    max-width: 1920px;
  }
}
</style>
