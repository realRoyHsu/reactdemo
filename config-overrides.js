// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const {
  override,
  fixBabelImports,
  addDecoratorsLegacy,
  addWebpackAlias,
  overrideDevServer,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("customize-cra");

// 跨域配置
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const devServerConfig = () => (config) => {
  return {
    ...config,
    // 服务开启gzip
    compress: true,
    proxy: {
      "/api": {
        target: "xxx",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  };
};

module.exports = {
  webpack: override(
    addDecoratorsLegacy(),
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
    }),
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true,
    })
  ),
  devServer: overrideDevServer(devServerConfig()),
};
