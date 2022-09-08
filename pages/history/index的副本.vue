<!-- Please remove this file from your project -->
<template>
  <div>
    <Head />
    <div class="history">
      <ul>
        <li class="title">
          <strong> # </strong>
          <strong class="nftId"> NFT ID </strong>
          <strong> Start Time </strong>
          <strong> End Time </strong>
          <strong> Prize </strong>
        </li>
        <li class="tableBody" v-for="key in 10" :key="key">
          <p>
            <span class="index"> {{ key }} </span>
          </p>
          <p class="back">sadadssasdsa</p>
          <p class="item">
            <span>00:00:00</span>
            <label>2022/6/15</label>
          </p>
          <p class="item">
            <span>00:00:00</span>
            <label>2022/6/15</label>
          </p>
          <p class="usd">
            <img src="~/assets/ico/usd.png" />
            <span>16 USDT</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import minxins from "@/common/minxins/mint.js";
export default {
  name: "IndexPage",
  mixins: [minxins],
  async mounted() {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/41d3db874b584770865cb0c194f39c47"
      )
    );
    const events = await web3.eth.getPastLogs({
      address: "0x7759f0b33fb35f82ce51ae8c16d4cc990c829196",
      topics: [
        "0xf8661aec877e4b8b87afea92dee5fda3b952cb324def1d37b09f00475473cbdc",
      ],
      fromBlock: 0,
    });
    const roundAttr = [];
    for (let i = 0; i < events.length; i++) {
      let event = events[i];
      // 获取到账户
      // 获取到当前轮数据
      let round = parseInt(event.topics[1]);
      let callRound = [
        this.contractAddr,
        await this.contract.methods.rounds(round).encodeABI(),
      ];
      roundAttr.push(callRound);
    }
    const roundResult = await this.multicall.methods
      .aggregate(roundAttr)
      .call();
    console.log(JSON.stringify(roundResult));
  },
  methods: {},
};
</script>
<style scoped lang="less">
.history {
  margin: auto;
  max-width: 1200px;
  padding-top: 100px;
  padding-bottom: 100px;
  ul {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }
    p {
      width: 290px;
    }
    .title {
      strong {
        font-weight: 700;
        font-size: 16px;
        line-height: 32px;
        color: #000;
        text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
        display: inline-block;
        width: 290px;
      }
      .nftId {
        padding-left: 20px;
      }
    }
    .tableBody {
      color: #ffffff;
      font-size: 16px;
      .back {
        background: url("~/assets/history/back.png") no-repeat;
        background-size: 150px 100%;
        height: 40px;
        line-height: 40px;
        text-indent: 20px;
      }
      .index {
        border-left: 6px solid #0297ff;
        width: 45px;
        height: 44px;
        text-align: center;
        line-height: 44px;
        display: inline-block;
        background: radial-gradient(
              87.18% 87.18% at 7.03% 6.18%,
              rgba(95, 254, 255, 0.2) 0%,
              rgba(0, 0, 0, 0) 100%
            )
            /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
          linear-gradient(152.02deg, #56545f 16.59%, #0d0c13 102.6%), #d9d9d9;
      }
      .item {
        font-size: 16px;
        span {
          display: block;
        }
      }
      .usd {
      }
    }
  }
}
</style>
