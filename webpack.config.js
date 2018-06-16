//Require modules
const webpack = require('webpack');
const path = require('path');

//Require plugins
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

//Configuration
module.exports = (env, argv) => {
  return {
    //Entry
    entry: ['./js/src/index.js', './css/src/style.scss'],

    //Output
    output: {
      filename: './js/build/bundle.js',
      path: path.resolve(__dirname),
    },

    //Allow importing files ending in these extensions
    resolve: {
      extensions: [".js", ".scss"]
    },

    //Loaders
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: argv.mode != 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
            }, 
            {
              loader: 'css-loader'
            }, 
            {
              loader: 'postcss-loader', 
              options : {
                plugins: function() {
                  return [require('autoprefixer')];
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
             loader: 'file-loader'
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
      ]
    },

    devServer: {
      watchContentBase: true,
      historyApiFallback: true,
    },

    //Plugins
    plugins: [
      // new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: './css/build/bundle.css'
      }),
      new BrowserSyncPlugin({
        notify: false,
        host: 'localhost',
        port: 4000,
        logLevel: 'silent',
        files: ['./*.php'],
        proxy: 'http://localhost:8888/',
      })
    ],

    //Optimization
    optimization: argv.mode != 'production' ? {} : 
    {
      minimizer: [
        new CleanWebpackPlugin(['./css/build/*', './js/build/*']),
        new UglifyJSPlugin({
          cache: true,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
  };
};