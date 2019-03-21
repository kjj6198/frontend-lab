const webpack = require('webpack');
const path = require('path');

module.exports = options => ({
  mode: options.mode || 'production',
  devServer: {
    port: 3000,
    ...options.devServer,
    // you can add proxy option for API development.
    // proxy: { '/api': 'YOUR_API_URL' }
  },

  entry: [path.join(__dirname, 'app/app.js')],

  optimization: options.optimization,

  target: 'web',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    crossOriginLoading: 'anonymous',
    ...options.output,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:
          process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'stage'
            ? JSON.stringify('production')
            : JSON.stringify(process.env.NODE_ENV),
      },
    }),
    ...options.plugins,
  ],

  devtool: 'cheap-module-source-map',

  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'], // check .babelrc for more config.
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|ttf|woff|woff2|swf)$/,
        use: 'file-loader',
      },
      {
        test: /\.(svg|jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
        },
      },
      {
        test: /\.(svg|jpg|png|gif)$/,
        enforce: 'pre',
        loader: 'image-webpack-loader',
        exclude: [],
        options: {
          gifsicle: {
            interlaced: false,
          },
          optipng: {
            optimizationLevel: 7,
          },
          pngquant: {
            quality: '90-100',
            speed: 4,
          },
          mozjpeg: {
            progressive: true,
            quality: 65,
          },
          svgo: {
            plugins: [{ removeViewBox: false }],
          },
        },
      },
      {
        test: /\.html$/,
        exclude: /index\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
});
