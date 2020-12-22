const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: false,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist1"),
    filename: "index.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    port: 8082,
    open: false,
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      {
        test: /\.s(c|a)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|png|bmp|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 999999 * 1024,
            },
          },
        ],
      },
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ["@babel/preset-env",{
                  useBuiltIns:'usage',  // 按需加载polyfill,不会全部polyfill都加载进去
                  corejs:{version:3},   // corejs版本,要安装corejs
                  targets:{
                    chrome:'60',
                    firefox:'60',
                    ie:'9',
                    safari:'10',
                    edge:'17'
                  }
                }],  // 可以转换js语法,
                "@babel/preset-react" // 可以转换jsx语法
              ],
              plugins:[
                // 插件是预设的集合,很多插件打包一起就是预设了
                ["@babel/plugin-proposal-decorators",{legacy:true}]
              ]
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};
