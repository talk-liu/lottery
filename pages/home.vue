<template>
  <div>
    <div>
      <Head />
      <div class="mintBox container">
        <div class="contentBox">
          <div class="content">
            <div class="leftMint">
              <h3>Previous Round</h3>
              <!-- <p><label>Start Time</label>Jun 21,2022,8:00 PM</p>
            <p><label>End Time</label>Jun 21,2022,8:00 PM</p> -->
              <p class="pot">
                <!-- <label>Prize Pot</label> -->
                <strong>Prize Pot ：{{ jackpotAmount / singNum }} ETH </strong>
              </p>
              <p class="socialContact">
                <!-- <a target="_blank" href="https://twitter.com/MetaLB777">
                  <img src="~/assets/ico/twitter.png" />
                </a> -->
                <!-- <a>
                  <img src="~/assets/ico/discord.png" />
                </a>
                <a>
                  <img src="~/assets/ico/github.png" />
                </a> -->
              </p>
            </div>
            <div class="mint">
              <p
                v-if="
                  !(
                    itemDate.lockTimestamp >= itemDate.thisTimestamp &&
                    result.mainThisNum < mintLimitPerRound
                  )
                "
                class="minting"
              >
                <img src="~/assets/ico/minting.png" />
                Minting complete! Now you can trade freely.
              </p>
              <ul class="countDown">
                <li>
                  <h2>Round {{ currentEpoch }}</h2>
                  <p class="times">
                    <time> {{ itemDate.h }} </time>
                    <span>:</span>
                    <time> {{ itemDate.m }} </time>
                    <span>:</span>
                    <time> {{ itemDate.s }} </time>
                  </p>
                  <!-- <a class="utc">UTC+8</a> -->
                </li>
              </ul>
              <ul class="minted">
                <li>
                  <label>Minted</label>
                  <h3>{{ result.mainThisNum }}/{{ mintLimitPerRound }}</h3>
                </li>
                <li>
                  <label>Price</label>
                  <h3>
                    <img src="~/assets/ico/eth.png" />{{ mintPrice / singNum }}
                    ETH
                  </h3>
                </li>
              </ul>
              <div>
                <!-- <strong> Mint:</strong> -->
                <p>
                  <img @click="reduceEve" src="~/assets/mint/reduce.png" />
                  <input
                    oninput="value=value.replace(/^(0+)|[^\d]+/g,'')"
                    v-model="mintNum"
                    type="text"
                  />
                  <img @click="pushEve" src="~/assets/mint/add.png" />
                </p>
              </div>
              <p
                @click="mint"
                :class="[
                  itemDate.lockTimestamp >= itemDate.thisTimestamp &&
                  result.mainThisNum < mintLimitPerRound
                    ? ''
                    : 'pointer',
                ]"
                class="mints"
              >
                Mint
              </p>
              <!-- <a class="countdown"> Check Countdown </a> -->
            </div>
            <div class="rightMint">
              <h3>Current Round</h3>
              <p>
                <label style="color: #fff; font-size: 20px"
                  ><strong
                    >Prize Pot ： {{ result.jackpotAmount / singNum }} ETH
                  </strong></label
                >
              </p>
              <p><label>Trading Time</label>{{ result.lockTimestamp }}</p>
              <p>
                <label>Next Round Start Time</label>{{ result.closeTimestamp }}
              </p>
              <p class="tips">
                <img src="~/assets/ico/tips.png" />
                <span>
                  After minting your NFT,you can freely trade on
                  <a
                    target="blank"
                    href="https://testnets.opensea.io/collection/nft-lottery-8sggaih0gx"
                    >Opensea</a
                  >
                  or Trade-in to
                  <nuxt-link to="/nft">Meta Luck Box</nuxt-link>
                </span>
              </p>
            </div>
          </div>
        </div>
        <!-- <FAQ style="margin-top: -160px" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import minxins from "@/common/minxins/mint.js";
import Web3 from "web3";
import ABI from "@/common/json/abi.json";
import { notification, message } from "ant-design-vue";
import moment from "moment";
export default {
  name: "IndexPage",
  components: { Head },
  mixins: [minxins],
  data() {
    return {};
  },
  mounted() {
    this.web3 = new Web3(window.ethereum);
    this.contract = new this.web3.eth.Contract(ABI, this.contractAddr);
    const ss = (value) => {
      if (value <= 0) {
        return "00";
      } else if (value < 10) {
        return "0" + value;
      }
      return value;
    };
    const item = (value) => {
      return moment(parseInt(value) * 1000).format("YYYY-MM-DD HH:mm:ss");
    };
    const _this = this;
    setInterval(async () => {
      _this.currentEpoch = await _this.contract.methods.currentEpoch().call();
      const result = await _this.contract.methods
        .rounds(_this.currentEpoch)
        .call();
      // console.log(result)
      const res = { ...result };
      const thisTimestamp = parseInt(Date.now() / 1000);
      const lockTimestamp = parseInt(res.lockTimestamp);
      const h = parseInt(((lockTimestamp - thisTimestamp) / 60 / 60) % 24);
      const m = parseInt(((lockTimestamp - thisTimestamp) / 60) % 60);
      const s = parseInt((lockTimestamp - thisTimestamp) % 60);
      _this.itemDate = {
        h: ss(h),
        m: ss(m),
        s: ss(s),
        thisTimestamp: thisTimestamp,
        lockTimestamp: lockTimestamp,
      };
      result.startTimestamp = item(result.startTimestamp);
      result.closeTimestamp = item(result.closeTimestamp);
      result.lockTimestamp = item(result.lockTimestamp);
      result["mainThisNum"] = result.endId - result.startId;
      _this.result = result;
    }, 1000);
  },
  methods: {
    reduceEve() {
      this.mintNum -= 1;
      if (this.mintNum <= 0) {
        this.mintNum = 1;
      }
    },
    pushEve() {
      if (this.mintNum === "") {
        this.mintNum = 0;
      }
      if (this.mintNum + this.result.mainThisNum >= this.mintLimitPerRound) {
        return;
      }
      this.mintNum += 1;
    },
    async mint() {
      const web3 = this.web3;
      this.amount = web3.utils.numberToHex(
        web3.utils.toWei(
          String(this.mintNum * (this.mintPrice / this.singNum)),
          "ether"
        )
      );

      if (
        this.itemDate.lockTimestamp >= this.itemDate.thisTimestamp &&
        this.result.mainThisNum < this.mintLimitPerRound
      ) {
        const mints = this.contract.methods.mint;
        const gas = await this.estimateGas(mints(this.mintNum), this.amount);
        console.log(gas);
        mints(this.mintNum)
          .send({
            from: this.accounts[0],
            gas: gas,
            value: this.amount,
          })
          .on("confirmation", (confirmationNumber, receipt) => {
            console.log(confirmationNumber, receipt);
          })
          .then((result) => {
            console.log(result);
            notification.success({
              message: "MetaMask",
              description: "Minting is successful",
            });
          })
          .catch((reason) => {
            console.log(reason);
            notification.error({
              message: "MetaMask",
              description: "Minting failed. Please try again.",
            });
          });
        // this.mintNum = 1
      } else {
        notification.error({
          message: "Mint",
          description: "Ended",
        });
      }
    },
  },
};
</script>
<style scoped lang="less">
.mintBox {
  margin: auto;
  .contentBox {
    position: relative;
    height: 100vh;
  }
  .content {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    z-index: 12;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: 0px 120px;
  }
  .leftMint,
  .rightMint {
    background: url("~/assets/mint/1.png") no-repeat;
    width: 412.6px;
    height: 541px;
    background-size: 100% 100%;
    text-align: left;
    padding: 0px 50px;
    h3 {
      margin-top: 100px;
      font-size: 46px;
      color: #fff;
      white-space: nowrap;
    }
    p {
      font-size: 20px;
      margin-bottom: 8px;
      label {
        color: #8f8f8f;
        font-size: 16px;
        margin-right: 32px;
        display: block;
      }
    }
  }
  .leftMint {
    position: relative;
    .pot {
      // position: absolute;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%, -50%);
      label {
        display: inline-block;
        margin-right: 12px;
      }
    }
    .socialContact {
      text-align: center;
      margin-top: 60px;
      img {
        width: 60px;
      }
    }
  }
  .rightMint {
    strong {
    }
    .tips {
      margin-top: 50px;
      font-size: 14px;
      color: #8f8f8f;
      width: 100%;
      img {
        float: left;
        margin-right: 8px;
      }
    }
  }
  .mint {
    text-align: center;
    .minting {
      font-size: 14px;
      line-height: 14px;
      img {
        width: 33px;
      }
    }
    .minted {
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        margin: 0px 35px;
        // text-align: left;
        label {
          font-size: 18px;
        }
        h3 {
          font-size: 32px;
          color: #fff;
        }
        img {
          width: 32px;
          margin-right: 20px;
          margin-top: -6px;
        }
      }
    }
    .countDown {
      background: url("~/assets/mint/2.png") no-repeat;
      width: 633px;
      background-size: 100% 100%;
      padding-top: 34px;
      padding-bottom: 30px;
      h2 {
        color: #fff;
        font-size: 45px;
        font-weight: 700;
        margin-bottom: 22px;
        padding-top: 10px;
      }
      .times {
        margin-bottom: 20px;
        padding-bottom: 20px;
        time {
          display: inline-block;
          width: 114px;
          height: 116px;
          line-height: 116px;
          color: #ffffff;
          background: linear-gradient(
              180deg,
              rgba(91, 218, 243, 0) 50%,
              #60d3ed 100%
            ),
            linear-gradient(180deg, #0f404b 0%, rgba(15, 64, 75, 0) 50%);
          font-size: 70px;
        }
        span {
          font-size: 70px;
          height: 116px;
          line-height: 116px;
          display: inline-block;
        }
      }
      .utc {
        font-size: 20px;
        color: #fff;
      }
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      strong {
        font-size: 35px;
        margin-right: 38px;
      }
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        // span {
        //   width: 38px;
        //   height: 38px;
        //   background: linear-gradient(
        //     108.4deg,
        //     #adafae 37.46%,
        //     #aeddcf 87.92%,
        //     #afffe8 157.07%
        //   );
        //   display: inline-block;
        //   font-size: 23px;
        //   color: #555;
        //   cursor: pointer;
        // }
        input {
          width: 130px;
          height: 52px;
          line-height: 38px;
          background: url("~/assets/mint/input.png") no-repeat;
          background-size: 100% 100%;
          border: none;
          outline: none;
          color: #fff;
          font-size: 16px;
          text-align: center;
          padding: 0px 10px;
        }
      }
    }
    .mints {
      // background: #5aebff;
      color: #000;
      width: 380px;
      height: 52px;
      color: #fff;
      font-size: 16px;
      line-height: 52px;
      margin: auto;
      margin-top: 27px;
      cursor: pointer;
      background: url("~/assets/mint/button.png") no-repeat;
      background-size: 100% 100%;
    }
    .pointer {
      cursor: no-drop;
    }
  }
}

@media only screen and (max-width: 1800px) {
  .mintBox {
    .content {
      top: 50%;
    }
    .mint {
      .countDown {
        width: 540px;
        h2 {
          font-size: 30px;
          margin-bottom: 0px;
        }
        .times time {
          width: 90px;
          height: 90px;
          line-height: 90px;
          font-size: 50px;
        }
      }
      .minted li h3 {
        font-size: 27px;
      }
    }
    .leftMint h3,
    .rightMint h3 {
      font-size: 33px;
    }
    .rightMint .tips {
      margin-top: 60px;
    }
  }
}
</style>
