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
      result: { mainThisNum: 0 },
      gasPriceWei: null,
      gasLimitHex: null,
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
      claimNftBoll:true,
      mintNum:1,
      contractAddr:"0x79A394fcfdD91F245C286dB6ef7E59A6275a75a8"
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
      if (networkIDstring !== '4') {
        this.switchEthereumChain(4);
      }
      location.reload();
    });
    console.log(ethereum.networkVersion)
    if (ethereum.networkVersion !== '4') {
      this.switchEthereumChain(4);
      notification.error({
        message: 'MetaMask',
        description: '网络错误请切换到测试网络'
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
    const web3 = this.web3;
    // let mintNum = 5;
    let gasPriceGwei = "10";
    let gasLimit = "1800000";
    this.gasPriceWei = web3.utils.numberToHex(
      web3.utils.toWei(gasPriceGwei, "gwei")
    );
    this.gasLimitHex = web3.utils.numberToHex(gasLimit);
    // this.amount = web3.utils.numberToHex(
    //   web3.utils.toWei(String(this.mintNum * 0.001), "ether")
    // );
    this.init();
  },
  methods: {
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
      if(!this.balanceNum){
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
      const winnerNFT = await this.multicallEve(tokenIds,'winnerNFT')
      const winnerClaimed = await this.multicallEve(tokenIds,'winnerClaimed')
      const tokenURI = await this.multicallEve(tokenIds,'tokenURI')


      for(let i = 0;i<tokenIds.length;i++){
        const isWin = this.web3.utils.hexToBytes('0x'+winnerNFT[1][i].substring(2,66))[31]
        const epoch = this.web3.utils.hexToBytes('0x'+winnerNFT[1][i].substring(66,130))[31]
        const isBool = this.web3.utils.hexToBytes('0x'+winnerClaimed[1][i].substring(2,66))[31]
        const hexToAsciis = this.web3.utils.hexToAscii(tokenURI[1][i])
        const { image } = await get(hexToAsciis.substring(64,hexToAsciis.length))

        this.nftIdAttr.push({
          id: parseInt(tokenIds[i]),
          boll: false,
          isWin: isWin,
          image: image
        })
        if (isWin && (!isBool)) {
          const { jackpotAmount } = await this.contract.methods.rounds(epoch).call();
          this.claimNftIdAttr.push({
            id: parseInt(tokenIds[i]),
            boll: false,
            image: image,
            jackpotAmount:jackpotAmount/100000000000000000
          })
        }
      }
      if(!this.claimNftIdAttr.length){
        this.claimNftBoll = false
      }




      // for (let i = 0; i < this.balanceNum; i++) {
      //   const nftId = await this.contract.methods
      //     .tokenOfOwnerByIndex(this.accounts[0], i)
      //     .call();
      //   const winnerNFT = await this.contract.methods.winnerNFT(nftId).call();
      //   const winnerClaimed = await this.contract.methods.winnerClaimed(nftId).call();
      //   const tokenURI = await this.contract.methods.tokenURI(nftId).call();

      //   const { image } = await get(tokenURI)
      //   this.nftIdAttr.push({
      //     id: nftId,
      //     boll: false,
      //     isWin: winnerNFT.isWin,
      //     image: image
      //   })
      //   if (winnerNFT.isWin && (!winnerClaimed)) {
      //     this.claimNftIdAttr.push({
      //       id: nftId,
      //       boll: false,
      //       image: image
      //     })
      //   }
      //   if(this.balanceNum <= i){
      //     this.claimNftBoll = false
      //   }
      // }
    },
    async multicallEve (tokenIds,type){
      let winners = []
      for(let i=0; i < tokenIds.length; i++) {
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