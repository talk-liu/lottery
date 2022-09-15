<!-- Please remove this file from your project -->
<template>
  <div class="header">
    <header>
      <ul class="container">
        <li>
          <nuxt-link to="/"> <img src="~/assets/logo/logo.png" /></nuxt-link>
        </li>
        <li>
          <nuxt-link to="/home"> Mint </nuxt-link>
          <nuxt-link to="/claim"> Claim </nuxt-link>
          <nuxt-link to="/nft"> Collection </nuxt-link>
          <nuxt-link to="/history"> History </nuxt-link>

          <a href="#faq" v-if="$route.path == '/'"> FAQ </a>
          <!-- <nuxt-link to="/contact-us"> Contact us </nuxt-link>
          <nuxt-link to="/faq"> FAQ </nuxt-link> -->
          <p>
            <img src="~/assets/ico/metamask-fox.svg" />
            <a v-if="accounts[0]">{{ accounts[0] | userInformation }}</a>
            <a @click="singInEve" v-else> Connect Wallet </a>
          </p>
        </li>
      </ul>
    </header>
    <Metamask />
  </div>
</template>

<script>
import Web3 from "web3";
import Metamask from "@/components/Popup/Metamask.vue";
// import minxins from "@/common/minxins/mint.js";
export default {
  name: "Head",
  components: { Metamask },
  // mixins: [minxins],
  data() {
    return {
      accounts: [],
      web3: "",
    };
  },
  async mounted() {
    this.web3 = new Web3(window.ethereum);
    this.accounts = await this.web3.eth.getAccounts();
  },
  // async mounted() {
  //   this.web3 = new Web3(window.ethereum);
  //   this.accounts = await this.web3.eth.getAccounts();
  //   // this.accounts = await ethereum.enable();
  //   ethereum.enable().then((accounts) => {
  //     this.accounts = accounts;
  //   });

  //   ethereum.on("accountsChanged", (accounts) => {
  //     this.accounts = accounts;
  //   });
  //   ethereum.on("networkChanged", (networkIDstring) => {
  //     if (networkIDstring !== 4) {
  //       this.switchEthereumChain(4);
  //     }
  //   });
  //   if (ethereum.networkVersion !== 4) {
  //     this.switchEthereumChain(4);
  //   }
  // },
  methods: {
    async singInEve() {
      const getAccounts = await this.web3.eth.getAccounts();
      this.accounts = await window.ethereum.enable();
      if (getAccounts.length === 0) {
        location.reload();
      }
    },
    singUpEve() {
      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: Web3.utils.numberToHex(56), // 目标链ID
            chainName: "Binance Smart Chain Mainnet",
            nativeCurrency: {
              name: "bnb",
              symbol: "bnb",
              decimals: 18,
            },
            rpcUrls: ["https://bsc-dataseed.binance.org"], // 节点
            blockExplorerUrls: ["https://www.bscscan.com"],
          },
        ],
      });
    },
    switchEthereumChain(value) {
      window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: Web3.utils.numberToHex(value), // 目标链ID
          },
        ],
      });
    },
  },
};
</script>
<style scoped lang="less">
.header {
  background-color: #242424;
  ul {
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #383838;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        color: #fff;
        font-size: 16px;
        margin-right: 32px;
      }
      p {
        display: inline-block;
        background: url("~/assets/ico/singin.png") no-repeat;
        background-size: 100% 100%;
        height: 47px;
        line-height: 47px;
        padding: 0px 30px;
        width: 230px;
        overflow: hidden;
        text-align: center;
        img {
          margin-right: 20px;
          width: 27px;
        }
        a {
          margin: 0px;
        }
      }
    }
  }
}
</style>
