<template>
  <div class="popupSell">
    <p class="popup" @click="bollPopup = !bollPopup"></p>
    <div class="content">asdsad</div>
  </div>
</template>

<script>
export default {
  name: "popupSell",
  data() {
    return {
      bollPopup: true,
    };
  },
};
</script>

<style scoped lang="less">
.popupSell {
  .popup {
    color: #fff;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 11;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 12;
    color: #fff;
    width: 90%;
    background: linear-gradient(230.9deg, #434757 1.31%, #292b34 99.34%);
    border-radius: 20px;
    width: 900px;
    height: 580px;
  }
}
</style>
