<!-- Please remove this file from your project -->
<template>
  <div>
    <ul class="container faq">
      <li v-for="(val, key) in faqList" :key="key">
        <h3 @click="val.boll = !val.boll">
          {{ val.name }}
          <img src="~/assets/ico/right.png" />
        </h3>
        <p v-if="val.boll">
          {{ val.value }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      faqList: [
        {
          name: "When is the mint date?",
          value:
            "The mint begins at 12:00 UTC+8 on July 21. Once every 48H, will start another new round. ",
          boll: false,
        },
        {
          name: "What is the Official mint link？",
          value: `Please always check our official discord channel for updates. 
              The official mint date will be announced through discord and also our official twitter around Mid-July: 
              Our official discord channel link is 
              `,
          boll: false,
        },
        {
          name: "Where can I find the mint link?",
          value: `The official mint link is: 
                  Please always check our official channel for updates. 
                  We advise you not to trust DMs from anyone. Only check official links posted in the official-links channel on the left side of our discord server. `,
          boll: false,
        },
        {
          name: "Why ETH network?",
          value: `Ethereum network is the most established, and we wanted to ensure that once everyone had their NFTs, they could trade them on Opensea. `,
          boll: false,
        },
        {
          name: "Is there a Discord? ",
          value: `Yes. There is Official Discord Link: 
                Join the MLB Discord to learn more information leading up to the mint. 
                We will have a Real-Time Delivery notification to update the time, the winner ID and the Next Round. `,
          boll: false,
        },
        {
          name: "How do I know I am the winner? ",
          value: `It will post on Twitter; Discord; and Official Webpage. `,
          boll: false,
        },
        {
          name: "Can I trade it on Opensea? ",
          value: `This is trade-fee game, once you minted the NFT, if you don't want to hold it anymore. You could trade it on Opeasea. `,
          boll: false,
        },
        {
          name: "How can I sell the NFT back?",
          value: `You could sell it back to us at 80% of its original price, or list it on the Opensea.`,
          boll: false,
        },
        {
          name: "What are the maximum mints per wallet?",
          value: `There is no limits per wallet. 
                  You could mint as much as you want. Unlimited mint and umlimited quantit`,
          boll: false,
        },
        {
          name: "After the mint time finished, could I join the round?",
          value: `Yes, the game will have two channels, the first one is 24H mint channel, another one is 24H free-trading channel which after the mint time finish. 
                You could go to Opensea to buy the NFT. And once you have the current round NFT, you are still in game.`,
          boll: false,
        },
      ],
    };
  },
};
</script>
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
    p {
      border-top: 1px solid #d9d9d9;
      font-size: 20px;
      color: #fff;
      padding-top: 10px;
      font-weight: 200;
    }
  }
}
</style>
