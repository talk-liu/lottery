<!-- Please remove this file from your project -->
<template>
  <div>
    <Head />
    <div v-if="balanceNum" class="container buyBack">
      <div class="original">
        <div>
          <h3>Don't want your NFT?</h3>
          <p>
            （ Sell it back to us at 80% of its original price, or list it on
            OpenSea ）
          </p>
        </div>
        <a @click="recycleBoll = !recycleBoll" class="recycle">Bulk-recycle</a>
      </div>

      <ul v-if="nftIdAttr.length >= balanceNum || nftIdAttr.length >= 10">
        <li v-for="(val, key) in nftIdAttr" :key="key">
          <template v-if="recycleBoll">
            <img
              v-if="val.boll"
              @click="selectedEve(val)"
              class="selectedBoll"
              src="~/assets/buy-back/6.png" />
            <img
              @click="selectedEve(val)"
              v-else
              class="selectedBoll"
              src="~/assets/buy-back/7.png"
          /></template>
          <img class="portrait" :src="val.image" />
          <h4>NFT-{{ val.id }}</h4>
          <p>
            <span> Trade-in Price </span>
            <label>
              <img width="16px" src="~/assets/ico/eth.png" />{{
                val.refundPrice
              }}
              ETH
            </label>
          </p>
          <p>
            <span> Address </span>
            <label> {{ accounts[0] | userInformation }} </label>
          </p>
          <p @click="refundEve([val.id])" class="sell">
            Trade In
            <!-- <span>(20% Off The Original Price)</span> -->
          </p>
          <p class="opensea">
            <a
              target="blank"
              href="https://testnets.opensea.io/collection/nft-lottery-8sggaih0gx"
            >
              <img src="~/assets/ico/opensea.png" />Sell On Opensea
            </a>
          </p>
        </li>
      </ul>
      <div v-else style="text-align: center; padding: 30px 0px">
        <a-spin size="large" />
      </div>
    </div>
    <div v-else class="nothing">
      <img src="~/assets/ico/box.png" />
      <p>
        <!-- <img src="~/assets/ico/font1.png" /> -->
        Opps, You don't have NFTs.
        <br />
        No doubt in join.
      </p>
    </div>
    <div v-show="recycleBoll" class="selected">
      <ul class="container">
        <li>
          <strong @click="selectedEve('all')">
            <img v-if="selectedAllBoll" src="~/assets/buy-back/8.png" />
            <img v-else src="~/assets/buy-back/5.png" />Selected all</strong
          >
          <span>Selected {{ selectedAttr.length }}</span>
        </li>
        <li class="recycling" @click="recyclingEve">Confirm Recycling</li>
      </ul>
    </div>
  </div>
</template>

<script>
import minxins from "@/common/minxins/mint.js";
import { notification } from "ant-design-vue";
export default {
  name: "IndexPage",
  mixins: [minxins],
  data() {
    return {
      recycleBoll: false,
      selectedAllBoll: false,
      selectedAttr: [],
    };
  },
  async mounted() {},
  methods: {
    async refundEve(attr) {
      const refunds = this.contract.methods.refund;
      console.log(attr);
      const gas = await this.estimateGas(refunds(attr));
      refunds(attr)
        .send({
          from: this.accounts[0],
          gas: gas,
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          console.log(confirmationNumber, receipt);
        })
        .then((result) => {
          console.log(result);
          notification.success({
            message: "MetaMask",
            description: "NFT is sold!",
          });
          this.init();
        })
        .catch((reason) => {
          notification.error({
            message: "MetaMask",
            description:
              "NFT failed to sell. Please try again. / Failed transaction. Please try again.",
          });
          console.log(reason);
        });
    },
    selectedEve(value) {
      if (value === "all") {
        this.selectedAllBoll = !this.selectedAllBoll;
        for (let i in this.nftIdAttr) {
          this.nftIdAttr[i].boll = this.selectedAllBoll;
        }
      } else {
        value.boll = !value.boll;
      }
      this.selectedAttr = [];
      for (let i in this.nftIdAttr) {
        if (this.nftIdAttr[i].boll) {
          this.selectedAttr.push(this.nftIdAttr[i].id);
        }
      }
    },
    recyclingEve() {
      if (this.selectedAttr.length) {
        this.refundEve(this.selectedAttr);
      } else {
        notification.error({
          message: "Error",
          description: "Please select",
        });
      }
    },
  },
};
</script>
<style scoped lang="less">
.nothing {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  p {
    font-size: 35px;
    color: #c1c1c1;
  }
}
.buyBack {
  margin: auto;
  overflow: hidden;
  padding-bottom: 100px;
  .original {
    text-align: center;
    margin-top: 10px;
    overflow: hidden;
    position: relative;
    div {
      display: inline-block;
      font-size: 16px;
      color: #fff;
      h3 {
        color: #fff;
        font-size: 24px;
      }
    }
  }
  .recycle {
    background: linear-gradient(272.38deg, #0297ff -37.07%, #42d2ff 94.42%);
    width: 115px;
    height: 44px;
    font-size: 16px;
    color: #fff;
    line-height: 44px;
    text-align: center;
    border-radius: 10px;
    margin: 27px 0px;
    position: absolute;
    right: 0px;
  }
  ul {
    display: grid;
    // grid-gap: 17px;
    grid-template-columns: repeat(5, 1fr);
    li {
      background: url("~/assets/buy-back/1.png") no-repeat;
      background-size: 100% 100%;
      padding: 42px 53px 67px 53px;
      position: relative;
      .portrait {
        width: 100%;
        border-radius: 10px;
        min-height: 200px;
      }
      .selectedBoll {
        position: absolute;
        left: 7%;
        top: 5%;
        cursor: pointer;
      }
      h4 {
        font-size: 18px;
        color: #fff;
        margin-top: 10px;
        margin-bottom: 0px;
      }
      p {
        color: #5b5b5b;
        display: flex;
        justify-content: space-between;
        align-items: center;
        label {
          color: #fff;
          img {
            margin-right: 5px;
            margin-top: -3px;
          }
        }
      }
      .sell {
        background: url("~/assets/buy-back/2.png") no-repeat;
        background-size: 100% 100%;
        height: 45px;
        line-height: 45px;
        text-align: center;
        display: block;
        color: #fff;
        margin-top: 20px;
        font-size: 16px;
        cursor: pointer;
      }
      .opensea {
        cursor: pointer;
        display: block;
        text-align: center;
        background: url("~/assets/buy-back/3.png") no-repeat;
        background-size: 100% 100%;
        height: 45px;
        line-height: 45px;
        color: #fff;
        font-size: 16px;
        margin-top: 4px;
        img {
          margin-right: 10px;
        }
        a {
          color: #fff;
        }
      }
    }
  }
}
.selected {
  position: fixed;
  color: #fff;
  bottom: 0px;
  width: 100%;
  background: #242424;
  height: 100px;
  line-height: 100px;
  ul {
    // max-width: 1920px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    strong {
      font-size: 24px;
      cursor: pointer;
      img {
        margin-right: 16px;
      }
    }
    span {
      font-size: 18px;
      margin-left: 36px;
    }
    .recycling {
      background: url("~/assets/buy-back/10.png") no-repeat;
      background-size: 100% 100%;
      width: 300px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      font-size: 16px;
    }
  }
}
@media only screen and (max-width: 1800px) {
  .buyBack {
    ul {
      margin-top: 40px;
      display: grid;
      // grid-gap: 17px;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
