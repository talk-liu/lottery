<template>
  <div>
    <Head />
    <div v-if="claimNftBoll" class="container claim">
      <div>
        <ul v-if="claimNftIdAttr.length">
          <li v-for="(val, key) in claimNftIdAttr" :key="key">
            <img class="portrait" :src="val.image" />
            <h4>NFT-{{ val.id }}</h4>
            <p>
              <span> Address </span>
              <label> {{ accounts[0] | userInformation }} </label>
            </p>
            <p>
              <span> Prize </span>
              <label
                ><img width="16px" src="~/assets/ico/eth.png" />
                {{ val.jackpotAmount }} ETH</label
              >
            </p>
            <p class="opensea" @click="claimEve(val.id)">Claim</p>
          </li>
        </ul>
        <div v-else style="text-align: center; padding: 30px 0px">
          <a-spin size="large" />
        </div>
      </div>
    </div>
    <div v-else class="nothing">
      <img src="~/assets/ico/box.png" />
      <p>You have nothing to claim</p>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import minxins from "@/common/minxins/mint.js";
import { notification, message } from "ant-design-vue";
export default {
  name: "IndexPage",
  components: { Head },
  mixins: [minxins],
  data() {
    return {};
  },
  methods: {
    async claimEve(id) {
      const claim = this.contract.methods.claim;
      const gas = await this.estimateGas(claim(id));
      claim(id)
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
            description: "Received successfully",
          });
          this.init();
        });
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
.claim {
  // max-width: 1920px;
  margin: auto;
  ul {
    margin-top: 40px;
    display: grid;
    // grid-gap: 17px;
    grid-template-columns: repeat(5, 1fr);
    li {
      background: url("~/assets/buy-back/1.png") no-repeat;
      background-size: 100% 100%;
      padding: 42px 53px 50px 53px;
      position: relative;
      .portrait {
        width: 100%;
        border-radius: 10px;
        min-height: 200px;
      }
      .selectedBoll {
        position: absolute;
        left: 22px;
        top: 22px;
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
        }
      }
      .opensea {
        cursor: pointer;
        display: block;
        text-align: center;
        background: url("~/assets/buy-back/9.png") no-repeat;
        background-size: 100% 100%;
        height: 54px;
        line-height: 54px;
        color: #fff;
        font-size: 16px;
        margin-top: 16px;
      }
    }
  }
}

@media only screen and (max-width: 1800px) {
  .claim {
    ul {
      margin-top: 40px;
      display: grid;
      // grid-gap: 17px;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
