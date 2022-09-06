<!-- Please remove this file from your project -->
<template>
  <div>
    <ul class="container faq">
      <li v-for="(val, key) in faqList" :key="key">
        <h3 @click="val.boll = !val.boll">
          {{ val.name }}
          <img src="~/assets/ico/right.png" />
        </h3>
        <div class="content" v-if="val.boll">
          <div v-html="val.value"></div>
        </div>
      </li>
    </ul>
    <div class="metaluckboxVideo">
      <!-- <video width="100%" height="100%" controls>
        <source
          src="https://metaluckbox.com/metaluckbox.mp4"
          type="video/mp4"
        />
      </video> -->
    </div>
  </div>
</template>

<script>
import winImg from "~/assets/ico/win.png";
export default {
  name: "IndexPage",
  data() {
    return {
      faqList: [
        {
          name: "What is MetaLuckBox? ",
          value:
            "MetaLuckBox is a game in which luck leverages a hundred times or maybe thousand times. You just need to click click and click then your luck will lead to unexpected rewards for your ticket. Do you wanna be the next lucky dog? Come and join us immediately !!",
          boll: false,
        },
        {
          name: "Where Can I find the mint link? ",
          value: `The official mint link is : <a target="_blank" href="https://metaluckbox.com/">MetaLuckBox.com</a> Please always check our official channel for updates. We advice you not to trust DMs from anyone. Only check official website around mid-September. `,
          boll: false,
        },
        {
          name: "Is there a Twitter? ",
          value: `Yes, There is an official Twitter Link: <a target="_blank" href="https://twitter.com/MetaLB777/">https://twitter.com/MetaLB777</a>
          Join the MateLuckBox twitter to learn Drawing information. We will have a real-time Delivery notification to update the time, the winner NFT ID, the winner address, and also the strat time for next round. 
          `,
          boll: false,
        },
        {
          name: "How much did I win?",
          value: `The amount of prize (Prizepot) = Total number of minted NFTs is current round  NFT price  20% 
          <p><img style="margin-right: 12px;" src="${winImg}"/>Remember MetaLuckBox will charge 10% of prize pot as service fee. </p>
          `,
          boll: false,
        },
        {
          name: "Where can I get results for MetaLuckBox? ",
          value: `Right here on the Official MetaLuckBox website. Winning NFT is posted shortly on Twitter and official website after the current round finished. The player could go to the 'Claim' page to check if you have the winner NFT or not.`,
          boll: false,
        },
        {
          name: "Why ETH network?",
          value: `Ethereum network is the most established, and we wanted to ensure that once everyone had their NFTs, they could trade them on Opensea. `,
          boll: false,
        },
        {
          name: "Is there a time limit? ",
          value: `Yes. The game will have two channels, the first one is 24H minting channel, another one is 24H free-trading channel which after the minting time finish. You can buy the NFT on the Opensea if you don't have time to mint before the clock runs out. `,
          boll: false,
        },
        {
          name: "How do MetaLuckBox draw the winner? ",
          value: `MetaLuckBox use Chainlink VRF which is a provably fair and verifiable random number generator(RNG) that enables smart contracts to access random values without compromising security or usability. `,
          boll: false,
        },
        {
          name: "How to claim your prize?",
          value: `
            <p>Congrats on your win! Follow these easy steps to get the claim process started.  </p>
            <ul>
              <li>Once you are the winner which you have the winning NFT in your wallet. </li>
              <li>Please click the 'Claim' button on our official website. </li>
              <li>Then click the 'Claim' on the NFT. </li>
              <li>Confirm on your 'Metamask' Wallet and wait until it processed. Once it shows successfully. </li>
              <li>You got your prize. </li>
            </ul>
          `,
          boll: false,
        },
      ],
    };
  },
};
</script>
<style lang="less">
.faq {
  .content {
    div {
      border-top: 1px solid #d9d9d9;
      font-size: 20px;
      color: #fff;
      padding-top: 10px;
      font-weight: 200;
    }
    li {
      margin: 12px 0px;
      list-style: disc;
      margin-left: 50px;
    }
    p,
    a {
      color: #5edbff;
    }
  }
}
</style>
<style scoped lang="less">
.faq {
  margin: auto;
  padding: 130px 0px;
  li {
    width: 1280px;
    margin: auto;
    background: radial-gradient(
          87.18% 87.18% at 7.03% 6.18%,
          rgba(95, 254, 255, 0.2) 0%,
          rgba(0, 0, 0, 0) 100%
        )
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
      linear-gradient(152.02deg, #56545f 16.59%, #0d0c13 102.6%), #d9d9d9;
    border-radius: 12px;
    padding: 13px 30px;
    margin-bottom: 30px;
    border: 1px solid #3ac3f7;
    h3 {
      font-size: 28px;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      margin-top: 10px;
    }
    // p {
    //   border-top: 1px solid #d9d9d9;
    //   font-size: 20px;
    //   color: #fff;
    //   padding-top: 10px;
    //   font-weight: 200;
    // }
  }
}
.metaluckboxVideo {
  width: 1280px;
  margin: auto;
}
</style>
