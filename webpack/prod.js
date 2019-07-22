/* eslint-disable */

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const common = require('./common.js');

module.exports = Object.assign({}, common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'SERVER': JSON.stringify('https://api.tronel.io'),
        // 'FACTORY': JSON.stringify('TC12yaNN9VSctf3e2pE3Kq6jKArMt2fS1q'),
        'FACTORY': JSON.stringify('TWo4iMr794EwRR7FLwk9sDG8njxavLhtNX'),
      },
    }),
    new UglifyJsPlugin({
      cache: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ]
});
