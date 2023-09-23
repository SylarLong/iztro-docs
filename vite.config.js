const { defineConfig } = require("vite");

module.exports = defineConfig({
  plugins: [
    {
      name: "copy",
      apply: "build",
      async generateBundle() {
        const fs = require('fs-extra')
        const path = require("path");

        // 指定要复制的文件路径
        const filePath = path.resolve(__dirname, "./static/");

        // 指定要复制到的目标路径（根目录）
        const targetPath = path.resolve(__dirname, "../astro/docs/static");

        fs.copySync(filePath, targetPath);
      },
    },
  ],
});
