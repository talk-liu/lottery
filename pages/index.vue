<template>
  <div class="home">
    <Head />
    <div class="container play">
      <ul class="just">
        <li>
          <h3>
            Play <span>MetaLuckBox</span> for just <strong>0.05 ETH</strong>
          </h3>
          <p>
            Mint your tickets at our official website, any NFT before Draw is
            likely to be your chance to win a hundred times the prize.
          </p>
          <p class="explore">
            <nuxt-link class="now" to="/home">
              <img src="~/assets/index/wint.png" />
            </nuxt-link>
            <a class="video" href="#video">
              <img src="~/assets/ico/video.png" />Watch Video</a
            >
          </p>
        </li>
        <li>
          <img src="~/assets/index/winner.png" />
        </li>
      </ul>
      <div class="mechanism">
        <h3>Our Mechanism</h3>
        <ul>
          <li>
            <h4>Minting<img src="~/assets/index/minting-icon.png" /></h4>
            <p>
              When the current round kicks off, the minting channel will open in
              MetaLuckBox. Each round last for 48H. The user can mint NFTs
              during the first 24H, after which the minting channel closes and
              the user can no longer mint any NFTs.
            </p>
            <p>
              The total quantity of NFTs that user can be minted in a round is
              predetermined. There’s no limit on how many NFTs or how many times
              a user can mint, unless the number of minted NFTs in the current
              round has reached the limit.
            </p>
          </li>
          <li class="trade">
            <h4>Trade-in<img src="~/assets/index/trade-in-icon.png" /></h4>
            <p>
              If the user no longer wants to keep his NFT, he can recycle it to
              MetaLuckBox by selling it back. Once recycled, the NFT will be
              destroyed immediately. The trade-in price of each NFT in
              MetaLuckBox is 80% of its original price.
            </p>
            <p>
              There is no time limite on NFT trade-in, meaning they can trade in
              minted NFTs when the current round is over.
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="how">
      <div class="howBack">
        <h3>How to Participate</h3>
        <p class="border"></p>
        <ul>
          <li v-for="(item, key) in howList" :key="key">
            <p>
              <span>STEP</span>
              <strong>{{ key + 1 }}</strong>
              <span>{{ item.ids }}</span>
            </p>
            <img src="~/assets/index/brder.png" />
            <p class="website">
              {{ item.value }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="what">
      <div class="container">
        <div class="happens">
          <ul>
            <li>
              <h4>What Happens after Minting？</h4>
              <p>
                After minting your NFTs, you can view them in the collection
                page, but they will remain mystery boxes until the result is
                released. However, you can still list them for sale in the
                second 24H of the current round.
              </p>
              <p>Wait for the result at the end of the current round.</p>
            </li>
            <li>
              <h4>What Happens after Result Release?</h4>
              <p>
                When the result is released, you will know by then whether you
                are the winner. If you are the winner, you can claim your prize
                and get the prize pot. If not, you can still sell your NFTs if
                you don’t want to keep them. You can trade in unwanted NFTs on
                MetaLuckBox’s official website (at 80% of its original price) or
                list them for sale on OpenSea.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div class="metaluckboxVideo" id="video">
        <video width="100%" height="100%" controls>
          <source
            src="https://metaluckbox.com/metaluckbox.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <FAQ id="faq" />
    </div>
    <Bottom />
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import Bottom from "../components/Bottom.vue";
export default {
  name: "IndexPage",
  components: { Head, Bottom },
  data() {
    return {
      howList: [
        {
          ids: "ONE",
          value:
            "Visit the official website of MetaLuckBox and auto-logs in with your wallet (Metamask). ",
        },
        {
          ids: "TWO",
          value:
            "You then enter the minting page, where you can draw NFTs through minting and view information about the  previous and the current round. ",
        },
        {
          ids: "THREE",
          value:
            "There is no limit on how many NFTs or how many times you can mint, unless all NFTs have been minted in  the current round and there are no available NFTs. ",
        },
        {
          ids: "FOUR",
          value:
            "Each round lasts for 48H, as shown in the timer. You can mint NFTs during the first 24H and trade them once  you minted the NFT. The result of NFT draw will be announced at the end of each round.",
        },
      ],
    };
  },
};
</script>
<style scoped lang="less">
.home {
  .play {
    margin: auto;
    padding: 0px 100px;
    .just {
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        h3 {
          font-weight: 800;
          font-size: 72px;
          color: #fff;
          word-break: break-all;
          span {
            color: #339f01;
          }
          strong {
            color: #3ac3f7;
          }
        }
        p {
          color: #fff;
          font-size: 27px;
          font-weight: 400;
        }
        .explore {
          margin-top: 82px;
          // .now {
          //   width: 254px;
          //   height: 62px;
          //   line-height: 62px;
          //   display: inline-block;
          //   background: radial-gradient(
          //         87.18% 87.18% at 7.03% 6.18%,
          //         rgba(95, 254, 255, 0.2) 0%,
          //         rgba(0, 0, 0, 0) 100%
          //       )
          //       /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
          //     linear-gradient(152.02deg, #56545f 16.59%, #0d0c13 102.6%),
          //     #32333c;
          //   border-radius: 12px;
          //   color: #fff;
          //   text-align: center;
          //   border: 2px solid #de68e4;
          //   font-size: 28px;
          // }
          .video {
            margin-left: 30px;
            color: #fff;
            img {
              margin-right: 14px;
            }
          }
        }
      }
    }
    .mechanism {
      color: #fff;
      h3 {
        color: #fff;
        font-weight: 700;
        font-size: 72px;
      }
      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          border-radius: 12px;
          padding: 20px;
          margin: 10px;
          background: url("~/assets/index/minting.png") no-repeat;
          background-size: 100% 100%;
          width: 50%;
          height: 500px;
          h4 {
            font-weight: 700;
            font-size: 32px;
            color: #fff;
            text-align: center;
            img {
              margin-left: 14px;
            }
          }
          p {
            color: #c5c5c5;
            font-weight: 400;
            font-size: 24px;
            margin-bottom: 30px;
          }
        }
        .trade {
          background: url("~/assets/index/trade-in.png") no-repeat;
          background-size: 100% 100%;
          p {
          }
        }
      }
    }
  }
  .how {
    margin-top: 300px;
    background: #d9d9d9;
    .howBack {
      width: 1200px;
      margin: auto;
      position: relative;
      padding: 10px 0px;
      padding-top: 60px;
    }
    .border {
      width: 7px;
      height: 100%;
      position: absolute;
      left: 109px;
      top: 0px;
      background: #3ac3f7;
    }
    h3 {
      font-weight: 700;
      font-size: 48px;
      margin-left: 200px;
    }
    ul {
      li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 150px;
        img {
          margin: 0px 20px;
          position: relative;
          z-index: 11;
        }
        p {
          color: #000000;
          font-weight: 400;
          font-size: 24px;
          span {
            background: #3ac3f7;
            display: block;
            width: 69px;
            text-align: center;
            font-size: 12px;
            color: #fff;
          }
          strong {
            display: block;
            width: 69px;
            background: #000;
            color: #fff;
            text-align: center;
            font-size: 32px;
          }
        }
        .website {
          margin-left: 10px;
        }
      }
    }
  }
  .what {
    background: linear-gradient(45deg, #000b2a 0%, #011e4c 100%);
    .container {
      margin: auto;
    }
    .happens {
      text-align: center;
      background: url("~/assets/index/happens.png") no-repeat;
      background-size: 100% 100%;
      padding-bottom: 180px;
      ul {
        li {
          max-width: 1100px;
          margin: auto;
        }
        h4 {
          color: #ffffff;
          font-weight: 700;
          font-size: 48px;
          color: #fff;
          padding-top: 130px;
        }
        p {
          font-size: 24px;
          color: #fff;
          font-weight: 400;
          line-height: 180%;
        }
      }
    }
    .metaluckboxVideo {
      width: 1280px;
      margin: auto;
    }
  }
}
@media only screen and (max-width: 2000px) {
  .home .play .just li h3 {
    font-size: 55px;
  }
  .home {
    .play {
      padding: 0px 0px;
    }
  }
}
</style>
