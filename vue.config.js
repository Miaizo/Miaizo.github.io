module.exports = {
  productionSourceMap: false,
  publicPath: './',
  transpileDependencies: [
    'vuetify'
  ]
}

const CompressionPlugin = require('compression-webpack-plugin')
configureWebpack: config => {
  if (process.env.NODE_ENV === 'production') {
    return {
      plugins: [new CompressionPlugin({
        test: /\.js$|\.html$|\.css/,
        threshold: 10240,
        deleteOriginalAssets: false
      })]
    }
  }
}