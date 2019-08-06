'use strict';

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const globalConfig = require('../../global-config');


// https://webpack.js.org/configuration/
module.exports = {
  mode: 'production',

  entry: path.join(globalConfig.path.www, 'app.js'),

  output: {
    path: globalConfig.path.wwwDist
  },

  devtool: 'cheap-source-map',

  stats: 'errors-warnings',

  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@root': globalConfig.path.root,
      '@': globalConfig.path.www,
      '@assets': globalConfig.path.wwwAssets,
      '@components': globalConfig.path.wwwComponents,
      '@fonts': path.join(globalConfig.path.wwwAssets, 'fonts'),
      '@img': path.join(globalConfig.path.wwwAssets, 'img'),
      '@intermediars': globalConfig.path.wwwIntermediars,
      '@less': path.join(globalConfig.path.wwwAssets, 'less'),
      '@lib': globalConfig.path.wwwLib,
    }
  },

  resolveLoader: {
    modules: [ globalConfig.path.nodeModules ]
  },

  module: {
    rules: [

      // Vue
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      // JS
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  require.resolve('@babel/preset-env'),
                  {
                    targets: [
                      'chrome >= 57',
                      'firefox >= 52',
                      'edge >= 16',
                      'android >= 67',
                      'ios >= 10.3'
                    ]
                  }
                ]
              ]
            }
          }
        ]
      },

      // CSS
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },

      // LESS
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              noIeCompat: true
            }
          }
        ],
      },

      // SASS
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },

      // Images
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },

      // Media
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]'
        }
      },

      // Fonts
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }

    ]
  },

  plugins: [

    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: 'Dashbi',
      template: path.join(globalConfig.path.www, 'index.template.html'),
      favicon: path.join(globalConfig.path.wwwAssets, 'img/favicon.png'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),

    new VueLoaderPlugin()
  ]

};
