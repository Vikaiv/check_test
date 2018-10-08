
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './src/app.js',
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  context: resolve(__dirname, './'),

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    host: "127.0.0.1",
    port: 8080,
    proxy: {
    //     '/bundle.js': {
    //         target: 'http://127.0.0.1:8080'
    //     },
    //     '/vendors.js': {
    //         target: 'http://127.0.0.1:8080'
    //     },
        '/list/discipline': {
            target: 'http://127.0.0.1:4000/',
            secure: true,
            changeOrigin: true
        },
        '/auth': {
          target: 'http://127.0.0.1:4000/',
          secure: true,
          changeOrigin: true
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader?modules',
            options: {
              minimize: false
            }
          }
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
};