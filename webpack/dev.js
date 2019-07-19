/* eslint-disable */

const webpack = require('webpack');
const { resolve } = require('path');
const common = require('./common.js');
const config = require('../src/config');

module.exports = Object.assign({}, common, {
  mode: 'development',
  watch: true,
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      SERVER: 'http://46.105.148.221:8020',
      FACTORY: 'TWo4iMr794EwRR7FLwk9sDG8njxavLhtNX',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: resolve(__dirname, '..', 'build'),
    compress: true,
    port: config.port,
    hot: true,
    historyApiFallback: true,
  },
})
