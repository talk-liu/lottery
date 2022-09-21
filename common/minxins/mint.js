import Web3 from "web3";
import moment from "moment";
import ABI from '@/common/json/abi.json'
import multicallABI from '@/common/json/multicall.json'
import { notification, message } from 'ant-design-vue';
import { get, post } from "~/utils/axios.js";
export default {
  data() {
    return {
      accounts: [],
      contract: "",
      web3: "",
      result: { mainThisNum: 0, jackpotAmount: 0 },
      amount: null,
      claimId: "",
      currentEpoch: "",
      itemDate: { "h": "00", "m": "00", "s": "00" },
      nftIdAttr: [],
      claimNftIdAttr: [],
      mintLimitPerRound: 0,
      mintPrice: 0,
      jackpotAmount: 0,
      balanceNum: 1,
      claimNftBoll: true,
      mintNum: 1,
      contractAddr: "0xe37971960574A60ec0078c0b370a62595AB288FA",
      singNum: 1000000000000000000
    }
  },

  async mounted() {
    this.web3 = new Web3(window.ethereum);
    const getAccounts = await this.web3.eth.getAccounts();
    this.accounts = await window.ethereum.enable();
    if (getAccounts.length === 0) {
      location.reload();
    }
    //监听账号切换
    ethereum.on('accountsChanged', function (accounts) {
      location.reload();
    })
    ethereum.on("networkChanged", (networkIDstring) => {
      console.log(networkIDstring)
      if (networkIDstring !== '5') {
        this.switchEthereumChain(5);
      }
      location.reload();
    });
    console.log(ethereum.networkVersion)
    if (ethereum.networkVersion !== '5') {
      this.switchEthereumChain(5);
      notification.error({
        message: 'MetaMask',
        description: 'Network error, please switch'
      })
      return
    }

    this.contract = new this.web3.eth.Contract(
      ABI,
      this.contractAddr
    );
    this.multicall = new this.web3.eth.Contract(
      multicallABI,
      "0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821"
    );
    this.init();
  },
  methods: {
    async estimateGas(func, value = 0) {
      try {
        const gas = await func.estimateGas({
          from: this.accounts[0],
          value,
        });
        return Math.floor(gas * 1.2);
      } catch (error) {
        console.log("errr", error.message);
        const objStartIndex = error.message.indexOf("{");
        notification.error({
          message: 'MetaMask',
          description: error.message.slice(0, objStartIndex)
        })
      }
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
    async init() {
      this.nftIdAttr = []
      this.claimNftIdAttr = []
      this.contract.methods.mintLimitPerRound().call().then((value) => {
        this.mintLimitPerRound = value
      })
      this.contract.methods.mintPrice().call().then((value) => {
        this.mintPrice = value
      })

      const LastCurrentEpoch = await this.contract.methods.currentEpoch().call();
      if (LastCurrentEpoch > 1) {
        const { jackpotAmount } = await this.contract.methods.rounds(LastCurrentEpoch - 1).call();
        this.jackpotAmount = jackpotAmount
      }

      const balanceNum = await this.contract.methods
        .balanceOf(this.accounts[0])
        .call();
      this.balanceNum = parseInt(balanceNum);
      console.log(balanceNum)
      if (!this.balanceNum) {
        this.claimNftBoll = false
      }

      const calls = []
      for (let i = 0; i < this.balanceNum; i++) {
        let call = [
          this.contractAddr,
          await this.contract.methods.tokenOfOwnerByIndex(this.accounts[0], i).encodeABI()
        ]
        calls.push(call)
      }
      const tokenIdsResult = await this.multicall.methods.aggregate(calls).call();
      let tokenIds = tokenIdsResult[1]
      const winnerNFT = await this.multicallEve(tokenIds, 'winnerNFT')
      const winnerClaimed = await this.multicallEve(tokenIds, 'winnerClaimed')
      const tokenURI = await this.multicallEve(tokenIds, 'tokenURI')


      for (let i = 0; i < tokenIds.length; i++) {
        const isWin = this.web3.utils.hexToBytes('0x' + winnerNFT[1][i].substring(2, 66))[31]
        const epoch = this.web3.utils.hexToBytes('0x' + winnerNFT[1][i].substring(66, 130))[31]
        const isBool = this.web3.utils.hexToBytes('0x' + winnerClaimed[1][i].substring(2, 66))[31]
        const hexToAsciis = this.web3.utils.hexToAscii(tokenURI[1][i])
        const { image } = await get(hexToAsciis.substring(64, hexToAsciis.length))

        const { refundPrice, jackpotAmount } = await this.contract.methods.rounds(epoch).call();
        this.nftIdAttr.push({
          id: parseInt(tokenIds[i]),
          boll: false,
          isWin: isWin,
          image: image,
          refundPrice: refundPrice / this.singNum
        })
        if (isWin && (!isBool)) {
          // const { jackpotAmount } = await this.contract.methods.rounds(epoch).call();
          this.claimNftIdAttr.push({
            id: parseInt(tokenIds[i]),
            boll: false,
            image: image,
            jackpotAmount: jackpotAmount / this.singNum
          })
        }
      }
      if (!this.claimNftIdAttr.length) {
        this.claimNftBoll = false
      }
    },
    async multicallEve(tokenIds, type) {
      let winners = []
      for (let i = 0; i < tokenIds.length; i++) {
        let tokenId = parseInt(tokenIds[i])
        let winner = [
          this.contractAddr,
          await this.contract.methods[type](tokenId).encodeABI()
        ]
        winners.push(winner)
      }
      let winnerResult = await this.multicall.methods.aggregate(winners).call();
      return winnerResult
    }
  },
}