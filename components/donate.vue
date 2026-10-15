<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import { useData } from 'vitepress';
import alipayCode from '../.vitepress/public/alipay.png';
import wechatCode from '../.vitepress/public/wcpay.png';

const { lang } = useData();
const show = ref(false);
const openButton = ref(null);
const closeButton = ref(null);
watch(show, async visible => {
  await nextTick();
  (visible ? closeButton : openButton).value?.focus();
});
const messages = {
  'zh-cn': { prompt: '码字不易，如果觉得文档对你有帮助，请考虑', support: '点击此处打赏站长', close: '点击关闭', alipay: '支付宝收款码', wechat: '微信收款码', paypal: '通过 PayPal 打赏' },
  'zh-tw': { prompt: '寫作不易，如果覺得文件對你有幫助，請考慮', support: '點此打賞站長', close: '點擊關閉', alipay: '支付寶收款碼', wechat: '微信收款碼', paypal: '透過 PayPal 打賞' },
  'en-us': { prompt: 'Writing these docs takes time and effort. If you find them helpful, please consider', support: 'supporting the author', close: 'Close', alipay: 'Alipay payment QR code', wechat: 'WeChat Pay payment QR code', paypal: 'Support via PayPal' },
  'ko-kr': { prompt: '문서 작성에는 시간과 노력이 필요합니다. 도움이 되셨다면', support: '작성자에게 후원해 주세요', close: '닫기', alipay: '알리페이 결제 QR 코드', wechat: '위챗페이 결제 QR 코드', paypal: 'PayPal로 후원하기' },
  'ja-jp': { prompt: 'ドキュメントの執筆には時間と労力がかかります。お役に立ちましたら、', support: '作者への支援をご検討ください', close: '閉じる', alipay: 'アリペイの送金用QRコード', wechat: 'ウィーチャットペイの送金用QRコード', paypal: 'PayPalで支援する' },
  'vi-vn': { prompt: 'Viết tài liệu cần nhiều thời gian và công sức. Nếu tài liệu hữu ích với bạn, hãy cân nhắc', support: 'ủng hộ tác giả', close: 'Đóng', alipay: 'Mã QR thanh toán Alipay', wechat: 'Mã QR thanh toán WeChat Pay', paypal: 'Ủng hộ qua PayPal' },
};
const text = computed(() => messages[lang.value.toLowerCase().replace('_', '-')] ?? messages['zh-cn']);
</script>

<template>
  <div class="donate-banner">
    {{ text.prompt }}
    <button type="button" class="donate-link" ref="openButton" @click="show = true">{{ text.support }}</button>
  </div>
  <div v-if="show" class="donate-overlay" @click.self="show = false" @keydown.esc="show = false">
    <section role="dialog" aria-modal="true" :aria-label="text.support" class="donate-dialog">
      <button type="button" class="donate-link" ref="closeButton" @click="show = false">{{ text.close }}</button>
      <div class="donate-codes">
        <img :src="alipayCode" :alt="text.alipay" width="300" />
        <img :src="wechatCode" :alt="text.wechat" width="300" />
      </div>
      <a class="donate-link" href="https://paypal.me/sylarlong" target="_blank" rel="noopener noreferrer">{{ text.paypal }}</a>
    </section>
  </div>
</template>

<style scoped>
.donate-banner {
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin-top: 35px;
  border-top: 1px dashed var(--vp-custom-block-danger-border);
  border-bottom: 1px dashed var(--vp-custom-block-danger-border);
}
.donate-link { color: var(--vp-c-brand-1, var(--vp-c-brand)); cursor: pointer; text-decoration: underline; }
.donate-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.donate-dialog { text-align: center; max-height: 90vh; overflow: auto; padding: 20px; }
.donate-codes { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin: 16px 0; }
.donate-codes img { border-radius: 20px; max-width: min(300px, 80vw); }
</style>
