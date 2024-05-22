const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "docs",
  publicPath: process.env.NODE_ENV === "production" ? "/invoiceExcel/" : "/",

  runtimeCompiler: true,
  configureWebpack: {
    module: {
      rules: [
        // Tus reglas de webpack aquí
      ],
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions = options.compilerOptions || {};
        options.compilerOptions.isCustomElement = (tag) =>
          tag.startsWith("ion-");
        return options;
      });
  },
});
