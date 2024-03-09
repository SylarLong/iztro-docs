<template>
  <div
    style="
      padding: 10px;
      border-radius: 5px;
      text-align: center;
      margin-top: 35px;
      border-style: double;
      border-color: var(--vp-custom-block-danger-border);
      border-top: 1px dashed var(--vp-custom-block-danger-border);
      border-bottom: 1px dashed var(--vp-custom-block-danger-border);
    "
  >
    码字不易，如果觉得文档对你有帮助，请考虑
    <a style="cursor: pointer" @click="show = true">点击此处打赏站长</a>
  </div>
  <div
    v-show="show"
    @click="show = !show"
    style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
    "
  >
    <p>点击关闭</p>
    <div>
      <img
        src="/.vitepress/public/alipay.png"
        alt="alipay"
        width="300"
        style="display: inline-block; border-radius: 20px"
      />&nbsp;
      <img
        src="/.vitepress/public/wcpay.png"
        alt="wechat pay"
        width="300"
        style="display: inline-block; border-radius: 20px"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Donate",
  data() {
    return {
      show: false // Initial state (hidden)
    }
  }
};
</script>
