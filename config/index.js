const path = require('path')
module.exports = {
  build: {
    env: require('./prod.env'),
    productionSourceMap: true,
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: true
  },
  dev: {
    env: require('./dev.env'),
    devtoolSourceMap: '#source-map',
    cssSourceMap: true
  },
  base: {
    libraryName: 'ol-control-BZoomSlider',
    distDirectory: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static'
  }
}
