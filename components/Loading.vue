<template>
  <div v-if="loading" class="loading-page">
    <div class="loading-text">LOADING...</div>
  </div>
</template>

<script>
export default {
  created() {
  },
  mounted() {
    this.loading = false;
  },
  data: () => ({
    loading: true,
  }),
};
</script>

<style lang="less">
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
.loading-page {
  
  color: #333;
  background: #fff;
  position: fixed;
  text-align: center;
  z-index: 500;
  overflow: hidden;
  min-height: 100vh;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  // padding-top: 25vh;

  .loading-logo {
    width: 500px;
    animation: rotation 2s infinite;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    margin: auto;
  }
  .loading-text {
    font-size: 32px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    margin: auto;
    width: 300px;
    height: 44px;
  }
}
</style>