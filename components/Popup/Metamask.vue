<template>
  <div class="popupMetamask" v-if="bollPopup">
    <p class="popup" @click="bollPopup = !bollPopup"></p>
    <div class="contentBox">
      <div class="content">
        <h3>Connect your wallet</h3>
        <p>
          <img width="76px" src="~/assets/ico/metamask-fox.svg" />
          <label> MetaMask </label>
        </p>
      </div>
      <img
        @click="bollPopup = !bollPopup"
        class="clone"
        src="~/assets/ico/clone.png"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "popupMetamask",
  data() {
    return {
      bollPopup: false,
    };
  },
};
</script>

<style scoped lang="less">
.popupMetamask {
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
  .contentBox {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 12;
    color: #fff;
    text-align: center;
    .content {
      background: linear-gradient(
          108.4deg,
          #adafae 37.46%,
          #aeddcf 87.92%,
          #afffe8 157.07%
        ),
        linear-gradient(
          107.35deg,
          rgba(199, 255, 252, 0.2) 38.1%,
          rgba(176, 255, 250, 0) 132.78%
        );
      width: 314px;
      height: 197px;
      h3 {
        color: #ffffff;
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        padding-top: 22px;
      }
      p {
        label {
          font-size: 14px;
          display: block;
          margin-top: 14px;
        }
      }
    }
    .clone {
      margin-top: 18px;
    }
    img {
      cursor: pointer;
    }
  }
}
</style>
