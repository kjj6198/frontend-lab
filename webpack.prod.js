const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const config = require('./webpack.config');

const plugins = [
  new HtmlWebpackPlugin({
    template: 'app/index.html',
    minify: {
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,

      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
    },
    inject: true,
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  // TODO: add prefetch support.
  // new ScriptExtHtmlWebpackPlugin({
  //   prefetch: ['SobelArt', 'PianoRoll', 'WaveformVisualizer'],
  // }),
  new OfflinePlugin({
    // Plugin's runtime wasn't added to one of your bundle entries. See this https://goo.gl/YwewYp for details.
    publicPath: '/',
    relativePaths: false,
    excludes: ['index.html'],
    caches: {
      main: [':rest:'],
      additional: ['*.chunk.js', '*.svg', '*.png'],
    },
    responseStrategy: 'network-first',
  }),
];

module.exports = config({
  mode: 'production',
  entry: [path.join(process.cwd(), 'app/app.js')],
  optimization: {
    minimize: true,
    sideEffects: true,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  plugins,
});
