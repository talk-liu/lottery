<template>
  <div>
    <Head />
    <div class="contactUs">
      <h2>JOIN OUR COMMUNITY & GET EARLY ACCESS</h2>
      <div>
        <a>
          <img src="~/assets/contact/button-1.png" />
        </a>
        <a>
          <img src="~/assets/contact/button-2.png" />
        </a>
      </div>
      <p class="ico">
        <a>
          <img src="~/assets/contact/1.png" />
        </a>
        <a>
          <img src="~/assets/contact/2.png" />
        </a>
        <a>
          <img src="~/assets/contact/3.png" />
        </a>
        <a>
          <img src="~/assets/contact/4.png" />
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
export default {
  name: "IndexPage",
  components: { Head },
  data() {
    return {};
  },
};
</script>

<style scoped lang="less">
.contactUs {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 720px;
  div {
    margin-bottom: 60px;
    img {
      margin: 0px 10px;
    }
  }
  h2 {
    color: #fff;
    text-align: center;
    font-size: 60px;
    background: linear-gradient(
        90.48deg,
        #e8f8f8 0.31%,
        #64e3e3 53.07%,
        #e064e3 96.79%
      ),
      #ffffff;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  .ico {
    text-align: center;
    img {
      margin: 0px 27px;
    }
  }
}
</style>
