// Keep translated navigation in the same order and hierarchy as Simplified Chinese.
// Classical texts are intentionally omitted until their translations are available.
const messages = {
  en_US: {
    label: 'English', lang: 'en-US', title: '紫微研习社 | iztro.com',
    description: "Documentation for iztro, a lightweight JavaScript library for generating Zi Wei Dou Shu charts, with introductory guides to Zi Wei Dou Shu.",
    outlineTitle: 'On this page', docFooter: { prev: 'Previous page', next: 'Next page' },
    sidebarMenuLabel: 'Menu', returnToTopLabel: 'Back to top', darkModeSwitchLabel: 'Appearance',
    footer: 'Related site',
    texts: ["Home", "Developer documentation", "Beginner’s guide", "Create a chart", "Chart interpretation", "AI models", "Discussions", "About the author", "Changelog", "npm package", "iztro documentation", "Quick start", "Type definitions", "Chart", "Palaces", "Stars", "Horoscope periods", "Configuration and plugins", "Zi Wei Dou Shu guides", "Basics", "Understanding the chart", "Understanding palaces", "Star system", "14 major stars", "14 auxiliary stars", "37 miscellaneous stars", "48 symbolic stars", "Four transformations", "Chart patterns", "Star placement rules"],
  },
  ko_KR: {
    label: '한국어', lang: 'ko-KR', title: '紫微研习社 | iztro.com',
    description: "자미두수 명반 데이터를 생성하는 경량 JavaScript 라이브러리 iztro의 개발 문서와 자미두수 기초 지식을 제공합니다.",
    outlineTitle: '이 페이지의 내용', docFooter: { prev: '이전 페이지', next: '다음 페이지' },
    sidebarMenuLabel: '메뉴', returnToTopLabel: '맨 위로', darkModeSwitchLabel: '화면 모드',
    footer: '관련 사이트',
    texts: ["홈", "개발 문서", "입문 안내", "명반 작성", "명반 해석", "AI 모델", "토론", "작성자 소개", "변경 내역", "npm 패키지", "iztro 개발 문서", "빠른 시작", "타입 정의", "명반", "궁", "성요", "운한", "설정과 플러그인", "자미두수 기초 지식", "기초 지식", "명반 소개", "궁의 이해", "성요 체계", "14개 주성", "14개 보조성", "37개 잡요", "48개 신살", "사화", "격국", "안성결"],
  },
  ja_JP: {
    label: '日本語', lang: 'ja-JP', title: '紫微研习社 | iztro.com',
    description: "紫微斗数の命盤データを取得できる軽量な JavaScript ライブラリ iztro の開発ドキュメントと、紫微斗数の基礎知識を紹介します。",
    outlineTitle: 'このページの内容', docFooter: { prev: '前のページ', next: '次のページ' },
    sidebarMenuLabel: 'メニュー', returnToTopLabel: 'ページの先頭へ', darkModeSwitchLabel: '表示モード',
    footer: '関連サイト',
    texts: ["ホーム", "開発ドキュメント", "入門ガイド", "命盤作成", "命盤解釈", "AI モデル", "ディスカッション", "作者について", "変更履歴", "npm パッケージ", "iztro 開発ドキュメント", "クイックスタート", "型定義", "命盤", "宮位", "星曜", "運限", "設定とプラグイン", "紫微斗数の基礎知識", "基礎知識", "命盤の見方", "宮位の基礎", "星曜体系", "十四主星", "十四補助星", "三十七雑曜", "四十八神煞", "四化", "格局", "安星訣"],
  },
  vi_VN: {
    label: 'Tiếng Việt', lang: 'vi-VN', title: '紫微研习社 | iztro.com',
    description: "Tài liệu lập trình cho iztro, thư viện JavaScript gọn nhẹ để lập lá số Tử Vi Đẩu Số, cùng hướng dẫn kiến thức cơ bản về Tử Vi.",
    outlineTitle: 'Trong trang này', docFooter: { prev: 'Trang trước', next: 'Trang tiếp theo' },
    sidebarMenuLabel: 'Danh mục', returnToTopLabel: 'Về đầu trang', darkModeSwitchLabel: 'Giao diện',
    footer: 'Trang liên quan',
    texts: ["Trang chủ", "Tài liệu lập trình", "Hướng dẫn nhập môn", "Lập lá số", "Luận giải lá số", "Mô hình AI", "Thảo luận", "Về tác giả", "Lịch sử thay đổi", "Gói npm", "Tài liệu lập trình iztro", "Bắt đầu nhanh", "Định nghĩa kiểu dữ liệu", "Lá số", "Cung", "Sao", "Vận hạn", "Cấu hình và trình cắm", "Kiến thức Tử Vi Đẩu Số", "Kiến thức cơ bản", "Giới thiệu lá số", "Kiến thức về cung", "Hệ thống sao", "14 chính tinh", "14 phụ tinh", "37 tạp diệu", "48 thần sát", "Tứ hóa", "Cách cục", "Quy tắc an sao"],
  },
};
const starLabels = { en_US: 'GitHub stars', ko_KR: 'GitHub 스타', ja_JP: 'GitHub スター', vi_VN: 'Sao trên GitHub' };
const chinese = ['主页', '开发', '新手村', '排盘', '解盘', 'AI 模型', '讨论', '关于作者', '更改日志', 'NPM地址', 'iztro开发文档', '快速开始', '类型定义', '星盘', '宫位', '星曜', '运限', '配置和插件', '紫微斗数知识', '基础扫盲', '星盘介绍', '宫位知识', '星曜知识', '14主星', '14辅星', '37杂曜', '48神煞', '四化', '格局', '安星诀'];

export function translatedLocales(root) {
  return Object.fromEntries(Object.entries(messages).map(([locale, m]) => {
    const dictionary = Object.fromEntries(chinese.map((text, i) => [text, m.texts[i]]));
    function translateMenu(items) {
      return items.filter(item => !item.link?.includes('/ancientBook')).map(item => ({
        ...item,
        text: item.text === 'GitHub 星标' ? starLabels[locale] : dictionary[item.text] ?? item.text,
        ...(item.link?.startsWith('/') ? { link: `/${locale}${item.link}` } : {}),
        ...(item.items ? { items: translateMenu(item.items) } : {}),
      }));
    }
    return [locale, {
      label: m.label, lang: m.lang, title: m.title, description: m.description,
      themeConfig: {
        ...root.themeConfig,
        nav: translateMenu(root.themeConfig.nav),
        sidebar: translateMenu(root.themeConfig.sidebar),
        outlineTitle: m.outlineTitle,
        docFooter: m.docFooter,
        sidebarMenuLabel: m.sidebarMenuLabel,
        returnToTopLabel: m.returnToTopLabel,
        darkModeSwitchLabel: m.darkModeSwitchLabel,
        footer: { message: `© 2025 iztro.com All rights reserved.<br/>${m.footer}: <a href="https://ziwei.pub" target="_blank">紫微派</a>` },
      },
    }];
  }));
}
