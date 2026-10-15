<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import MenuLink from 'vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue'
import MenuGroup from 'vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue'

const { theme, lang } = useData()
const items = computed(() => theme.value.nav || [])
const labels = { zh_CN: '更多', zh_TW: '更多', en_US: 'More', ko_KR: '더 보기', ja_JP: 'その他', vi_VN: 'Xem thêm' }
const navigationLabels = { zh_CN: '主导航', zh_TW: '主導覽', en_US: 'Main navigation', ko_KR: '주 메뉴', ja_JP: 'メインナビゲーション', vi_VN: 'Điều hướng chính' }
const navigationLabel = computed(() => navigationLabels[lang.value.replace('-', '_')] || 'Main navigation')
const more = computed(() => labels[lang.value.replace('-', '_')] || 'More')
const nav = ref(null)
const measurements = ref(null)
const count = ref(0)
const overflow = computed(() => ({ text: more.value, items: items.value.slice(count.value) }))
let observer
let frame

function measure() {
  const cells = Array.from(measurements.value?.children || [])
  if (!nav.value || cells.length !== items.value.length + 1) return
  const available = nav.value.clientWidth
  const widths = cells.slice(0, -1).map(cell => cell.getBoundingClientRect().width)
  if (widths.reduce((sum, width) => sum + width, 0) <= available) {
    count.value = items.value.length
    return
  }
  let used = cells[cells.length - 1].getBoundingClientRect().width
  let visible = 0
  for (const width of widths) {
    if (used + width > available) break
    used += width
    visible++
  }
  count.value = visible
}
function schedule() {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(measure)
}
async function observe() {
  await nextTick()
  observer.disconnect()
  observer.observe(nav.value)
  for (const cell of measurements.value.children) observer.observe(cell)
  schedule()
}
onMounted(() => {
  observer = new ResizeObserver(schedule)
  observe()
})
watch([items, more], () => { if (observer) observe() })
onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(frame)
})
</script>

<template>
  <nav v-if="items.length" ref="nav" class="VPNavBarMenu overflow-nav" aria-labelledby="main-nav-aria-label">
    <span id="main-nav-aria-label" class="visually-hidden">{{ navigationLabel }}</span>
    <template v-for="item in items.slice(0, count)" :key="item.text">
      <MenuLink v-if="'link' in item" :item="item" />
      <MenuGroup v-else :item="item" />
    </template>
    <MenuGroup v-if="count < items.length" :item="overflow" />
    <div ref="measurements" class="nav-measurements" aria-hidden="true" inert>
      <div v-for="item in items" :key="item.text">
        <MenuLink v-if="'link' in item" :item="item" />
        <MenuGroup v-else :item="item" />
      </div>
      <div><MenuGroup :item="{ text: more, items: [] }" /></div>
    </div>
  </nav>
</template>

<style scoped>
.overflow-nav { display: none; min-width: 0; }
@media (min-width: 768px) {
  .overflow-nav { display: flex; flex: 1 1 0; justify-content: flex-end; }
}
.overflow-nav > :deep(.VPNavBarMenuLink),
.overflow-nav > :deep(.VPNavBarMenuGroup) { flex-shrink: 0; }
.nav-measurements {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: max-content;
  visibility: hidden;
  pointer-events: none;
}
.nav-measurements > div { flex-shrink: 0; }
.overflow-nav :deep(.VPMenu) { max-width: min(320px, calc(100vw - 32px)); }
.overflow-nav :deep(.VPMenu .item),
.overflow-nav :deep(.VPMenu .text) { white-space: normal; overflow-wrap: anywhere; }
</style>
