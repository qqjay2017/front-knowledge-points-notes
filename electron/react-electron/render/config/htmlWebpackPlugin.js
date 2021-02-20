const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const {getHtmlTags } = require('./htmlTags')

function htmlWebpackPlugin(mode){
  return new HtmlWebpackPlugin({
    template: path.join(__dirname, "../main/index.html"),
    filename: 'index.html',
    // inject:true,
    // CDN_LIST:getHtmlTags(mode)
  })
}

module.exports ={
  htmlWebpackPlugin
}