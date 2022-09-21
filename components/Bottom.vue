<!-- Please remove this file from your project -->
<template>
  <div class="bottom">
    <img src="~/assets/logo/logo.png" />
    <div>
      <a href="mailto:Social@metaluckbox.com">
        <img src="~/assets/index/contact.png" />Contact us</a
      >
      <a target="_blank" href="https://github.com/metaluckbox/">
        <img src="~/assets/index/code.png" />Open Source Code</a
      >
      <a target="_blank" href="https://twitter.com/MetaLB777/">
        <img src="~/assets/index/twitter.png" />Twitter</a
      >
    </div>
    <p>© 2022 MetaLuckBox, all rights reserved</p>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
<style scoped lang="less">
.bottom {
  background: #000;
  text-align: center;
  padding: 35px 0px;
  a {
    font-size: 16px;
    color: #a4a4a4;
    margin: 0px 22px;
    img {
      margin-right: 6px;
    }
  }
  div {
    margin-top: 20px;
    margin-bottom: 43px;
  }
  p {
    color: #a4a4a4;
    font-size: 12px;
  }
}
</style>
